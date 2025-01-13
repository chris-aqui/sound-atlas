import GenericDropdown from './GenericDropdown';
import { years } from '@/constants/mockYears';
import { mockListCountries } from '@/constants/mockCountries';
import { genres } from '@/constants/mockGenre';
import { useMusicFiltersStore } from '@/store/useStore';

const MusicFilters: React.FC = () => {
	const { country, year, genre, updateCountry, updateGenre, updateYear } = useMusicFiltersStore();

	return (
		// <section className="music-filters-page  flex flex-row items-center w-full justify-around">
		<section className="music-filters-page flex flex-col items-center w-full gap-4 sm:flex-row sm:justify-around sm:gap-0">
			<GenericDropdown
				items={mockListCountries}
				selectedItem={country}
				onItemSelect={updateCountry}
				labelExtractor={(country): string => country}
				title="Country"
			/>
			<GenericDropdown
				items={years}
				selectedItem={year}
				onItemSelect={updateYear}
				labelExtractor={(year): string => year.toString()}
				title="Year"
			/>
			<GenericDropdown
				items={genres}
				selectedItem={genre}
				onItemSelect={updateGenre}
				labelExtractor={(genre): string => genre}
				title="Genre"
			/>
		</section>
	);
};

export default MusicFilters;
