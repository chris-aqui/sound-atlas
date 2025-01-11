import { fetchArtistData } from '@/lib/api';
import { useCurrentlyViewingStore } from '@/store/useStore';
import { ArtistData } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFetchArtistData = () => {
  const { currentlyViewing } = useCurrentlyViewingStore();
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('currentlyViewing:', currentlyViewing);
    const fetchData = async (id: string) => {
      try {
        setLoading(true);
        const fetchedData = await fetchArtistData(id);
        setData(fetchedData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch artist details. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (currentlyViewing) {
      fetchData(currentlyViewing);
    }
  }, [currentlyViewing]);

  return { data, loading, error };
};
