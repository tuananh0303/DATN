import { lazy } from 'react';
import { ROUTES } from './constants';

// Auth
// const Login = lazy(() => import('@/pages/Auth/Login'));
// const Register = lazy(() => import('@/pages/Auth/Register'));
// const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));
// const ResetPassword = lazy(() => import('@/pages/Auth/ResetPassword'));

// Dashboard
const Dashboard = lazy(() => import('@/pages/Dashboard/DashboardLayout'));

// User Management
const UserManagement = lazy(() => import('@/pages/UserManagement/UserManagement'));
const UserManagementProfile = lazy(() => import('@/pages/UserManagement/UserManagementprofile/UserManagementProfile'));
// const UserProfile = lazy(() => import('@/pages/UserProfile/UserProfile'));
// const UserSettings = lazy(() => import('@/pages/UserSettings/UserSettings'));

// Approval Management
const ApprovalManagement = lazy(() => import('@/pages/ApprovalManagement/ApprovalManagement'));
// const ApprovalDetailManagement = lazy(() => import('@/pages/ApprovalDetail/ApprovalDetailManagement'));
// const ApprovalCreate = lazy(() => import('@/pages/ApprovalManagement/ApprovalCreate'));
// const ApprovalEdit = lazy(() => import('@/pages/ApprovalManagement/ApprovalEdit'));

// Facility Management
const FacilityManagement = lazy(() => import('@/pages/FacilityManagement/FacilityManagement'));
const FacilityDetailManagement = lazy(() => import('@/pages/FacilityManagement/FacilityDetail/FacilityDetailManagement'));
// const FacilityCreate = lazy(() => import('@/pages/FacilityManagement/FacilityCreate'));
// const FacilityEdit = lazy(() => import('@/pages/FacilityManagement/FacilityEdit'));

// Field Management
const FieldManagement = lazy(() => import('@/pages/FieldManagement/FieldManagement'));
const FieldDetailManagement = lazy(() => import('@/pages/FieldManagement/FieldDetail/FieldDetailManagement'));
// const FieldCreate = lazy(() => import('@/pages/FieldManagement/FieldCreate'));
// const FieldEdit = lazy(() => import('@/pages/FieldManagement/FieldEdit'));

// Service Management
const ServiceManagement = lazy(() => import('@/pages/ServiceManagement/ServiceManagement'));
// const ServiceDetail = lazy(() => import('@/pages/ServiceManagement/ServiceDetail'));
// const ServiceCreate = lazy(() => import('@/pages/ServiceManagement/ServiceCreate'));
// const ServiceEdit = lazy(() => import('@/pages/ServiceManagement/ServiceEdit'));

// Support Management
const SupportManagement = lazy(() => import('@/pages/SupportManagement/SupportManagement'));
// const SupportChat = lazy(() => import('@/pages/SupportChat/SupportChat'));
// const SupportTickets = lazy(() => import('@/pages/SupportTickets/SupportTickets'));

// Report Management
const ReportManagement = lazy(() => import('@/pages/ReportManagement/ReportManagement'));
// const ReportDetail = lazy(() => import('@/pages/ReportDetail/ReportDetail'));
// const ReportAnalytics = lazy(() => import('@/pages/ReportAnalytics/ReportAnalytics'));
// const ReportStatistics = lazy(() => import('@/pages/ReportStatistics/ReportStatistics'));

// Voucher Management
const VoucherManagement = lazy(() => import('@/pages/VoucherManagement/VoucherManagement'));
// const VoucherDetail = lazy(() => import('@/pages/VoucherDetail/VoucherDetail'));
// const VoucherCreate = lazy(() => import('@/pages/VoucherManagement/VoucherCreate'));
// const VoucherEdit = lazy(() => import('@/pages/VoucherManagement/VoucherEdit'));

// Event Management
const EventManagement = lazy(() => import('@/pages/EventManagement/EventManagement'));
// const EventDetail = lazy(() => import('@/pages/EventDetail/EventDetail'));
// const EventCreate = lazy(() => import('@/pages/EventManagement/EventCreate'));
// const EventEdit = lazy(() => import('@/pages/EventManagement/EventEdit'));   

// Review Management
const ReviewManagement = lazy(() => import('@/pages/ReviewManagement/ReviewManagement'));
// const ReviewDetail = lazy(() => import('@/pages/ReviewDetail/ReviewDetail'));
// const ReviewCreate = lazy(() => import('@/pages/ReviewManagement/ReviewCreate'));
// const ReviewEdit = lazy(() => import('@/pages/ReviewManagement/ReviewEdit'));

// Settings
const Settings = lazy(() => import('@/pages/Settings/Settings'));

export const routes = [
  // Auth Routes
//   { path: ROUTES.LOGIN, element: Login },
//   { path: ROUTES.REGISTER, element: Register },
//   { path: ROUTES.FORGOT_PASSWORD, element: ForgotPassword },
//   { path: ROUTES.RESET_PASSWORD, element: ResetPassword },

  // Dashboard
  { path: ROUTES.DASHBOARD, element: Dashboard },

  // User Management Routes
  { path: ROUTES.USERS, element: UserManagement },
  { path: ROUTES.USER_DETAIL, element: UserManagementProfile },
//   { path: ROUTES.USER_PROFILE, element: UserProfile },
//   { path: ROUTES.USER_SETTINGS, element: UserSettings },

  // Approval Management Routes
  { path: ROUTES.APPROVALS, element: ApprovalManagement },
//   { path: ROUTES.APPROVAL_DETAIL, element: ApprovalDetailManagement },
//   { path: ROUTES.APPROVAL_CREATE, element: ApprovalCreate },
//   { path: ROUTES.APPROVAL_EDIT, element: ApprovalEdit },

  // Facility Management Routes
  { path: ROUTES.FACILITIES, element: FacilityManagement },
  { path: ROUTES.FACILITY_DETAIL, element: FacilityDetailManagement },
//   { path: ROUTES.FACILITY_CREATE, element: FacilityCreate },
//   { path: ROUTES.FACILITY_EDIT, element: FacilityEdit },

  // Field Management Routes
  { path: ROUTES.FIELDS, element: FieldManagement },
  { path: ROUTES.FIELD_DETAIL, element: FieldDetailManagement },
//   { path: ROUTES.FIELD_CREATE, element: FieldCreate },
//   { path: ROUTES.FIELD_EDIT, element: FieldEdit },

  // Service Management Routes
  { path: ROUTES.SERVICES, element: ServiceManagement },
//   { path: ROUTES.SERVICE_DETAIL, element: ServiceDetail },
//   { path: ROUTES.SERVICE_CREATE, element: ServiceCreate },
//   { path: ROUTES.SERVICE_EDIT, element: ServiceEdit },

  // Support Management Routes
  { path: ROUTES.SUPPORTS, element: SupportManagement },
//   { path: ROUTES.SUPPORT_CHAT, element: SupportChat },
//   { path: ROUTES.SUPPORT_TICKETS, element: SupportTickets },

  // Report Management Routes
  { path: ROUTES.REPORTS, element: ReportManagement },
//   { path: ROUTES.REPORT_DETAIL, element: ReportDetail },
//   { path: ROUTES.REPORT_ANALYTICS, element: ReportAnalytics },
//   { path: ROUTES.REPORT_STATISTICS, element: ReportStatistics },

  // Voucher Management Routes
  { path: ROUTES.VOUCHERS, element: VoucherManagement },
//   { path: ROUTES.VOUCHER_DETAIL, element: VoucherDetailManagement },
//   { path: ROUTES.VOUCHER_CREATE, element: VoucherCreate },
//   { path: ROUTES.VOUCHER_EDIT, element: VoucherEdit },

  // Event Management Routes
  { path: ROUTES.EVENTS, element: EventManagement },
//   { path: ROUTES.EVENT_DETAIL, element: EventDetail },
//   { path: ROUTES.EVENT_CREATE, element: EventCreate },
//   { path: ROUTES.EVENT_EDIT, element: EventEdit },   

  // Review Management Routes
  { path: ROUTES.REVIEWS, element: ReviewManagement },
//   { path: ROUTES.REVIEW_DETAIL, element: ReviewDetail },
//   { path: ROUTES.REVIEW_CREATE, element: ReviewCreate },
//   { path: ROUTES.REVIEW_EDIT, element: ReviewEdit }, 

  // Settings Routes
  { path: ROUTES.SETTINGS, element: Settings },
];
