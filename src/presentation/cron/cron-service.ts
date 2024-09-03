import { CronJob } from 'cron';


type CronTime = string | Date;
type onTick = () => void;


export class CronService {
    
    static createJob(croneTime: CronTime, onTick: onTick) : CronJob{
        const job = new CronJob( croneTime, onTick );
        
        job.start();
        return job;
    }    
}