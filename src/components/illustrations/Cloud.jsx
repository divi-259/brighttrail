export default function Cloud({ size = 60, className }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 60 36" fill="none" className={className}>
      <ellipse cx="18" cy="22" rx="16" ry="12" fill="#ffffff" opacity="0.85" />
      <ellipse cx="34" cy="16" rx="14" ry="14" fill="#ffffff" opacity="0.85" />
      <ellipse cx="46" cy="24" rx="12" ry="10" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
