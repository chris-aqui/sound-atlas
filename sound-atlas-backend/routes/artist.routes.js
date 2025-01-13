import express from 'express';
import { getTopArtists, getArtistDetails } from '../controllers/artist.controller.js';

const router = express.Router();

// Artist-related routes
router.get('/top-artist', getTopArtists);
router.get('/artist/:id', getArtistDetails);

export default router;
