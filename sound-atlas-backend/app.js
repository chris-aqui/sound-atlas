import express from 'express';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler.js';
import artistRoutes from './routes/artist.routes.js';

const app = express();

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/sound-atlas-frontend/dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'sound-atlas-frontend', 'dist', 'index.html'));
	});
}

app.use(express.json());

// Routes
app.use('/api', artistRoutes);

// Error handling
app.use(errorHandler);

export default app;
