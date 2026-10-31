import { currentClients } from './clients';
import { dedupeClients } from '../lib/client-logos';

// Shared canonical set, including SILQ following the owner’s Clients-page request.
export const homeClients = dedupeClients(currentClients);
