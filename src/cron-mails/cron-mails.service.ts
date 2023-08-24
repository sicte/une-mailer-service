import { Injectable, Logger } from '@nestjs/common';
import { EmailType, MailHandler } from 'src/common/mail-handler';
import { LogItems, EncaActasEntrega } from 'src/entities';
import { Repository, Between, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Usuarios } from 'src/entities/usuarios.entity';

@Injectable()
export class CronMailsService {
  private readonly logger = new Logger(CronMailsService.name);

  constructor(
    private readonly mailHandler: MailHandler,
    @InjectRepository(LogItems)
    private readonly logItemsRepository: Repository<LogItems>,
    @InjectRepository(EncaActasEntrega)
    private readonly encaActasEntregaRepository: Repository<EncaActasEntrega>,
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async emailModificacionesReserva() {
    // Get yesterday day with YYYY-MM-DD format
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

    const encaActasEntrega = await this.encaActasEntregaRepository.find({
      where: {
        indicativoReserva: 1,
      },
    });

    const logItems = await this.logItemsRepository.find({
      where: {
        fecha: Between<Date>(new Date(`${yesterday} 0:00:00`), new Date(`${yesterday} 23:59:59`)),
        idEncaActaEntrega_6: In(
          encaActasEntrega.map((encaActaEntrega) => encaActaEntrega.idEncaActaEntrega),
        ),
      },
      relations: {
        maestraItems: true,
      },
    });

    const usuarios = await this.usuariosRepository.find({
      select: {
        correoElectronico_1: true,
      },
      where: {
        correos: {
          idTipoCorreo: 3,
        },
      },
    });

    // Get all the correoElectronico_1 property from all the users fetched before
    const mailsUsuarios = usuarios.map((usuario) => usuario.correoElectronico_1);

    // Headers to render in the table component
    const mailHeaders = ['TIPO', 'SPR', 'PLANILLA', 'CÓDIGO', 'DESCRIPCIÓN', 'CANTIDAD', 'FECHA'];

    // Rows to render in table component, with the Key being the same that the headers
    const mailRows = logItems.map((logItem) => ({
      TIPO: logItem.tipo,
      SPR: logItem.idSpr_20,
      PLANILLA: logItem.idEncaActaEntrega_6,
      CÓDIGO: logItem.idItem_9,
      DESCRIPCIÓN: logItem.maestraItems.item,
      CANTIDAD: logItem.cantidad,
      FECHA: moment(new Date(logItem.fecha)).format('YYYY-MM-DD HH:mm'),
    }));

    if (mailRows.length <= 0) {
      this.logger.warn(
        'Modificaciones Reserva email was not sent because there was no data to display in the template',
      );
      return;
    }

    this.mailHandler
      .sendMail({
        type: EmailType.CRON,
        to: mailsUsuarios,
        from: 'Sicte <departamento.tecnologia@sicte.com>',
        subject: 'Modificaciones Reserva',
        view: 'modificaciones-reservas',
        variables: {
          table: {
            headers: mailHeaders,
            rows: mailRows,
          },
          yesterday,
        },
      })
      .then((result) => console.log(result))
      .catch((e) => console.log('error enviando mensaje', e));
  }
}
