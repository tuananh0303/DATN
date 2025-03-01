export const ROUTES = {
  // User routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FACILITY_DETAIL: '/facilitydetail',
  SECOND_HOME: '/secondhome',

  // Owner routes
  // Schedule Management
  PLAY_SCHEDULE: '/owner',
  DIRECT_ORDER: '/owner/play-schedule/direct-order',
  HISTORY_ORDER: '/owner/play-schedule/history-order',

  // Facility Management  
  FACILITY_MANAGEMENT: '/owner/facility-management',
  EDIT_FACILITY: '/owner/facility-management/edit',
  CREATE_FACILITY: '/owner/facility-management/create',

  // Field Management
  FIELD_MANAGEMENT: '/owner/field-management',
  CREATE_FIELD: '/owner/field-management/create', 

  // Service Management 
  SERVICE_MANAGEMENT: '/owner/service-management',
  CREATE_SERVICE: '/owner/service-management/create', 

  // Voucher Management
  VOUCHER_MANAGEMENT: '/owner/voucher-management',
  CREATE_VOUCHER: '/owner/voucher-management/create',

  // Event Management
  EVENT_MANAGEMENT: '/owner/event-management',
  CREATE_EVENT: '/owner/event-management/create',

  // Review Management
  REVIEW_MANAGEMENT: '/owner/review-management',

  // Chat
  CHAT: '/owner/chat',
  // Report Management  
  REPORT_MANAGEMENT: '/owner/report-management',
  
  // Banking
  BANKING: '/owner/banking',

  // Error routes
  ERROR: '*'
} as const;
