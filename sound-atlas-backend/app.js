import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import artistRoutes from './routes/artist.routes.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api', artistRoutes);

// Error handling
app.use(errorHandler);

export default app;
