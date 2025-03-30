import React from 'react';
import { Modal, Form, Input, Typography } from 'antd';
import type { FormInstance } from 'antd/es/form';

const { Text } = Typography;

interface AddFieldModalProps {
  visible: boolean;
  onClose: () => void;
  onAddField: () => void;
  form: FormInstance;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({
  visible,
  onClose,
  onAddField,
  form
}) => {
  return (
    <Modal
      title="Thêm sân mới"
      open={visible}
      onCancel={onClose}
      onOk={onAddField}
      okText="Tiếp tục"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="fieldName"
          label="Tên sân"
          rules={[
            { required: true, message: 'Vui lòng nhập tên sân' },
            { min: 2, message: 'Tên sân phải có ít nhất 2 ký tự' }
          ]}
        >
          <Input placeholder="Nhập tên sân (VD: Sân số 1)" />
        </Form.Item>
        
        <div style={{ marginTop: '16px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <Text type="secondary">
            Lưu ý: Việc thêm sân mới đồng nghĩa với việc bạn xác nhận sân này có thực và thuộc quyền quản lý của cơ sở. 
            Bạn chịu hoàn toàn trách nhiệm về tính xác thực của thông tin này.
          </Text>
        </div>
      </Form>
    </Modal>
  );
};

export default AddFieldModal; 