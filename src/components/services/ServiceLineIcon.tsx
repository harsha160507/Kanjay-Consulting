import type { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
  'hr-audit-process-setup': <><path d="M11 6H7v23h18V6h-4M12 3h8v6h-8zM11 17l3 3 7-7M11 25h10" /></>,
  'recruitment-talent-acquisition': <><circle cx="16" cy="10" r="4" /><path d="M8 27v-3a8 8 0 0 1 16 0v3M25 8a4 4 0 0 1 0 8M28 26v-2a7 7 0 0 0-3-5M7 8a4 4 0 0 0 0 8M4 26v-2a7 7 0 0 1 3-5" /></>,
  'payroll-statutory-compliance': <><path d="M5 9h22v18H5zM5 9V5h19v4M21 16h6v6h-6z" /><circle cx="22" cy="19" r=".5" /></>,
  'hr-policies-documentation': <><path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6" /></>,
  'pms-kra-kpi': <><circle cx="15" cy="17" r="11" /><circle cx="15" cy="17" r="6" /><path d="M15 17 27 5M22 5h5v5" /></>,
  'employee-engagement-retention': <><path d="M16 27 5 16C-1 9 9 2 16 10 23 2 33 9 27 16zM8 17h5l3-5 3 9 3-4h5" /></>,
  'onboarding-exit-settlement': <><path d="M5 28h22M8 28V4h14v24M13 16h16M25 12l4 4-4 4" /></>,
  'seller-registration-profile-setup': <><path d="M5 13v15h22V13M3 13l4-9h18l4 9M3 13h26M10 28v-9h7v9M22 19h2" /></>,
  'product-service-catalogue-upload': <><rect x="4" y="4" width="9" height="9" rx="1" /><rect x="19" y="4" width="9" height="9" rx="1" /><rect x="4" y="19" width="9" height="9" rx="1" /><path d="M19 24h9M24 19v9" /></>,
  'bid-search-analysis': <><path d="M7 28H4V4h17v6M8 9h8M8 14h5" /><circle cx="20" cy="20" r="7" /><path d="m25 25 5 5" /></>,
  'tender-participation-support': <><path d="M7 3h13l5 5v21H7zM20 3v6h5M11 15h10M11 22l3 3 7-7" /></>,
  'oem-authorization-vendor-assessment': <><path d="m16 3 11 4v9c0 6-6 11-11 14C11 27 5 22 5 16V7zM11 16l4 4 7-8" /></>,
  'catalogue-approval-rejection-support': <><path d="M8 3h12l5 5v21H8zM20 3v6h5M11 16l3 3 7-7M12 25h9" /></>,
  'order-contract-support': <><rect x="4" y="10" width="24" height="18" rx="2" /><path d="M11 10V5h10v5M4 17h24M13 17v5h6v-5" /></>
};

export default function ServiceLineIcon({ serviceId }: { serviceId: string }) {
  return <svg className="service-title-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {icons[serviceId]}
  </svg>;
}
