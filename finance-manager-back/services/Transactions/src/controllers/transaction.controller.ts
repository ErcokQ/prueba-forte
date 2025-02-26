import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';

export const createTransaction = async (req: Request, res: Response):  Promise<void> => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
};

export const getTransactions = async (_req: Request, res: Response):  Promise<void> => {
  try {
    const transactions = await transactionService.getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

export const getTransactionById = async (req: Request, res: Response):  Promise<void> => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);
    if (!transaction) res.status(404).json({ error: 'Transacción no encontrada' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la transacción' });
  }
};

export const updateTransaction = async (req: Request, res: Response):  Promise<void> => {
  try {
    const transaction = await transactionService.updateTransaction(req.params.id, req.body);
    if (!transaction) res.status(404).json({ error: 'Transacción no encontrada' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la transacción' });
  }
};

export const deactivateTransaction = async (req: Request, res: Response):  Promise<void> => {
  try {
    const transaction = await transactionService.deactivateTransaction(req.params.id);
    if (!transaction) res.status(404).json({ error: 'Transacción no encontrada' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar la transacción' });
  }
};
