import type { ImageMetadata } from 'astro';
import type { Dict } from '~/i18n';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/**/*.jpg', { eager: true });

/** Look up an optimisable photo: photo('rino', '01-kitchen'). */
export function photo(dir: string, name: string): ImageMetadata {
  const mod = files[`../assets/photos/${dir}/${name}.jpg`];
  if (!mod) throw new Error(`Photo not found: ${dir}/${name}.jpg`);
  return mod.default;
}

/** '01-kitchen' -> 'kitchen' */
export const kindOf = (name: string) => name.replace(/^\d+-/, '') as keyof Dict['photoKinds'];

/** Alt text built from the photo kind and where it was taken. */
export const altFor = (t: Dict, name: string, where: string) => `${t.photoKinds[kindOf(name)]} – ${where}`;
