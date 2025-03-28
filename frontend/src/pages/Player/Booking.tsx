import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { 
  Breadcrumb, Steps, Card, Form, Select, DatePicker, TimePicker, Button, Typography, Divider, List, 
  Radio, Checkbox, InputNumber, Space, Row, Col, Tag, Alert, Collapse, Tooltip, Modal, Result, Progress,
  Input
} from 'antd';
import { 
  ClockCircleOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined,
  ShoppingOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { RootState } from '@/store';
import {
  fetchFacilityById,
  fetchAvailableFieldGroups,
  fetchAvailableServices,
  createBooking,
  updateBookingField,
  updateBookingService,
  updateBookingPayment,
  setFacilityId,
  setSportId,
  setDate,
  setTimeRange,
  setFieldGroupId,
  setFieldId,
  setPaymentMethod,
  setVoucherId,
  setCurrentStep,
  updateService,
  decrementTimeRemaining,
  resetTimer,
  resetBooking
} from '@/store/slices/bookingSlice';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = TimePicker;

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { facilityId } = useParams<{ facilityId: string }>();
  const [form] = Form.useForm();
  
  // Redux state
  const {
    sportId,
    date,
    startTime,
    endTime,
    fieldId,
    fieldGroupId,
    services,
    paymentMethod,
    voucherId,
    sports,
    availableFieldGroups,
    availableServices,
    booking,
    facility,
    paymentUrl,
    currentStep,
    loading,
    error,
    timeRemaining,
    bookingExpired
  } = useAppSelector((state: RootState) => state.booking);
  
  // Local state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voucherInput, setVoucherInput] = useState<number | null>(null);
  
  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Initialize
  useEffect(() => {
    if (facilityId) {
      dispatch(setFacilityId(facilityId));
      dispatch(fetchFacilityById(facilityId));
    }
    
    return () => {
      // Clean up when component unmounts
      dispatch(resetBooking());
    };
  }, [dispatch, facilityId]);
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (currentStep >= 1 && !bookingExpired) {
      timer = setInterval(() => {
        dispatch(decrementTimeRemaining());
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [dispatch, currentStep, bookingExpired]);
  
  // Handle booking expiration
  useEffect(() => {
    if (bookingExpired && booking?.id) {
      // Delete the booking if it exists
      // dispatch(deleteBooking(booking.id));
    }
  }, [bookingExpired, booking, dispatch]);
  
  // Open VNPay payment window when payment URL is available
  useEffect(() => {
    if (paymentUrl) {
      // navigate(`window.open(paymentUrl)`);
      window.location.href = paymentUrl;
    }
  }, [paymentUrl, navigate, booking]);
  
  // Handle form changes
  const handleSportChange = (value: number) => {
    dispatch(setSportId(value));
  };
  
  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      dispatch(setDate(value.format('YYYY-MM-DD')));
    }
  };
  
  const handleTimeRangeChange = (values: [Dayjs, Dayjs] | null) => {
    if (values && values[0] && values[1]) {
      dispatch(setTimeRange({
        startTime: values[0].format('HH:mm'),
        endTime: values[1].format('HH:mm')
      }));
    }
  };
  
  const handleFieldGroupChange = (value: string) => {
    dispatch(setFieldGroupId(value));
  };
  
  const handleFieldChange = (value: number) => {
    dispatch(setFieldId(value));
  };
  
  const handlePaymentMethodChange = (value: string) => {
    dispatch(setPaymentMethod(value));
  };
  
  const handleServiceChange = (serviceId: number, quantity: number) => {
    dispatch(updateService({ serviceId, quantity }));
  };
  
  const handleVoucherChange = (value: number | null) => {
    setVoucherInput(value);
  };
  
  const handleApplyVoucher = () => {
    if (voucherInput) {
      dispatch(setVoucherId(voucherInput));
    }
  };
  
  // Validate time range against facility hours
  const validateTimeRange = (startTime: Dayjs, endTime: Dayjs): boolean => {
    if (!facility) return true;
    
    const facilityOpenTime = dayjs(facility.openTime, 'HH:mm:ss');
    const facilityCloseTime = dayjs(facility.closeTime, 'HH:mm:ss');
    
    const startHour = startTime.hour();
    const startMinute = startTime.minute();
    const endHour = endTime.hour();
    const endMinute = endTime.minute();
    
    const bookingStartTime = dayjs().hour(startHour).minute(startMinute);
    const bookingEndTime = dayjs().hour(endHour).minute(endMinute);
    
    return (
      bookingStartTime.isAfter(facilityOpenTime) || 
      bookingStartTime.isSame(facilityOpenTime)
    ) && (
      bookingEndTime.isBefore(facilityCloseTime) || 
      bookingEndTime.isSame(facilityCloseTime)
    );
  };
  
  // Handle next step
  const handleNext = async () => {
    try {
      await form.validateFields();
      
      if (currentStep === 0) {
        // Moving from step 1 to step 2
        if (facilityId && sportId && date && startTime && endTime) {
          // Validate time range against facility hours
          const startTimeDayjs = dayjs(startTime, 'HH:mm');
          const endTimeDayjs = dayjs(endTime, 'HH:mm');
          
          if (!validateTimeRange(startTimeDayjs, endTimeDayjs)) {
            throw new Error(`Thời gian đặt sân phải nằm trong khung giờ hoạt động của cơ sở: ${facility?.openTime.substring(0, 5)} - ${facility?.closeTime.substring(0, 5)}`);
          }
          
          dispatch(fetchAvailableFieldGroups({
            facilityId,
            sportId,
            startTime,
            endTime,
            date
          }));
        }
      } else if (currentStep === 1) {
        // Moving from step 2 to step 3
        if (facilityId && sportId && date && startTime && endTime && fieldId) {
          // Fetch available services
          dispatch(fetchAvailableServices({
            facilityId,
            sportId,
            startTime,
            endTime,
            date
          }));
          
          // Create booking or update field
          if (booking?.id) {
            // If booking already exists, update the field
            dispatch(updateBookingField({
              bookingId: booking.id,
              fieldId
            }));
          } else {
            // Create new booking
            dispatch(createBooking({
              startTime,
              endTime,
              date,
              fieldId,
              sportId
            }));
            
            // Start the timer
            dispatch(resetTimer());
          }
        }
      } else if (currentStep === 2) {
        // Moving from step 3 to step 4
        if (booking?.id && services.length > 0) {
          // Update booking services
          dispatch(updateBookingService({
            bookingId: booking.id,
            services
          }));
        }
      }
      
      // Move to next step
      dispatch(setCurrentStep(currentStep + 1));
    } catch (error: any) {
      console.error('Validation failed:', error);
      Modal.error({
        title: 'Lỗi',
        content: error.message || 'Vui lòng kiểm tra lại thông tin đặt sân',
      });
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };
  
  // Handle booking submission
  const handleSubmitBooking = () => {
    if (!booking?.id) return;
    
    // Đảm bảo luôn có voucherId, nếu không có thì gửi giá trị 0
  const voucherIdToSend = voucherId || undefined;
    // For cash payment, navigate directly to result page
    if (paymentMethod === 'cash') {
      dispatch(updateBookingPayment({
        bookingId: booking.id,
        paymentType: 'cash',
        voucherId: voucherIdToSend
      }));
      
      navigate(`/user/booking/result-booking/${booking.id}?paymentMethod=cash`);
    } else {
      // For online payment, update payment info and get payment URL
      dispatch(updateBookingPayment({
        bookingId: booking.id,
        paymentType: 'online',
        voucherId: voucherIdToSend
      }));
      // The redirect to VNPay will happen in the useEffect when paymentUrl is available
    }
    
    setShowConfirmModal(false);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };
  
  // Get sport name from type
  const getSportName = (type: string) => {
    const sportMap: Record<string, string> = {
      'football': 'Bóng đá',
      'basketball': 'Bóng rổ',
      'badminton': 'Cầu lông',
      'tennis': 'Tennis',
      'volleyball': 'Bóng chuyền',
      'ping pong': 'Bóng bàn',
      'golf': 'Golf',
      'pickleball': 'Pickleball',
    };
    
    return sportMap[type] || type;
  };
  
  // Calculate total price
  const calculateTotalPrice = (): number => {
    let total = 0;
    
    // Add field price if booking exists
    if (booking?.fieldPrice) {
      total += booking.fieldPrice;
    }
    
    // Add services price
    if (services.length > 0 && availableServices.length > 0) {
      services.forEach(service => {
        const serviceInfo = availableServices.find(s => s.id === service.serviceId);
        if (serviceInfo) {
          total += serviceInfo.price * service.quantity;
        }
      });
    }
    
        // Subtract discount if applicable
        if (booking?.discountAmount) {
          total -= booking.discountAmount;
        }
        
        return total;
      };
      
      // Render booking expired page
      if (bookingExpired) {
        return (
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <Result
              status="error"
              title="Đặt sân thất bại!"
              subTitle="Thời gian đặt sân đã hết hạn. Vui lòng thử lại."
              extra={[
                <Button 
                  type="primary" 
                  key="retry" 
                  onClick={() => {
                    dispatch(resetBooking());
                    dispatch(setCurrentStep(0));
                    navigate(`/user/booking/${facilityId}`);
                  }}
                >
                  Đặt sân lại
                </Button>,
                <Button 
                  key="home" 
                  onClick={() => navigate(`/facility/${facilityId}`)}
                >
                  Quay lại trang cơ sở
                </Button>,
              ]}
            />
          </div>
        );
      }
      
      // Define steps
      const steps = [
        {
          title: 'Thông tin đặt sân',
          content: (
            <Card className="shadow-md">
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  sportId,
                  date: date ? dayjs(date) : null,
                  timeRange: startTime && endTime ? [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')] : null
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="sportId"
                      label="Loại hình thể thao"
                      rules={[{ required: true, message: 'Vui lòng chọn loại hình thể thao' }]}
                    >
                      <Select 
                        placeholder="Chọn loại hình thể thao"
                        onChange={handleSportChange}
                        loading={loading}
                      >
                        {facility?.sports?.map(sport => (
                          <Option key={sport.id} value={sport.id}>{getSportName(sport.name)}</Option>
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
                        placeholder="Chọn ngày"
                        onChange={handleDateChange}
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24}>
                    <Form.Item
                      name="timeRange"
                      label="Thời gian"
                      rules={[
                        { required: true, message: 'Vui lòng chọn thời gian' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value) return Promise.resolve();
                            
                            const [start, end] = value;
                            
                            // Check if end time is after start time
                            if (end && start && end.isBefore(start)) {
                              return Promise.reject(new Error('Thời gian kết thúc phải sau thời gian bắt đầu'));
                            }
                            
                            // Check if booking is for today and start time is in the past
                            const selectedDate = getFieldValue('date');
                            if (selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day')) {
                              const now = dayjs();
                              if (start && start.isBefore(now)) {
                                return Promise.reject(new Error('Không thể đặt sân với thời gian đã qua'));
                              }
                            }
                            
                            // Check if time is within facility operating hours
                            if (facility && start && end) {
                              const facilityOpenTime = dayjs(facility.openTime, 'HH:mm:ss');
                              const facilityCloseTime = dayjs(facility.closeTime, 'HH:mm:ss');
                              
                              const startHour = start.hour();
                              const startMinute = start.minute();
                              const endHour = end.hour();
                              const endMinute = end.minute();
                              
                              const bookingStartTime = dayjs().hour(startHour).minute(startMinute);
                              const bookingEndTime = dayjs().hour(endHour).minute(endMinute);
                              
                              if (bookingStartTime.isBefore(facilityOpenTime)) {
                                return Promise.reject(new Error(`Thời gian bắt đầu phải sau ${facility.openTime.substring(0, 5)}`));
                              }
                              
                              if (bookingEndTime.isAfter(facilityCloseTime)) {
                                return Promise.reject(new Error(`Thời gian kết thúc phải trước ${facility.closeTime.substring(0, 5)}`));
                              }
                            }
                            
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <RangePicker 
                        className="w-full" 
                        format="HH:mm"
                        minuteStep={30}
                        placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
                        onChange={handleTimeRangeChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          )
        },
        {
          title: 'Chọn sân',
          content: (
            <Card className="shadow-md">
              {availableFieldGroups.length > 0 ? (
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    fieldGroupId,
                    fieldId
                  }}
                >
                  <Form.Item
                    name="fieldGroupId"
                    label="Loại sân"
                    rules={[{ required: true, message: 'Vui lòng chọn loại sân' }]}
                  >
                    <Radio.Group className="w-full" onChange={(e) => handleFieldGroupChange(e.target.value)}>
                      <Space direction="vertical" className="w-full">
                        {availableFieldGroups.map(group => (
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
                                      Giờ cao điểm ({group.peakStartTime.substring(0, 5)} - {group.peakEndTime.substring(0, 5)}): 
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
                  
                  {fieldGroupId && (
                    <Form.Item
                      name="fieldId"
                      label="Chọn sân"
                      rules={[{ required: true, message: 'Vui lòng chọn sân' }]}
                    >
                      <Radio.Group className="w-full" onChange={(e) => handleFieldChange(e.target.value)}>
                        <Row gutter={[16, 16]}>
                          {availableFieldGroups
                            .find(group => group.id === fieldGroupId)
                            ?.fields.map(field => (
                              <Col key={field.id} xs={24} sm={12} md={8}>
                                <Radio 
                                  value={field.id} 
                                  disabled={field.status !== 'pending'}
                                  className="w-full"
                                >
                                  <Card 
                                    className={`w-full text-center ${
                                      field.status === 'pending' 
                                        ? 'cursor-pointer hover:bg-blue-50' 
                                        : 'bg-gray-100 cursor-not-allowed'
                                    }`}
                                  >
                                    <div className="font-medium">{field.name}</div>
                                    <Tag 
                                      color={
                                        field.status === 'pending' ? 'success' : 
                                        field.status === 'active' ? 'error' : 'warning'
                                      }
                                    >
                                      {field.status === 'pending' ? 'Có sẵn' : 
                                       field.status === 'active' ? 'Đã đặt' : 'Bảo trì'}
                                    </Tag>
                                  </Card>
                                </Radio>
                              </Col>
                            ))
                          }
                        </Row>
                      </Radio.Group>
                    </Form.Item>
                  )}
                </Form>
              ) : (
                <Alert
                  message="Không có sân phù hợp"
                  description="Không tìm thấy sân phù hợp với loại hình thể thao đã chọn. Vui lòng quay lại và chọn loại hình thể thao khác hoặc thay đổi thời gian đặt sân."
                  type="info"
                  showIcon
                />
              )}
            </Card>
          )
        },
        {
          title: 'Dịch vụ',
          content: (
            <Card className="shadow-md">
              <Title level={5} className="mb-4">Dịch vụ đi kèm</Title>
              
              {availableServices.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={availableServices}
                  renderItem={service => (
                    <List.Item
                      actions={[
                        <div className="flex items-center">
                          <Button 
                            size="small"
                            onClick={() => {
                              const currentService = services.find(s => s.serviceId === service.id);
                              const currentQuantity = currentService ? currentService.quantity : 0;
                              handleServiceChange(service.id, Math.max(0, currentQuantity - 1));
                            }}
                            disabled={!services.find(s => s.serviceId === service.id)}
                          >
                            -
                          </Button>
                          <InputNumber
                            min={0}
                            max={service.remain || 10}
                            value={services.find(s => s.serviceId === service.id)?.quantity || 0}
                            onChange={value => handleServiceChange(service.id, value || 0)}
                            className="w-16 mx-2"
                          />
                          <Button 
                            size="small"
                            onClick={() => {
                              const currentService = services.find(s => s.serviceId === service.id);
                              const currentQuantity = currentService ? currentService.quantity : 0;
                              const maxQuantity = service.remain || 10;
                              handleServiceChange(service.id, Math.min(maxQuantity, currentQuantity + 1));
                            }}
                            disabled={(services.find(s => s.serviceId === service.id)?.quantity || 0) >= (service.remain || 10)}
                          >
                            +
                          </Button>
                        </div>
                      ]}
                    >
                      <List.Item.Meta
                        title={service.name}
                        description={
                          <>
                            <div>{service.description}</div>
                            <div className="text-xs text-gray-500">Còn lại: {service.remain || 'Không giới hạn'}</div>
                          </>
                        }
                      />
                      <div className="text-blue-600 font-medium">{formatCurrency(service.price)}</div>
                    </List.Item>
                  )}
                />
              ) : (
                <Alert
                  message="Không có dịch vụ"
                  description="Không có dịch vụ nào phù hợp với loại hình thể thao đã chọn."
                  type="info"
                  showIcon
                />
              )}
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
                initialValues={{
                  paymentMethod
                }}
              >
                <Form.Item
                  name="paymentMethod"
                  label="Phương thức thanh toán"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                >
                  <Radio.Group className="w-full" onChange={(e) => handlePaymentMethodChange(e.target.value)}>
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
                
                {/* Voucher input */}
                <Form.Item label="Mã giảm giá (nếu có)">
                  <div className="flex">
                    <InputNumber
                      className="flex-1 mr-2"
                      placeholder="Nhập mã giảm giá"
                      value={voucherInput}
                      onChange={handleVoucherChange}
                    />
                    <Button 
                      type="primary" 
                      onClick={handleApplyVoucher}
                      disabled={!voucherInput}
                    >
                      Áp dụng
                    </Button>
                  </div>
                  {voucherId && (
                    <div className="mt-2">
                      <Tag color="green">Đã áp dụng mã giảm giá: {voucherId}</Tag>
                    </div>
                  )}
                </Form.Item>
              </Form>
              
              <Divider />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <Title level={5} className="mb-4">Thông tin đặt sân</Title>
                
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="mb-2">
                      <Text type="secondary">Cơ sở:</Text>
                      <div>{booking?.field?.fieldGroup?.facility?.name || facility?.name || '-'}</div>
                    </div>                
                    <div className="mb-2">
                      <Text type="secondary">Loại hình thể thao:</Text>
                      <div>{booking?.sport ? getSportName(booking.sport.name) : '-'}</div>
                    </div>
                    
                    <div className="mb-2">
                      <Text type="secondary">Ngày đặt sân:</Text>
                      <div>{booking?.date ? dayjs(booking.date).format('DD/MM/YYYY') : '-'}</div>
                    </div>
                    
                    <div className="mb-2">
                      <Text type="secondary">Thời gian:</Text>
                      <div>
                        {booking?.startTime && booking?.endTime 
                          ? `${booking.startTime.substring(0, 5)} - ${booking.endTime.substring(0, 5)}`
                          : '-'
                        }
                      </div>
                    </div>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <div className="mb-2">
                      <Text type="secondary">Loại sân:</Text>
                      <div>
                        {booking?.field?.fieldGroup?.name || '-'}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <Text type="secondary">Sân:</Text>
                      <div>
                        {booking?.field?.name || '-'}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <Text type="secondary">Phương thức thanh toán:</Text>
                      <div>
                        {paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' :
                         paymentMethod === 'momo' ? 'Ví MoMo' :
                         paymentMethod === 'vnpay' ? 'VNPay' :
                         paymentMethod === 'cash' ? 'Tiền mặt' : '-'}
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
                      {booking?.fieldPrice ? formatCurrency(booking.fieldPrice) : '-'}
                    </Text>
                  </div>
                  
                  {services.length > 0 && (
                    <div className="flex justify-between mb-2">
                      <Text>Dịch vụ:</Text>
                      <Text>
                        {formatCurrency(
                          services.reduce((total, service) => {
                            const serviceInfo = availableServices.find(s => s.id === service.serviceId);
                            return total + (serviceInfo?.price || 0) * service.quantity;
                          }, 0)
                        )}
                      </Text>
                    </div>
                  )}
                  
                  {booking?.discountAmount && booking.discountAmount > 0 && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <Text>Giảm giá:</Text>
                      <Text>
                        -{formatCurrency(booking?.discountAmount || 0)}
                      </Text>
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
          <Breadcrumb 
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: <Link to={`/facility/${facilityId}`}>Thông tin cơ sở</Link> },
              { title: 'Đặt sân' }
            ]} 
            className="mb-6" 
          />
          
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
            {paymentMethod !== 'cash' && (
              <Alert
                message="Lưu ý"
                description="Bạn sẽ được chuyển đến trang thanh toán VNPay sau khi xác nhận."
                type="info"
                showIcon
                className="mt-4"
              />
            )}
          </Modal>
        </div>
      );
    };
    
    export default BookingPage;