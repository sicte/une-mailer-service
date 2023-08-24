import { Controller } from '@nestjs/common';
import { CronMailsService } from './cron-mails.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class CronMailsController {
  constructor(private readonly cronMailsService: CronMailsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  mailsEveryDayAt2Am() {
    this.cronMailsService.emailModificacionesReserva();
  }
}
