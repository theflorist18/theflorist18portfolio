import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project site lives at https://theflorist18.github.io/theflorist18portfolio/
// `base` must match the repo name (with leading + trailing slash) so assets
// resolve under the subpath. If you ever move this to the ROOT site
// (repo named exactly `theflorist18.github.io`), change base back to '/'.
export default defineConfig({
  base: '/theflorist18portfolio/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
