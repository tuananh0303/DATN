import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber, Card, Typography, Space, Divider, List, Tag, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ServiceFormData, ServiceType } from '@/types/service.type';
import { mockFacilitiesDropdown } from '@/mocks/facility/mockFacilities';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Mock sports data
const mockSports = [
  { id: 1, name: 'Bóng đá' },
  { id: 2, name: 'Bóng rổ' },
  { id: 3, name: 'Tennis' },
  { id: 4, name: 'Cầu lông' }
];

interface CreateServiceProps {
  onCancel?: () => void;
  onSubmit?: (data: ServiceFormData[]) => void;
}

const CreateService: React.FC<CreateServiceProps> = ({ onCancel, onSubmit }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [servicesList, setServicesList] = useState<ServiceFormData[]>([]);
  
  // Handle facility selection
  const handleFacilitySelect = (value: string) => {
    setSelectedFacilityId(value);
  };

  // Add service to the list
  const handleAddService = () => {
    form.validateFields().then(values => {
      const newService: ServiceFormData = {
        name: values.name,
        price: values.price,
        description: values.description,
        amount: values.amount,
        sportId: values.sportId,
        unit: values.unit,
        serviceType: values.serviceType,
        status: values.status || 'available'
      };
      
      setServicesList(prev => [...prev, newService]);
      
      // Reset form fields except facility and sport
      form.setFieldsValue({
        name: '',
        price: null,
        description: '',
        amount: null,
        unit: undefined,
        serviceType: undefined,
        status: 'available'
      });
    });
  };

  // Remove service from the list
  const handleRemoveService = (index: number) => {
    setServicesList(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedFacilityId) {
      Modal.error({
        title: 'Chưa chọn cơ sở',
        content: 'Vui lòng chọn cơ sở trước khi lưu'
      });
      return;
    }

    if (servicesList.length === 0) {
      Modal.error({
        title: 'Chưa có dịch vụ',
        content: 'Vui lòng thêm ít nhất một dịch vụ'
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Success message
      Modal.success({
        title: 'Tạo dịch vụ thành công',
        content: `Đã tạo ${servicesList.length} dịch vụ mới cho cơ sở`,
        onOk: () => {
          if (onSubmit) {
            onSubmit(servicesList);
          } else {
            navigate('/owner/service-management');
          }
        }
      });
      
      setSubmitting(false);
    }, 1000);
  };

  // Handle Cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/owner/service-management');
    }
  };

  // Get sport name by ID
  const getSportName = (sportId: number) => {
    const sport = mockSports.find(s => s.id === sportId);
    return sport ? sport.name : 'Không xác định';
  };

  // Helper function để hiển thị loại dịch vụ
  const getServiceTypeTag = (type: ServiceType) => {
    const config: Record<ServiceType, { color: string, text: string }> = {
      rental: { color: 'blue', text: 'Cho thuê' },
      coaching: { color: 'purple', text: 'Huấn luyện' },
      equipment: { color: 'cyan', text: 'Thiết bị' },
      food: { color: 'green', text: 'Đồ uống/Thực phẩm' },
      other: { color: 'gray', text: 'Khác' },
    };
    return <Tag color={config[type].color}>{config[type].text}</Tag>;
  };

  return (
    <div className="p-6 md:p-8">
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-6">
        
          <Space size="middle">  
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/owner/service-management')}
            type="text"
          />          
            <Title level={3} style={{ margin: 0 }}>Tạo dịch vụ mới</Title>
          </Space>
          
          <Button 
            type="primary" 
            onClick={handleSubmit}
            loading={submitting}
            disabled={servicesList.length === 0}
          >
            Lưu dịch vụ
          </Button>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="facilityId"
            label="Cơ sở áp dụng"
            rules={[{ required: true, message: 'Vui lòng chọn cơ sở' }]}
          >
            <Select
              placeholder="Chọn cơ sở của bạn"
              onChange={handleFacilitySelect}
              disabled={submitting}
            >
              {mockFacilitiesDropdown.map((facility) => (
                <Option key={facility.id} value={facility.id}>
                  {facility.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {selectedFacilityId && (
            <>
              <Form.Item
                name="sportId"
                label="Loại hình thể thao"
                rules={[{ required: true, message: 'Vui lòng chọn loại hình thể thao' }]}
              >
                <Select 
                  placeholder="Chọn loại hình thể thao" 
                  disabled={submitting}
                  optionLabelProp="label"
                  style={{ width: '100%' }}
                  popupMatchSelectWidth={false}
                >
                  {mockSports.map((sport) => (
                    <Option 
                      key={sport.id} 
                      value={sport.id} 
                      label={sport.name}
                    >
                      <div style={{ minWidth: '120px' }}>{sport.name}</div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="name"
                label="Tên dịch vụ"
                rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
              >
                <Input placeholder="Nhập tên dịch vụ" disabled={submitting} />
              </Form.Item>

              <Form.Item
                name="serviceType"
                label="Loại dịch vụ"
                rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
              >
                <Select placeholder="Chọn loại dịch vụ" disabled={submitting}>
                  <Option value="rental">Cho thuê</Option>
                  <Option value="coaching">Huấn luyện</Option>
                  <Option value="equipment">Thiết bị</Option>
                  <Option value="food">Đồ uống/Thực phẩm</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả dịch vụ"
              >
                <TextArea 
                  placeholder="Nhập mô tả chi tiết về dịch vụ" 
                  rows={3} 
                  disabled={submitting}
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="price"
                  label="Giá dịch vụ"
                  className="flex-1"
                  rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ' }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Nhập giá dịch vụ"
                    addonAfter="đ"
                    style={{ width: '100%' }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={(value: string | undefined) => {
                      if (!value) return 0;
                      return Number(value.replace(/\./g, ''));
                    }}
                    disabled={submitting}
                  />
                </Form.Item>

                <Form.Item
                  name="unit"
                  label="Đơn vị tính"
                  rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính' }]}
                >
                  <Select placeholder="Chọn đơn vị tính" disabled={submitting}>
                    <Option value="giờ">Giờ</Option>
                    <Option value="ngày">Ngày</Option>
                    <Option value="buổi">Buổi</Option>
                    <Option value="chai">Chai</Option>
                    <Option value="cái">Cái</Option>
                    <Option value="bộ">Bộ</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="amount"
                  label="Số lượng"
                  className="flex-1"
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Nhập số lượng"
                    style={{ width: '100%' }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={(value: string | undefined) => {
                      if (!value) return 0;
                      return Number(value.replace(/\./g, ''));
                    }}
                    disabled={submitting}
                  />
                </Form.Item>

                <Form.Item
                  name="status"
                  label="Trạng thái"
                  initialValue="available"
                >
                  <Select placeholder="Chọn trạng thái" disabled={submitting}>
                    <Option value="available">Còn hàng</Option>
                    <Option value="low_stock">Sắp hết</Option>
                    <Option value="out_of_stock">Hết hàng</Option>
                    <Option value="discontinued">Ngừng kinh doanh</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item>
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddService}
                  disabled={submitting}
                  block
                >
                  Thêm dịch vụ vào danh sách
                </Button>
              </Form.Item>
            </>
          )}
        </Form>

        {servicesList.length > 0 && (
          <div className="mt-8">
            <Divider orientation="left">
              <Text strong>Danh sách dịch vụ đã thêm</Text>
            </Divider>
            
            <div className="overflow-x-auto">
              <List
                itemLayout="horizontal"
                dataSource={servicesList}
                renderItem={(service, index) => (
                  <List.Item
                    actions={[
                      <Button 
                        key="delete" 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveService(index)}
                        disabled={submitting}
                      >
                        Xóa
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={service.name}
                      description={
                        <Space direction="vertical" size={1}>
                          <div className="flex gap-1 mt-1">
                            <Tag color="blue">{getSportName(service.sportId)}</Tag>
                            {service.serviceType && getServiceTypeTag(service.serviceType)}
                          </div>
                          <Text type="secondary">Giá: {service.price.toLocaleString()} đ/{service.unit}</Text>
                          <Text type="secondary">Số lượng: {service.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                          {service.description && <Text type="secondary">Mô tả: {service.description}</Text>}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
                style={{ minWidth: '600px' }}
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <Space>
                <Button onClick={handleCancel} disabled={submitting}>
                  Hủy
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Lưu dịch vụ ({servicesList.length})
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CreateService;