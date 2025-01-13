import React, { Suspense } from 'react';
import LoadingCard from '@/components/LoadingCard';
import ArtistDetailsContent from '@/components/ArtistDetailsContent';
import ErrorBoundary from '@/components/ErrorBoundary';

const ArtistPage: React.FC = () => {
	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingCard />}>
				<ArtistDetailsContent />
			</Suspense>
		</ErrorBoundary>
	);
};

export default ArtistPage;
