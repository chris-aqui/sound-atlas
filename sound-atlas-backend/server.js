import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import app from './app.js';
import fs from 'fs';
import { setupSwagger } from './swagger.js';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = JSON.parse(
	fs.readFileSync('./sound-atlas-backend/swagger-output.json', 'utf-8'),
);

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();
		app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
	} catch (error) {
		console.error('Failed to start server:', error.message);
		process.exit(1);
	}
};

startServer();
