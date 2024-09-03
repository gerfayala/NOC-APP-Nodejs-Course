


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


    //metodo para convertir a string

    static fromJson(json: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(json);
        
        if (!message || !level || !createdAt) {
            throw new Error('Invalid LogEntity');
        }

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;

    }



}