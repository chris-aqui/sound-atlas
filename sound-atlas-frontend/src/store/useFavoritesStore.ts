import { create } from 'zustand';
import { Favorite } from '@/types/types';
import { devtools, persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (albumId: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    devtools((set) => ({
      favorites: [],

      setFavorites: (favorites) =>
        set({ favorites }, false, 'Favorites/setFavorites'),

      addFavorite: (favorite) =>
        set((state) => {
            if (!favorite || !favorite.favoriteAlbum) {
                console.error('Invalid favorite object:', favorite);
                return state;
            }
            return {
                favorites: [...state.favorites, favorite],
            };
        }, false, 'Favorites/addFavorite'),

      removeFavorite: (albumId) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => fav.favoriteAlbum.id !== albumId
          ),
        }), false, 'Favorites/removeFavorite'),
    })),
    { name: 'Favorites Store' }
  )
);
