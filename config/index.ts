
import { HASH, JWT, EXTERNAL, LOG, MYSQL, SECURITY, MONGO, SERVER, SMTP } from "./Security";

export const RUN_MODE = process.argv[3];

interface LogConfig {
    PATH: string;
    LEVEL: string;
    FILE_SIZE: number;
    FILE_CNT: number;
}

interface ExternalConfig {
    APIKEY: string;
    TOLLGATE: string;
    HIGHWAYCLOCK: string;
    URL: string;
}

interface DatabaseConfig {
    MYSQL: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
        DATABASE: string;
        CONNECTION_LIMIT: number;
    };
    SECURITY: {
        KEY: string;
    };
}

interface Config {
    PROTOCOL: {
        [key: string]: SERVER;
    };
    EXTERNAL: ExternalConfig;
    SERVER: {
        TYPE: SERVER;
        PORT: SERVER;
    };
    DB: {
        [key: string]: DatabaseConfig;
    };
    LOG: LogConfig;
    MONGO: {
        [key: string]: {
            URL: string,
            DB: string
        };
    };
    JWT: {
        [key: string]: {
            SECRET_KEY: string;
            EXPIRES_IN: string;
        };
    };
    SMTP: {
        USER_EMAIL: string;
        USER_PASSWD: string;
    };
    HASH: {
        ITERATIONS: number;
        KEY_LENGTH: number;
        DIGEST: string;
        KEY: string;
    };
}

const targetConfig: Config = {
    PROTOCOL: {
        DEV: SERVER.DEV_PROTOCOL,
        REL: SERVER.PROTOCOL,
    },
    SERVER: {
        TYPE: SERVER.TYPE,
        PORT: SERVER.PORT,
    },
    EXTERNAL: {
        APIKEY: EXTERNAL.APIKEY,
        TOLLGATE: EXTERNAL.TOLLGATE,
        HIGHWAYCLOCK: EXTERNAL.HIGHWAYCLOCK,
        URL: EXTERNAL.URL,
    },
    DB: {
        REL: {
            MYSQL,
            SECURITY,
        },
        DEV: {
            MYSQL,
            SECURITY,
        },
    },
    LOG,
    MONGO: {
        DEV: {
            URL: MONGO.URL,
            DB: MONGO.DB
        },
        REL: {
            URL:MONGO.DEV_URL,
            DB: MONGO.DB
        },
    },
    JWT: {
        DEV: {
            SECRET_KEY: JWT.DEV_SECRET_KEY,
            EXPIRES_IN: JWT.EXPIRES_IN,
        },
        REL: {
            SECRET_KEY: JWT.SECRET_KEY,
            EXPIRES_IN: JWT.EXPIRES_IN,
        },
    },
    SMTP,
    HASH
};

export default targetConfig;
