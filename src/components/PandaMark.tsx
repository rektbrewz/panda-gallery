interface PandaMarkProps {
  className?: string;
}

export function PandaMark({ className }: PandaMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <circle cx="9" cy="10" r="7" fill="#171717" />
      <circle cx="31" cy="10" r="7" fill="#171717" />
      <circle cx="20" cy="21" r="17" fill="white" />
      <ellipse cx="14" cy="19" rx="4.5" ry="6.5" transform="rotate(25 14 19)" fill="#171717" />
      <ellipse cx="26" cy="19" rx="4.5" ry="6.5" transform="rotate(-25 26 19)" fill="#171717" />
      <circle cx="14.5" cy="18" r="1.4" fill="white" />
      <circle cx="25.5" cy="18" r="1.4" fill="white" />
      <path d="M18 25.5c0-1.2.9-2 2-2s2 .8 2 2c0 1-1 1.8-2 2-1-.2-2-1-2-2Z" fill="#171717" />
      <path d="M20 27.5c0 2.2-3.5 3.4-5.1 1.2M20 27.5c0 2.2 3.5 3.4 5.1 1.2" stroke="#171717" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
