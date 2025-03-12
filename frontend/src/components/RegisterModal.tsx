import React from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { register } from '@/store/slices/userSlice';

interface RegisterModalProps {
  visible: boolean;
  onClose?: () => void;
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ 
  visible, 
  onClose,
  onSwitchToLogin,
  onSuccess
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.user);

  const handleRegister = async (values: any) => {
    try {
      await dispatch(register(values)).unwrap();
      message.success('Registration successful!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      message.error(error || 'Registration failed. Please try again.');
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      title="Đăng ký tài khoản"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
    >
      <Form
        name="register-form"
        layout="vertical"
        onFinish={handleRegister}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter your phone number' },
            {
              pattern: /^[0-9+\s()-]{8,15}$/,
              message: 'Please enter a valid phone number'
            }
          ]}
          extra="Enter numbers only. Will be automatically formatted to international format (+84...)"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
        >
          <Select>
            <Select.Option value="player">Người chơi</Select.Option>
            <Select.Option value="owner">Chủ sân</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="retypePassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Đăng ký
            </Button>
            <Button type="link" onClick={onSwitchToLogin}>
              <span className="text-gray-500">Đã có tài khoản? </span>Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;