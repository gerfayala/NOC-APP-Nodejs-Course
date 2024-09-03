import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";




export class LogRepositoryImpl implements LogRepository {
    
    

    constructor(
        private readonly logDatasource: LogDatasource
    ) { }
    async saveLogs(log: LogEntity): Promise<void> {
        this.logDatasource.saveLogs(log);
    }
    async getLog(severityLevel: LogEntityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

    

}