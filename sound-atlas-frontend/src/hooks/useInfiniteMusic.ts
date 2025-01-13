import useSWRInfinite from 'swr/infinite';
import { MusicItem, ApiTopArtistResponse } from '@/types/types';
import { useMusicFiltersStore } from '@/store/useStore';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  });

const buildQueryParams = (page: number, country: string, year: number, genre: string) => {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  if(country === 'United States') {
    params.append('country', 'US');
  } else if(country === 'United Kingdom') {
    params.append('country', 'UK');
  } else {
    params.append('country', country);
  }
  params.append('year', year.toString());
  if (genre) {
    params.append('genre', genre);
  }
  return params.toString();
};

export const useInfiniteMusic = () => {
  const { country, year, genre } = useMusicFiltersStore();

  const getKey = (pageIndex: number, previousPageData: ApiTopArtistResponse | null) => {

    if (previousPageData && !previousPageData.pagination.urls.next) {
      return null;
    }
    return `/api/top-artist?${buildQueryParams(
      pageIndex + 1,
      country,
      year,
      genre
    )}`;
  };

  const {
    data,
    error,
    size,
    setSize,
    isValidating
  } = useSWRInfinite<ApiTopArtistResponse>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    persistSize: true,
    revalidateAll: false,
    revalidateFirstPage : false,
  });

  const allArtists: MusicItem[] = data ? data.flatMap((page) => page.results) : [];

  const hasNextPage = data?.[data.length - 1]?.pagination.urls.next ?? false;

  return {
    data: allArtists,
    error,
    isValidating,
    size,
    setSize,
    hasNextPage,
  };
};
