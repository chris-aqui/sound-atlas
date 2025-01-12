import { fetchArtistData, searchArtists } from '../services/discogsService.js';

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
