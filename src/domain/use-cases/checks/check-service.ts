import { LogEntity, LogEntityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check servce: ${url}`);
      }
      const log = new LogEntity({
        message: `Service ${url} is working`,
        level: LogEntityLevel.low,
        origin: "check-service.ts",
      });
      this.logRepository.saveLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorString = `Error on check servce: ${url} ${error}`;
      const log = new LogEntity({
        message: `Service ${url} is not working`,
        level: LogEntityLevel.high,
        origin: "check-service.ts",
      });
      this.logRepository.saveLogs(log);
      this.errorCallback && this.errorCallback(errorString);
      return false;
    }
  }
}
