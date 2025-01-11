import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
// Discogs API Config
const DISCOGS_API_BASE_URL = 'https://api.discogs.com';
const DISCOGS_USER_AGENT = 'SoundAtlasApp/1.0 +http://localhost:5173';
const DISCOGS_USER_TOKEN = process.env.DISCOGS_USER_TOKEN;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Proxy route for fetching top artists
app.get('/api/top-artist', async (req, res) => {
	// //top-artist?country=canada&year=2024&per_page=10&sort=hot&type=release
	const { country, year, genre, ...otherParams } = req.query;

	if (!country) {
		return res.status(400).json({ error: 'Country parameter is required' });
	}

	try {
		const params = {
			country,
			per_page: 10,
			type: 'release',
			sort: 'hot',
			...(year && { year }),
			...(genre && { genre }),
			...otherParams, // Todo: Add more query params
		};

		const response = await axios.get(`${DISCOGS_API_BASE_URL}/database/search`, {
			params,
			headers: {
				Authorization: `Discogs token=${DISCOGS_USER_TOKEN}`,
				'User-Agent': DISCOGS_USER_AGENT,
			},
		});

		res.json(response.data);
	} catch (error) {
		console.error('Error fetching top artists:', error.message);
		res.status(500).json({ error: 'Failed to fetch data from Discogs API' });
	}
});

app.listen(PORT, () => {
	connectDB(); // connect to MongoDB
	console.log(`Server started at http://localhost:${PORT} 🚀`);
});
