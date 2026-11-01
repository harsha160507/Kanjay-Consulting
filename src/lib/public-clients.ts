// Build-time only. Never emit a SILQ reference if its owner-supplied file is missing.
import { existsSync } from 'node:fs';
import { currentClients, neutralClients } from '../data/clients';
import { dedupeClients } from './client-logos';
// Astro bundles this module into a temporary build folder, so resolve from the
// project working directory rather than the bundled module's import.meta.url.
export const listedNeutralClients = neutralClients.filter(client => existsSync(`public${client.image}`));
export const publicClients = dedupeClients([...currentClients, ...listedNeutralClients]);
