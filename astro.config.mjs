import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Owner-confirmed domain. Review builds remain noindex; this does not publish the site.
export default defineConfig({
  output: 'static',
  site: 'https://www.kanjayconsulting.com',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [react()],
});
