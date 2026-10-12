import { Download, ImageIcon, Play } from 'lucide-react';
import type { Meme } from '@/types';
import { formatDate } from '@/utils/format';
import { downloadMedia, fileNameFromUrl } from '@/utils/download';
import { XIcon } from './XIcon';

interface MemeCardProps {
  meme: Meme;
  onClick: () => void;
}

const iconBtn =
  'flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-panda-black shadow-sm transition hover:bg-panda-black hover:text-white';

export function MemeCard({ meme, onClick }: MemeCardProps) {
  const hasCredit = Boolean(meme.credit_name && meme.credit_url);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-panda-border bg-white transition duration-200 hover:-translate-y-1 hover:border-panda-black/25 hover:shadow-xl hover:shadow-black/5"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-panda-panel">
        {meme.media_type === 'video' ? (
          <>
            <video
              src={meme.media_url}
              className="h-full w-full object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
                <Play className="h-4 w-4 fill-panda-black text-panda-black" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={meme.media_url}
            alt={meme.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        {/* Type badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-panda-black">
          {meme.media_type === 'video' ? (
            <Play className="h-2.5 w-2.5 fill-panda-black" />
          ) : (
            <ImageIcon className="h-2.5 w-2.5" />
          )}
          {meme.media_type}
        </div>

        {/* Download button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            void downloadMedia(meme.media_url, fileNameFromUrl(meme.media_url));
          }}
          className={`${iconBtn} absolute right-3 top-3`}
          aria-label={`Download ${meme.name}`}
          title="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Info */}
      <div className="px-4 pb-3 pt-4">
        <h3 className="truncate text-sm font-bold text-panda-black">{meme.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-[1.55] text-panda-muted">{meme.description}</p>

        {/* Credit */}
        {hasCredit && (
          <a
            href={meme.credit_url as string}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-panda-black hover:underline"
          >
            <XIcon className="h-3 w-3" />
            {meme.credit_name}
          </a>
        )}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between border-t border-panda-border px-4 py-3">
        <span className="text-[10px] font-medium text-panda-muted">{formatDate(meme.created_at)}</span>
      </div>
    </div>
  );
}
