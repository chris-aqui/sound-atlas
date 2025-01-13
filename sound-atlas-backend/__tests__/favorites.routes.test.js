import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';

const validFavoriteAlbum = {
	id: 12345,
	title: 'Test Album',
	role: 'Test Role',
	year: 2023,
	resource_url: 'https://example.com/resource',
	thumb: 'https://example.com/thumb.jpg',
};

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	await mongoose.connect(mongoServer.getUri(), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('Favorites Routes', () => {
	it('should add a favorite', async () => {
		const response = await request(app)
			.post('/api/favorites')
			.send({ userId: 'testUser', favoriteAlbum: validFavoriteAlbum });

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('message', 'Favorite added successfully.');
	});

	it('should get all favorites', async () => {
		// Add a favorite
		await request(app)
			.post('/api/favorites')
			.send({ userId: 'testUser', favoriteAlbum: validFavoriteAlbum });

		// Retrieve favorites
		const response = await request(app).get('/api/favorites/list').query({ userId: 'testUser' });
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});
});
