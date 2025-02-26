import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/report.routes';

dotenv.config();

const app = express();
const PORT = process.env.REPORTS_PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/reportes', reportRoutes);

app.use('/files', express.static('files'));

app.listen(PORT, () => {
  console.log(`Microservicio de reportes corriendo en http://localhost:${PORT}`);
});
