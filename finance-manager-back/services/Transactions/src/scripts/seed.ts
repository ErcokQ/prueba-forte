// src/scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from '../models/transaction.model';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Finance-manager';

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const categories = ['Alimentación', 'Transporte', 'Servicios', 'Entretenimiento', 'Salud', 'Educación'];

const numRecords = process.argv[2] ? parseInt(process.argv[2]) : 30;

const sampleTransactions: Array<object> = [];

for (let i = 0; i < numRecords; i++) {
  // Se escoge de forma aleatoria si es ingreso o gasto
  const tipo = Math.random() < 0.5 ? 'income' : 'expense';
  
  sampleTransactions.push({
    clienteId: 'C' + randomNumber(1, 100), 
    cantidad: randomNumber(100, 100000),   
    categoria: categories[randomNumber(0, categories.length - 1)],
    fecha: randomDate(new Date(2022, 0, 1), new Date()),
    tipo: tipo,
    estado: 'activa'
  });
}

async function seedDatabase() {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/Finance-manager')
      .then(() => console.log('Conectado a MongoDB'))
      .catch(err => console.error('Error al conectar a MongoDB:', err));

    await Transaction.deleteMany({});
    console.log('Transacciones existentes eliminadas');

    const result = await Transaction.insertMany(sampleTransactions);
    console.log(`Se han insertado ${result.length} transacciones`);

    await mongoose.disconnect();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    await mongoose.disconnect();
  }
}

seedDatabase();
