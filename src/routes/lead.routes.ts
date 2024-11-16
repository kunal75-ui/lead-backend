import { Router } from 'express';
import { createLead, deleteLead, getAllLeads, getLead, updateLead } from '../controllers/lead.controller';
import { authorize } from '../middlewares/auth';

const router = Router();

router.route('/').get(getAllLeads).post(createLead);
router
    .route('/:id')
    .get(getLead)
    .put( updateLead)
    .delete(authorize(['admin']), deleteLead);

export default router;
