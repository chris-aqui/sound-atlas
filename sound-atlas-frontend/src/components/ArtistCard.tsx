import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MusicItem } from '@/types/types';
import { useCurrentlyViewingStore } from '@/store/useStore';

interface ArtistCardProps {
	artist: MusicItem;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
	const artistName = artist.title.split(' - ')[0];
	const navigate = useNavigate();
	const { setCurrentlyViewing } = useCurrentlyViewingStore();

	const handleViewArtist = async () => {
		try {
			const response = await fetch(artist.resource_url);
			const data = await response.json();
			const artistId = data.artists[0].id;
			setCurrentlyViewing(artistId);
			navigate(`/artist/${artistId}`);
		} catch (error) {
			console.error('Failed to fetch artist ID:', error);
		}
	};

	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="space-y-1 h-[85px]">
				<CardTitle className="text-lg font-semibold line-clamp-2">{artist.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-hidden rounded-lg flex justify-center  mb-2 mx-auto">
					<img
						src={artist.cover_image}
						alt={artist.title}
						className="h-[250px] w-[250px] object-contain mx-auto"
					/>
				</div>
				<div className="space-y-2">
					{artist.genre && (
						<div className="flex flex-wrap gap-1 text-muted-foreground">
							Album Genre:
							{artist.genre.map((genre) => (
								<Badge key={genre} variant="secondary" className="text-xs">
									{genre}
								</Badge>
							))}
						</div>
					)}
					<div className="text-sm text-muted-foreground flex gap-1">
						View Artist:{' '}
						<Link to="#" onClick={handleViewArtist}>
							{artistName}
						</Link>
						{/* Todo add bookmark feature */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ArtistCard;
