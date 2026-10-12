import { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, LayoutGrid, Video } from 'lucide-react';
import { Header } from './Header';
import { MemeCard } from './MemeCard';
import { SearchSortBar } from './SearchSortBar';
import { MemeDetail } from './MemeDetail';
import { LoadingState, EmptyState, ErrorState, NoResultsState } from './States';
import { PandaMark } from './PandaMark';
import { fetchMemes } from '@/lib/api';
import type { MediaFilter, Meme } from '@/types';

type View = 'gallery' | 'detail';

const FILTERS: { value: MediaFilter; label: string; icon: typeof LayoutGrid }[] = [
  { value: 'all', label: 'All memes', icon: LayoutGrid },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'photo', label: 'Photos', icon: ImageIcon },
];

function countLabel(filter: MediaFilter, count: number): string {
  if (filter === 'video') return `${count} ${count === 1 ? 'video' : 'videos'} in the gallery`;
  if (filter === 'photo') return `${count} ${count === 1 ? 'photo' : 'photos'} in the gallery`;
  return `${count} ${count === 1 ? 'meme' : 'memes'} in the gallery`;
}

export function Gallery() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<MediaFilter>('all');
  const [view, setView] = useState<View>('gallery');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadMemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMemes({ search, filter });
      setMemes(data);
    } catch {
      setError('Failed to load memes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    void loadMemes();
  }, [loadMemes]);

  const handleCardClick = (id: string) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleBackToGallery = () => {
    setView('gallery');
    setSelectedId(null);
    void loadMemes();
  };

  return (
    <div className="flex h-dvh flex-col bg-panda-bg text-panda-text">
      <Header />

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-10">
          {view === 'gallery' && (
            <>
              <section className="relative mb-8 overflow-hidden rounded-3xl bg-panda-black px-6 py-8 text-white sm:px-10 sm:py-11">
                <div className="relative z-10 max-w-2xl">
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    The $PANDA community meme archive
                  </p>
                  <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                    Panda Gallery<span className="text-white/40">.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/65 sm:text-base">
                    A community gallery for bagworking $PANDA Pandacoin. Explore panda memes, discover
                    the community, and share your favorites.
                  </p>
                </div>
                <PandaMark className="absolute -right-5 -top-8 h-[230px] w-[230px] opacity-[0.15] sm:right-6 sm:top-1 sm:h-[280px] sm:w-[280px]" />
                <div aria-hidden="true" className="absolute -bottom-20 right-16 h-56 w-56 rounded-full border border-white/10 sm:right-52" />
              </section>

              <section aria-label="Meme collection">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2" role="group" aria-label="Filter memes">
                    {FILTERS.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setFilter(value)}
                        aria-pressed={filter === value}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                          filter === value
                            ? 'border-panda-black bg-panda-black text-white'
                            : 'border-panda-border bg-white text-panda-muted hover:border-panda-black hover:text-panda-black'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="w-full sm:max-w-xs">
                    <SearchSortBar search={search} onSearchChange={setSearch} />
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between border-b border-panda-border pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-panda-black">
                    Fresh from the community
                  </h3>
                  <span className="text-xs text-panda-muted">
                    {memes.length > 0 ? countLabel(filter, memes.length) : 'Share a panda meme'}
                  </span>
                </div>

                {loading ? (
                  <LoadingState />
                ) : error ? (
                  <ErrorState message={error} onRetry={() => void loadMemes()} />
                ) : memes.length === 0 && !search && filter === 'all' ? (
                  <EmptyState />
                ) : memes.length === 0 ? (
                  <NoResultsState query={search} />
                ) : (
                  <div className="grid animate-fade-in grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {memes.map((meme) => (
                      <MemeCard key={meme.id} meme={meme} onClick={() => handleCardClick(meme.id)} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {view === 'detail' && selectedId && (
            <div className="mx-auto max-w-3xl">
              <MemeDetail memeId={selectedId} onClose={handleBackToGallery} />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-panda-border bg-white px-5 py-4 text-center sm:px-8">
        <p className="text-[11px] leading-[1.6] text-panda-muted">
          Panda Gallery · A community-made meme gallery for{" "}
          <a
            href="https://pump.fun/coin/2bN9YoTKiejNonS4Q1EjhypvRfndZLEiYJZUHLwYpump"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-panda-black underline decoration-1 underline-offset-2 hover:text-panda-muted"
          >
            $PANDA
          </a>{" "}
          Pandacoin. Created by{" "}
          <a
            href="https://x.com/rektbrewz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-panda-black underline decoration-1 underline-offset-2 hover:text-panda-muted"
          >
            rektbrewz
          </a>
          , for the community.
        </p>
      </footer>
    </div>
  );
}
