import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../types';
import AppError from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { promisify } from 'util';
import dayjs from 'dayjs';
import User from '../models/user.model';



export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', StatusCodes.FORBIDDEN)
      )
    }
    next();
  };
};

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const verifyToken = (token: string, secret: string, callback: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callback);
  };
  const promisifiedVerifyToken = promisify(verifyToken);
  const authToken = req.cookies.auth;
  const secret = config.JWT_SECRET as string;
  try {
    // 1) Getting token and check of it's there
    if (!authToken) {
      throw new AppError('please login', StatusCodes.UNAUTHORIZED);
    }
    if (!secret) {
      throw new AppError('JWT_SECRET is not defined.', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    // 2) Verification token
    const decoded = (await promisifiedVerifyToken(authToken, secret)) as IUser;


    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    // console.log({currentUser});
    
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    req.user = currentUser
    req.isAuthenticated = true

    next();
  } catch (error) {
    // Invalidate Cookie on Error
    req.isAuthenticated = false
    res.cookie('auth', authToken, {
      httpOnly: true,
      secure: true,
      expires: dayjs().subtract(5, 'minute').toDate(),
      sameSite: 'none',
    });

    console.error('Authentication error:', error);
    next(error);
  }
};