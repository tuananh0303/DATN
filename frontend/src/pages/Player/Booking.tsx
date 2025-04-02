import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Steps, Card, Row, Col, Select, DatePicker, TimePicker, Radio, Button, InputNumber, Alert, Modal, Divider, Typography, Space, Switch, Calendar, Checkbox, Tag } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined, ClockCircleOutlined, BankOutlined, WalletOutlined, CreditCardOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { BookingFormData, BookingStatus, RecurringType, RecurringConfig, FieldGroupAvailability } from '@/types/booking.type';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = TimePicker;

const WEEKDAYS = [
  { value: 0, label: 'Chủ nhật' },
  { value: 1, label: 'Thứ 2' },
  { value: 2, label: 'Thứ 3' },
  { value: 3, label: 'Thứ 4' },
  { value: 4, label: 'Thứ 5' },
  { value: 5, label: 'Thứ 6' },
  { value: 6, label: 'Thứ 7' }
];

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { facilityId } = useParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const [formData, setFormData] = useState<Partial<BookingFormData>>({});
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);
  const [fieldGroupAvailability, setFieldGroupAvailability] = useState<FieldGroupAvailability[]>([]);

  // Mock data - replace with actual API calls
  const sports = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Badminton' },
    { id: 3, name: 'Tennis' }
  ];

  const fieldGroups = [
    {
      id: 1,
      name: 'Sân 7 người',
      dimension: '50m x 30m',
      surface: 'Cỏ nhân tạo',
      basePrice: 200000,
      peakStartTime: '17:00',
      peakEndTime: '22:00',
      priceIncrease: 50000
    },
    {
      id: 2,
      name: 'Sân cầu lông',
      dimension: '13.4m x 6.1m',
      surface: 'Sàn gỗ',
      basePrice: 250000,
      peakStartTime: '18:00',
      peakEndTime: '22:00',
      priceIncrease: 50000
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Nước uống',
      price: 15000,
      description: 'Nước suối 500ml',
      remain: 50
    },
    {
      id: 2,
      name: 'Khăn lạnh',
      price: 5000,
      description: 'Khăn lạnh ướt',
      remain: 100
    }
  ];

  useEffect(() => {
    if (currentStep > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      setFormData(prev => ({ ...prev, ...values }));
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call to create booking
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/booking/history');
    } catch (error) {
      setError('Có lỗi xảy ra khi đặt sân. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  const handleRecurringChange = (checked: boolean) => {
    form.setFieldsValue({ isRecurring: checked });
    if (checked) {
      setShowRecurringModal(true);
    }
  };

  const handleRecurringConfigChange = (config: Partial<RecurringConfig>) => {
    form.setFieldsValue({ recurringConfig: config });
  };

  const handleDateSelect = (date: dayjs.Dayjs) => {
    setSelectedDates(prev => {
      const exists = prev.some(d => d.isSame(date));
      if (exists) {
        return prev.filter(d => !d.isSame(date));
      }
      return [...prev, date];
    });
  };

  const handleRecurringModalOk = () => {
    const config: RecurringConfig = {
      type: RecurringType.NONE,
      startDate: selectedDates[0],
      endDate: selectedDates[selectedDates.length - 1],
      daysOfWeek: selectedDates.map(d => d.day()),
      daysOfMonth: selectedDates.map(d => d.date())
    };
    handleRecurringConfigChange(config);
    setShowRecurringModal(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const calculateTotalPrice = () => {
    const fieldPrice = formData.fieldGroupId ? 
      fieldGroups.find(g => g.id === formData.fieldGroupId)?.basePrice || 0 : 0;
    
    const servicePrice = formData.services?.reduce((total, service) => {
      const serviceInfo = services.find(s => s.id === service.serviceId);
      return total + (serviceInfo?.price || 0) * service.quantity;
    }, 0) || 0;

    const recurringMultiplier = formData.isRecurring && formData.recurringConfig ? 
      selectedDates.length : 1;

    return (fieldPrice + servicePrice) * recurringMultiplier;
  };

  const steps = [
    {
      title: 'Thông tin đặt sân',
      content: (
        <Card className="shadow-md">
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="sportId"
                  label="Loại hình thể thao"
                  rules={[{ required: true, message: 'Vui lòng chọn loại hình thể thao' }]}
                >
                  <Select placeholder="Chọn loại hình thể thao">
                    {sports.map(sport => (
                      <Option key={sport.id} value={sport.id}>{sport.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="date"
                  label="Ngày đặt sân"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày đặt sân' }]}
                >
                  <DatePicker 
                    className="w-full" 
                    format="DD/MM/YYYY"
                    disabledDate={current => current && current < dayjs().startOf('day')}
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24}>
                <Form.Item
                  name="timeRange"
                  label="Thời gian"
                  rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
                >
                  <RangePicker 
                    className="w-full" 
                    format="HH:mm"
                    minuteStep={30}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="isRecurring"
                  label="Đặt sân định kỳ"
                  valuePropName="checked"
                >
                  <Switch 
                    checkedChildren="Có" 
                    unCheckedChildren="Không"
                    onChange={handleRecurringChange}
                  />
                </Form.Item>
              </Col>

              {formData.isRecurring && (
                <Col xs={24}>
                  <Button
                    type="dashed"
                    icon={<CalendarOutlined />}
                    onClick={() => setShowRecurringModal(true)}
                    className="w-full"
                  >
                    Chọn ngày định kỳ
                  </Button>
                  {selectedDates.length > 0 && (
                    <div className="mt-2">
                      <Text type="secondary">Đã chọn {selectedDates.length} ngày:</Text>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedDates.map(date => (
                          <Tag key={date.format('YYYY-MM-DD')}>
                            {date.format('DD/MM/YYYY')}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      )
    },
    {
      title: 'Chọn sân',
      content: (
        <Card className="shadow-md">
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
          >
            <Form.Item
              name="fieldGroupId"
              label="Loại sân"
              rules={[{ required: true, message: 'Vui lòng chọn loại sân' }]}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  {fieldGroups.map(group => (
                    <Radio key={group.id} value={group.id} className="w-full">
                      <Card className="w-full mb-2 cursor-pointer hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <Text strong>{group.name}</Text>
                            <div className="text-sm text-gray-500">
                              <div>Kích thước: {group.dimension}</div>
                              <div>Bề mặt: {group.surface}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Text className="text-lg text-blue-600 font-semibold">
                              {formatCurrency(group.basePrice)}/giờ
                            </Text>
                            {group.peakStartTime && group.peakEndTime && group.priceIncrease && (
                              <div className="text-xs text-gray-500">
                                Giờ cao điểm ({group.peakStartTime} - {group.peakEndTime}): 
                                {formatCurrency(group.basePrice + group.priceIncrease)}/giờ
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>
      )
    },
    {
      title: 'Dịch vụ',
      content: (
        <Card className="shadow-md">
          <Title level={5} className="mb-4">Dịch vụ đi kèm</Title>
          
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
          >
            <Form.Item name="services" label="Chọn dịch vụ">
              <div className="space-y-4">
                {services.map(service => (
                  <Card key={service.id} className="w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <Text strong>{service.name}</Text>
                        <div className="text-sm text-gray-500">{service.description}</div>
                        <div className="text-sm text-gray-500">Còn lại: {service.remain}</div>
                      </div>
                      <InputNumber
                        min={0}
                        max={service.remain}
                        defaultValue={0}
                        onChange={value => {
                          const currentServices = form.getFieldValue('services') || [];
                          const updatedServices = currentServices.filter((s: { serviceId: number }) => s.serviceId !== service.id);
                          if (value && value > 0) {
                            updatedServices.push({ serviceId: service.id, quantity: value });
                          }
                          form.setFieldsValue({ services: updatedServices });
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </Form.Item>
          </Form>
        </Card>
      )
    },
    {
      title: 'Thanh toán',
      content: (
        <Card className="shadow-md">
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
          >
            <Form.Item
              name="paymentMethod"
              label="Phương thức thanh toán"
              rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Radio value="banking" className="w-full">
                    <Card className="w-full mb-2 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <BankOutlined className="text-2xl mr-4 text-blue-600" />
                        <div>
                          <Text strong>Chuyển khoản ngân hàng</Text>
                          <div className="text-sm text-gray-500">
                            Chuyển khoản trực tiếp đến tài khoản ngân hàng của cơ sở
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Radio>
                  
                  <Radio value="momo" className="w-full">
                    <Card className="w-full mb-2 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <WalletOutlined className="text-2xl mr-4 text-pink-600" />
                        <div>
                          <Text strong>Ví MoMo</Text>
                          <div className="text-sm text-gray-500">
                            Thanh toán qua ví điện tử MoMo
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Radio>
                  
                  <Radio value="vnpay" className="w-full">
                    <Card className="w-full mb-2 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <CreditCardOutlined className="text-2xl mr-4 text-blue-600" />
                        <div>
                          <Text strong>VNPay</Text>
                          <div className="text-sm text-gray-500">
                            Thanh toán qua cổng thanh toán VNPay
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Radio>
                  
                  <Radio value="cash" className="w-full">
                    <Card className="w-full mb-2 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <WalletOutlined className="text-2xl mr-4 text-green-600" />
                        <div>
                          <Text strong>Tiền mặt</Text>
                          <div className="text-sm text-gray-500">
                            Thanh toán bằng tiền mặt tại cơ sở
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item label="Mã giảm giá (nếu có)">
              <div className="flex">
                <InputNumber
                  className="flex-1 mr-2"
                  placeholder="Nhập mã giảm giá"
                  onChange={value => form.setFieldsValue({ voucherCode: value })}
                />
                <Button type="primary">Áp dụng</Button>
              </div>
            </Form.Item>
          </Form>
          
          <Divider />
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <Title level={5} className="mb-4">Thông tin đặt sân</Title>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div className="mb-2">
                  <Text type="secondary">Loại hình thể thao:</Text>
                  <div>{sports.find(s => s.id === formData.sportId)?.name || '-'}</div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Ngày đặt sân:</Text>
                  <div>
                    {formData.isRecurring ? (
                      <div>
                        <div>Đặt sân định kỳ</div>
                        <div className="text-sm text-gray-500">
                          {selectedDates.length} ngày đã chọn
                        </div>
                      </div>
                    ) : (
                      formData.date ? dayjs(formData.date).format('DD/MM/YYYY') : '-'
                    )}
                  </div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Thời gian:</Text>
                  <div>
                    {formData.timeRange ? 
                      `${dayjs(formData.timeRange[0]).format('HH:mm')} - ${dayjs(formData.timeRange[1]).format('HH:mm')}` 
                      : '-'
                    }
                  </div>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <div className="mb-2">
                  <Text type="secondary">Loại sân:</Text>
                  <div>
                    {fieldGroups.find(g => g.id === formData.fieldGroupId)?.name || '-'}
                  </div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Phương thức thanh toán:</Text>
                  <div>
                    {formData.paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' :
                     formData.paymentMethod === 'momo' ? 'Ví MoMo' :
                     formData.paymentMethod === 'vnpay' ? 'VNPay' :
                     formData.paymentMethod === 'cash' ? 'Tiền mặt' : '-'}
                  </div>
                </div>
              </Col>
            </Row>
            
            <Divider />
            
            <div>
              <Title level={5} className="mb-2">Chi tiết thanh toán</Title>
              
              <div className="flex justify-between mb-2">
                <Text>Giá sân:</Text>
                <Text>
                  {formData.fieldGroupId ? 
                    formatCurrency(fieldGroups.find(g => g.id === formData.fieldGroupId)?.basePrice || 0) 
                    : '-'
                  }
                </Text>
              </div>
              
              {formData.services && formData.services.length > 0 && (
                <div className="flex justify-between mb-2">
                  <Text>Dịch vụ:</Text>
                  <Text>
                    {formatCurrency(
                      formData.services.reduce((total, service) => {
                        const serviceInfo = services.find(s => s.id === service.serviceId);
                        return total + (serviceInfo?.price || 0) * service.quantity;
                      }, 0)
                    )}
                  </Text>
                </div>
              )}
              
              {formData.isRecurring && (
                <div className="flex justify-between mb-2">
                  <Text>Số ngày đặt:</Text>
                  <Text>{selectedDates.length}</Text>
                </div>
              )}
              
              <Divider />
              
              <div className="flex justify-between text-lg font-bold">
                <Text>Tổng cộng:</Text>
                <Text className="text-blue-600">{formatCurrency(calculateTotalPrice())}</Text>
              </div>
            </div>
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <a onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">Trang chủ</a>
        <span className="mx-2">/</span>
        <a onClick={() => navigate(`/facility/${facilityId}`)} className="text-blue-600 hover:text-blue-800">Thông tin cơ sở</a>
        <span className="mx-2">/</span>
        <span>Đặt sân</span>
      </div>
      
      {/* Title and Timer */}
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">Đặt sân</Title>
        {currentStep > 0 && (
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-2 text-red-500" />
            <Text className="text-red-500">Thời gian còn lại: {formatTime(timeRemaining)}</Text>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          className="mb-4"
          closable
        />
      )}
      
      {/* Steps */}
      <Steps
        current={currentStep}
        items={steps.map(item => ({ key: item.title, title: item.title }))}
        className="mb-8"
      />
      
      {/* Step Content */}
      <div className="mb-8">
        {steps[currentStep].content}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          onClick={handlePrev}
          disabled={currentStep === 0}
          icon={<ArrowLeftOutlined />}
        >
          Quay lại
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button 
            type="primary" 
            onClick={handleNext}
            loading={loading}
          >
            Tiếp theo <ArrowRightOutlined />
          </Button>
        ) : (
          <Button 
            type="primary" 
            onClick={() => setShowConfirmModal(true)}
            loading={loading}
          >
            Xác nhận đặt sân <CheckCircleOutlined />
          </Button>
        )}
      </div>
      
      {/* Confirm Modal */}
      <Modal
        title="Xác nhận đặt sân"
        open={showConfirmModal}
        onOk={handleSubmitBooking}
        onCancel={() => setShowConfirmModal(false)}
        confirmLoading={loading}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đặt sân với thông tin đã chọn?</p>
        <p>Tổng số tiền: <span className="text-blue-600 font-bold">{formatCurrency(calculateTotalPrice())}</span></p>
        {formData.paymentMethod !== 'cash' && (
          <Alert
            message="Lưu ý"
            description="Bạn sẽ được chuyển đến trang thanh toán sau khi xác nhận."
            type="info"
            showIcon
            className="mt-4"
          />
        )}
      </Modal>

      {/* Recurring Modal */}
      <Modal
        title="Chọn ngày định kỳ"
        open={showRecurringModal}
        onOk={handleRecurringModalOk}
        onCancel={() => setShowRecurringModal(false)}
        width={800}
      >
        <div className="space-y-4">
          <div>
            <Text strong>Chọn loại định kỳ:</Text>
            <Radio.Group 
              className="ml-4"
              onChange={e => handleRecurringConfigChange({ type: e.target.value })}
            >
              <Space direction="vertical">
                <Radio value={RecurringType.DAILY}>Hàng ngày</Radio>
                <Radio value={RecurringType.WEEKLY}>Hàng tuần</Radio>
                <Radio value={RecurringType.MONTHLY}>Hàng tháng</Radio>
              </Space>
            </Radio.Group>
          </div>

          <div>
            <Text strong>Chọn ngày:</Text>
            <Calendar
              className="mt-2"
              onSelect={handleDateSelect}
              dateCellRender={date => {
                const isSelected = selectedDates.some(d => d.isSame(date));
                return isSelected ? (
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {date.date()}
                  </div>
                ) : null;
              }}
            />
          </div>

          {formData.recurringConfig?.type === RecurringType.WEEKLY && (
            <div>
              <Text strong>Chọn ngày trong tuần:</Text>
              <Checkbox.Group
                className="ml-4"
                options={WEEKDAYS}
                onChange={values => handleRecurringConfigChange({ daysOfWeek: values as number[] })}
              />
            </div>
          )}

          {formData.recurringConfig?.type === RecurringType.MONTHLY && (
            <div>
              <Text strong>Chọn ngày trong tháng:</Text>
              <Checkbox.Group
                className="ml-4"
                options={Array.from({ length: 31 }, (_, i) => ({
                  label: `${i + 1}`,
                  value: i + 1
                }))}
                onChange={values => handleRecurringConfigChange({ daysOfMonth: values as number[] })}
              />
            </div>
          )}

          <div>
            <Text strong>Ngày đã chọn:</Text>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDates.map(date => (
                <Tag key={date.format('YYYY-MM-DD')}>
                  {date.format('DD/MM/YYYY')}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;
