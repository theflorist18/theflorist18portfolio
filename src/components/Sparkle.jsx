// A four-point sparkle — the site's quiet brand motif.
export default function Sparkle({ size = 14, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 6 Q35.5 28.5 58 32 Q35.5 35.5 32 58 Q28.5 35.5 6 32 Q28.5 28.5 32 6 Z"
        fill="currentColor"
      />
    </svg>
  )
}
