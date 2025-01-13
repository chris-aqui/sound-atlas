import express from 'express';
import {
	saveFavorite,
	checkFavoriteStatus,
	listFavorites,
	removeFavorite,
	checkFavoriteStatusBatch,
} from '../controllers/favorites.controller.js';
import { validate } from '../middlewares/validate.js';
import { saveFavoriteSchema, removeFavoriteSchema } from '../schemas/favorites.js';

const router = express.Router();

router.post('/favorites', validate(saveFavoriteSchema), saveFavorite);
router.get('/favorites/list', listFavorites);
router.get('/favorites/:albumId', checkFavoriteStatus); // single check
router.post('/favorites/batch-check', checkFavoriteStatusBatch); // batch id check
router.delete('/favorites/:albumId', validate(removeFavoriteSchema), removeFavorite);

export default router;
