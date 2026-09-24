export default function SunFace({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <g stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round">
        <line x1="100" y1="10" x2="100" y2="30" />
        <line x1="100" y1="170" x2="100" y2="190" />
        <line x1="10" y1="100" x2="30" y2="100" />
        <line x1="170" y1="100" x2="190" y2="100" />
        <line x1="34" y1="34" x2="48" y2="48" />
        <line x1="152" y1="152" x2="166" y2="166" />
        <line x1="34" y1="166" x2="48" y2="152" />
        <line x1="152" y1="48" x2="166" y2="34" />
      </g>
      <circle cx="100" cy="100" r="56" fill="var(--color-primary)" />
      <circle cx="82" cy="94" r="5.5" fill="var(--color-dark)" />
      <circle cx="118" cy="94" r="5.5" fill="var(--color-dark)" />
      <path
        d="M78 112c6 10 38 10 44 0"
        stroke="var(--color-dark)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="66" cy="106" rx="7" ry="4.5" fill="#f6d9ae" opacity="0.7" />
      <ellipse cx="134" cy="106" rx="7" ry="4.5" fill="#f6d9ae" opacity="0.7" />
    </svg>
  );
}
