export enum LogEntityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogEntityLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogEntityLevel; //enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  //metodo para convertir a string

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json);

    if (!message || !level || !createdAt) {
      throw new Error("Invalid LogEntity");
    }

    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt,
    });
    log.createdAt = new Date(createdAt);

    return log;
  }
}
