import winston from "winston";
import Config from "../../config";

const logger = winston.createLogger({
    level: Config.LOG.LEVEL,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.json(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${level}] ${timestamp}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            level: Config.LOG.LEVEL,
            dirname: Config.LOG.PATH,
            filename: `${Config.SERVER.TYPE}_%DATE%.log`,
            maxsize: Config.LOG.FILE_SIZE,
            maxFiles: Config.LOG.FILE_CNT,
        }),
        new winston.transports.Console({
            level: Config.LOG.LEVEL,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${level.toUpperCase()}] ${timestamp}: ${message}`;
                })
            ),
        }),
    ],
});

export default logger;
