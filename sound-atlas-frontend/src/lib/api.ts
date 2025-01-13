import axios from 'axios';
import { ArtistData } from '@/types/types';
import { Favorite } from '@/types/types';
import { toast } from '@/hooks/use-toast';


export const fetchArtistData = async (id: string): Promise<ArtistData> => {
  try {
    const response = await axios.get<ArtistData>(`/api/artist/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artist data:', error);
    throw new Error('Failed to fetch artist data');
  }
};

export const addToFavorites = async (
  userId: string,
  favoriteAlbum: Favorite['favoriteAlbum']
) => {
  try {
    const response = await axios.post('/api/favorites', { userId, favoriteAlbum });
    toast({
      description: 'Added to favorites!',
    });
    return response.data;
  } catch (error) {
    toast({
      variant: 'destructive',
      description: 'Failed to add to favorites.',
    });
    console.error('Add to favorites error:', error);
    throw error;
  }
};

export const removeFromFavorites = async (userId: string, albumId: number) => {
  try {
    const response = await axios.delete(`/api/favorites/${albumId}`, {
      data: { userId },
    });
    toast({
      description: 'Removed from favorites!',
    });
    return response.data;
  } catch (error) {
    toast({
      variant: 'destructive',
      description: 'Failed to remove from favorites.',
    });
    console.error('Remove from favorites error:', error);
    throw error;
  }
};