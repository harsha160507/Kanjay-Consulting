// Owner-confirmed facts from updated ZIP and chat. No claims inferred from old copy.
export const business = {
  projectName: 'Kanjay Consulting',
  legalEntity: 'Kanjay Consulting',
  phone: '+918939715152',
  phoneDisplay: '+91 89397 15152',
  email: 'info@kanjayconsulting.com',
  candidateEmail: 'hr@kanjayconsulting.com',
  address: 'VILLA 12, Chettinadu Enclave, Near SG Swim School, Phase 2, S Kolathur Road, Narayanapuram, Pallikaranai, Chennai-600100, Tamil Nadu',
  canonicalDomain: 'https://www.kanjayconsulting.com',
  established: 2014,
  gemSince: 2018,
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kanjay-consulting/' },
    { label: 'Facebook', href: 'https://www.facebook.com/kanjayconsulting' },
  ],
  // Page-level content remains for later phases; approvals are recorded in docs/PHASE-1.md.
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
