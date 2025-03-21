import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const handleAuthenticationMessages = useCallback(() => {
    if (!isAuthenticated && !messageShownRef.current && localStorage.getItem('access_token') === null) {
      messageShownRef.current = true;
      message.warning('Vui lòng đăng nhập để truy cập trang này');
      dispatch(showLoginModal(window.location.pathname));
    } 
    else if (isAuthenticated && requiredRole && user?.role !== requiredRole && !messageShownRef.current) {
      messageShownRef.current = true;
      message.error(`Bạn không có quyền truy cập trang này. Yêu cầu vai trò: ${requiredRole}`);
    }
  }, [isAuthenticated, user, requiredRole, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setInitialCheckDone(true);
      handleAuthenticationMessages();
    }
  }, [isLoading, handleAuthenticationMessages]);

  // Hiển thị loading trong khi kiểm tra xác thực hoặc chưa hoàn tất kiểm tra ban đầu
  if (isLoading || !initialCheckDone) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Kiểm tra cả xác thực và vai trò
  if (isAuthenticated) {
    // Nếu có yêu cầu vai trò và vai trò không phù hợp, chuyển hướng về trang chủ
    if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    // Nếu xác thực và có vai trò phù hợp (hoặc không yêu cầu vai trò), hiển thị children
    return <>{children}</>;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }
  // Nếu người dùng không có vai trò cần thiết, chuyển hướng đến trang chủ
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;