import type { MediaFilter, Meme } from '@/types';
// Konten galeri: edit file ini lalu push -> Vercel auto-deploy.
import ownerMemes from '@/data/memes.json';

/** Semua meme galeri, sudah difilter (jenis media + pencarian) dan diurutkan terbaru */
export async function fetchMemes(opts: { search?: string; filter?: MediaFilter } = {}): Promise<Meme[]> {
  const { search = '', filter = 'all' } = opts;

  let memes = [...(ownerMemes as Meme[])];

  if (filter === 'video') memes = memes.filter((m) => m.media_type === 'video');
  if (filter === 'photo') memes = memes.filter((m) => m.media_type === 'image');

  const q = search.trim().toLowerCase();
  const filtered = q
    ? memes.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))
    : memes;

  return filtered.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function fetchMemeById(id: string): Promise<Meme | null> {
  const memes = await fetchMemes();
  return memes.find((m) => m.id === id) ?? null;
}
