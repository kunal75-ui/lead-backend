import mongoose, {Document} from 'mongoose';

export interface BaseDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaseResponse {
  success: boolean;
  message?: string;
  status: true;
  authenticated?: boolean;
}
// Users Schema
export interface IUser extends BaseDocument {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: boolean;
  }

//Leads Schema
export interface ILead extends Document {
    leadName: string;
    contactNumber: string;
    email: string;
    address: string;
    status: string;
    assignedTo: mongoose.Types.ObjectId;
    nextFollowUpDate: Date;
    nextFollowUpTime: string;
    leadSource: string;
    conversionDate?: Date;
    leadNotes?: string;
    customerType?: string;
    purchaseHistory?: string[];
    medicalNeeds?: string[];
}