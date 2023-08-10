import { Controller } from '@nestjs/common';
import { CronMailsService } from './cron-mails.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class CronMailsController {
  constructor(private readonly cronMailsService: CronMailsService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  mailsEveryDayAt1Am() {
    this.cronMailsService.emailModificacionesReserva();
  }
}
