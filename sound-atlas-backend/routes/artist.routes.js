import express from 'express';
import {
	getTopArtists,
	getArtistDetails,
	saveFavorite,
	checkFavoriteStatus,
	listFavorites,
	removeFavorite,
	checkFavoriteStatusBatch,
} from '../controllers/artist.controller.js';

const router = express.Router();

// Artist-related routes
router.get('/top-artist', getTopArtists);
router.get('/artist/:id', getArtistDetails);

// Favorites-related routes
router.post('/favorites', saveFavorite);
router.get('/favorites/list', listFavorites);
router.get('/favorites/:albumId', checkFavoriteStatus); // single check
router.post('/favorites/batch-check', checkFavoriteStatusBatch); // batch id check
router.delete('/favorites/:albumId', removeFavorite);

export default router;
