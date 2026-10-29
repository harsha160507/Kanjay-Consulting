import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Canonical domain and hosting connection await the owner's migration decisions.
export default defineConfig({
  output: 'static',
  integrations: [react()],
});
