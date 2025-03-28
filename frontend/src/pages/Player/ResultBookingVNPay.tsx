import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getBookingVnPayStatus } from '@/store/slices/bookingSlice';
// import { AppDispatch, RootState } from '@/store';
import { Button, Result, Spin, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ResultBookingVNPay: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  const { booking, error } = useAppSelector(state => state.booking);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Lấy tất cả các tham số từ URL
        const queryParams = Object.fromEntries(new URLSearchParams(location.search));
        
        // Gọi API để kiểm tra trạng thái thanh toán
        const result = await dispatch(getBookingVnPayStatus(queryParams)).unwrap();
        
        // Lưu message từ API response
        setPaymentMessage(result.message);
      } catch (error) {
        console.error('Error checking payment status:', error);
        setPaymentMessage(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentStatus();
  }, [dispatch, location.search]);
  
  // ... existing code ...
  
  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      {paymentMessage === "Payment success" ? (
        <Result
          status="success"
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title="Thanh toán thành công!"
          subTitle={`Mã đặt sân: ${booking?.id || 'N/A'}`}
          extra={[
            <Button type="primary" key="bookings" onClick={() => navigate(`/user/booking`)}>
              Xem lịch đặt sân
            </Button>,
            <Button key="home" onClick={() => navigate('/')}>
              Về trang chủ
            </Button>,
          ]}
        >
          <div style={{ textAlign: 'left', marginTop: '24px' }}>
            <Title level={5}>Thông tin đặt sân:</Title>
            {booking && (
              <>
                <Paragraph>Sân: {booking.field?.name || 'N/A'}</Paragraph>
                <Paragraph>Cơ sở: {booking.field?.fieldGroup?.facility?.name || 'N/A'}</Paragraph>
                <Paragraph>Ngày: {booking.date || 'N/A'}</Paragraph>
                <Paragraph>Thời gian: {booking.startTime} - {booking.endTime}</Paragraph>
                <Paragraph>Tổng tiền: {(booking.fieldPrice + (booking.servicePrice || 0) - (booking.discountAmount || 0)).toLocaleString('vi-VN')} VNĐ</Paragraph>
              </>
            )}
          </div>
        </Result>
      ) : (
        <Result
          status="error"
          icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          title="Thanh toán thất bại!"
          subTitle={error || "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau."}
          extra={[
            <Button type="primary" key="home" onClick={() => navigate('/')}>
              Về trang chủ
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default ResultBookingVNPay;