import Joi from 'joi';
import { fetchArtistData, searchArtists } from '../services/discogs.service.js';

const artistQuerySchema = Joi.object({
	country: Joi.string().required(),
	year: Joi.number().min(1900).max(new Date().getFullYear()).optional(),
	genre: Joi.string().optional(),
	page: Joi.number().min(1).default(1),
	per_page: Joi.number().min(1).max(100).default(25),
});

export const getTopArtists = async (req, res, next) => {
	try {
		const { error, value } = artistQuerySchema.validate(req.query);
		if (error) {
			return res.status(400).json({ error: error.details.map((d) => d.message).join(', ') });
		}

		const data = await searchArtists(value);
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
