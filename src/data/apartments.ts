// Facts about the apartments. Prices live in src/content/prices.json and text in src/content/text/,
// both editable on the admin page.
import prices from '~/content/prices.json';

export const SITE_NAME = 'Adriatic Island Apartments';
export const HOST_NAME = 'Sanja Dejanović';
export const HOST_EMAIL = 'sanja.dejanovic@yahoo.com';
export const PRICE_YEAR = prices.year;
export const FEES = prices.fees;

export type IslandSlug = 'pag' | 'cres';
export type ApartmentSlug = 'rino' | 'punta-blue' | 'punta-orange';

export type AmenityKey =
  | 'ac' | 'wifi' | 'kitchen' | 'oven' | 'fridge' | 'coffee' | 'kettle' | 'tv'
  | 'washer' | 'linens' | 'hairdryer' | 'terrace' | 'garden' | 'parking'
  | 'entrance' | 'shades' | 'seaview' | 'fireplace' | 'fans' | 'highchair'
  | 'crib' | 'pets' | 'waterfront' | 'longstay';

export interface Season {
  /** Dates as DD.MM. */
  periods: { from: string; to: string }[];
  price: number;
}

export interface Apartment {
  slug: ApartmentSlug;
  island: IslandSlug;
  name: string;
  place: string;
  seaMeters: number;
  sleeps: number;
  sofaBed: boolean;
  beds: 'twin' | 'double';
  floor: 0 | 1;
  address: { street: string; postalCode: string; locality: string };
  certificate: string;
  mapQuery: string;
  seasons: Season[];
  amenities: AmenityKey[];
  /** File names (without .jpg) in src/assets/photos/<slug>/, in gallery order. */
  photos: string[];
  cover: string;
  accent: string;
}

const CRES_ADDRESS = { street: 'Pogana 76', postalCode: '51544', locality: 'Punta Križa' };

export const apartments: Apartment[] = [
  {
    slug: 'rino',
    island: 'pag',
    name: 'Apartment Rino',
    place: 'Košljun',
    seaMeters: 30,
    sleeps: 2,
    sofaBed: true,
    beds: 'twin',
    floor: 0,
    address: { street: 'Košljun 61', postalCode: '23250', locality: 'Pag' },
    certificate: 'UP/I-335-02/24-02/5064',
    mapQuery: 'Košljun 61, 23250 Pag, Croatia',
    seasons: prices.apartments.rino.seasons,
    amenities: ['ac', 'wifi', 'kitchen', 'oven', 'fridge', 'coffee', 'kettle', 'tv', 'washer', 'linens', 'hairdryer', 'terrace', 'garden', 'parking', 'entrance', 'highchair', 'crib', 'pets'],
    photos: ['09-terrace', '01-kitchen', '02-living', '05-bedroom', '03-kitchen', '06-bedroom', '08-bathroom', '10-terrace', '04-kitchen', '07-bedroom', '11-terrace', '12-exterior', '13-exterior', '14-garden'],
    cover: '09-terrace',
    accent: '#8a6fa8',
  },
  {
    slug: 'punta-blue',
    island: 'cres',
    name: 'Apartment Punta Blue',
    place: 'Pogana',
    seaMeters: 5,
    sleeps: 2,
    sofaBed: true,
    beds: 'double',
    floor: 0,
    address: CRES_ADDRESS,
    certificate: 'UP/I-335-03/24-01/155',
    mapQuery: 'Pogana, Punta Križa, Cres, Croatia',
    seasons: prices.apartments['punta-blue'].seasons,
    amenities: ['ac', 'wifi', 'kitchen', 'oven', 'fridge', 'coffee', 'kettle', 'linens', 'terrace', 'seaview', 'waterfront', 'fireplace', 'fans', 'parking', 'entrance', 'shades', 'pets'],
    photos: ['01-terrace', '04-living', '08-bedroom', '03-exterior', '05-living', '07-kitchen', '02-terrace', '06-living', '09-bedroom', '10-bathroom', '11-view', '12-view'],
    cover: '01-terrace',
    accent: '#2f7fa3',
  },
  {
    slug: 'punta-orange',
    island: 'cres',
    name: 'Apartment Punta Orange',
    place: 'Pogana',
    seaMeters: 5,
    sleeps: 3,
    sofaBed: true,
    beds: 'twin',
    floor: 1,
    address: CRES_ADDRESS,
    certificate: 'UP/I-335-03/24-01/155',
    mapQuery: 'Pogana, Punta Križa, Cres, Croatia',
    seasons: prices.apartments['punta-orange'].seasons,
    amenities: ['ac', 'wifi', 'kitchen', 'oven', 'fridge', 'coffee', 'kettle', 'linens', 'terrace', 'seaview', 'waterfront', 'fans', 'parking', 'entrance', 'shades', 'pets'],
    photos: ['01-view', '02-living', '07-bedroom', '05-kitchen', '03-living', '11-terrace', '04-living', '08-bedroom', '06-kitchen', '09-bedroom', '10-bathroom', '12-terrace'],
    cover: '01-view',
    accent: '#d9772b',
  },
];

export interface Island {
  slug: IslandSlug;
  name: string;
  /** Hero photo and gallery, files in src/assets/photos/<slug>/. */
  hero: string;
  photos: string[];
}

export const islands: Island[] = [
  {
    slug: 'pag',
    name: 'Pag',
    hero: '01-aerial',
    photos: ['02-coast', '03-sunset', '06-beach', '07-beach', '08-swim', '09-relax', '05-sea', '10-coast', '04-sunset'],
  },
  {
    slug: 'cres',
    name: 'Cres',
    hero: '01-sunset',
    photos: ['03-harbour', '06-village', '05-harbour', '02-sunset', '10-beach', '07-harbour', '09-coast', '04-harbour', '11-sea', '14-village', '13-exterior', '15-coast'],
  },
];

/** Small family photos (under 1000 px): only ever shown as thumbnails. */
export const pagSmallPhotos = ['11-cheese', '12-lace', '13-beach', '14-beach', '15-beach'];

export const getApartment = (slug: string) => apartments.find((a) => a.slug === slug)!;
export const getIsland = (slug: string) => islands.find((i) => i.slug === slug)!;
export const apartmentsOn = (island: IslandSlug) => apartments.filter((a) => a.island === island);
export const fromPrice = (a: Apartment) => Math.min(...a.seasons.map((s) => s.price));
export const topPrice = (a: Apartment) => Math.max(...a.seasons.map((s) => s.price));
