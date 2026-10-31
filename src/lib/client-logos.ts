export interface ClientLogo {
  id: string;
  name: string;
  image: string;
  width: number;
  height: number;
  darkBacking: boolean;
}

/** Dedupe by identity, name or asset; never infer a new relationship. */
export function dedupeClients<T extends ClientLogo>(clients: readonly T[]): T[] {
  const seen = new Set<string>();
  return clients.filter(client => {
    const keys = [
      `id:${client.id.trim().toLowerCase()}`,
      `name:${client.name.normalize('NFKC').trim().toLowerCase()}`,
      `image:${client.image.trim().toLowerCase()}`
    ];
    const duplicate = keys.some(key => seen.has(key));
    keys.forEach(key => seen.add(key));
    return !duplicate;
  });
}

/** Similar artwork area with caps for tall emblems and long wordmarks. */
export function logoDimensions(client: Pick<ClientLogo, 'width' | 'height'>) {
  const scale = Math.min(150 / client.width, 72 / client.height, Math.sqrt(6000 / (client.width * client.height)));
  return { width: Math.round(client.width * scale), height: Math.round(client.height * scale) };
}
