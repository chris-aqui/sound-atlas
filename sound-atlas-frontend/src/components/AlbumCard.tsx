import React, { memo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FavoriteButton from '@/components/FavoriteButton';
import { Release } from '@/types/types';

interface AlbumCardProps {
	album: Release;
	isFavorited?: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = memo(({ album, isFavorited }) => {
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
					<FavoriteButton album={album} isFavorited={isFavorited} />
				</CardContent>
			</CardHeader>
		</Card>
	);
});

export default AlbumCard;
