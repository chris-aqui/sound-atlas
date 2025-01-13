import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';
import app from './app.js';

dotenv.config();
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/sound-atlas-frontend/dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'sound-atlas-frontend', 'dist', 'index.html'));
	});
}
const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
	} catch (error) {
		console.error('Failed to start server:', error.message);
		process.exit(1);
	}
};

startServer();
