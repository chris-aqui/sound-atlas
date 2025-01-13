// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import {
// 	saveFavorite,
// 	checkFavoriteStatus,
// 	checkFavoriteStatusBatch,
// 	listFavorites,
// 	removeFavorite,
// } from '../controllers/favorites.controller.js';
// import Favorite from '../models/Favorites.model.js';

// // Mock the Favorite model
// vi.mock('../models/Favorites.model.js', () => ({
// 	default: class {
// 		static findOne = vi.fn();
// 		static find = vi.fn().mockResolvedValue([]);
// 		static deleteOne = vi.fn();
// 		save = vi.fn().mockResolvedValue({
// 			userId: 'testUser',
// 			favoriteAlbum: {
// 				id: 12345,
// 				title: 'Test Album',
// 				role: 'Test Role',
// 				year: 2023,
// 				resource_url: 'https://example.com/resource',
// 				thumb: 'https://example.com/thumb.jpg',
// 			},
// 			_id: '6784dd23066515b24e0107ce',
// 			createdAt: '2025-01-13T09:30:11.417Z',
// 			updatedAt: '2025-01-13T09:30:11.417Z',
// 			__v: 0,
// 		});
// 	},
// }));

// // Mock response helper
// const mockResponse = () => {
// 	const res = {};
// 	res.status = vi.fn().mockReturnThis();
// 	res.json = vi.fn();
// 	return res;
// };

// describe('Favorites Controller', () => {
// 	beforeEach(() => {
// 		vi.clearAllMocks();
// 	});

// 	it('should save a favorite successfully', async () => {
// 		const req = {
// 			body: {
// 				userId: 'testUser',
// 				favoriteAlbum: {
// 					id: 12345,
// 					title: 'Test Album',
// 					role: 'Test Role',
// 					year: 2023,
// 					resource_url: 'https://example.com/resource',
// 					thumb: 'https://example.com/thumb.jpg',
// 				},
// 			},
// 		};
// 		const res = mockResponse();

// 		// Mock `findOne` to simulate no existing favorite
// 		Favorite.findOne.mockResolvedValue(null);

// 		// Call the controller
// 		await saveFavorite(req, res);

// 		// Assertions
// 		expect(Favorite.findOne).toHaveBeenCalledWith({
// 			userId: 'testUser',
// 			'favoriteAlbum.id': 12345,
// 		});
// 		expect(res.status).toHaveBeenCalledWith(201);
// 	});

// 	it('should check favorite status successfully', async () => {
// 		const req = {
// 			params: { albumId: 12345 },
// 			query: { userId: 'testUser' },
// 		};
// 		const res = mockResponse();

// 		Favorite.findOne.mockResolvedValue({
// 			userId: 'testUser',
// 			favoriteAlbum: { id: 12345 },
// 		});

// 		await checkFavoriteStatus(req, res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({ isFavorited: true });
// 	});

// 	it('should check batch favorite status successfully', async () => {
// 		const req = {
// 			body: {
// 				userId: 'testUser',
// 				albumIds: [12345, 67890],
// 			},
// 		};
// 		const res = mockResponse();

// 		Favorite.find.mockResolvedValue([{ userId: 'testUser', favoriteAlbum: { id: 12345 } }]);

// 		await checkFavoriteStatusBatch(req, res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			favoriteStatus: {
// 				12345: true,
// 				67890: false,
// 			},
// 		});
// 	});

// 	it('should list favorites successfully', async () => {
// 		const req = {
// 			query: {
// 				userId: 'testUser',
// 			},
// 		};
// 		const res = mockResponse();
// 		const next = vi.fn();

// 		Favorite.find.mockResolvedValue([{ userId: 'testUser', favoriteAlbum: { id: 12345 } }]);

// 		await listFavorites(req, res, next);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith([{ userId: 'testUser', favoriteAlbum: { id: 12345 } }]);
// 		expect(next).not.toHaveBeenCalled();
// 	});

// 	it('should remove a favorite successfully', async () => {
// 		const req = {
// 			params: { albumId: 12345 },
// 			body: { userId: 'testUser' },
// 		};
// 		const res = mockResponse();

// 		Favorite.deleteOne.mockResolvedValue({ deletedCount: 1 });

// 		await removeFavorite(req, res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({ message: 'Favorite removed successfully.' });
// 	});
// });

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	saveFavorite,
	checkFavoriteStatus,
	checkFavoriteStatusBatch,
	listFavorites,
	removeFavorite,
} from '../controllers/favorites.controller.js';
import * as favoriteService from '../services/favorites.service.js';

// Mock the service layer
vi.mock('../services/favorites.service.js');

const mockResponse = () => {
	const res = {};
	res.status = vi.fn().mockReturnThis();
	res.json = vi.fn();
	return res;
};

describe('Favorites Controller', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should save a favorite successfully', async () => {
		const req = {
			body: {
				userId: 'testUser',
				favoriteAlbum: {
					id: 12345,
					title: 'Test Album',
					role: 'Test Role',
					year: 2023,
					resource_url: 'https://example.com/resource',
					thumb: 'https://example.com/thumb.jpg',
				},
			},
		};
		const res = mockResponse();

		favoriteService.saveFavoriteAlbum.mockResolvedValue({
			message: 'Favorite added successfully.',
		});

		await saveFavorite(req, res);

		expect(favoriteService.saveFavoriteAlbum).toHaveBeenCalledWith(
			'testUser',
			req.body.favoriteAlbum,
		);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ message: 'Favorite added successfully.' });
	});

	it('should check favorite status successfully', async () => {
		const req = {
			params: { albumId: '12345' },
			query: { userId: 'testUser' },
		};
		const res = mockResponse();

		favoriteService.isAlbumFavorited.mockResolvedValue(true);

		await checkFavoriteStatus(req, res);

		expect(favoriteService.isAlbumFavorited).toHaveBeenCalledWith('testUser', '12345');
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ isFavorited: true });
	});

	it('should check batch favorite status successfully', async () => {
		const req = {
			body: {
				userId: 'testUser',
				albumIds: [12345, 67890],
			},
		};
		const res = mockResponse();

		favoriteService.checkBatchFavoriteStatus.mockResolvedValue({
			12345: true,
			67890: false,
		});

		await checkFavoriteStatusBatch(req, res);

		expect(favoriteService.checkBatchFavoriteStatus).toHaveBeenCalledWith(
			'testUser',
			[12345, 67890],
		);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			favoriteStatus: {
				12345: true,
				67890: false,
			},
		});
	});

	it('should list favorites successfully', async () => {
		const req = {
			query: { userId: 'testUser', page: 1, limit: 10 },
		};
		const res = mockResponse();

		const mockFavorites = [{ userId: 'testUser', favoriteAlbum: { id: 12345 } }];
		favoriteService.getFavorites.mockResolvedValue(mockFavorites);

		await listFavorites(req, res);

		expect(favoriteService.getFavorites).toHaveBeenCalledWith('testUser', 1, 10);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(mockFavorites);
	});

	it('should remove a favorite successfully', async () => {
		const req = {
			params: { albumId: 12345 },
			body: { userId: 'testUser' },
		};
		const res = mockResponse();

		favoriteService.removeFavoriteAlbum.mockResolvedValue({
			message: 'Favorite removed successfully.',
		});

		await removeFavorite(req, res);

		expect(favoriteService.removeFavoriteAlbum).toHaveBeenCalledWith('testUser', 12345);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: 'Favorite removed successfully.' });
	});
});
