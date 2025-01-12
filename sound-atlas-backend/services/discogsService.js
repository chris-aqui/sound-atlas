import axios from 'axios';

const DISCOGS_API_BASE_URL = 'https://api.discogs.com';
const DISCOGS_USER_AGENT = 'SoundAtlasApp/1.0';
const DISCOGS_USER_TOKEN = process.env.DISCOGS_USER_TOKEN;

const apiClient = axios.create({
	baseURL: DISCOGS_API_BASE_URL,
	headers: {
		Authorization: `Discogs token=${DISCOGS_USER_TOKEN}`,
		'User-Agent': DISCOGS_USER_AGENT,
	},
});

// Function to search for artists
export const searchArtists = async ({ country, year, genre, artist, type, ...otherParams }) => {
	const params = {
		country,
		per_page: 25,
		type: type || 'release', // Default type is 'release'
		sort: 'hot',
		...(year && { year }),
		...(genre && { genre }),
		...otherParams,
	};

	const response = await apiClient.get('/database/search', { params });
	return response.data;
};

export const fetchArtistData = async (id) => {
	const [artistRes, releasesRes] = await Promise.all([
		apiClient.get(`/artists/${id}`),
		apiClient.get(`/artists/${id}/releases`),
	]);

	return {
		artistDetails: artistRes.data,
		releases: releasesRes.data.releases,
	};
};
