


export enum LogEntityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export class LogEntity {


    public level: LogEntityLevel ; //enum
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogEntityLevel,) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }



}