const PALETTES = {
  warm: ["#d8e2c8", "#c3d4ac", "#aec690"],
  mint: ["#cfe4c5", "#b3d6a2", "#96c680"],
};

export default function Hills({ width = 240, height = 96, tone = "warm" }) {
  const [back, mid, front] = PALETTES[tone] ?? PALETTES.warm;
  return (
    <svg width={width} height={height} viewBox="0 0 240 96" fill="none" preserveAspectRatio="none">
      <path d="M0 96 Q50 40 100 62 T240 50 V96 Z" fill={back} />
      <path d="M0 96 Q65 58 130 74 T240 68 V96 Z" fill={mid} />
      <path d="M0 96 Q90 76 150 86 T240 84 V96 Z" fill={front} />
    </svg>
  );
}
