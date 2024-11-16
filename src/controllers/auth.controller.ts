import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import dotenv from 'dotenv';
import { doLogin, doSignup } from '../services/auth.service';
import { IUser } from '../types';
import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import AppError from '../utils/AppError';

// Signup function
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {authToken, newData} =  await doSignup(req.body);
    res.cookie('auth', authToken)
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('error while signup');
    next(err);
  }
};

// Login function
export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { authToken, user } = await doLogin(req.body)

    const cookieOption: CookieOptions = {
      secure: true,
      sameSite: 'strict',
    };


    res.cookie('auth', authToken)
    return res.status(200).json({
      message: 'Login successful',
      // authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('error while login');

    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const authToken = req.cookies.auth;

    if (!authToken) throw new AppError('User already Signed out', StatusCodes.BAD_REQUEST);

    const cookieExpirationDate = dayjs().subtract(5, 'minute').toDate();
    res.cookie('auth', authToken, {
        secure: true,
        expires: cookieExpirationDate,
        sameSite: 'strict',
    });
    return res.status(StatusCodes.OK).json({
        success: true,
        status: true,
        authenticated: false,
        message: 'Log out Successfully',
    });
} catch (error) {
    console.error(error);
    next(error);
}
}