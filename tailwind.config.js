/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['General Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        elev: 'var(--bg-elev)',
        ink: 'var(--text)',
        dim: 'var(--text-dim)',
        faint: 'var(--text-faint)',
        gold: 'var(--gold)',
        line: 'var(--line)',
      },
      letterSpacing: {
        caps: '0.22em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        site: '1320px',
      },
    },
  },
  plugins: [],
}
