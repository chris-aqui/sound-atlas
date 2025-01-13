import { v4 as uuidv4 } from 'uuid';
import React, { useMemo } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AlbumCard from '@/components/AlbumCard';
import ListContent from '@/components/ListContent';
import { useFetchArtistData } from '@/hooks/useFetchArtistData';
import { useBatchFavoriteStatus } from '@/hooks/useBatchFavoriteStatus';

const ArtistDetailsContent: React.FC = () => {
	const { user } = useUser();
	const userId = user?.id || null;
	const { data: artistData } = useFetchArtistData();
	const imagesForCarousel = artistData?.artistDetails.images || [];
	const albumReleases = artistData?.releases || [];

	const albumIds = useMemo(
		() => artistData?.releases?.map((album) => album.id) || [],
		[artistData],
	);
	const { favoriteStatus } = useBatchFavoriteStatus(albumIds, userId);

	return (
		<section className="container mx-auto mt-5">
			<div className="flex flex-col gap-4">
				<Carousel
					autoPlayInterval={5000}
					opts={{
						align: 'start',
						loop: true,
					}}
					className="w-auto  mx-auto"
				>
					<CarouselContent className="flex gap-1">
						{imagesForCarousel.map((image, index) => (
							<CarouselItem
								key={index}
								className="basis-1/2 md:basis-1/3 lg:basis-1/4 flex-shrink-0 pl-0"
							>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-2 mx-auto rounded-lg">
											<img
												src={image.uri}
												alt={`${artistData?.artistDetails.name} ${image.type} image`}
												className="w-full h-full object-cover"
											/>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				<h1 className="text-indigo-500">{artistData?.artistDetails.name}</h1>
				<div className="text-justify">
					<span>{artistData?.artistDetails.profile}</span>
				</div>
			</div>
			<hr className="my-4 border-4 border-b-indigo-500" />
			<ListContent>
				{albumReleases.map((release) => (
					<AlbumCard
						key={uuidv4()}
						album={release}
						isFavorited={favoriteStatus[release.id] || false}
					/>
				))}
			</ListContent>
		</section>
	);
};

export default ArtistDetailsContent;
