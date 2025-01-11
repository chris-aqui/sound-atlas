import React from 'react';
import { useMusicQuery } from '@/hooks/useMusicQuery';
import ArtistCard from '../ArtistCard/ArtistCard';
import { MusicItem } from '@/types/types';

const MusicList: React.FC = () => {
	const { data, loading, error } = useMusicQuery();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
			{loading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{[...Array(8)].map((_, index) => (
						<div key={index} className="h-72 bg-gray-100 rounded-lg animate-pulse" />
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{data.map((artist: MusicItem) => (
						<ArtistCard key={artist.id} artist={artist} />
					))}
				</div>
			)}
		</div>
	);
};

export default MusicList;
