import { Search } from 'lucide-react';

interface SearchSortBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchSortBar({ search, onSearchChange }: SearchSortBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-panda-muted" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search memes..."
        className="w-full rounded-full border border-panda-border bg-white py-3 pl-10 pr-4 text-xs text-panda-black outline-none transition placeholder:text-panda-muted focus:border-panda-black focus:ring-2 focus:ring-panda-black/10"
      />
    </div>
  );
}
