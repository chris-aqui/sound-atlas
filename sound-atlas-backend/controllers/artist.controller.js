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

		if (!userId) {
			return res.status(400).json({ error: 'User ID  are required.' });
		}

		const existingFavorite = await Favorite.findOne({ userId, favoriteAlbum });

		if (existingFavorite) {
			return res.status(200).json({ message: 'Already in favorites.' });
		}

		const newFavorite = new Favorite({ userId, favoriteAlbum });
		await newFavorite.save();

		res.status(201).json({ message: 'Favorite added successfully.' });
	} catch (error) {
		next(error);
	}
};
