import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentMessageInfo } from 'nodemailer';
import * as path from 'path';

export enum EmailType {
  CRON = 'cron',
  REST = 'rest',
}

interface SendMailOptions {
  to: string | string[];
  from: string;
  subject: string;
  view: string;
  variables?: any;
  type: EmailType;
  force?: boolean;
}

const nonProdEnvs = ['dev', 'local'];
const invalidEnvMessage =
  "It seems you're in a non-prod env, use the 'force' param to send the email anyway";

@Injectable()
export class MailHandler {
  private readonly logger = new Logger(MailHandler.name);
  private isValidEnv: boolean;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    // the only one valid env in prod
    this.isValidEnv = !nonProdEnvs.includes(this.configService.get('NODE_ENV'));
    !this.isValidEnv && this.logger.warn(invalidEnvMessage);
  }

  sendMail({ force = false, ...options }: SendMailOptions): Promise<SentMessageInfo | boolean> {
    if (!this.isValidEnv && force === false) {
      this.logger.warn(
        `Email '${options.subject}' was ignored because ${invalidEnvMessage.toLowerCase()}`,
      );
      return new Promise((resolve) => resolve(false));
    }
    return this.mailerService.sendMail({
      ...options,
      template: 'container',
      context: {
        view: path.join(options.type, options.view),
        ...options.variables,
      },
    });
  }
}
