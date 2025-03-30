import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, TimePicker, Typography, Row, Col } from 'antd';
import { FieldGroup } from '@/types/field.type';
import { SURFACE_TYPES, DIMENSIONS } from '@/mocks/default/defaultData';
import dayjs from 'dayjs';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface FieldGroupEditProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedFieldGroup: FieldGroup) => void;
  fieldGroup: FieldGroup | null;
}

const FieldGroupEdit: React.FC<FieldGroupEditProps> = ({ open, onClose, onSave, fieldGroup }) => {
  const [form] = Form.useForm();
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  useEffect(() => {
    if (fieldGroup && open) {
      // Set form values when modal opens
      form.setFieldsValue({
        name: fieldGroup.name,
        dimension: fieldGroup.dimension,
        surface: fieldGroup.surface,
        basePrice: fieldGroup.basePrice,
        // Format times for TimePicker with dayjs
        peakTime1: fieldGroup.peakStartTime1 ? [
          dayjs(fieldGroup.peakStartTime1, 'HH:mm:ss'),
          dayjs(fieldGroup.peakEndTime1, 'HH:mm:ss')
        ] : undefined,
        priceIncrease1: fieldGroup.priceIncrease1,
        
        peakTime2: fieldGroup.peakStartTime2 ? [
          dayjs(fieldGroup.peakStartTime2, 'HH:mm:ss'),
          dayjs(fieldGroup.peakEndTime2, 'HH:mm:ss')
        ] : undefined,
        priceIncrease2: fieldGroup.priceIncrease2,
        
        peakTime3: fieldGroup.peakStartTime3 ? [
          dayjs(fieldGroup.peakStartTime3, 'HH:mm:ss'),
          dayjs(fieldGroup.peakEndTime3, 'HH:mm:ss')
        ] : undefined,
        priceIncrease3: fieldGroup.priceIncrease3,
      });
      
      // Set selected sports from fieldGroup
      setSelectedSports(fieldGroup.sports.map(sport => sport.name));
    }
  }, [fieldGroup, open, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      if (!fieldGroup) return;

      // Hiển thị popup xác nhận
      Modal.confirm({
        title: 'Xác nhận thay đổi',
        content: 'Bạn có chắc chắn muốn lưu những thay đổi này?',
        okText: 'Lưu thay đổi',
        cancelText: 'Hủy',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          // Transform form values to FieldGroup object
          const updatedFieldGroup: FieldGroup = {
            ...fieldGroup,
            name: values.name,
            dimension: values.dimension,
            surface: values.surface,
            basePrice: values.basePrice,
            // Handle peak times
            peakStartTime1: values.peakTime1 ? values.peakTime1[0].format('HH:mm:ss') : '',
            peakEndTime1: values.peakTime1 ? values.peakTime1[1].format('HH:mm:ss') : '',
            priceIncrease1: values.priceIncrease1 || 0,
            
            peakStartTime2: values.peakTime2 ? values.peakTime2[0].format('HH:mm:ss') : '',
            peakEndTime2: values.peakTime2 ? values.peakTime2[1].format('HH:mm:ss') : '',
            priceIncrease2: values.priceIncrease2 || 0,
            
            peakStartTime3: values.peakTime3 ? values.peakTime3[0].format('HH:mm:ss') : '',
            peakEndTime3: values.peakTime3 ? values.peakTime3[1].format('HH:mm:ss') : '',
            priceIncrease3: values.priceIncrease3 || 0,
            
            // Update sports based on selected options
            sports: selectedSports.map((sportName, index) => {
              // Preserve existing sport IDs if possible
              const existingSport = fieldGroup.sports.find(s => s.name === sportName);
              return {
                id: existingSport?.id || index + 1,
                name: sportName
              };
            })
          };

          onSave(updatedFieldGroup);
          onClose();
        }
      });
    });
  };

  const sportOptions = [
    { value: 'football', label: getSportNameInVietnamese('football') },
    { value: 'basketball', label: getSportNameInVietnamese('basketball') },
    { value: 'volleyball', label: getSportNameInVietnamese('volleyball') },
    { value: 'tennis', label: getSportNameInVietnamese('tennis') },
    { value: 'badminton', label: getSportNameInVietnamese('badminton') },
    { value: 'tabletennis', label: getSportNameInVietnamese('tabletennis') },
    { value: 'pickleball', label: getSportNameInVietnamese('pickleball') },
    { value: 'golf', label: getSportNameInVietnamese('golf') }
  ];

  // Get surface options based on selected sports
  const getSurfaceOptions = () => {
    if (selectedSports.length === 0) return SURFACE_TYPES.default;
    
    // Get surfaces for the first selected sport (simplification)
    const firstSport = selectedSports[0].toLowerCase();
    const sportKey = firstSport as keyof typeof SURFACE_TYPES;
    
    return SURFACE_TYPES[sportKey] || SURFACE_TYPES.default;
  };
  
  // Get dimension options based on selected sports
  const getDimensionOptions = () => {
    if (selectedSports.length === 0) return DIMENSIONS.default;
    
    // Get dimensions for the first selected sport (simplification)
    const firstSport = selectedSports[0].toLowerCase();
    const sportKey = firstSport as keyof typeof DIMENSIONS;
    
    return DIMENSIONS[sportKey] || DIMENSIONS.default;
  };

  if (!fieldGroup) return null;

  return (
    <Modal
      title={<Title level={4}>Chỉnh sửa nhóm sân: {fieldGroup.name}</Title>}
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      okText="Lưu thay đổi"
      cancelText="Hủy"
      width={800}
      style={{ top: 20 }}
      styles={{ 
        body: { maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: '',
          basePrice: 0,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên nhóm sân"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên nhóm sân' }]}
            >
              <Input placeholder="Nhập tên nhóm sân" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Giá sân cơ bản"
              name="basePrice"
              rules={[{ required: true, message: 'Vui lòng nhập giá sân' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                addonAfter="VNĐ"
                placeholder="Nhập giá sân cơ bản"
                min={0}                
                step={10000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  return Number(value.replace(/\./g, ''));
                }}
                precision={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Loại hình sân"
              rules={[{ required: true, message: 'Vui lòng chọn ít nhất một loại hình sân' }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn loại hình sân"
                onChange={values => setSelectedSports(values)}
                value={selectedSports}
                style={{ width: '100%' }}
              >
                {sportOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Mặt sân"
              name="surface"
              rules={[{ required: true, message: 'Vui lòng chọn mặt sân' }]}
            >
              <Select placeholder="Chọn mặt sân">
                {getSurfaceOptions().map((surface, index) => (
                  <Option key={index} value={surface}>
                    {surface}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Kích thước"
              name="dimension"
              rules={[{ required: true, message: 'Vui lòng chọn kích thước sân' }]}
            >
              <Select placeholder="Chọn kích thước sân">
                {getDimensionOptions().map((dimension, index) => (
                  <Option key={index} value={dimension}>
                    {dimension}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Title level={5} style={{ marginTop: 16, marginBottom: 16 }}>Giờ cao điểm</Title>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item label="Giờ cao điểm 1" name="peakTime1">
              <TimePicker.RangePicker 
                format="HH:mm" 
                style={{ width: '100%' }}
                placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tăng giá" name="priceIncrease1">
              <InputNumber
                style={{ width: '100%' }}
                addonAfter="VNĐ"
                min={0}                
                step={10000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  return Number(value.replace(/\./g, ''));
                }}               
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item label="Giờ cao điểm 2" name="peakTime2">
              <TimePicker.RangePicker 
                format="HH:mm" 
                style={{ width: '100%' }}
                placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tăng giá" name="priceIncrease2">
              <InputNumber
                style={{ width: '100%' }}
                addonAfter="VNĐ"
                min={0}                
                step={10000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  return Number(value.replace(/\./g, ''));
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item label="Giờ cao điểm 3" name="peakTime3">
              <TimePicker.RangePicker 
                format="HH:mm" 
                style={{ width: '100%' }}
                placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tăng giá" name="priceIncrease3">
              <InputNumber
                style={{ width: '100%' }}
                addonAfter="VNĐ"
                min={0}                
                step={10000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  return Number(value.replace(/\./g, ''));
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FieldGroupEdit; 