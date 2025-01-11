import { useEffect, useState } from 'react';
import { useSelectedFilters } from '@/store/useMusicFiltersStore';
import { ApiTopArtistResponse, MusicItem } from '@/types/types';


export const useMusicQuery = () => {
  const filters = useSelectedFilters();
  const [data, setData] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTop10Music = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        params.append('country', filters.country);
        params.append('year', filters.year.toString());

        if (filters.genre) {
          params.append('genre', filters.genre);
        }

        const response = await fetch(`/api/top-artist?${params}`);
        if (!response.ok) throw new Error('Failed to fetch music data');

        const musicData:ApiTopArtistResponse  = await response.json();

        setData(musicData.results);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (filters.country || filters.genre || filters.year) {
      fetchTop10Music();
    }
  }, [filters]); // Re-fetch when filters change

  return { data, loading, error };
};