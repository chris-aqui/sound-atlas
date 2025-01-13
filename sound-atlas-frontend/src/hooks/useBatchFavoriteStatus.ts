import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const useBatchFavoriteStatus = (albumIds: number[], userId: string | null) => {
  const [favoriteStatus, setFavoriteStatus] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const albumIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!userId || albumIds.length === 0) return;

      const albumIdsSet = new Set(albumIds);
      if (
        albumIdsRef.current.size === albumIdsSet.size &&
        [...albumIdsRef.current].every((id) => albumIdsSet.has(id))
      ) {
        return;
      }

      albumIdsRef.current = albumIdsSet;

      setLoading(true);
      try {
        const response = await axios.post('/api/favorites/batch-check', {
          userId,
          albumIds: [...albumIdsSet],
        });
        setFavoriteStatus(response.data.favoriteStatus);
      } catch (err) {
				console.error('Failed to load favorite status:', err);
        setError('Failed to load favorite status.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteStatus();
  }, [albumIds, userId]);

  return { favoriteStatus, loading, error };
};
