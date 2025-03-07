import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    // Auth
    // goToLogin: () => navigate(ROUTES.LOGIN),
    // goToRegister: () => navigate(ROUTES.REGISTER),
    // goToForgotPassword: () => navigate(ROUTES.FORGOT_PASSWORD),
    // goToResetPassword: () => navigate(ROUTES.RESET_PASSWORD),

    // Dashboard
    goToDashboard: () => navigate(ROUTES.DASHBOARD),

    // User Management
    goToUsers: () => navigate(ROUTES.USERS),
    goToUserDetail: (id: string) => navigate(ROUTES.USER_DETAIL.replace(':id', id)),
    // goToUserProfile: () => navigate(ROUTES.USER_PROFILE),
    // goToUserSettings: () => navigate(ROUTES.USER_SETTINGS),

    // Facility Management
    goToFacilities: () => navigate(ROUTES.FACILITIES),
    goToFacilityDetail: (id: string) => navigate(ROUTES.FACILITY_DETAIL.replace(':id', id)),
    // goToFacilityCreate: () => navigate(ROUTES.FACILITY_CREATE),
    // goToFacilityEdit: (id: string) => navigate(ROUTES.FACILITY_EDIT.replace(':id', id)),

    // Field Management
    goToFields: () => navigate(ROUTES.FIELDS),
    goToFieldDetail: (id: string) => navigate(ROUTES.FIELD_DETAIL.replace(':id', id)),
    // goToFieldCreate: () => navigate(ROUTES.FIELD_CREATE),
    // goToFieldEdit: (id: string) => navigate(ROUTES.FIELD_EDIT.replace(':id', id)),

    // Service Management
    goToServices: () => navigate(ROUTES.SERVICES),
    // goToServiceDetail: (id: string) => navigate(ROUTES.SERVICE_DETAIL.replace(':id', id)),
    // goToServiceCreate: () => navigate(ROUTES.SERVICE_CREATE),
    // goToServiceEdit: (id: string) => navigate(ROUTES.SERVICE_EDIT.replace(':id', id)),

    // Support Management
    goToSupports: () => navigate(ROUTES.SUPPORTS),
    // goToSupportChat: (id: string) => navigate(ROUTES.SUPPORT_CHAT.replace(':id', id)),
    // goToSupportTickets: () => navigate(ROUTES.SUPPORT_TICKETS),

    // Report Management
    goToReports: () => navigate(ROUTES.REPORTS),
    // goToReportDetail: (id: string) => navigate(ROUTES.REPORT_DETAIL.replace(':id', id)),
    // goToReportAnalytics: () => navigate(ROUTES.REPORT_ANALYTICS),
    // goToReportStatistics: () => navigate(ROUTES.REPORT_STATISTICS),

    // Settings
    goToSettings: () => navigate(ROUTES.SETTINGS),
    
    // Navigation helpers
    goBack: () => navigate(-1),
    goForward: () => navigate(1)
  };
};
