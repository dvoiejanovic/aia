import type { Apartment } from '~/data/apartments';
import { fromPrice, topPrice, SITE_NAME } from '~/data/apartments';
import type { Dict } from '~/i18n';

/** schema.org structured data for one apartment. Add geo coordinates before launch. */
export function apartmentSchema(a: Apartment, t: Dict, pageUrl: string, images: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: a.name,
    description: t.apartments[a.slug].metaDesc,
    url: pageUrl,
    image: images,
    brand: { '@type': 'Brand', name: SITE_NAME },
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.address.street,
      postalCode: a.address.postalCode,
      addressLocality: a.address.locality,
      addressCountry: 'HR',
    },
    priceRange: `€${fromPrice(a)}–€${topPrice(a)}`,
    petsAllowed: a.amenities.includes('pets'),
    containsPlace: {
      '@type': 'Accommodation',
      additionalType: 'EntirePlace',
      occupancy: { '@type': 'QuantitativeValue', value: a.sleeps },
      amenityFeature: a.amenities.map((k) => ({ '@type': 'LocationFeatureSpecification', name: t.amenities[k], value: true })),
    },
  };
}
