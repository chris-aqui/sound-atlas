import GenericDropdown from '../GenericDropdown/GenericDropdown';
import { years } from '@/constants/mockYears';
import { mockListCountries } from '@/constants/mockCountries';
import { genres } from '@/constants/mockGenre';
import { useMusicFiltersStore } from '@/store/useMusicFiltersStore';

const MusicFilters: React.FC = () => {
	const { filters, updateCountry, updateGenre, updateYear } = useMusicFiltersStore();
	console.log('filters', filters);

	return (
		<section className="music-filters-page  flex flex-row items-center w-full justify-around">
			<GenericDropdown
				items={mockListCountries}
				selectedItem={filters.country}
				onItemSelect={updateCountry}
				labelExtractor={(country): string => country}
				title="Country"
			/>
			<GenericDropdown
				items={years}
				selectedItem={filters.year}
				onItemSelect={updateYear}
				labelExtractor={(year): string => year.toString()}
				title="Year"
			/>
			<GenericDropdown
				items={genres}
				selectedItem={filters.genre}
				onItemSelect={updateGenre}
				labelExtractor={(genre): string => genre}
				title="Genre"
			/>
		</section>
	);
};

export default MusicFilters;
