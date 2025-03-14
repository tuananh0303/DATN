import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Breadcrumb, Steps, Card, Form, Select, DatePicker, TimePicker, Button, Typography, Divider, List, 
  Radio, Checkbox, InputNumber, Space, Row, Col,Tag,Alert,Collapse,Tooltip, Modal, Result
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
  ArrowRightOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = TimePicker;

// Interface cho dữ liệu đặt sân
interface BookingFormData {
  sportType: string;
  date: Dayjs | null;
  timeRange: [Dayjs, Dayjs] | null;
  fieldGroupId: string;
  fieldId: string;
  services: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: string;
  useVoucher: boolean;
  voucherId: string;
  totalPrice: number;
}

// Interface cho Field Group
interface FieldGroup {
  id: string;
  name: string;
  dimension: string;
  surface: string;
  basePrice: number;
  peakStartTime?: string;
  peakEndTime?: string;
  priceIncrease?: number;
  fields: Field[];
}

// Interface cho Field
interface Field {
  id: string;
  name: string;
  status: 'available' | 'booked' | 'maintenance';
}

// Interface cho Service
interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
}

// Interface cho Voucher
interface Voucher {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrderValue: number;
  description: string;
  expiryDate: string;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { facilityId } = useParams<{ facilityId: string }>();
  const [form] = Form.useForm();
  
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    sportType: '',
    date: null,
    timeRange: null,
    fieldGroupId: '',
    fieldId: '',
    services: [],
    paymentMethod: 'banking',
    useVoucher: false,
    voucherId: '',
    totalPrice: 0
  });
  
  // Mock data - sẽ được thay thế bằng API calls sau này
  const [facilityData, setFacilityData] = useState({
    id: facilityId || '1',
    name: 'Sân Bóng Đá Mini Thống Nhất',
    sports: ['football', 'basketball', 'badminton'],
    fieldGroups: [] as FieldGroup[],
    services: [] as Service[],
    vouchers: [] as Voucher[]
  });
  
  const [loading, setLoading] = useState(false);
  const [availableFieldGroups, setAvailableFieldGroups] = useState<FieldGroup[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Fetch facility data
  useEffect(() => {
    const fetchFacilityData = async () => {
      setLoading(true);
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockFieldGroups: FieldGroup[] = [
          {
            id: 'fg1',
            name: 'Sân bóng đá 5 người',
            dimension: '25m x 15m',
            surface: 'Cỏ nhân tạo',
            basePrice: 200000,
            peakStartTime: '17:00',
            peakEndTime: '21:00',
            priceIncrease: 50000,
            fields: [
              { id: 'f1', name: 'Sân số 1', status: 'available' },
              { id: 'f2', name: 'Sân số 2', status: 'booked' }
            ]
          },
          {
            id: 'fg2',
            name: 'Sân bóng đá 7 người',
            dimension: '40m x 20m',
            surface: 'Cỏ nhân tạo',
            basePrice: 300000,
            peakStartTime: '17:00',
            peakEndTime: '21:00',
            priceIncrease: 70000,
            fields: [
              { id: 'f3', name: 'Sân số 3', status: 'available' },
              { id: 'f4', name: 'Sân số 4', status: 'available' }
            ]
          },
          {
            id: 'fg3',
            name: 'Sân cầu lông',
            dimension: '13.4m x 6.1m',
            surface: 'Gỗ',
            basePrice: 100000,
            fields: [
              { id: 'f5', name: 'Sân cầu lông 1', status: 'available' },
              { id: 'f6', name: 'Sân cầu lông 2', status: 'available' }
            ]
          }
        ];
        
        const mockServices: Service[] = [
          { id: 's1', name: 'Cho thuê giày', price: 30000, description: 'Giày thể thao chất lượng cao' },
          { id: 's2', name: 'Cho thuê áo', price: 20000, description: 'Áo thể thao thoáng mát' },
          { id: 's3', name: 'Nước uống', price: 15000, description: 'Nước khoáng, nước ngọt các loại' },
          { id: 's4', name: 'Dụng cụ thể thao', price: 50000, description: 'Bóng, vợt và các dụng cụ khác' }
        ];
        
        const mockVouchers: Voucher[] = [
          { 
            id: 'v1', 
            code: 'NEWPLAYER20', 
            discount: 20, 
            discountType: 'percentage', 
            minOrderValue: 200000, 
            description: 'Giảm 20% cho người chơi mới', 
            expiryDate: '2023-12-31' 
          },
          { 
            id: 'v2', 
            code: 'WEEKEND50K', 
            discount: 50000, 
            discountType: 'fixed', 
            minOrderValue: 300000, 
            description: 'Giảm 50,000đ cho đặt sân cuối tuần', 
            expiryDate: '2023-12-31' 
          }
        ];
        
        setFacilityData(prev => ({
          ...prev,
          fieldGroups: mockFieldGroups,
          services: mockServices,
          vouchers: mockVouchers
        }));
      } catch (error) {
        console.error('Error fetching facility data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFacilityData();
  }, [facilityId]);
  
  // Filter available field groups based on sport type
  useEffect(() => {
    if (bookingData.sportType) {
      const filteredGroups = facilityData.fieldGroups.filter(group => {
        // Giả sử có mapping giữa sport type và field group
        if (bookingData.sportType === 'football') {
          return group.id === 'fg1' || group.id === 'fg2';
        } else if (bookingData.sportType === 'badminton') {
          return group.id === 'fg3';
        }
        return false;
      });
      
      setAvailableFieldGroups(filteredGroups);
    } else {
      setAvailableFieldGroups([]);
    }
  }, [bookingData.sportType, facilityData.fieldGroups]);
  
  // Calculate total price
  useEffect(() => {
    let total = 0;
    
    // Add field price
    if (bookingData.fieldGroupId && bookingData.timeRange) {
      const fieldGroup = facilityData.fieldGroups.find(group => group.id === bookingData.fieldGroupId);
      if (fieldGroup) {
        const startTime = bookingData.timeRange[0];
        const endTime = bookingData.timeRange[1];
        const durationHours = endTime.diff(startTime, 'hour', true);
        
        let hourlyRate = fieldGroup.basePrice;
        
        // Check if booking time is during peak hours
        if (fieldGroup.peakStartTime && fieldGroup.peakEndTime && fieldGroup.priceIncrease) {
          const peakStart = dayjs(fieldGroup.peakStartTime, 'HH:mm');
          const peakEnd = dayjs(fieldGroup.peakEndTime, 'HH:mm');
          
          const bookingStartHour = startTime.hour() + startTime.minute() / 60;
          const bookingEndHour = endTime.hour() + endTime.minute() / 60;
          const peakStartHour = peakStart.hour() + peakStart.minute() / 60;
          const peakEndHour = peakEnd.hour() + peakEnd.minute() / 60;
          
          // Simple overlap check (can be improved for more accurate calculation)
          if (
            (bookingStartHour <= peakEndHour && bookingStartHour >= peakStartHour) ||
            (bookingEndHour <= peakEndHour && bookingEndHour >= peakStartHour) ||
            (bookingStartHour <= peakStartHour && bookingEndHour >= peakEndHour)
          ) {
            hourlyRate += fieldGroup.priceIncrease;
          }
        }
        
        total += hourlyRate * durationHours;
      }
    }
    
    // Add services price
    bookingData.services.forEach(service => {
      total += service.price * service.quantity;
    });
    
    // Apply voucher if selected
    if (bookingData.useVoucher && bookingData.voucherId) {
      const voucher = facilityData.vouchers.find(v => v.id === bookingData.voucherId);
      if (voucher && total >= voucher.minOrderValue) {
        if (voucher.discountType === 'percentage') {
          total = total * (1 - voucher.discount / 100);
        } else {
          total = total - voucher.discount;
        }
      }
    }
    
    setBookingData(prev => ({
      ...prev,
      totalPrice: Math.max(0, Math.round(total))
    }));
  }, [
    bookingData.fieldGroupId, 
    bookingData.timeRange, 
    bookingData.services, 
    bookingData.useVoucher, 
    bookingData.voucherId,
    facilityData.fieldGroups,
    facilityData.vouchers
  ]);
  
  // Handle next step
  const handleNext = () => {
    form.validateFields()
      .then(() => {
        setCurrentStep(prev => prev + 1);
      })
      .catch(error => {
        console.log('Validation failed:', error);
      });
  };
  
  // Handle previous step
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Handle form changes
  const handleFormChange = (changedValues: any, allValues: any) => {
    setBookingData(prev => ({
      ...prev,
      ...changedValues
    }));
  };
  
  // Handle service selection
  const handleServiceChange = (serviceId: string, quantity: number) => {
    setBookingData(prev => {
      const updatedServices = [...prev.services];
      const serviceIndex = updatedServices.findIndex(s => s.id === serviceId);
      
      if (quantity === 0 && serviceIndex !== -1) {
        // Remove service if quantity is 0
        updatedServices.splice(serviceIndex, 1);
      } else if (serviceIndex !== -1) {
        // Update quantity if service already exists
        updatedServices[serviceIndex].quantity = quantity;
      } else if (quantity > 0) {
        // Add new service
        const service = facilityData.services.find(s => s.id === serviceId);
        if (service) {
          updatedServices.push({
            id: service.id,
            name: service.name,
            price: service.price,
            quantity
          });
        }
      }
      
      return {
        ...prev,
        services: updatedServices
      };
    });
  };
  
  // Handle booking submission
  const handleSubmitBooking = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setBookingSuccess(true);
      setShowConfirmModal(false);
    }, 1500);
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
      'volleyball': 'Bóng chuyền'
    };
    
    return sportMap[type] || type;
  };
  
  // Define steps
  const steps = [
    {
      title: 'Thông tin đặt sân',
      content: (
        <Card className="shadow-md">
          <Form
            form={form}
            layout="vertical"
            onValuesChange={handleFormChange}
            initialValues={bookingData}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="sportType"
                  label="Loại hình thể thao"
                  rules={[{ required: true, message: 'Vui lòng chọn loại hình thể thao' }]}
                >
                  <Select placeholder="Chọn loại hình thể thao">
                    {facilityData.sports.map(sport => (
                      <Option key={sport} value={sport}>{getSportName(sport)}</Option>
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
                    placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
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
              onValuesChange={handleFormChange}
              initialValues={bookingData}
            >
              <Form.Item
                name="fieldGroupId"
                label="Loại sân"
                rules={[{ required: true, message: 'Vui lòng chọn loại sân' }]}
              >
                <Radio.Group className="w-full">
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
              
              {bookingData.fieldGroupId && (
                <Form.Item
                  name="fieldId"
                  label="Chọn sân"
                  rules={[{ required: true, message: 'Vui lòng chọn sân' }]}
                >
                  <Radio.Group className="w-full">
                    <Row gutter={[16, 16]}>
                      {availableFieldGroups
                        .find(group => group.id === bookingData.fieldGroupId)
                        ?.fields.map(field => (
                          <Col key={field.id} xs={24} sm={12} md={8}>
                            <Radio 
                              value={field.id} 
                              disabled={field.status !== 'available'}
                              className="w-full"
                            >
                              <Card 
                                className={`w-full text-center ${
                                  field.status === 'available' 
                                    ? 'cursor-pointer hover:bg-blue-50' 
                                    : 'bg-gray-100 cursor-not-allowed'
                                }`}
                              >
                                <div className="font-medium">{field.name}</div>
                                <Tag 
                                  color={
                                    field.status === 'available' ? 'success' : 
                                    field.status === 'booked' ? 'error' : 'warning'
                                  }
                                >
                                  {field.status === 'available' ? 'Có sẵn' : 
                                   field.status === 'booked' ? 'Đã đặt' : 'Bảo trì'}
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
              description="Không tìm thấy sân phù hợp với loại hình thể thao đã chọn. Vui lòng quay lại và chọn loại hình thể thao khác."
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
          
          <List
            itemLayout="horizontal"
            dataSource={facilityData.services}
            renderItem={service => (
              <List.Item
                actions={[
                  <div className="flex items-center">
                    <Button 
                      size="small"
                      onClick={() => {
                        const currentService = bookingData.services.find(s => s.id === service.id);
                        const currentQuantity = currentService ? currentService.quantity : 0;
                        handleServiceChange(service.id, Math.max(0, currentQuantity - 1));
                      }}
                      disabled={!bookingData.services.find(s => s.id === service.id)}
                    >
                      -
                    </Button>
                    <InputNumber
                      min={0}
                      max={10}
                      value={bookingData.services.find(s => s.id === service.id)?.quantity || 0}
                      onChange={value => handleServiceChange(service.id, value || 0)}
                      className="w-16 mx-2"
                    />
                    <Button 
                      size="small"
                      onClick={() => {
                        const currentService = bookingData.services.find(s => s.id === service.id);
                        const currentQuantity = currentService ? currentService.quantity : 0;
                        handleServiceChange(service.id, currentQuantity + 1);
                      }}
                    >
                      +
                    </Button>
                  </div>
                ]}
              >
                <List.Item.Meta
                  title={service.name}
                  description={service.description}
                />
                <div className="text-blue-600 font-medium">{formatCurrency(service.price)}</div>
              </List.Item>
            )}
          />
          
          {facilityData.vouchers.length > 0 && (
            <>
              <Divider />
              
              <Form
                form={form}
                layout="vertical"
                onValuesChange={handleFormChange}
                initialValues={bookingData}
              >
                <Form.Item name="useVoucher" valuePropName="checked">
                  <Checkbox>Sử dụng voucher</Checkbox>
                </Form.Item>
                
                {bookingData.useVoucher && (
                  <Form.Item name="voucherId" label="Chọn voucher">
                    <Radio.Group className="w-full">
                      <Space direction="vertical" className="w-full">
                        {facilityData.vouchers.map(voucher => (
                          <Radio key={voucher.id} value={voucher.id} className="w-full">
                            <Card className="w-full mb-2 cursor-pointer hover:bg-gray-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Text strong>{voucher.code}</Text>
                                  <div className="text-sm text-gray-500">
                                    <div>{voucher.description}</div>
                                    <div>Đơn tối thiểu: {formatCurrency(voucher.minOrderValue)}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Text className="text-lg text-red-600 font-semibold">
                                    {voucher.discountType === 'percentage' 
                                      ? `-${voucher.discount}%` 
                                      : `-${formatCurrency(voucher.discount)}`}
                                  </Text>
                                  <div className="text-xs text-gray-500">
                                    Hết hạn: {dayjs(voucher.expiryDate).format('DD/MM/YYYY')}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                )}
              </Form>
            </>
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
            onValuesChange={handleFormChange}
            initialValues={bookingData}
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
          </Form>
          
          <Divider />
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <Title level={5} className="mb-4">Thông tin đặt sân</Title>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div className="mb-2">
                  <Text type="secondary">Cơ sở:</Text>
                  <div>{facilityData.name}</div>
                </div>                
                <div className="mb-2">
                  <Text type="secondary">Loại hình thể thao:</Text>
                  <div>{bookingData.sportType ? getSportName(bookingData.sportType) : '-'}</div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Ngày đặt sân:</Text>
                  <div>{bookingData.date ? bookingData.date.format('DD/MM/YYYY') : '-'}</div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Thời gian:</Text>
                  <div>
                    {bookingData.timeRange 
                      ? `${bookingData.timeRange[0].format('HH:mm')} - ${bookingData.timeRange[1].format('HH:mm')}`
                      : '-'
                    }
                  </div>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <div className="mb-2">
                  <Text type="secondary">Loại sân:</Text>
                  <div>
                    {bookingData.fieldGroupId 
                      ? facilityData.fieldGroups.find(g => g.id === bookingData.fieldGroupId)?.name || '-'
                      : '-'
                    }
                  </div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Sân:</Text>
                  <div>
                    {bookingData.fieldId && bookingData.fieldGroupId
                      ? facilityData.fieldGroups
                          .find(g => g.id === bookingData.fieldGroupId)
                          ?.fields.find(f => f.id === bookingData.fieldId)
                          ?.name || '-'
                      : '-'
                    }
                  </div>
                </div>
                
                <div className="mb-2">
                  <Text type="secondary">Phương thức thanh toán:</Text>
                  <div>
                    {bookingData.paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' :
                     bookingData.paymentMethod === 'momo' ? 'Ví MoMo' :
                     bookingData.paymentMethod === 'vnpay' ? 'VNPay' :
                     bookingData.paymentMethod === 'cash' ? 'Tiền mặt' : '-'}
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
                  {bookingData.fieldGroupId && bookingData.timeRange
                    ? (() => {
                        const fieldGroup = facilityData.fieldGroups.find(group => group.id === bookingData.fieldGroupId);
                        if (fieldGroup) {
                          const startTime = bookingData.timeRange[0];
                          const endTime = bookingData.timeRange[1];
                          const durationHours = endTime.diff(startTime, 'hour', true);
                          
                          let hourlyRate = fieldGroup.basePrice;
                          
                          // Check if booking time is during peak hours
                          if (fieldGroup.peakStartTime && fieldGroup.peakEndTime && fieldGroup.priceIncrease) {
                            const peakStart = dayjs(fieldGroup.peakStartTime, 'HH:mm');
                            const peakEnd = dayjs(fieldGroup.peakEndTime, 'HH:mm');
                            
                            const bookingStartHour = startTime.hour() + startTime.minute() / 60;
                            const bookingEndHour = endTime.hour() + endTime.minute() / 60;
                            const peakStartHour = peakStart.hour() + peakStart.minute() / 60;
                            const peakEndHour = peakEnd.hour() + peakEnd.minute() / 60;
                            
                            if (
                              (bookingStartHour <= peakEndHour && bookingStartHour >= peakStartHour) ||
                              (bookingEndHour <= peakEndHour && bookingEndHour >= peakStartHour) ||
                              (bookingStartHour <= peakStartHour && bookingEndHour >= peakEndHour)
                            ) {
                              hourlyRate += fieldGroup.priceIncrease;
                            }
                          }
                          
                          return formatCurrency(hourlyRate * durationHours);
                        }
                        return '-';
                      })()
                    : '-'
                  }
                </Text>
              </div>
              
              {bookingData.services.length > 0 && (
                <div className="flex justify-between mb-2">
                  <Text>Dịch vụ:</Text>
                  <Text>
                    {formatCurrency(
                      bookingData.services.reduce((total, service) => total + service.price * service.quantity, 0)
                    )}
                  </Text>
                </div>
              )}
              
              {bookingData.useVoucher && bookingData.voucherId && (
                <div className="flex justify-between mb-2 text-red-600">
                  <Text>Giảm giá:</Text>
                  <Text>
                    {(() => {
                      const voucher = facilityData.vouchers.find(v => v.id === bookingData.voucherId);
                      if (voucher) {
                        if (voucher.discountType === 'percentage') {
                          return `-${voucher.discount}%`;
                        } else {
                          return `-${formatCurrency(voucher.discount)}`;
                        }
                      }
                      return '-';
                    })()}
                  </Text>
                </div>
              )}
              
              <Divider />
              
              <div className="flex justify-between text-lg font-bold">
                <Text>Tổng cộng:</Text>
                <Text className="text-blue-600">{formatCurrency(bookingData.totalPrice)}</Text>
              </div>
            </div>
          </div>
        </Card>
      )
    }
  ];
  
  // Render booking success
  if (bookingSuccess) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Result
          status="success"
          title="Đặt sân thành công!"
          subTitle={`Mã đặt sân: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`}
          extra={[
            <Button 
              type="primary" 
              key="dashboard" 
              onClick={() => navigate('/player/dashboard')}
            >
              Xem lịch sử đặt sân
            </Button>,
            <Button 
              key="home" 
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </Button>,
          ]}
        />
      </div>
    );
  }
  
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
      
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">Đặt sân</Title>
        <Text className="text-gray-500">Cơ sở: {facilityData.name}</Text>
      </div>
      
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
          >
            Tiếp theo <ArrowRightOutlined />
          </Button>
        ) : (
          <Button 
            type="primary" 
            onClick={() => setShowConfirmModal(true)}
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
        <p>Tổng số tiền: <span className="text-blue-600 font-bold">{formatCurrency(bookingData.totalPrice)}</span></p>
      </Modal>
    </div>
  );
};

export default BookingPage;