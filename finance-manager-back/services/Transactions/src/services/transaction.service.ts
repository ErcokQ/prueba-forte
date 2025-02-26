import Transaction, { ITransaction } from '../models/transaction.model'; 
import { eventEmitter } from '../events/emitters';

export const createTransaction = async (data: ITransaction): Promise<ITransaction> => {
  const transaction = await Transaction.create(data);
  eventEmitter.emit('transactionCreated', transaction);
  return transaction;
};

export const getTransactions = async (): Promise<ITransaction[]> => {
  return await Transaction.find();
};

export const getTransactionById = async (id: string): Promise<ITransaction | null> => {
  return await Transaction.findById(id);
};

export const updateTransaction = async (id: string, data: Partial<ITransaction>): Promise<ITransaction | null> => {
  const transaction = await Transaction.findByIdAndUpdate(id, data, { new: true });
  eventEmitter.emit('transactionUpdated', transaction);
  return transaction;
};

export const deactivateTransaction = async (id: string): Promise<ITransaction | null> => {
  const transaction = await Transaction.findByIdAndUpdate(id, { estado: 'desactivada' }, { new: true });
  eventEmitter.emit('transactionDeactivated', transaction);
  return transaction;
};