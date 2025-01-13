import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import artistRouter from '../routes/artist.routes.js';
import { getTopArtists, getArtistDetails } from '../controllers/artist.controller.js';

// Mock controller functions
vi.mock('../controllers/artist.controller.js', () => ({
	getTopArtists: vi.fn(),
	getArtistDetails: vi.fn(),
}));

// Initialize the Express app with the router
const app = express();
app.use(express.json());
app.use('/api/artists', artistRouter);

describe('Artist Routes', () => {
	beforeAll(() => {
		vi.clearAllMocks(); // Clear any previous mocks
	});

	afterAll(() => {
		vi.restoreAllMocks(); // Restore all original implementations
	});

	it('should call getTopArtists on GET /api/artists/top-artist', async () => {
		getTopArtists.mockImplementation((req, res) =>
			res.status(200).json({ message: 'Top artists fetched' }),
		);

		const response = await request(app).get('/api/artists/top-artist').query({ country: 'USA' });

		expect(getTopArtists).toHaveBeenCalledOnce();
		expect(getTopArtists).toHaveBeenCalledWith(
			expect.any(Object),
			expect.any(Object),
			expect.any(Function),
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: 'Top artists fetched' });
	});

	it('should call getArtistDetails on GET /api/artists/artist/:id', async () => {
		getArtistDetails.mockImplementation((req, res) =>
			res.status(200).json({ message: `Artist details for ID ${req.params.id}` }),
		);

		const response = await request(app).get('/api/artists/artist/12345');

		expect(getArtistDetails).toHaveBeenCalledOnce();
		expect(getArtistDetails).toHaveBeenCalledWith(
			expect.any(Object),
			expect.any(Object),
			expect.any(Function),
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: 'Artist details for ID 12345' });
	});

	it('should return 404 for an undefined route', async () => {
		const response = await request(app).get('/api/artists/unknown-route');
		expect(response.status).toBe(404);
	});
});
