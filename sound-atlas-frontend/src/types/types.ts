
// Define the types for the API response
export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: {
    last: string;
    next: string;
  };
}

export interface Format {
  name: string;
  qty: string;
  descriptions: string[];
}

export interface Community {
  want: number;
  have: number;
}

export interface UserData {
  in_wantlist: boolean;
  in_collection: boolean;
}

export interface MusicItem {
  id: number;
  title: string;
  country: string;
  year: string;
  format: string[];
  label: string[];
  type: string;
  genre: string[];
  style: string[];
  barcode: string[];
  user_data: UserData;
  master_id: number | null;
  master_url: string | null;
  uri: string;
  catno: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  community: Community;
  format_quantity: number;
  formats: Format[];
}

export interface ApiTopArtistResponse {
  pagination: Pagination;
  results: MusicItem[];
}

// export interface ArtistCardProps {
//   id: number;
//   title: string;
//   thumb: string;
//   cover_image: string;
//   genre: string[];
//   style: string[];
// }