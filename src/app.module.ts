import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envFileSchema from './config/env-file.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronMailsModule } from './cron-mails/cron-mails.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import HandlebarsHelpers from './config/handlebars-helpers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV || 'local'}.env`,
      validationSchema: envFileSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: +configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [path.join(__dirname, 'entities', '*.entity{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
    CronMailsModule,
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAIL_HOST'),
          port: configService.getOrThrow('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASSWORD'),
          },
          tls: { rejectUnauthorized: false },
        },
        defaults: {
          from: 'Sicte',
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(HandlebarsHelpers),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(__dirname, 'templates', 'views'),
            options: {
              strict: false,
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
