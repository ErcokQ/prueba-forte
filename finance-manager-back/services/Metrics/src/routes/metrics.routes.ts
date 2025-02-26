import { Router } from 'express';
import { getDistribution, getClientSummary, getEvolution } from '../controllers/metrics.controller';

const router = Router();

router.get('/distribution', getDistribution);
router.get('/client-summary', getClientSummary);
router.get('/evolution', getEvolution);

export default router;
