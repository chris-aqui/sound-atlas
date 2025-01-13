import useSWR from 'swr';
import { fetchArtistData } from '@/lib/api';
import { useCurrentlyViewingStore } from '@/store/useStore';

export const useFetchArtistData = () => {
  const { currentlyViewing } = useCurrentlyViewingStore();

 const { data, error, isLoading } = useSWR(
  currentlyViewing ? currentlyViewing : null,
  (id) => fetchArtistData(id),
  { suspense: true }
);

  return { data, loading:isLoading, error };
};
