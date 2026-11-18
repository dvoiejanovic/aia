// BASE_URL is '/' on a custom domain and '/repo-name/' on a GitHub Pages project site.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Internal link: url('en', 'rino/') -> /en/rino/ */
export const url = (lang: string, path = '') => `${base}/${lang}/${path}`;
