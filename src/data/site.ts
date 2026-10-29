// Source-supported candidates belong in docs, never in production contact links.
export const business = {
  projectName: 'Kanjay Consulting',
  legalEntity: null,
  phone: null,
  email: null,
  address: null,
  canonicalDomain: null,
  socialLinks: [],
  approvedClients: [],
  approvedServices: [],
} as const;

export const pages = [
  { slug: 'about', title: 'About Us' },
  { slug: 'services', title: 'Services' },
  { slug: 'clients', title: 'Clients' },
  { slug: 'contact', title: 'Contact Us' },
  { slug: 'terms-of-use', title: 'Terms of Use' },
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'cookie-policy', title: 'Cookie Policy' },
  { slug: 'disclaimer', title: 'Disclaimer' },
] as const;
