import { Injectable } from '@nestjs/common';
import { EmailType, MailHandler } from 'src/common/mail-handler';
import { LogItems, EncaActasEntrega } from 'src/entities';
import { Repository, Between, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Usuarios } from 'src/entities/usuarios.entity';

@Injectable()
export class CronMailsService {
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
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

    //encaActasEntrega con indicativoReserva = 1
    const encaActasEntrega = await this.encaActasEntregaRepository.find({
      where: {
        indicativoReserva: 1,
      },
    });

    //TODO: Formato de fecha a AAAA/MM/DD , HR:MM
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

    this.mailHandler
      .sendMail({
        type: EmailType.CRON,
        to: ['nicolas.florez@sicte.com'],
        from: 'Sicte <departamento.tecnologia@sicte.com>',
        subject: 'Modificaciones Reserva',
        view: 'modificaciones-reservas',
        variables: {
          table: {
            headers: ['TIPO', 'SPR', 'PLANILLA', 'CÓDIGO', 'DESCRIPCIÓN', 'CANTIDAD', 'FECHA'],
            rows: logItems.map((logItem) => ({
              TIPO: logItem.tipo,
              SPR: logItem.idSpr_20,
              PLANILLA: logItem.idEncaActaEntrega_6,
              CÓDIGO: logItem.idItem_9,
              DESCRIPCIÓN: logItem.maestraItems.item,
              CANTIDAD: logItem.cantidad,
              FECHA: moment(new Date(logItem.fecha)).format('YYYY-MM-DD HH:mm'),
            })),
          },
          yesterday,
        },
        force: true,
      })
      .then((result) => console.log(result))
      .catch((e) => console.log('error enviando mensaje', e));
  }
}
