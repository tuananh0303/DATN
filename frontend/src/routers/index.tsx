import { Routes, Route } from 'react-router-dom';
import { PlayerLayout } from './layouts/PlayerLayout';
import { OwnerLayout } from './layouts/OwnerLayout';
import { PublicLayout } from './layouts/PublicLayout';

// Public pages
import ErrorPage from '@/pages/Public/Error';
import HomePage from '@/pages/Public/Home';
import UserProfile from '@/pages/UserProfile';
import DetailFacility from '@/pages/Public/DetailFacility';
import ResultSearch from '@/pages/Public/ResultSearch';

// Player pages
import BookingPage from '@/pages/Player/Booking';
import HistoryBooking from '@/pages/Player/HistoryBooking';
import ResultBooking from '@/pages/Player/ResutlBooking';

// Owner pages
import PlaySchedule from '@/pages/Owner/PlaySchedule/PlaySchedule';
import FacilityManagement from '@/pages/Owner/FacilityManager/FacilityManagement';
import CreateFacility from '@/pages/Owner/FacilityManager/CreateFacility/CreateFacility';

import FieldManagement from '@/pages/Owner/FieldManagement/FieldManagement';
import CreateField from '@/pages/Owner/FieldManagement/CreateField/CreateField';

import ServiceManagement from '@/pages/Owner/ServiceManagement/ServiceManagement';
import CreateService from '@/pages/Owner/ServiceManagement/CreateService/CreateService';

import VoucherManagement from '@/pages/Owner/VoucherManagement/VoucherManagement';
import CreateVoucher from '@/pages/Owner/VoucherManagement/CreateVoucher/CreateVoucher';

import EventManagement from '@/pages/Owner/EventManagement/EventManagement';
import CreateEvent from '@/pages/Owner/EventManagement/CreateEvent/CreateEvent';

import Banking from '@/pages/Owner/Banking/Banking';

import ChatManagement from '@/pages/Owner/ChatManagement/ChatManagement';

import ReportManagement from '@/pages/Owner/ReportManagement/ReportManagement';

import ReviewManagement from '@/pages/Owner/ReviewManagement/ReviewManagement';
import ProtectedRoute from '@/components/ProtectedRoute';

import ResultBookingVNPay from '@/pages/Player/ResultBookingVNPay';


const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/facility/:facilityId' element={<DetailFacility />} />
        <Route path='/result-search' element={<ResultSearch />} />
      </Route> 

      {/* player routes */}
      <Route element={
        <ProtectedRoute requiredRole="player">
          <PlayerLayout />
        </ProtectedRoute>
      }>
        <Route path='/user/booking/:facilityId' element={<BookingPage />} />
        <Route path='/user/history-booking' element={<HistoryBooking />} />
        <Route path='/user/booking/result-booking/:bookingId' element={<ResultBooking />} />
        <Route path='/user/booking/result-booking-vnpay' element={<ResultBookingVNPay />} />
        <Route path='/user/profile' element={<UserProfile />} />
      </Route>

      {/* owner routes */}
      <Route element={
        <ProtectedRoute requiredRole="owner">
          <OwnerLayout />
        </ProtectedRoute>
      }>
        <Route path='/owner' element={<PlaySchedule />} />
        <Route path='/owner/facility-management' element={<FacilityManagement />} />
        <Route path='/owner/field-management' element={<FieldManagement />} />
        <Route path='/owner/service-management' element={<ServiceManagement />} />
        <Route path='/owner/voucher-management' element={<VoucherManagement />} />
        <Route path='/owner/event-management' element={<EventManagement />} />
        <Route path='/owner/banking' element={<Banking />} />
        <Route path='/owner/chat' element={<ChatManagement />} />
        <Route path='/owner/report-management' element={<ReportManagement />} />
        <Route path='/owner/review-management' element={<ReviewManagement />} />  
        <Route path='/owner/create-facility' element={<CreateFacility />} />
        <Route path='/owner/create-field' element={<CreateField />} />
        <Route path='/owner/create-service' element={<CreateService />} />
        <Route path='/owner/create-voucher' element={<CreateVoucher />} />
        <Route path='/owner/create-event' element={<CreateEvent />} />  
        <Route path='/owner/profile' element={<UserProfile />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
