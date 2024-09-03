import { LogEntity, LogEntityLevel } from "../entities/log.entity";




export abstract class LogDatasource {
    abstract saveLogs(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]>;
}
    
