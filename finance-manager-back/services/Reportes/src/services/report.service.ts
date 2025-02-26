// src/services/report.service.ts
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

interface ReportParams {
  fechaDesde: string;
  fechaHasta: string;
  cliente?: string;
  categoria?: string;
}

export const generateReport = async (params: ReportParams) => {

  const transactionsServiceUrl = process.env.TRANSACTIONS_SERVICE_URL || 'http://localhost:3000/api/transacciones';
  
  const response = await axios.get(transactionsServiceUrl);
  const transactionsData = response.data;

  const filteredData = transactionsData.filter((item: any) => {
    const date = new Date(item.fecha);
    const desde = new Date(params.fechaDesde);
    const hasta = new Date(params.fechaHasta);
    let isValid = date >= desde && date <= hasta;
    if (params.cliente) {
      isValid = isValid && item.clienteId === params.cliente;
    }
    if (params.categoria) {
      isValid = isValid && item.categoria === params.categoria;
    }
    return isValid;
  });

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

  const fileName = `reporte_${Date.now()}.xlsx`;

  const filePath = path.join(__dirname, '../../files', fileName);

  XLSX.writeFile(workbook, filePath);

  return fileName;
};

