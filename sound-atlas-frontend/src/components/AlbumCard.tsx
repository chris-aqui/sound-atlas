import { Release } from '@/types/types';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface AlbumCardProps {
	album: Release;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
	const { user, isSignedIn } = useUser();
	const { toast } = useToast();

	const handleAddFavorite = async () => {
		if (!isSignedIn) {
			toast({
				variant: 'destructive',
				description: 'Please log in to add favorites.',
			});
			return;
		}

		try {
			await axios.post('/api/favorites', {
				userId: user?.id,
				favoriteAlbum: {
					id: album.id,
					title: album.title,
					role: album.role,
					year: album.year,
					resource_url: album.resource_url,
					thumb: album.thumb,
				},
			});
			toast({
				description: 'Added to favorites!',
			});
		} catch (error) {
			console.error(error);
			toast({
				variant: 'destructive',
				description: 'Failed to add to favorites.',
			});
		}
	};

	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardContent>
				<div className="overflow-hidden rounded-lg flex justify-center  mb-2 mx-auto">
					<img
						src={album.thumb}
						alt={`Thumbnail for ${album.title}`}
						className="h-[250px] w-[250px] object-contain mx-auto"
					/>
				</div>
			</CardContent>
			<CardHeader className="space-y-1 h-[85px] p-0">
				<CardContent className="pb-0 text-lg font-semibold text-muted-foreground">
					<p className="line-clamp-1 text-md">Album: {album.title}</p>
					<p className="line-clamp-1 text-sm">Year: {album.year}</p>
					{/* // todo - add bookmark feature */}
					<Button
						variant="ghost"
						size="sm"
						className="bg-indigo-500 dark:text-white text-white"
						aria-label="Add album to favorites"
						onClick={handleAddFavorite}
					>
						Add Favorite
					</Button>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default AlbumCard;
