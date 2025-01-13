import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const useBatchFavoriteStatus = (albumIds: number[], userId: string | null) => {
	const [favoriteStatus, setFavoriteStatus] = useState<Record<number, boolean>>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const albumIdsRef = useRef<number[]>([]);

	useEffect(() => {
		const fetchFavoriteStatus = async () => {
			if (!userId || albumIds.length === 0) return;

			// Avoid duplicate API calls for the same album IDs
			if (JSON.stringify(albumIds) === JSON.stringify(albumIdsRef.current)) return;

			setLoading(true);
			try {
				const response = await axios.post('/api/favorites/batch-check', {
					userId,
					albumIds,
				});
				setFavoriteStatus(response.data.favoriteStatus);
			} catch (err) {
				console.error('Error fetching favorite status:', err);
				setError('Failed to load favorite status.');
			} finally {
				setLoading(false);
			}
		};

		fetchFavoriteStatus();
	}, [albumIds, userId]);

	return { favoriteStatus, loading, error };
};
