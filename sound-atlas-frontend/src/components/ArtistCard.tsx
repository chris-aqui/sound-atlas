/* eslint-disable @typescript-eslint/no-explicit-any */ // todo add correct types
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MusicItem } from '@/types/types';

interface ArtistCardProps {
	artist: MusicItem;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
	const artistName = artist.title.split(' - ')[0];
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="space-y-1 h-[85px]">
				<CardTitle className="text-lg font-semibold line-clamp-2">{artist.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div
					className="overflow-hidden rounded-lg flex justify-center  mb-2 mx-auto
        "
				>
					<img
						src={artist.cover_image}
						alt={artist.title}
						className="h-[250px] w-[250px] object-contain mx-auto"
					/>
				</div>
				<div className="space-y-2">
					{artist.genre && (
						<div className="flex flex-wrap gap-1">
							Album Genre:
							{artist.genre.map((genre: any) => (
								<Badge key={genre} variant="secondary" className="text-xs">
									{genre}
								</Badge>
							))}
						</div>
					)}
					<div className="text-sm text-muted-foreground">
						View Artist: <Link to={`/artist/${artist.id}`}>{artistName}</Link>
						{artist.year && <div>Album Year: {artist.year}</div>}
						{/* Todo add bookmark feature */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ArtistCard;
