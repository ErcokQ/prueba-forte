// src/controllers/metrics.controller.ts
import { Request, Response } from 'express';
import axios from 'axios';

const transactionsServiceUrl =
  process.env.TRANSACTIONS_SERVICE_URL || 'http://localhost:3000/api/transacciones';

export async function getDistribution(req: Request, res: Response): Promise<void> {
  try {

    const response = await axios.get(transactionsServiceUrl);
    const transactions = response.data; 
    
    const distribution = transactions.reduce((acc: any, tx: any) => {
      const category = tx.categoria;
      if (!acc[category]) {
        acc[category] = { income: 0, expense: 0 };
      }
     
      if (tx.tipo === 'income') {
        acc[category].income += tx.cantidad;
      } else {
        acc[category].expense += tx.cantidad;
      }
      return acc;
    }, {});

    res.json(distribution);
  } catch (error) {
    console.error('Error en getDistribution:', error);
    res.status(500).json({ error: 'Error al obtener distribución' });
  }
}

export async function getClientSummary(req: Request, res: Response): Promise<void> {
  try {
    const response = await axios.get(transactionsServiceUrl);
    const transactions = response.data;
    
    const summary = transactions.reduce((acc: any, tx: any) => {
      const client = tx.clienteId;
      if (!acc[client]) {
        acc[client] = { count: 0, total: 0 };
      }
      acc[client].count += 1;
      if (tx.tipo === 'income') {
        acc[client].total += tx.cantidad;
      } else {
        acc[client].total += tx.cantidad;
      }
      return acc;
    }, {});

    res.json(summary);
  } catch (error) {
    console.error('Error en getClientSummary:', error);
    res.status(500).json({ error: 'Error al obtener resumen por cliente' });
  }
}

export async function getEvolution(req: Request, res: Response): Promise<void> {
  try {
    const response = await axios.get(transactionsServiceUrl);
    const transactions = response.data;

    const evolution = transactions.reduce((acc: any, tx: any) => {
      const date = new Date(tx.fecha);
      const month = date.toISOString().slice(0, 7); 
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      if (tx.tipo === 'income') {
        acc[month].income += tx.cantidad;
      } else {
        acc[month].expense += tx.cantidad;
      }
      return acc;
    }, {});

    res.json(evolution);
  } catch (error) {
    console.error('Error en getEvolution:', error);
    res.status(500).json({ error: 'Error al obtener evolución' });
  }
}