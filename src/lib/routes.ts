export function routeContext(pathname: string) {
  const match = pathname.match(/^\/theme\/(light|dark)(?:\/|$)/);
  const theme = match?.[1] as 'light' | 'dark' | undefined;
  const raw = theme ? pathname.replace(/^\/theme\/(light|dark)/, '') : pathname;
  const page = raw === '/' || raw === '' ? '/' : `/${raw.replace(/^\/|\/$/g, '')}/`;
  return { theme, page, to: (target: string) => theme ? `/theme/${theme}${target}` : target };
}
