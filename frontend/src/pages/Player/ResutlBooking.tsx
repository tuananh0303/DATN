import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { 
  Result, Button, Typography, Card, Descriptions, Divider, Tag, Spin, Alert, Breadcrumb
} from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  FieldTimeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  DollarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getBookingVnPayStatus, resetBooking } from '@/store/slices/bookingSlice';
import { RootState } from '@/store';

const { Title, Text, Paragraph } = Typography;

const ResultBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('bookingId');
  const paymentMethod = queryParams.get('paymentMethod');
  
  // Redux state
  const { booking, loading, error, paymentStatus } = useAppSelector((state: RootState) => state.booking);
  
  // Local state
  const [processingPayment, setProcessingPayment] = useState(true);
  
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
    if (!booking) return 0;
    
    let total = booking.fieldPrice || 0;
    
    // Add service price if available
    if (booking.servicePrice) {
      total += booking.servicePrice;
    }
    
    // Subtract discount if applicable
    if (booking.discountAmount) {
      total -= booking.discountAmount;
    }
    
    return total;
  };
  
  // Process VNPay return parameters
  useEffect(() => {
    // If this is a VNPay return (has all the VNPay params)
    if (location.search.includes('vnp_')) {
      // Extract all VNPay parameters
      const vnpParams: Record<string, string> = {};
      queryParams.forEach((value, key) => {
        if (key.startsWith('vnp_')) {
          vnpParams[key] = value;
        }
      });
      
      // Process VNPay payment result
      if (Object.keys(vnpParams).length > 0) {
        dispatch(getBookingVnPayStatus(vnpParams))
          .finally(() => {
            setProcessingPayment(false);
          });
      }
    } else if (paymentMethod === 'cash') {
      // For cash payment, we don't need to process anything
      setProcessingPayment(false);
    } else {
      // If no VNPay parameters and not cash, redirect to home
      navigate('/');
    }
    
    // Cleanup on unmount
    return () => {
      dispatch(resetBooking());
    };
  }, [dispatch, location.search, navigate, paymentMethod]);
  
  // Show loading while processing payment
  if (processingPayment || loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <Spin size="large" />
        <Text className="mt-4">Đang xử lý kết quả thanh toán...</Text>
      </div>
    );
  }
  
  // Show error if any
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Result
          status="error"
          title="Đã xảy ra lỗi"
          subTitle={error}
          extra={[
            <Button 
              type="primary" 
              key="home" 
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </Button>
            ]}
            />
          </div>
        );
      }
      
      // For cash payment or successful online payment
      if (paymentMethod === 'cash' || paymentStatus === 'success') {
        return (
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <Breadcrumb 
              items={[
                { title: <Link to="/">Trang chủ</Link> },
                { title: 'Kết quả đặt sân' }
              ]} 
              className="mb-6" 
            />
            
            <Result
              status="success"
              title="Đặt sân thành công!"
              subTitle={`Mã đặt sân: ${booking?.id || bookingId}`}
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
            
            {booking && (
              <Card className="mt-6 shadow-md">
                <Title level={4}>Chi tiết đặt sân</Title>
                <Descriptions bordered column={{ xs: 1, sm: 2 }} className="mt-4">
                  <Descriptions.Item label={<><EnvironmentOutlined /> Cơ sở</>}>
                    {booking.field?.fieldGroup?.facility?.name || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><TeamOutlined /> Loại hình thể thao</>}>
                    {booking.sport ? getSportName(booking.sport.name) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><CalendarOutlined /> Ngày đặt sân</>}>
                    {booking.date ? dayjs(booking.date).format('DD/MM/YYYY') : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><ClockCircleOutlined /> Thời gian</>}>
                    {booking.startTime && booking.endTime 
                      ? `${booking.startTime.substring(0, 5)} - ${booking.endTime.substring(0, 5)}`
                      : '-'
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại sân">
                    {booking.field?.fieldGroup?.name || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sân">
                    {booking.field?.name || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <Tag color={
                      booking.status === 'paid' ? 'green' : 
                      booking.status === 'unpaid' ? 'orange' : 
                      booking.status === 'cancelled' ? 'red' : 'blue'
                    }>
                      {booking.status === 'paid' ? 'Đã thanh toán' : 
                       booking.status === 'unpaid' ? 'Chưa thanh toán' : 
                       booking.status === 'cancelled' ? 'Đã hủy' : 
                       booking.status === 'draft' ? 'Đang xử lý' : booking.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phương thức thanh toán">
                    {booking.paymentType === 'online' ? 'Thanh toán online' : 
                     booking.paymentType === 'cash' ? 'Tiền mặt' : '-'}
                  </Descriptions.Item>
                </Descriptions>
                
                <Divider />
                
                <Title level={5}>Chi tiết thanh toán</Title>
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <Text>Giá sân:</Text>
                    <Text>{booking.fieldPrice ? formatCurrency(booking.fieldPrice) : '-'}</Text>
                  </div>
                  
                  {booking.servicePrice > 0 && (
                    <div className="flex justify-between mb-2">
                      <Text>Dịch vụ:</Text>
                      <Text>{formatCurrency(booking.servicePrice)}</Text>
                    </div>
                  )}
                  
                  {booking.discountAmount > 0 && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <Text>Giảm giá:</Text>
                      <Text>-{formatCurrency(booking.discountAmount)}</Text>
                    </div>
                  )}
                  
                  <Divider />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <Text>Tổng cộng:</Text>
                    <Text className="text-blue-600">{formatCurrency(calculateTotalPrice())}</Text>
                  </div>
                </div>
                
                {booking.bookingServices && booking.bookingServices.length > 0 && (
                  <>
                    <Divider />
                    <Title level={5}>Dịch vụ đã đặt</Title>
                    <ul className="mt-2">
                      {booking.bookingServices.map((service, index) => (
                        <li key={index} className="mb-1">
                          {service.name || `Dịch vụ #${service.serviceId}`}: {service.quantity} x {service.price ? formatCurrency(service.price) : ''}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {paymentMethod === 'cash' && (
                  <Alert
                    message="Lưu ý"
                    description="Vui lòng thanh toán tại cơ sở trước khi sử dụng dịch vụ."
                    type="info"
                    showIcon
                    className="mt-4"
                  />
                )}
              </Card>
            )}
          </div>
        );
      }
      
      // For failed online payment
      return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Breadcrumb 
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: 'Kết quả đặt sân' }
            ]} 
            className="mb-6" 
          />
          
          <Result
            status="error"
            title="Thanh toán không thành công!"
            subTitle="Giao dịch của bạn đã bị hủy hoặc không thành công. Vui lòng thử lại sau."
            extra={[
              <Button 
                type="primary" 
                key="retry" 
                onClick={() => {
                  if (bookingId) {
                    navigate(`/result-search`);
                  } else {
                    navigate('/');
                  }
                }}
              >
                Đặt sân lại
              </Button>,
              <Button 
                key="home" 
                onClick={() => navigate('/')}
              >
                Về trang chủ
              </Button>,
            ]}
          />
          
          {booking && (
            <Card className="mt-6 shadow-md">
              <Title level={4}>Chi tiết đặt sân</Title>
              <Descriptions bordered column={{ xs: 1, sm: 2 }} className="mt-4">
                <Descriptions.Item label={<><EnvironmentOutlined /> Cơ sở</>}>
                  {booking.field?.fieldGroup?.facility?.name || '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<><TeamOutlined /> Loại hình thể thao</>}>
                  {booking.sport ? getSportName(booking.sport.name) : '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<><CalendarOutlined /> Ngày đặt sân</>}>
                  {booking.date ? dayjs(booking.date).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<><ClockCircleOutlined /> Thời gian</>}>
                  {booking.startTime && booking.endTime 
                    ? `${booking.startTime.substring(0, 5)} - ${booking.endTime.substring(0, 5)}`
                    : '-'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color="red">Thanh toán thất bại</Tag>
                </Descriptions.Item>
              </Descriptions>
              
              <Alert
                message="Lý do thanh toán thất bại"
                description="Giao dịch đã bị hủy hoặc không thành công. Vui lòng kiểm tra lại thông tin thanh toán hoặc liên hệ với ngân hàng của bạn."
                type="error"
                showIcon
                className="mt-4"
              />
            </Card>
          )}
        </div>
      );
    };
    
    export default ResultBooking;