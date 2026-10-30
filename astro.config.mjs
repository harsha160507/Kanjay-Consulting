import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Canonical domain is recorded in site data; internal previews stay noindex and have no production canonical tag.
export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [react()],
});
