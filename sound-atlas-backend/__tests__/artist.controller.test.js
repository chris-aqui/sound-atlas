import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTopArtists, getArtistDetails } from '../controllers/artist.controller.js';
import { searchArtists, fetchArtistData } from '../services/discogs.service.js';

vi.mock('../services/discogs.service.js', () => ({
	searchArtists: vi.fn(),
	fetchArtistData: vi.fn(),
}));

const mockResponse = () => {
	const res = {};
	res.status = vi.fn().mockReturnThis();
	res.json = vi.fn();
	return res;
};

const mockNext = () => vi.fn();

describe('Artist Controller', () => {
	beforeEach(() => {
		vi.clearAllMocks(); // Clear all mock calls before each test
	});

	describe('getTopArtists', () => {
		it('should return 400 if "country" is missing in the query', async () => {
			const req = { query: { year: 2023, genre: 'rock' } };
			const res = mockResponse();
			const next = mockNext();

			await getTopArtists(req, res, next);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					error: expect.stringContaining('country'),
				}),
			);
		});

		it('should return artist data when valid query is provided', async () => {
			const req = { query: { country: 'USA', year: 2023, genre: 'rock' } };
			const res = mockResponse();
			const next = mockNext();

			const mockData = { results: [{ name: 'Artist 1' }, { name: 'Artist 2' }] };
			searchArtists.mockResolvedValue(mockData);

			await getTopArtists(req, res, next);

			expect(searchArtists).toHaveBeenCalledWith({
				country: 'USA',
				year: 2023,
				genre: 'rock',
				page: 1,
				per_page: 25,
			});
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockData);
		});

		it('should call next with an error if searchArtists throws', async () => {
			const req = { query: { country: 'USA' } };
			const res = mockResponse();
			const next = mockNext();

			const mockError = new Error('API Error');
			searchArtists.mockRejectedValue(mockError);

			await getTopArtists(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});

	describe('getArtistDetails', () => {
		it('should return 400 if "id" is missing in the params', async () => {
			const req = { params: {} };
			const res = mockResponse();
			const next = mockNext();

			await getArtistDetails(req, res, next);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: 'Artist ID is required' });
		});

		it('should return artist details when valid ID is provided', async () => {
			const req = { params: { id: '12345' } };
			const res = mockResponse();
			const next = mockNext();

			const mockData = { artistDetails: { name: 'Artist 1' }, releases: [{ title: 'Release 1' }] };
			fetchArtistData.mockResolvedValue(mockData);

			await getArtistDetails(req, res, next);

			expect(fetchArtistData).toHaveBeenCalledWith('12345');
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockData);
		});

		it('should call next with an error if fetchArtistData throws', async () => {
			const req = { params: { id: '12345' } };
			const res = mockResponse();
			const next = mockNext();

			const mockError = new Error('API Error');
			fetchArtistData.mockRejectedValue(mockError);

			await getArtistDetails(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});
});
