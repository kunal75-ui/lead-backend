import bcrypt from 'bcrypt';
import { IUser } from '../types';
import User from '../models/user.model';
import { signToken } from '../utils/jwt.utils';
import AppError from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const doSignup = async (signupRequest: IUser) => {
    const { name, email, password, role } = signupRequest;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        status: true,
    });

  const newData =  await newUser.save();
    const authToken =  signToken(newData)
    return {authToken , newData}
};

export type ILogin = {
    email: string;
    password: string;
};
export const doLogin = async (loginRequest: ILogin) => {
    const { email, password } = loginRequest;
    // Find the user by email
    const user = await User.findOne({ email: email });
    // console.log({ user });

    if (!user) {
        throw new AppError('user not found', StatusCodes.BAD_REQUEST);
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid Credentials', StatusCodes.BAD_REQUEST);
    }

    const authToken = signToken(user);
    return { authToken, user };
};
