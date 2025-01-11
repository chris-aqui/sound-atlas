import { Release } from '@/types/types';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AlbumCardProps {
	album: Release;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
	console.log('album', album);
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardContent>
				<div className="overflow-hidden rounded-lg flex justify-center  mb-2 mx-auto">
					<img
						src={album.thumb}
						alt={album.title}
						className="h-[250px] w-[250px] object-contain mx-auto"
					/>
				</div>
			</CardContent>
			<CardHeader className="space-y-1 h-[85px] p-0">
				<CardContent className="pb-0 text-lg font-semibold text-muted-foreground">
					<p className="line-clamp-1 text-md">Album: {album.title}</p>
					<p className="line-clamp-1 text-sm">Year: {album.year}</p>
					{/* // todo - add bookmark feature */}
					<Button variant="ghost" size="sm" className="bg-indigo-500 dark:text-white text-white">
						Favorite
					</Button>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default AlbumCard;
