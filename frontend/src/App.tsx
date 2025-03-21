import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter  from './routers/index';
import { useAppSelector } from './hooks/reduxHooks';
import LoginModal from './components/LoginModal';
import { useAuthInitialization } from './hooks/useAuth';

const App: React.FC = () => {

  useAuthInitialization();
  const { loginModalVisible } = useAppSelector(state => state.user);

  return (
    <BrowserRouter>
      <AppRouter />
      {loginModalVisible && <LoginModal visible={loginModalVisible} />}
    </BrowserRouter>
  );
};

export default App;