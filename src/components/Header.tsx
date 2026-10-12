import { ArrowUpRight, Plus, X } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/config';
import { PandaMark } from './PandaMark';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-panda-black text-white">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <PandaMark className="h-10 w-10" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-extrabold tracking-[0.13em]">PANDA GALLERY</span>
            <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
              A meme archive
            </span>
          </span>
        </a>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-bold text-panda-black transition-colors hover:bg-white/85"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span className="hidden sm:inline">Add a meme</span>
          <span className="sm:hidden">Submit</span>
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </div>
    </header>
  );
}

interface ModalCloseButtonProps {
  onClose: () => void;
}

export function ModalCloseButton({ onClose }: ModalCloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className="flex h-8 w-8 items-center justify-center rounded-full text-panda-muted transition-colors hover:bg-panda-panel hover:text-panda-black"
      aria-label="Close"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
