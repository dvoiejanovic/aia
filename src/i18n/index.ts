// Text for the four languages. It lives in src/content/text/<lang>/*.json so the admin page can edit it;
// this file puts the pieces together into one dictionary per language.
import type General from '~/content/text/en/general.json';
import type Home from '~/content/text/en/home.json';
import type ApartmentText from '~/content/text/en/rino.json';
import type IslandText from '~/content/text/en/pag.json';
import type Form from '~/content/text/en/form.json';
import type { ApartmentSlug, IslandSlug } from '~/data/apartments';

export const languages = ['en', 'hr', 'de', 'it'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

const meta: Record<Lang, { langName: string; locale: string }> = {
  en: { langName: 'English', locale: 'en_GB' },
  hr: { langName: 'Hrvatski', locale: 'hr_HR' },
  de: { langName: 'Deutsch', locale: 'de_DE' },
  it: { langName: 'Italiano', locale: 'it_IT' },
};

const files = import.meta.glob<any>('../content/text/*/*.json', { eager: true, import: 'default' });
const load = (lang: Lang, name: string) => files[`../content/text/${lang}/${name}.json`];

// Long texts are stored as one block: paragraphs separated by an empty line, list items one per line.
const paragraphs = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);

const apartment = (t: typeof ApartmentText) => ({ ...t, body: paragraphs(t.body), goodToKnow: lines(t.goodToKnow) });
const island = (t: typeof IslandText) => ({ ...t, body: paragraphs(t.body) });

const build = (lang: Lang) => {
  const general: typeof General = load(lang, 'general');
  const home: typeof Home = load(lang, 'home');
  const form: typeof Form = load(lang, 'form');
  return {
    lang,
    ...meta[lang],
    ...general,
    home: { ...home, intro: paragraphs(home.intro), host: paragraphs(home.host) },
    apartments: {
      rino: apartment(load(lang, 'rino')),
      'punta-blue': apartment(load(lang, 'punta-blue')),
      'punta-orange': apartment(load(lang, 'punta-orange')),
    } satisfies Record<ApartmentSlug, unknown>,
    islands: { pag: island(load(lang, 'pag')), cres: island(load(lang, 'cres')) } satisfies Record<IslandSlug, unknown>,
    form,
  };
};
export type Dict = ReturnType<typeof build>;

const dicts = Object.fromEntries(languages.map((l) => [l, build(l)])) as Record<Lang, Dict>;
export const dict = (lang: string): Dict => dicts[lang as Lang] ?? dicts.en;

/** getStaticPaths helper: one entry per language. */
export const langPaths = () => languages.map((lang) => ({ params: { lang } }));
