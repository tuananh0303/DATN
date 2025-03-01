import { lazy } from 'react';
import { ROUTES } from './constants';

const PlaySchedule = lazy(() => import('@/pages/Owner/PlaySchedule/PlaySchedule'));


const FacilityManagement = lazy(() => import('@/pages/Owner/FacilityManager/FacilityManagement'));


const FieldManagement = lazy(() => import('@/pages/Owner/FieldManagement/FieldManagement'));
const CreateandFixField = lazy(() => import('@/pages/Owner/FieldManagement/CreateandFixField/CreateandFixField'));

const ServiceManagement = lazy(() => import('@/pages/Owner/ServiceManagement/ServiceManagement'));
const CreateService = lazy(() => import('@/pages/Owner/ServiceManagement/CreateService/CreateService'));  

const VoucherManagement = lazy(() => import('@/pages/Owner/VoucherManagement/VoucherManagement'));
const CreateVoucher = lazy(() => import('@/pages/Owner/VoucherManagement/CreateVoucher/CreateVoucher'));

const EventManagement = lazy(() => import('@/pages/Owner/EventManagement/EventManagement'));
const CreateEvent = lazy(() => import('@/pages/Owner/EventManagement/CreateEvent/CreateEvent'));

const Banking = lazy(() => import('@/pages/Owner/Banking/Banking'));

const ChatManagement = lazy(() => import('@/pages/Owner/ChatManagement/ChatManagement'));

const ReportManagement = lazy(() => import('@/pages/Owner/ReportManagement/ReportManagement'));

const ReviewManagement = lazy(() => import('@/pages/Owner/ReviewManagement/ReviewManagement'));


export const ownerRoutes = [
  {
    path: ROUTES.PLAY_SCHEDULE, element: PlaySchedule 
  },
  {
    path: ROUTES.FACILITY_MANAGEMENT, element: FacilityManagement 
  },
  {
    path: ROUTES.FIELD_MANAGEMENT, element: FieldManagement 
  },
  {
    path: ROUTES.CREATE_FIELD, element: CreateandFixField 
  },
  {
    path: ROUTES.SERVICE_MANAGEMENT, element: ServiceManagement
  },
  {
    path: ROUTES.CREATE_SERVICE, element: CreateService
  },
  {
    path: ROUTES.VOUCHER_MANAGEMENT, element: VoucherManagement
  },
  {
    path: ROUTES.CREATE_VOUCHER, element: CreateVoucher
  },
  {
    path: ROUTES.EVENT_MANAGEMENT, element: EventManagement
  },
  {
    path: ROUTES.CREATE_EVENT, element: CreateEvent
  },
  {
    path: ROUTES.BANKING, element: Banking
  },
  {
    path: ROUTES.CHAT, element: ChatManagement
  },  
  {
    path: ROUTES.REPORT_MANAGEMENT, element: ReportManagement
  },
  {
    path: ROUTES.REVIEW_MANAGEMENT, element: ReviewManagement
  }
]

