import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React, { Suspense } from 'react';
import { useFetchArtistData } from '@/hooks/useFetchArtistData';
import LoadingCard from '@/components/LoadingCard';
import AlbumCard from '@/components/AlbumCard';
import { v4 as uuidv4 } from 'uuid';
import ListContent from '@/components/ListContent';

const ArtistDetailsContent: React.FC = () => {
	const { data: artistData } = useFetchArtistData();
	const images = artistData?.artistDetails.images || [];
	const albumReleases = artistData?.releases || [];

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
						{images.map((image, index) => (
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
					<AlbumCard key={uuidv4()} album={release} />
				))}
			</ListContent>
		</section>
	);
};

const ArtistDetails: React.FC = () => {
	return (
		<Suspense fallback={<LoadingCard />}>
			<ArtistDetailsContent />
		</Suspense>
	);
};

export default ArtistDetails;
