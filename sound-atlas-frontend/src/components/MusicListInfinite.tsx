import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteMusic } from '@/hooks/useInfiniteMusic';
import ArtistCard from '@/components/ArtistCard';
import LoadingCard from '@/components/LoadingCard';
import { v4 as uuidv4 } from 'uuid';
import ListContent from '@/components/ListContent';

const MusicListInfinite: React.FC = () => {
	const { data, error, isValidating, setSize, size, hasNextPage } = useInfiniteMusic();

	const { ref, inView } = useInView({
		rootMargin: '200px',
		threshold: 0.1,
		// Delay checking for intersection until element is actually visible
		delay: 100,
	});

	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (inView && hasNextPage && !isValidating) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				setSize(size + 1);
			}, 1000); // Wait 1 second before fetching next page
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [inView, hasNextPage, isValidating, setSize, size]);

	if (status === 'error') {
		return <div className="text-red-500">Error: {error?.message}</div>;
	}

	if (status === 'loading') {
		return <LoadingCard />;
	}

	return (
		<section className="space-y-4">
			<ListContent>
				{data.map((artist) => (
					<ArtistCard key={uuidv4()} artist={artist} />
				))}
			</ListContent>
			{isValidating && (
				<div className="flex justify-center py-4">
					<LoadingCard />
				</div>
			)}

			<div ref={ref} className="h-4" aria-label="Loading more results" />

			{!hasNextPage && data.length > 0 && (
				<div className="text-center py-4 text-gray-500" aria-label="End of results">
					End of results
				</div>
			)}
		</section>
	);
};

export default MusicListInfinite;
