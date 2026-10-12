# Panda Gallery

A meme gallery for photos and videos. Browse and submit memes. UI inspired by 2010-era Facebook.

## How the content works

| Sumber | Disimpan di | Cara update |
|---|---|---|
| **Your memes** (owner) | `src/data/memes.json` + files in `public/memes/` | Edit the file, `git push` -- Vercel auto-deploys |

**Public submissions** go through a Google Form (linked in the header and sidebar), so nothing lands in the site until you add it yourself -- every update is still just a deploy. No database, no admin login, no server code: this is a pure static site.

## Tech Stack

- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **Hosting:** Vercel (static)
- **Public submissions:** Google Form (link in `src/config.ts`)

## Local Development

```bash
npm install
npm run dev
```

## Adding your own memes (every update = a deploy)

1. Put the file in `public/memes/` (e.g. `public/memes/doge.jpg`)
2. Add an entry to `src/data/memes.json`:

```json
[
  {
    "id": "doge-1",
    "name": "Doge to the Moon",
    "description": "Such wow. Very meme.",
    "media_url": "/memes/doge.jpg",
    "media_type": "image",
    "thumbnail_url": null,
    "created_at": "2026-01-15T10:00:00.000Z",
    "credit_name": "Fly you Fools",
    "credit_url": "https://x.com/Fly_you_fools/"
  }
]
```

`credit_name` + `credit_url` are optional -- when set, a linked credit (with the X logo) appears on the card and on the detail page (omit them or set to `null` to hide).

3. Commit and push -- Vercel deploys automatically and the gallery updates.

To remove a meme, delete its entry from the JSON (and the file if you want).

## Deploy to Vercel

1. Push this repo to GitHub
2. [vercel.com](https://vercel.com) -> **Add New Project** -> import the repo
3. Vercel auto-detects Vite -- no build settings, no environment variables, no storage
4. **Deploy**

## Changing the upload form

The header button and sidebar button both open a Google Form. Edit the URL in `src/config.ts`:

```ts
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/.../viewform';
```

## Notes

- Every meme card and detail page has a **Download** button and an optional **credit** link (X profile) from the JSON.
- The gallery only shows what is in `src/data/memes.json`, so the fastest way to publish a Google Form submission is to add it there and push.

## Build

```bash
npm run build       # Build for production
npm run typecheck   # Type check
npm run lint        # ESLint
```
