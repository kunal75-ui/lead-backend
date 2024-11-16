import { IUser } from '../src/types';

type CurrentLoggedInUser = {
    isAuthenticated: boolean;
    user: IUser;
};
declare global {
    namespace Express {
        export interface Request extends CurrentLoggedInUser {}
    }
}

export {};
