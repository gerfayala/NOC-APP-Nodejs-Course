

import fs  from 'fs';

import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogEntityLevel } from "../../domain/entities/log.entity";




export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly lowLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-higs.log';




    constructor() { 
        this.createLogsFile();
    }

    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {

            if (fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });

    }

    async saveLogs(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, `${JSON.stringify(newLog)}\n`);

        if (newLog.level === LogEntityLevel.low) return;
        if (newLog.level === LogEntityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }else{
            fs.appendFileSync(this.highLogsPath,logAsJson );
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        )
        return logs;
    }

    async getLogs(severityLevel: LogEntityLevel): Promise<LogEntity[]> {
       
        switch (severityLevel) {
            case LogEntityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogEntityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);;
            case LogEntityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);;
            default:
                throw new Error(`${ severityLevel} not impllemented`);
        }
    }
}