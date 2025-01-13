import express from 'express';
import {
	saveFavorite,
	checkFavoriteStatus,
	listFavorites,
	removeFavorite,
	checkFavoriteStatusBatch,
} from '../controllers/favorites.controller.js';

const router = express.Router();

// Favorites-related routes
router.post('/favorites', saveFavorite);
router.get('/favorites/list', listFavorites);
router.get('/favorites/:albumId', checkFavoriteStatus); // single check
router.post('/favorites/batch-check', checkFavoriteStatusBatch); // batch id check
router.delete('/favorites/:albumId', removeFavorite);

export default router;
