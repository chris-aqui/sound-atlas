import { create } from 'zustand'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createJSONStorage, StateStorage, StorageValue } from 'zustand/middleware'
import { devtools, persist } from 'zustand/middleware'

interface MusicFilters {
  country: string;
  genre: string;
  year: number;
}

interface MusicFiltersStore {
  filters: MusicFilters;
  currentlyViewing: string | null;

  updateCountry: (country: string) => void;
  updateGenre: (genre: string) => void;
  updateYear: (year: number) => void;
  setCurrentlyViewing: (id: string) => void;

  // updateFilters: (updates: Partial<MusicFilters>) => void; // todo - remove
  // resetFilters: () => void; // todo - remove
}

const defaultFilters: MusicFilters = {
  country: 'Canada',
  genre: '',
  year: 2024,
};

export const useMusicFiltersStore = create<MusicFiltersStore>()(
  persist(
    devtools(
    (set) => ({
      filters: defaultFilters,

      updateCountry: (country) =>
        set(
          (state) => ({
            filters: { ...state.filters, country }
          }),
          false,
          'filters/updateCountry'
        ),

      updateGenre: (genre) =>
        set(
          (state) => ({
            filters: { ...state.filters, genre }
          }),
          false,
          'filters/updateGenre'
        ),

      updateYear: (year) =>
        set(
          (state) => ({
            filters: { ...state.filters, year }
          }),
          false,
          'filters/updateYear'
        ),

      // updateFilters: (updates) =>
      //   set(
      //     (state) => ({
      //       filters: { ...state.filters, ...updates }
      //     }),
      //     false,
      //     'filters/updateMultiple'
      //   ),

      // resetFilters: () =>
      //   set(
      //     { filters: defaultFilters },
      //     false,
      //     'filters/reset'
      //   ),

        // Currently viewing artist
        currentlyViewing: null,
        setCurrentlyViewing: (id: string)=>
          set(
            () => ({
              currentlyViewing: id
            }),
            false,
            'Artist/currentlyViewing'
          ),

        // => set({ currentlyViewing: id }),
    }),
    {
      name: 'Music Filters Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  ),
  {
    name: 'music-storage',
    storage: createJSONStorage(() => sessionStorage),
  }
)
)

export const useSelectedFilters = () => useMusicFiltersStore((state) => state.filters);