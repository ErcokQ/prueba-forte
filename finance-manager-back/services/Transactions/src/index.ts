import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import transactionRoutes from './routes/transaction.routes';
import { eventEmitter } from './events/emitters';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Finance-manager')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use('/api/transacciones', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Microservicio de Transacciones corriendo en http://localhost:${PORT}`);
});

eventEmitter.on('transactionCreated', (transaction) => {
  console.log('Evento: transacción creada:', transaction);
});
