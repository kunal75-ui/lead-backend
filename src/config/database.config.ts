import mongoose from "mongoose";
import { config } from "./config";


const createDatabase = async (): Promise<void> => {
    const { MONGODB_URI, DB_NAME, MONGODB_USER, MONGODB_PASSWORD, NODE_ENV } = config;

    mongoose.set('debug',true)
    try {
        await mongoose.connect(MONGODB_URI, {
            retryWrites: true,
            auth: {
                username: MONGODB_USER,
                password: MONGODB_PASSWORD,
            },
            autoIndex: NODE_ENV !== 'production',
            dbName: DB_NAME,
        });
        console.info(`Running on ENV = ${NODE_ENV}`);
        console.info(`Connected to MongoDB. DB Name: ${DB_NAME}`);
    } catch (error) {
        console.error('Unable to connect to MongoDB.');
        console.error(error);
        process.exit(1); // Exit the process on DB connection failure
    }
}

export default createDatabase;