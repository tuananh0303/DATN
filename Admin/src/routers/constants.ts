export const ROUTES = {
  // Dashboard
  DASHBOARD: '/',
  
  // User Management
  USERS: '/users',
  USER_DETAIL: '/users/:id',
  USER_PROFILE: '/profile',
  USER_SETTINGS: '/settings',
  
  // Approval Management
  APPROVALS: '/approvals',
  APPROVAL_DETAIL: '/approvals/:id',
  
  // Facility Management
  FACILITIES: '/facilities',
  FACILITY_DETAIL: '/facilities/:id',
  FACILITY_CREATE: '/facilities/create',
  FACILITY_EDIT: '/facilities/:id/edit',
  
  // Field Management
  FIELDS: '/fields',
  FIELD_DETAIL: '/fields/:id',
  FIELD_CREATE: '/fields/create',
  FIELD_EDIT: '/fields/:id/edit',
  
  // Service Management
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:id',
  SERVICE_CREATE: '/services/create',
  SERVICE_EDIT: '/services/:id/edit',
  
  // Voucher Management
  VOUCHERS: '/vouchers',
  VOUCHER_DETAIL: '/vouchers/:id',
  VOUCHER_CREATE: '/vouchers/create',
  VOUCHER_EDIT: '/vouchers/:id/edit',
  
  // Event Management
  EVENTS: '/events',
  EVENT_DETAIL: '/events/:id',
  EVENT_CREATE: '/events/create',
  EVENT_EDIT: '/events/:id/edit',
  
  // Review Management
  REVIEWS: '/reviews',
  REVIEW_DETAIL: '/reviews/:id',
  
  // Support Management
  SUPPORTS: '/supports',
  SUPPORT_CHAT: '/supports/chat/:id',
  SUPPORT_TICKETS: '/supports/tickets',
  
  // Report Management
  REPORTS: '/reports',
  REPORT_DETAIL: '/reports/:id',
  REPORT_ANALYTICS: '/reports/analytics',
  REPORT_STATISTICS: '/reports/statistics',

  // Settings Management
  SETTINGS: '/settings',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Error
  NOT_FOUND: '*'
} as const;
