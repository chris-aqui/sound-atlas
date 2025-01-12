import express from 'express';
import { getTopArtists, getArtistDetails, saveFavorite } from '../controllers/artist.controller.js';

const router = express.Router();

router.get('/top-artist', getTopArtists);
router.get('/artist/:id', getArtistDetails);
router.post('/favorites', saveFavorite);

export default router;
