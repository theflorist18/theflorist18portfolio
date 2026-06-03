// Static gold line-art sports-car silhouette.
// Used as the reduced-motion / no-WebGL fallback AND the Suspense placeholder
// while the 3D scene chunk loads.
export default function CarPoster({ subtle = false }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 460 180"
        className="w-[min(80%,640px)] h-auto"
        fill="none"
        aria-hidden="true"
        style={{ opacity: subtle ? 0.5 : 0.9 }}
      >
        <defs>
          <linearGradient id="carstroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8bd84" />
            <stop offset="100%" stopColor="#a98a4f" />
          </linearGradient>
        </defs>
        {/* road line */}
        <line x1="20" y1="150" x2="440" y2="150" stroke="url(#carstroke)" strokeOpacity="0.35" strokeWidth="1" />
        {/* body — fastback profile */}
        <path
          d="M44,132 C30,132 26,108 50,100 L120,92 C140,90 150,66 188,58 L268,56 C320,58 352,86 384,98 L412,100 C432,102 432,126 414,132 Z"
          stroke="url(#carstroke)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* window band */}
        <path
          d="M150,66 C168,58 196,57 236,57 C276,57 300,66 320,80 L160,80 Z"
          stroke="url(#carstroke)"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* wheels */}
        <g stroke="url(#carstroke)" strokeWidth="1.5">
          <circle cx="138" cy="132" r="26" />
          <circle cx="138" cy="132" r="11" strokeOpacity="0.5" />
          <circle cx="338" cy="132" r="26" />
          <circle cx="338" cy="132" r="11" strokeOpacity="0.5" />
        </g>
        {/* headlight */}
        <circle cx="58" cy="104" r="3.5" fill="#d8bd84" />
      </svg>
    </div>
  )
}
