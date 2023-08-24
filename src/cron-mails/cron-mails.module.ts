import { Module } from '@nestjs/common';
import { CronMailsService } from './cron-mails.service';
import { CronMailsController } from './cron-mails.controller';
import { MailHandler } from 'src/common/mail-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncaActasEntrega, LogItems, MaestraItems, Usuarios } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([LogItems, EncaActasEntrega, MaestraItems, Usuarios])],
  controllers: [CronMailsController],
  providers: [CronMailsService, MailHandler],
})
export class CronMailsModule {}
