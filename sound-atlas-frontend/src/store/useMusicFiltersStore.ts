import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MusicFilters {
  country: string;
  genre: string;
  year: number;
}

interface MusicFiltersStore {
  filters: MusicFilters;
  updateCountry: (country: string) => void;
  updateGenre: (genre: string) => void;
  updateYear: (year: number) => void;
  updateFilters: (updates: Partial<MusicFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: MusicFilters = {
  country: 'Canada',
  genre: '',
  year: 2024,
};

export const useMusicFiltersStore = create<MusicFiltersStore>()(
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

      updateFilters: (updates) =>
        set(
          (state) => ({
            filters: { ...state.filters, ...updates }
          }),
          false,
          'filters/updateMultiple'
        ),

      resetFilters: () =>
        set(
          { filters: defaultFilters },
          false,
          'filters/reset'
        ),
    }),
    {
      name: 'Music Filters Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)

export const useSelectedFilters = () => useMusicFiltersStore((state) => state.filters);