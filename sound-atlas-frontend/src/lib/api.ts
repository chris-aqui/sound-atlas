import { ArtistData } from '@/types/types';
import axios from 'axios';

// Fetches artist data from the backend
// param id: The artist ID
// Returns a promise that resolves to the artist data
// Throws an error if the request fails
export const fetchArtistData = async (id: string): Promise<ArtistData> => {
  try {
    const response = await axios.get<ArtistData>(`/api/artist/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artist data:', error);
    throw new Error('Failed to fetch artist data');
  }
};