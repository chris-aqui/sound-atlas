import { useFavoritesStore } from '@/store/useFavoritesStore';
import axios from 'axios';
import { Favorite } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';

export const useFavoritesApi = () => {
  const { setFavorites, addFavorite, removeFavorite } = useFavoritesStore();
  const { toast } = useToast();

  const fetchFavorites = useCallback(async (userId: string) => {
    try {
      const response = await axios.get('/api/favorites/list', {
        params: { userId },
      });
      setFavorites(response.data);
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to load favorites.',
      });
      console.error('Error fetching favorites:', error);
    }
  }, [setFavorites, toast]);

  const addToFavorites = async (
    userId: string,
    favoriteAlbum: Favorite['favoriteAlbum']
) => {
  //  if the user is not logged in, send a toast message amd return
  if (!userId) {
    toast({
      variant: 'destructive',
      description: 'You must be logged in to add to favorites.',
    });
    return;
  }

    try {
        const response = await axios.post('/api/favorites', { userId, favoriteAlbum });
        if (response.data.favorite) {
            addFavorite(response.data.favorite); // Add the actual favorite to the store
        }
        toast({
            description: response.data.message || 'Album added to favorites!',
        });
    } catch (error) {
        toast({
            variant: 'destructive',
            description: 'Failed to add favorite.',
        });
        console.error('Error adding to favorites:', error);
    }
};


  const removeFromFavorites = async (userId: string, albumId: number) => {
    try {
      await axios.delete(`/api/favorites/${albumId}`, { data: { userId } });
      removeFavorite(albumId); // Update the store
      toast({
        description: 'Album removed from favorites!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to remove favorite.',
      });
      console.error('Error removing from favorites:', error);
    }
  };

  const batchCheckFavorites = async (userId: string, albumIds: number[]) => {
    try {
      const response = await axios.post('/api/favorites/batch-check', {
        userId,
        albumIds,
      });
      return response.data.favoriteStatus;
    } catch (error) {
      console.error('Error fetching batch favorite status:', error);
      throw new Error('Failed to check batch favorite status.');
    }
  };

  return {
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    batchCheckFavorites,
  };
};
