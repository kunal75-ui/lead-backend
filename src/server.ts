import app from "./app";
import * as configImport from './config/config';
import createDatabase from "./config/database.config";
import dotenv from 'dotenv'

dotenv.config()

export const main = async (): Promise<void> => {
    const config = configImport.getDefaultConfig();
    await createDatabase()

    app.listen(config.SERVER_PORT, () => {
        console.info(
            `Apps Started Successfully \nEndpoint: http://localhost:${config.SERVER_PORT}`
        );
    });

}

// Only run if this module is being run directly
if (require.main === module) {
    main().catch((error) => {
        console.error('Error starting the application:', error);
        process.exit(1);
    });
}