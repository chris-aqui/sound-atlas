import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useFavoritesApi } from '@/hooks/useFavoritesApi';
import { Release } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
	album: Release;
	isFavorited?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	album,
	isFavorited: initialIsFavorited,
}) => {
	const { user } = useUser();
	const { toast } = useToast();
	const { pathname } = useLocation();
	const { addToFavorites, removeFromFavorites } = useFavoritesApi();
	const [isFavorited, setIsFavorited] = useState(initialIsFavorited || false); // Internal state for favorite status

	// Determine the page type
	const isFavoritedPage = pathname.includes('favorites');
	const isArtistPage = pathname.includes('artist');

	const favoriteAlbum = {
		id: album.id,
		title: album.title,
		role: album.role,
		year: album.year,
		resource_url: album.resource_url,
		thumb: album.thumb,
	};

	const handleClick = async () => {
		if (!user) {
			toast({
				variant: 'destructive',
				description: 'You must be logged in to add to favorites.',
			});
		}
		try {
			if (isArtistPage) {
				setIsFavorited(true);
				await addToFavorites(user.id, favoriteAlbum);
			} else if (isFavoritedPage) {
				setIsFavorited(false);
				await removeFromFavorites(user.id, album.id);
			}
		} catch (error) {
			console.error('Failed to update favorite status:', error);
			setIsFavorited((prev) => !prev);
		}
	};

	const renderText = () => {
		if (isArtistPage) {
			return isFavorited ? 'Favorited!' : 'Add to Favorites';
		} else if (isFavoritedPage) {
			return 'Remove from Favorites';
		}
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isFavorited && !isFavoritedPage}
			variant="ghost"
			size="sm"
			className={`bg-indigo-500 dark:text-white text-white ${
				isFavorited && !isFavoritedPage
					? 'bg-green-500 text-white cursor-not-allowed'
					: 'bg-indigo-500 text-white'
			}`}
			aria-label="Add album to favorites"
		>
			{renderText()}
		</Button>
	);
};

export default FavoriteButton;
