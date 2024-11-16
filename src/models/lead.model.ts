import mongoose from 'mongoose';
import { ILead } from '../types';


const LeadSchema = new mongoose.Schema<ILead>({
    leadName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nextFollowUpDate: { type: Date, required: true },
    nextFollowUpTime: { type: String, required: true },
    leadSource: { type: String, required: true },
    conversionDate: Date,
    leadNotes: String,
    customerType: String,
    purchaseHistory: [String],
    medicalNeeds: [String],
});

const Lead = mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
