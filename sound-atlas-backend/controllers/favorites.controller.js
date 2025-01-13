import Joi from 'joi';
import Favorite from '../models/Favorites.model.js';
import {
	saveFavoriteAlbum,
	isAlbumFavorited,
	checkBatchFavoriteStatus,
	getFavorites,
	removeFavoriteAlbum,
} from '../services/favorites.service.js';

const querySchema = Joi.object({
	userId: Joi.string().required(),
	page: Joi.number().min(1).default(1),
	limit: Joi.number().min(1).max(100).default(10),
});

export const saveFavorite = async (req, res, next) => {
	try {
		const { userId, favoriteAlbum } = req.body;

		if (!userId || !favoriteAlbum) {
			return res.status(400).json({ error: 'User ID and favorite album are required.' });
		}

		const result = await saveFavoriteAlbum(userId, favoriteAlbum);
		res.status(result.existingFavorite ? 200 : 201).json(result);
	} catch (error) {
		next(error);
	}
};

export const checkFavoriteStatus = async (req, res, next) => {
	try {
		const { albumId } = req.params;
		const { userId } = req.query;

		if (!userId || !albumId) {
			return res.status(400).json({ error: 'User ID and Album ID are required.' });
		}

		const isFavorited = await isAlbumFavorited(userId, albumId);
		res.status(200).json({ isFavorited });
	} catch (error) {
		next(error);
	}
};

export const checkFavoriteStatusBatch = async (req, res, next) => {
	try {
		const { userId, albumIds } = req.body;

		if (!userId || !Array.isArray(albumIds)) {
			return res.status(400).json({ error: 'User ID and an array of album IDs are required.' });
		}

		const favoriteStatus = await checkBatchFavoriteStatus(userId, albumIds);
		res.status(200).json({ favoriteStatus });
	} catch (error) {
		next(error);
	}
};

export const listFavorites = async (req, res, next) => {
	try {
		const { error, value } = querySchema.validate(req.query);
		if (error) {
			return res.status(400).json({ error: error.details.map((d) => d.message).join(', ') });
		}

		const { userId, page, limit } = value;

		if (!userId) {
			return res.status(400).json({ error: 'User ID is required.' });
		}

		const favorites = await getFavorites(userId, parseInt(page), parseInt(limit));
		res.status(200).json(favorites);
	} catch (error) {
		next(error);
	}
};

export const removeFavorite = async (req, res, next) => {
	try {
		const { albumId } = req.params;
		const { userId } = req.body;

		if (!userId || !albumId) {
			return res.status(400).json({ error: 'User ID and Album ID are required.' });
		}

		const result = await removeFavoriteAlbum(userId, albumId);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
