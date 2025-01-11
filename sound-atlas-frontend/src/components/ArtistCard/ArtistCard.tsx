/* eslint-disable @typescript-eslint/no-explicit-any */ // todo add correct types
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { MusicItem } from '@/types/types';

interface ArtistCardProps {
	artist: MusicItem;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="space-y-1 h-[102px]">
				<CardTitle className="text-lg font-semibold line-clamp-2">{artist.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div
					className="overflow-hidden rounded-lg flex justify-center  mb-2 mx-auto
        "
				>
					<img
						src={artist.cover_image}
						// src={artist.thumb}
						alt={artist.title}
						className="h-[250px] w-[250px] object-contain mx-auto"
					/>
				</div>
				<div className="space-y-2">
					{artist.genre && (
						<div className="flex flex-wrap gap-1">
							{artist.genre.map((genre: any) => (
								<Badge key={genre} variant="secondary" className="text-xs">
									{genre}
								</Badge>
							))}
						</div>
					)}
					{/* {artist.style && (
						<div className="flex flex-wrap gap-1">
							{artist.style.map((style) => (
								<Badge key={style} variant="outline" className="text-xs">
									{style}
								</Badge>
							))}
						</div>
					)} */}
					<div className="text-sm text-muted-foreground">
						{/* <div>Format: {artist.format.join(', ')}</div> */}
						{artist.year && <div>Year: {artist.year}</div>}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ArtistCard;
