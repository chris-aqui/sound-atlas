import Favorite from '../models/Favorites.model.js';
import Joi from 'joi';

const querySchema = Joi.object({
	userId: Joi.string().required(),
	page: Joi.number().min(1).default(1),
	limit: Joi.number().min(1).max(100).default(10),
});

export const saveFavorite = async (req, res, next) => {
	// console.log('saveFavorite');
	try {
		const { userId, favoriteAlbum } = req.body;

		if (!userId || !favoriteAlbum) {
			return res.status(400).json({ error: 'User ID and favorite album are required.' });
		}

		const existingFavorite = await Favorite.findOne({
			userId,
			'favoriteAlbum.id': favoriteAlbum.id,
		});

		if (existingFavorite) {
			return res.status(200).json({ message: 'Already in favorites.' });
		}

		const newFavorite = new Favorite({ userId, favoriteAlbum });
		await newFavorite.save();

		res.status(201).json({
			message: 'Favorite added successfully.',
			favorite: newFavorite, // Return the new favorite
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({ error: 'This album is already in your favorites.' });
		}
		next(error);
	}
};

export const checkFavoriteStatus = async (req, res, next) => {
	// console.log('checkFavoriteStatus');
	try {
		const { albumId } = req.params;
		const { userId } = req.query;

		if (!userId || !albumId) {
			return res.status(400).json({ error: 'User ID and Album ID are required.' });
		}

		const favorite = await Favorite.findOne({ userId, 'favoriteAlbum.id': albumId });
		res.status(200).json({ isFavorited: !!favorite });
	} catch (error) {
		next(error);
	}
};

// batch check favorite status for multiple album IDs
export const checkFavoriteStatusBatch = async (req, res, next) => {
	// console.log('checkFavoriteStatusBatch');
	try {
		const { userId, albumIds } = req.body;

		if (!userId || !Array.isArray(albumIds)) {
			return res.status(400).json({ error: 'User ID and an array of album IDs are required.' });
		}

		const favorites = await Favorite.find({
			userId,
			'favoriteAlbum.id': { $in: albumIds },
		});

		const favoriteStatus = albumIds.reduce((status, albumId) => {
			status[albumId] = favorites.some((fav) => fav.favoriteAlbum.id === albumId);
			return status;
		}, {});

		res.status(200).json({ favoriteStatus });
	} catch (error) {
		console.error('Failed to check favorite statuses:', error);
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

		const favorites = await Favorite.find({ userId })
			.skip((page - 1) * limit)
			.limit(limit);

		res.status(200).json(favorites);
	} catch (error) {
		next(error);
	}
};

export const removeFavorite = async (req, res, next) => {
	// console.log('removeFavorite');
	try {
		const { albumId } = req.params;
		const { userId } = req.body;

		if (!userId || !albumId) {
			return res.status(400).json({ error: 'User ID and Album ID are required.' });
		}

		await Favorite.deleteOne({ userId, 'favoriteAlbum.id': albumId });
		res.status(200).json({ message: 'Favorite removed successfully.' });
	} catch (error) {
		next(error);
	}
};
