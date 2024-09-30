import { EmailService } from "../../../../presentation/email/email.service";
import { LogEntity, LogEntityLevel } from "../../../entities/log.entity";
import { LogRepository } from "../../../repository/log.repository";

interface SendlogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendlogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error("Email not sent");
      }

      const log = new LogEntity({
        level: LogEntityLevel.low,
        message: ` email sent`,
        origin: "send-logs.ts",
      });
      this.logRepository.saveLogs(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogEntityLevel.high,
        message: ` ${error}`,
        origin: "send-logs.ts",
      });
      this.logRepository.saveLogs(log);
      return false;
    }
  }
}
