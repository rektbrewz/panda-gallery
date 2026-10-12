import { ExternalLink, ImageIcon, Loader2 } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/config';

const primaryBtn =
  'rounded-full bg-panda-black px-4 py-2.5 text-xs font-bold text-white transition hover:bg-panda-dark';
const secondaryBtn =
  'rounded-full border border-panda-border px-4 py-2.5 text-xs font-bold text-panda-black transition hover:bg-panda-panel';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-panda-border bg-white py-20">
      <Loader2 className="h-5 w-5 animate-spin text-panda-muted" />
      <p className="text-xs text-panda-muted">Loading fresh memes...</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center gap-4 rounded-2xl border border-panda-border bg-white px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-panda-panel">
        <ImageIcon className="h-6 w-6 text-panda-muted" />
      </div>
      <div>
        <h3 className="text-base font-bold text-panda-black">No memes yet</h3>
        <p className="mt-1 text-xs text-panda-muted">Be the first to share a meme in Panda Gallery.</p>
      </div>
      <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} inline-flex items-center gap-1`}>
        Add Your First Meme
        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
      </a>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center gap-3 rounded-2xl border border-panda-border bg-white px-6 py-12 text-center">
      <div>
        <h3 className="text-sm font-bold text-panda-black">Something went wrong</h3>
        <p className="mt-1 text-xs text-panda-muted">{message}</p>
      </div>
      <button onClick={onRetry} className={secondaryBtn}>
        Try Again
      </button>
    </div>
  );
}

export function NoResultsState({ query }: { query: string }) {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center gap-2 rounded-2xl border border-panda-border bg-white px-5 py-16 text-center">
      <h3 className="text-base font-bold text-panda-black">No memes found</h3>
      <p className="text-xs text-panda-muted">
        Nothing matches {query ? <>&ldquo;{query}&rdquo;</> : 'the current filter'}. Try a different search or filter.
      </p>
    </div>
  );
}
