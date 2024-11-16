import mongoose from 'mongoose';
import { IUser } from '../types';


const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  status: { type: Boolean, default: true }
});

const User = mongoose.model<IUser>('User', UserSchema);


export default User;
