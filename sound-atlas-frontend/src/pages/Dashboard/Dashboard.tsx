import React from 'react';
import MusicFilters from '@/components/MusicFilters';
import { useMusicFiltersStore } from '@/store/useMusicFiltersStore';
import MusicListInfinite from '@/components/MusicListInfinite';

const Dashboard: React.FC = () => {
	const { filters } = useMusicFiltersStore();
	const { country, year } = filters;
	return (
		<section className="flex flex-col items-center text-center gap-8">
			<h1 className="mb-2">
				All albums For {country} {year}
			</h1>
			<MusicFilters />
			<MusicListInfinite />
		</section>
	);
};

export default Dashboard;
