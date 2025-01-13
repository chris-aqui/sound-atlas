import React, { Suspense } from 'react';
import LoadingCard from '@/components/LoadingCard';
import ArtistDetailsContent from '@/components/ArtistDetailsContent';

const ArtistPage: React.FC = () => {
	return (
		<Suspense fallback={<LoadingCard />}>
			<ArtistDetailsContent />
		</Suspense>
	);
};

export default ArtistPage;
