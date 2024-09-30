import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transrpoter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transrpoter.sendMail({
        // from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogEntityLevel.low,
        message: `Email sent to ${to}`,
        origin: "email.service.ts",
      });

      console.log("Email sent", sentInformation);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogEntityLevel.high,
        message: `Email not  sent  ${to}`,
        origin: "email.service.ts",
      });

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Server started with logs";
    const htmlBody = `
        <h3>Server LOGS - NOC-APP</h3>
          <p>Server started at ${new Date()}</p>
          <p>Logs are being saved in the file system</
        `;

    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
