import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BusinessHq } from '../../business/entities/business.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendBusinessConfirmation(business: BusinessHq, url: string) {
    await this.mailerService.sendMail({
      to: business.email,
      subject: 'Welcome to the App!',
      template: './business-approval',
      context: {
        name: business.name,
        url,
      },
    });
  }
}
