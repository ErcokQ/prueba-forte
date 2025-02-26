import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  clienteId: string;
  cantidad: number;
  categoria: string;
  fecha: Date;
  tipo: 'income' | 'expense';
  estado: 'activa' | 'desactivada';
}

const TransactionSchema: Schema = new Schema({
  clienteId: { type: String, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String, required: true },
  fecha: { type: Date, required: true },
  tipo: { type: String, enum: ['income', 'expense'], required: true },
  estado: { type: String, enum: ['activa', 'desactivada'], default: 'activa' }
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);