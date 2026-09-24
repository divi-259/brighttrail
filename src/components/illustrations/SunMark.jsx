export default function SunMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="14" fill="var(--color-primary)" />
      <g stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="12" />
        <line x1="32" y1="52" x2="32" y2="60" />
        <line x1="4" y1="32" x2="12" y2="32" />
        <line x1="52" y1="32" x2="60" y2="32" />
        <line x1="12.3" y1="12.3" x2="17.9" y2="17.9" />
        <line x1="46.1" y1="46.1" x2="51.7" y2="51.7" />
        <line x1="12.3" y1="51.7" x2="17.9" y2="46.1" />
        <line x1="46.1" y1="17.9" x2="51.7" y2="12.3" />
      </g>
    </svg>
  );
}
