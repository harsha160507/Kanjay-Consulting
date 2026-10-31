// Extracts from the owner's updated content/services.md, not expanded promises.
// IDs are shared by Home and the interim Services section index.
export const homePaths = [
  { id: 'hr-support', number: '01', title: 'HR support', market: 'For employers · Global support', intro: 'Support for the people and processes behind your business.', services: [
    { id: 'hr-audit-process-setup', name: 'HR Audit & HR Process Setup', summary: 'We review existing processes, records and documentation, identify gaps and establish practical HR systems that support your business as it grows.' },
    { id: 'recruitment-talent-acquisition', name: 'Recruitment & Talent Acquisition', summary: 'We support job descriptions, candidate sourcing, screening, interview coordination and selection follow-ups to make hiring more structured and efficient.' },
    { id: 'payroll-statutory-compliance', name: 'Payroll & Statutory Compliance', summary: 'Simplify monthly payroll with coordinated attendance inputs, salary calculations and payslip preparation. We also support applicable statutory compliance activities and coordinate with your finance team or compliance specialists.' },
  ] },
  { id: 'gem-seller-support', number: '02', title: 'GeM seller support', market: 'For sellers · Across India', intro: 'Guidance for businesses working through the Government e-Marketplace portal.', services: [
    { id: 'seller-registration-profile-setup', name: 'Seller Registration & Profile Setup', summary: 'We assist with registration, document coordination and profile setup to showcase your business on the portal.' },
    { id: 'bid-search-analysis', name: 'Bid Search & Analysis', summary: 'We review relevant bids, eligibility criteria, technical requirements and submission timelines to help you make informed participation decisions.' },
    { id: 'order-contract-support', name: 'Order & Contract Support', summary: 'We assist with order acceptance, contract requirement tracking, delivery coordination and portal invoicing, helping you manage commitments and follow-ups.' },
  ] },
] as const;

// Explicit website approvals in the owner's client-approvals.md; existing assets.
export const homeClients = [
  { file: 'EATON', name: 'Eaton' }, { file: 'AAVIZA', name: 'Aaviza Technologies' },
  { file: 'DEFORAY', name: 'Deforay' }, { file: 'ZUPPA', name: 'Zuppa' },
  { file: 'WOYC', name: 'Woyc::OD' },
] as const;
