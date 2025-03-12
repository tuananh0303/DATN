import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { showLoginModal } from '@/store/slices/userSlice';
import { message } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'player' | 'owner';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    if (!isLoading){
      setInitialCheckDone(true);
    
    if (!isAuthenticated) {
      message.warning('Please log in to access this page');
      dispatch(showLoginModal(location.pathname));
    } else if (requiredRole && user?.role !== requiredRole) {
      message.error(`You don't have permission to access this page. Required role: ${requiredRole}`);
    }
  }
  }, [isLoading, isAuthenticated, user, requiredRole, dispatch, location.pathname]);


  // Show loading while checking authentication
  // Hiển thị loading trong khi kiểm tra xác thực hoặc chưa hoàn tất kiểm tra ban đầu
  if (isLoading || !initialCheckDone) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If authenticated and has the required role (or no role required), render children
  if (isAuthenticated && (!requiredRole || user?.role === requiredRole)) {
    return <>{children}</>;
  }

  // If no authentication required or user is not authenticated, redirect to home page
  // The login modal will be shown by the useEffect above
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user doesn't have the required role, redirect to home
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;