import express from 'express';
import { getTopArtists, getArtistDetails } from '../controllers/artist.controller.js';

const router = express.Router();

// Artist-related routes

/**
 * @swagger
 * /top-artist:
 *   get:
 *     summary: Get top artists
 *     tags: [Artists]
 *     parameters:
 *       - in: query
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Country of the artist
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: Release year of the artist
 *     responses:
 *       200:
 *         description: List of top artists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiTopArtistResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Country parameter is required."
 */
router.get('/top-artist', getTopArtists);
router.get('/artist/:id', getArtistDetails);

export default router;
