import React, { useEffect, useState, Suspense } from 'react';
import { useUser } from '@clerk/clerk-react';
import { v4 as uuidv4 } from 'uuid';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useFavoritesApi } from '@/hooks/useFavoritesApi';
import AlbumCard from '@/components/AlbumCard';
import ListContent from '@/components/ListContent';

import LoadingCard from '@/components/LoadingCard';

const FavoritesPage: React.FC = () => {
	const { user } = useUser();
	const userId = user?.id || null;
	const { fetchFavorites } = useFavoritesApi();
	const { favorites } = useFavoritesStore();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserFavorites = async () => {
			if (!userId) return;

			setLoading(true);
			try {
				await fetchFavorites(userId);
			} catch (err) {
				console.error('Error fetching favorites:', err);
				setError('Failed to load favorites.');
			} finally {
				setLoading(false);
			}
		};

		fetchUserFavorites();
	}, [userId, fetchFavorites]);

	if (loading) return <p>Loading your favorite albums...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	if (!favorites || favorites.length === 0) {
		return <p>You don't have any favorite albums yet.</p>;
	}

	console.log('favorites', favorites);

	return (
		<Suspense fallback={<LoadingCard />}>
			<section className="container mx-auto mt-5">
				<h1 className="text-2xl font-bold">Your Favorites</h1>
				<ListContent>
					{favorites.map((album) => (
						<AlbumCard key={uuidv4()} album={album.favoriteAlbum} isFavorited={true} />
					))}
				</ListContent>
			</section>
		</Suspense>
	);
};

export default FavoritesPage;
