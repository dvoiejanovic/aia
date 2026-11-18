# Adriatic Island Apartments

Website for three holiday apartments on Pag and Cres, built with [Astro](https://astro.build).

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321/aia/  (npx astro dev stop to stop it)
npm run build      # static site in dist/
```

The site exists in EN, HR, DE and IT: `/en/`, `/hr/`, `/de/`, `/it/`. The root sends visitors to their browser language.

## Where things live

- `src/content/prices.json` – season prices and fees
- `src/content/text/<language>/` – all text, a few files per language
- `src/data/apartments.ts` – other facts: capacity, addresses, amenities, photo order
- `src/assets/photos/` – selected photos, downscaled from the originals
- `src/components/`, `src/layouts/`, `src/styles/`, `src/pages/[lang]/` – the site itself
- `public/admin/` – the admin page and its settings (`config.yml`)
- `.github/workflows/deploy.yml` – publishes to GitHub Pages on every change to `main`

## Admin page

Open `/admin/index.html` on the published site (locally: http://localhost:4321/aia/admin/index.html).
It edits the files in `src/content/` and saves them to GitHub; the site is republished a minute or two later.

Sign in with **Sign In Using Access Token**. Create the token on GitHub under
Settings → Developer settings → Fine-grained tokens, limited to this repository,
with the permission *Contents: Read and write*.

Long texts are one box: leave an empty line between paragraphs, and write list items one per line.
A new text key or a new apartment also needs a matching field in `public/admin/config.yml`.

## Inquiry form

Without configuration the form opens the guest's email app with the inquiry prefilled.
To send directly: get a free access key at web3forms.com using the address inquiries should go to,
copy `.env.example` to `.env`, and paste the key in.
For the published site, add it on GitHub as the repository variable `WEB3FORMS_KEY`
(Settings → Secrets and variables → Actions → Variables).

## Before going live

- Custom domain: set `site` in `astro.config.mjs`, delete `base`, and add `public/CNAME` with the domain.
- Add map coordinates to `src/lib/schema.ts`.
