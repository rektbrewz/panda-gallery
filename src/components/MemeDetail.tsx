import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Download, ImageIcon, Loader2, Video } from 'lucide-react';
import { fetchMemeById } from '@/lib/api';
import type { Meme } from '@/types';
import { formatDate } from '@/utils/format';
import { downloadMedia, fileNameFromUrl } from '@/utils/download';
import { ModalCloseButton } from './Header';
import { XIcon } from './XIcon';

interface MemeDetailProps {
  memeId: string;
  onClose: () => void;
}

const actionBtn =
  'flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-colors';

export function MemeDetail({ memeId, onClose }: MemeDetailProps) {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const m = await fetchMemeById(memeId);
      if (cancelled) return;
      setMeme(m);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [memeId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-panda-border bg-white py-24">
        <Loader2 className="h-5 w-5 animate-spin text-panda-muted" />
        <p className="text-xs text-panda-muted">Loading meme...</p>
      </div>
    );
  }

  if (!meme) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-panda-border bg-white py-24 text-center">
        <p className="text-xs text-panda-muted">This meme could not be found.</p>
        <button
          onClick={onClose}
          className="rounded-full bg-panda-black px-4 py-2 text-xs font-bold text-white transition hover:bg-panda-dark"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  const hasCredit = Boolean(meme.credit_name && meme.credit_url);

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-panda-border bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-panda-border px-4 py-3">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-bold text-panda-black hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Gallery
        </button>
        <ModalCloseButton onClose={onClose} />
      </div>

      {/* Media */}
      <div className="relative border-b border-panda-border bg-panda-panel p-4 sm:p-6">
        {meme.media_type === 'video' ? (
          <video
            src={meme.media_url}
            controls
            autoPlay
            className="mx-auto max-h-[55vh] w-full object-contain"
          />
        ) : (
          <img
            src={meme.media_url}
            alt={meme.name}
            className="mx-auto max-h-[55vh] w-full object-contain"
          />
        )}

        {/* Download */}
        <button
          onClick={() => void downloadMedia(meme.media_url, fileNameFromUrl(meme.media_url))}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-panda-border bg-white text-panda-black shadow-sm transition hover:bg-panda-black hover:text-white"
          aria-label={`Download ${meme.name}`}
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-7">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-panda-panel px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-panda-black">
            {meme.media_type === 'video' ? (
              <Video className="h-2.5 w-2.5" />
            ) : (
              <ImageIcon className="h-2.5 w-2.5" />
            )}
            {meme.media_type}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-panda-muted">
            <Calendar className="h-2.5 w-2.5" />
            {formatDate(meme.created_at)}
          </span>
          {hasCredit && (
            <a
              href={meme.credit_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-panda-border px-3 py-1.5 text-[10px] font-bold text-panda-black hover:bg-panda-panel hover:underline"
            >
              <XIcon className="h-2.5 w-2.5" />
              {meme.credit_name}
            </a>
          )}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-panda-black">{meme.name}</h2>

        {/* Actions */}
        <div className="mt-5 border-t border-panda-border pt-5">
          <button
            onClick={() => void downloadMedia(meme.media_url, fileNameFromUrl(meme.media_url))}
            className={`${actionBtn} border-panda-black bg-panda-black text-white hover:bg-panda-dark`}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>

        {meme.description && (
          <p className="mt-4 text-sm leading-6 text-panda-muted">{meme.description}</p>
        )}
      </div>
    </div>
  );
}
