import { getReasonPhrase, StatusCodes } from 'http-status-codes';

class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status =
            getReasonPhrase(statusCode).toUpperCase() ||
            getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR).toUpperCase();
        this.isOperational = true;

        // Ensure the correct prototype chain
        Object.setPrototypeOf(this, AppError.prototype);

        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
