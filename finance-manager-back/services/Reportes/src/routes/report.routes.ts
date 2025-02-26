import { Router } from 'express';
import { createReport } from '../controllers/report.controller';

const router = Router();

router.post('/generar', createReport);

export default router;

