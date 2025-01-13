import React from 'react';
import MusicFilters from '@/components/MusicFilters';
import { useMusicFiltersStore } from '@/store/useStore';
import MusicListInfinite from '@/components/MusicListInfinite';

const Dashboard: React.FC = () => {
	const { country, year } = useMusicFiltersStore();
	return (
		<section className="flex flex-col items-center text-center gap-8">
			<h1 className="mb-2">
				All Albums For {country} {year}!
			</h1>
			<MusicFilters />
			<MusicListInfinite />
		</section>
	);
};

export default Dashboard;
