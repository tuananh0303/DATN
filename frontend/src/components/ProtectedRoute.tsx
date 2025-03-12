import React, { useEffect, useRef, useState } from 'react';
import { Navigate} from 'react-router-dom';
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
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const messageShownRef = useRef(false);

  useEffect(() => {
    console.log('useEffect running with:', { isLoading, isAuthenticated, user, requiredRole });
    if (!isLoading) {
      setInitialCheckDone(true);
      
      if (!isAuthenticated && !messageShownRef.current) {
        messageShownRef.current = true;
        message.warning('Please log in to access this page');
        dispatch(showLoginModal());
      } else if (requiredRole && user?.role !== requiredRole && !messageShownRef.current) {
        messageShownRef.current = true;
        message.error(`You don't have permission to access this page. Required role: ${requiredRole}`);
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, dispatch]);


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