import { fetchArtistData, searchArtists } from '../services/discogs.service.js';
import Favorite from '../models/Favorites.model.js';

export const getTopArtists = async (req, res, next) => {
	try {
		const { country, year, genre, ...params } = req.query;
		if (!country) return res.status(400).json({ error: 'Country parameter is required' });

		const data = await searchArtists({ country, year, genre, ...params });
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

export const getArtistDetails = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) return res.status(400).json({ error: 'Artist ID is required' });

		const artistData = await fetchArtistData(id);
		res.status(200).json(artistData);
	} catch (error) {
		next(error);
	}
};

export const saveFavorite = async (req, res, next) => {
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
		const { userId } = req.query;
		const { page = 1, limit = 10 } = req.query;

		if (!userId) {
			return res.status(400).json({ error: 'User ID is required.' });
		}

		const favorites = await Favorite.find({ userId })
			.skip((page - 1) * limit)
			.limit(parseInt(limit));

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

		await Favorite.deleteOne({ userId, 'favoriteAlbum.id': albumId });
		res.status(200).json({ message: 'Favorite removed successfully.' });
	} catch (error) {
		next(error);
	}
};
