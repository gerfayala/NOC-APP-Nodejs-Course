import { LogEntity, LogEntityLevel } from "../entities/log.entity";




export abstract class LogRepository {
    abstract saveLogs(log: LogEntity): Promise<void>;
    abstract getLog(severityLevel: LogEntityLevel): Promise<LogEntity[]>;
}
    
