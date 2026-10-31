import { business } from '../data/site';
import { routeContext } from './routes';
// Confirmed domain; indexing remains closed until a separately authorised launch.
export const sitemapPaths = ['/', '/about/', '/services/', '/clients/', '/contact/'];
export function seoFor(pathname: string, title: string, description: string) {
  const { page } = routeContext(pathname);
  const canonical = page.includes('/prototype') || page.includes('/404') ? undefined : new URL(page, business.canonicalDomain).href;
  return { title: title.endsWith(business.projectName) ? title : `${title} | ${business.projectName}`, description, canonical,
    image: `${business.canonicalDomain}/images/brand/kanjay-share.png` };
}
export const organization = {
  '@context': 'https://schema.org', '@type': 'Organization',
  '@id': `${business.canonicalDomain}/#organization`, name: business.projectName,
  url: business.canonicalDomain + '/', logo: business.canonicalDomain + '/images/brand/kanjay-logo.png',
  telephone: business.phone, email: business.email,
  sameAs: business.socialLinks.map(p => p.href),
};
