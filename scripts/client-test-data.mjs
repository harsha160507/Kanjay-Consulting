import { readFileSync, existsSync } from 'node:fs';
const source=readFileSync('src/data/clients.ts','utf8');
export const currentClients=JSON.parse(source.split('export const currentClients = ')[1].split(' as const;')[0]);
export const neutralClients=JSON.parse(source.split('export const neutralClients = ')[1].split(' as const;')[0]).filter(c=>existsSync('public'+c.image));
export const clients=[...new Map([...currentClients,...neutralClients].map(c=>[c.id,c])).values()];
