import { create } from 'zustand'
// import { createJSONStorage } from 'zustand/middleware'
import { devtools, persist } from 'zustand/middleware'

interface MusicFilters {
  country: string;
  genre: string;
  year: number;
}

interface CurrentlyViewingStore {
  currentlyViewing: string | null;
  setCurrentlyViewing: (id: string) => void;
}


const defaultFilters: MusicFilters = {
  country: 'Canada',
  genre: '',
  year: 2024,
};

export const useMusicFiltersStore = create<MusicFilters & {
  updateCountry: (country: string) => void;
  updateGenre: (genre: string) => void;
  updateYear: (year: number) => void;
}>()(
  persist(
    devtools((set) => ({
      ...defaultFilters,
      updateCountry: (country) =>
        set((state) => ({ ...state, country }), false, 'filters/updateCountry'),
      updateGenre: (genre) =>
        set((state) => ({ ...state, genre }), false, 'filters/updateGenre'),
      updateYear: (year) =>
        set((state) => ({ ...state, year }), false, 'filters/updateYear'),
    })),
    {
      name: 'Music Filters Store',
    }
  )
);

export const useCurrentlyViewingStore = create<CurrentlyViewingStore>()(
  persist(
    devtools((set) => ({
      currentlyViewing: null,
      setCurrentlyViewing: (id: string) =>
        set(() => ({ currentlyViewing: id }), false, 'Artist/currentlyViewing'),
    })),
    { name: 'Currently Viewing Store' }
  )
);
