import mongoose from 'mongoose';
import Lead from '../models/lead.model';
import { ILead } from '../types';
import AppError from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import APIFeatures from '../utils/apiFeatures';

export const doCreateLead = async (createRequest: ILead) => {
    const lead: ILead = new Lead(createRequest);
    await lead.save();

    return lead;
};

export const searchLeads = async (searchParameters: any) => {
    const queryBuilder = new APIFeatures(Lead.find(), searchParameters)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();

const countQuery = new APIFeatures(Lead.countDocuments(), searchParameters)

const totalCount = await countQuery.query

    const content = await queryBuilder.query;


    const pageData = {paged:false, sort: false, totalItems:totalCount }

    return { content, pageData };
};

export const getLeadById = async (id: mongoose.Types.ObjectId | string) => {
    const getLead = await Lead.findById(id)
    if (!getLead) {
        throw new AppError('lead id not found', StatusCodes.BAD_REQUEST)
    }

    return getLead;
}

export const doUpdateLead = async (id: string | mongoose.Types.ObjectId, data: ILead) => {
    const updatedLead = await Lead.findByIdAndUpdate(id, data, { new: true });

    if (!updatedLead) {
        throw new AppError('Lead not found', StatusCodes.BAD_REQUEST);
    }
    return updatedLead;
};

export const doDeleteLead = async (id: string | mongoose.Types.ObjectId) => {
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
        throw new AppError('Lead not found', StatusCodes.BAD_REQUEST);
    }
    return deletedLead;
};
