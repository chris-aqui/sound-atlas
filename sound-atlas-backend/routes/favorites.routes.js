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

// Favorites-related routes
/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add an album to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       201:
 *         description: Favorite added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorite added successfully."
 *                 favorite:
 *                   $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID and favorite album are required."
 */
router.post('/favorites', validate(saveFavoriteSchema), saveFavorite);

/**
 * @swagger
 * /favorites/list:
 *   get:
 *     summary: List all favorites for a user
 *     tags: [Favorites]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of favorite albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID is required."
 */
router.get('/favorites/list', listFavorites);

router.get('/favorites/:albumId', checkFavoriteStatus); // single check
router.post('/favorites/batch-check', checkFavoriteStatusBatch); // batch id check
router.delete('/favorites/:albumId', validate(removeFavoriteSchema), removeFavorite);

export default router;
