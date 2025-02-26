import { Router } from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deactivateTransaction
} from '../controllers/transaction.controller';

const router = Router();

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.patch('/:id/deactivate', deactivateTransaction);

export default router;
