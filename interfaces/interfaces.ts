export interface Destination {
  id: number;
  images: string[];
  video: string;
  category: string;
  name: string;
  city: string;
  description: string;
  latitude: number;
  longitude: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contacts: {
    email: string;
    phoneNumber: string;
    map_adress: string;
  };
}
export interface Category {
  name: string;
}
export interface City {
  id: number;
  images: string[];
  videos: string[];
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  coordinates: [number, number];
}
export interface BlogArticle {
  title: string;
  image?: string;
  excerpt?: string;
  createdAt?: string;
  slug?: string;
  id: number;
  category?: string;
}

export interface Filters {
  category?: string;
  city?: string;
  term?: string;
}

export interface Event {
  id: number;
  name?: string;
  image?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}
