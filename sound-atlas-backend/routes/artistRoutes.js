import express from 'express';
import { getTopArtists, getArtistDetails } from '../controllers/artistController.js';

const router = express.Router();

router.get('/top-artist', getTopArtists);
router.get('/artist/:id', getArtistDetails);

export default router;
