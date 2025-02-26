import { Request, Response } from 'express';
import { generateReport } from '../services/report.service';

export const createReport = async (req: Request, res: Response):Promise<void> => {
  try {
    const { fechaDesde, fechaHasta, cliente, categoria } = req.body;
    const fileName = await generateReport({ fechaDesde, fechaHasta, cliente, categoria });

    const downloadURL = `${req.protocol}://${req.get('host')}/files/${fileName}`;
    
    res.status(201).json({
      message: 'Reporte generado exitosamente',
      downloadURL
    });
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};
