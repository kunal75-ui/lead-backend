import { StatusCodes } from "http-status-codes";
import { config } from "../config/config";
import { IUser } from "../types";
import AppError from "./AppError";
import jwt from 'jsonwebtoken'

export const signToken = (appUser: IUser) => {
    const { JWT_SECRET, JWT_EXPIRATION } = config;
    if (!JWT_SECRET)
        throw new AppError('Error Generating Auth Token', StatusCodes.INTERNAL_SERVER_ERROR);

    const jwtExpiry = `${JWT_EXPIRATION}d`;
    return jwt.sign({id:appUser._id,
        email:appUser.email,
        name:appUser.name,
        role: appUser.role
    }, JWT_SECRET, {
        expiresIn: jwtExpiry ,
    });
};