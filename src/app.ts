import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import AppError from './utils/AppError';
import { authGuard } from './middlewares/auth';

const app = express();
const appRouter = express.Router();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api', appRouter);


appRouter.use('/auth', authRoutes)

appRouter.use(authGuard)
appRouter.use('/leads', leadRoutes)

/*
----------------------------------------------------------------
Fallback Routes
----------------------------------------------------------------
*/
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

/*
----------------------------------------------------------------
Error Handler
----------------------------------------------------------------
*/

app.use((err: AppError, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        success: false,
        stack: err.stack
    });
});

export default app;
