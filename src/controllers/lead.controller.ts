import { NextFunction, Request, Response } from 'express';
import Lead from '../models/lead.model';
import { ILead } from '../types';
import { StatusCodes } from 'http-status-codes';
import { doCreateLead, doDeleteLead, doUpdateLead, getLeadById, searchLeads } from '../services/lead.service';

export const createLead = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const leadData: ILead = { ...req.body };
        const lead = await doCreateLead(leadData);
        return res.status(StatusCodes.CREATED).json({
            message: 'success',
            lead,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllLeads = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const searchParameters = { ...req.query };

        const pagedContent = await searchLeads(searchParameters);

        return res.status(StatusCodes.OK).json({
            status: 'success',
            success: true,
            authenticated: req.isAuthenticated,
            ...pagedContent,
        });
    } catch (err) {
        next(err);
    }
};

export const getLead = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
       const lead = await getLeadById(id);

        return res.status(StatusCodes.OK).json({ message: 'Lead deleted successfully',lead });
    } catch (error) {
        next(error);
    }
};

export const updateLead = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        const updatedLead = await doUpdateLead(id, req.body);

        return res.status(StatusCodes.OK).json({
            message: 'leads updated successfully',
            updatedLead,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a lead
export const deleteLead = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        await doDeleteLead(id);

        return res.status(StatusCodes.OK).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        next(error);
    }
};
