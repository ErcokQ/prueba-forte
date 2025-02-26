import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import metricsRoutes from './routes/metrics.routes';

dotenv.config();

const app = express();
const PORT = process.env.METRICS_PORT || 3003;

app.use(cors());
app.use(express.json());

app.use('/api/metrics', metricsRoutes);

app.listen(PORT, () => {
  console.log(`Microservicio de Métricas corriendo en http://localhost:${PORT}`);
});
