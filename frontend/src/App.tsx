import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter  from './routers/index';
import { useAppSelector } from './hooks/reduxHooks';
import { useAppDispatch } from './hooks/reduxHooks';
// import { getUserInfo } from './store/slices/userSlice';
import LoginModal from './components/LoginModal';
import { login } from './store/slices/userSlice';


const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const { loginModalVisible } = useAppSelector(state => state.user);

  // Check if user is already logged in on app startup
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Sử dụng thông tin đã lưu trong localStorage để khôi phục phiên đăng nhập
      dispatch(login({ email: '', password: '', fromToken: true }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRouter />
      {loginModalVisible && <LoginModal visible={loginModalVisible} />}
    </BrowserRouter>
  );
};

export default App;