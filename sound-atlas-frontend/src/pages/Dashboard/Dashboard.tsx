import React from 'react';
import MusicFilters from '@/components/MusicFilters/MusicFilters';
import Header from '@/components/Header/Header';
import MusicList from '../../components/MusicList/MusicList';
import { useMusicFiltersStore } from '@/store/useMusicFiltersStore';

const Dashboard: React.FC = () => {
	const { filters } = useMusicFiltersStore();
	const { country, year } = filters;
	return (
		<section className="flex flex-col items-center text-center gap-8">
			<Header />
			<h1 className="mb-2">
				All albums For {country} {year}
			</h1>
			<MusicFilters />
			<MusicList />
		</section>
	);
};

export default Dashboard;
