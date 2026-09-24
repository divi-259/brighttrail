export default function Plant({ size = 90 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 100 90" fill="none">
      <path
        d="M50 88V44"
        stroke="var(--color-secondary)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M50 60c-14 2-24-8-26-22 16-2 26 8 26 22Z"
        fill="var(--color-secondary)"
      />
      <path
        d="M50 46c14 2 24-10 25-24-16-2-27 9-25 24Z"
        fill="var(--color-secondary)"
        opacity="0.8"
      />
      <path
        d="M32 88h36l-4-12H36z"
        fill="var(--color-dark)"
      />
    </svg>
  );
}
