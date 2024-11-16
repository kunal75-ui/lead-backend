export interface IConfig {
    SERVER_PORT: number;
    MONGODB_URI: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    DB_NAME: string;
    NODE_ENV: string;
    JWT_EXPIRATION: number;
    JWT_SECRET: string;
}

class Config implements IConfig {
    SERVER_PORT = Number(process.env.SERVER_PORT);
    MONGODB_URI = process.env.MONGODB_URI!;
    MONGODB_USER = process.env.MONGODB_USER!;
    MONGODB_PASSWORD = process.env.MONGODB_PASSWORD!;
    DB_NAME = process.env.DB_NAME!;
    NODE_ENV = process.env.NODE_ENV!;
    JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION);
    JWT_SECRET = process.env.JWT_SECRET!;

    constructor() {}

}

export const config = new Config();

export const getDefaultConfig = () => config;