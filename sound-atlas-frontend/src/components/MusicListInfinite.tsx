import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteMusic } from '@/hooks/useInfiniteMusic';
import ArtistCard from '@/components/ArtistCard';
import LoadingCard from '@/components/LoadingCard';
import { v4 as uuidv4 } from 'uuid';

// const MusicListInfinite: React.FC = () => {
// 	const { data, error, isValidating, setSize, size, hasNextPage } = useInfiniteMusic();

// 	// Setup the intersection observer
// 	const { ref, inView } = useInView({
// 		// optionally set a rootMargin to trigger earlier, e.g., '200px'
// 		rootMargin: '500px',
// 		// watch for each time the sentinel crosses the threshold
// 		triggerOnce: true,
// 	});

// 	// Whenever the sentinel is in view AND there is a next page, load more
// 	useEffect(() => {
// 		if (inView && hasNextPage) {
// 			setSize(size + 1);
// 		}
// 	}, [inView, hasNextPage, size, setSize]);

// 	if (error) return <div className="text-red-500">Error: {error.message}</div>;

// 	return (
// 		<section>
// 			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
// 				{data.map((artist) => (
// 					<ArtistCard key={artist.id} artist={artist} />
// 				))}
// 			</div>

// 			{isValidating && <LoadingCard />}

// 			<div ref={ref} className="my-4" />

// 			{!hasNextPage && <div className="text-center mt-2">End of results</div>}
// 		</section>
// 	);
// };

// export default MusicListInfinite;

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
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{data.map((artist) => (
					<ArtistCard key={uuidv4()} artist={artist} />
				))}
			</div>
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
