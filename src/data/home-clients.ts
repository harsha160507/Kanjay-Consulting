import { currentClients } from './clients';
import { dedupeClients } from '../lib/client-logos';

// SILQ: owner-supplied asset and explicit Home display approval, 1 November 2026.
// No current/past relationship classification or service/result is inferred.
export const silqLogo = {
  id: 'silq', name: 'SILQ', image: '/images/clients/silq.webp',
  width: 412, height: 148, darkBacking: false
} as const;

export const homeClients = dedupeClients([...currentClients, silqLogo]);
