import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { login, hideLoginModal } from '@/store/slices/userSlice';
import RegisterModal from './RegisterModal';
import { useNavigate } from 'react-router-dom';
interface LoginModalProps {
  visible: boolean;
  onClose?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, redirectPath } = useAppSelector(state => state.user);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login({ ...values, fromToken: false })).unwrap();
      message.success('Đăng nhập thành công');
      // Check if there's a redirect path and navigate to it
    if (redirectPath) {
      navigate(redirectPath);
    }
      if (onClose) {
        onClose();
      }
      // Redirect will be handled by the protected route component
    } catch (err) {
      console.log(err);
      message.error(error || 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const handleCancel = () => {
    dispatch(hideLoginModal());
    if (onClose) {
      onClose();
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    message.success('Đăng ký tài khoản thành công. Vui lòng đăng nhập.');
  };

  if (showRegister) {
    return (
      <RegisterModal 
        visible={visible} 
        onClose={handleCancel} 
        onSwitchToLogin={() => setShowRegister(false)}
        onSuccess={handleRegisterSuccess}
      />
    );
  }

  return (
    <Modal
      title="Đăng nhập"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
    >
      <Form
        name="login-form"
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Đăng nhập
            </Button>
            <Button type="link" onClick={switchToRegister}>
              <span className="text-gray-500">Bạn chưa có tài khoản?</span> Đăng ký
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;