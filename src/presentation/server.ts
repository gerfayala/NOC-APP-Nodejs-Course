import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/checks/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.ts";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started");

    //TODO: EMAIL SERVICE

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "xipuulze19@gmail.com",
    //   "germanfayala2419@gmail.com",
    // ]);
    // CronService.createJob("*/3 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
