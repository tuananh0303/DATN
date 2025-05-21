import React from 'react';
import { Card, Typography, Divider } from 'antd';
import { AvailableFieldGroup } from '@/types/field.type';
import { Service } from '@/types/service.type';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface BookingPaymentSummaryProps {
  step: number;
  fieldGroup?: AvailableFieldGroup;
  services?: { serviceId: number; quantity: number }[];
  allServices?: Service[];
  startTime?: string;
  endTime?: string;
  selectedDate?: dayjs.Dayjs;
  formatCurrency: (amount: number) => string;
  calculateTotalPrice?: () => number;
}

const BookingPaymentSummary: React.FC<BookingPaymentSummaryProps> = ({
  step,
  fieldGroup,
  services = [],
  allServices = [],
  startTime,
  endTime,
  selectedDate,
  formatCurrency,
  calculateTotalPrice
}) => {
  // Calculate duration in hours
  const calculateDuration = (): number => {
    if (!startTime || !endTime) return 0;
    
    const start = dayjs(`2023-01-01 ${startTime}`);
    const end = dayjs(`2023-01-01 ${endTime}`);
    
    return end.diff(start, 'hour', true);
  };
  
  const duration = calculateDuration();

  // Calculate field price
  const calculateFieldPrice = (): number => {
    if (!fieldGroup || !startTime || !endTime) return 0;
    
    const basePrice = fieldGroup.basePrice || 0;
    
    // Calculate peak hour price if applicable
    let peakHourPrice = 0;
    
    // For simplicity, we'll assume the time range falls entirely within one peak period
    // In a real application, you'd need to calculate partial overlaps correctly
    
    // Check peak hour 1
    if (fieldGroup.peakStartTime1 && fieldGroup.peakEndTime1 && fieldGroup.priceIncrease1) {
      const peakStart = fieldGroup.peakStartTime1;
      const peakEnd = fieldGroup.peakEndTime1;
      
      // Check if time range is within peak hours
      const start = startTime.substring(0, 5);
      const end = endTime.substring(0, 5);
      
      if (start >= peakStart.substring(0, 5) && end <= peakEnd.substring(0, 5)) {
        peakHourPrice = fieldGroup.priceIncrease1;
      }
    }
    
    // Similarly for peak hour 2 and 3 if needed
    // (Add similar code blocks for peak 2 and 3)
    
    return (basePrice + peakHourPrice) * duration;
  };

  // Calculate service price
  const calculateServicePrice = (): number => {
    if (!services || services.length === 0 || !allServices || allServices.length === 0) return 0;
    
    return services.reduce((total, service) => {
      const serviceInfo = allServices.find(s => s.id === service.serviceId);
      if (!serviceInfo) return total;
      return total + (serviceInfo.price || 0) * service.quantity;
    }, 0);
  };

  // Get the total price
  const getTotalPrice = (): number => {
    if (calculateTotalPrice) {
      return calculateTotalPrice();
    }
    
    const fieldPrice = calculateFieldPrice();
    const servicePrice = calculateServicePrice();
    
    return fieldPrice + servicePrice;
  };

  const fieldPrice = calculateFieldPrice();
  const servicePrice = calculateServicePrice();
  const totalPrice = getTotalPrice();

  return (
    <Card className="shadow-sm" title={<Title level={5} className="m-0">Thông tin thanh toán</Title>}>
      <div className="space-y-3">
        {fieldGroup && (
          <div className="flex justify-between items-center">
            <Text>Loại sân:</Text>
            <Text strong>{fieldGroup.name}</Text>
          </div>
        )}
        
        {selectedDate && (
          <div className="flex justify-between items-center">
            <Text>Ngày:</Text>
            <Text strong>{selectedDate.format('DD/MM/YYYY')}</Text>
          </div>
        )}
        
        {startTime && endTime && (
          <div className="flex justify-between items-center">
            <Text>Thời gian:</Text>
            <Text strong>{startTime?.substring(0, 5)} - {endTime?.substring(0, 5)}</Text>
          </div>
        )}
        
        {duration > 0 && (
          <div className="flex justify-between items-center">
            <Text>Thời lượng:</Text>
            <Text strong>{duration} giờ</Text>
          </div>
        )}
        
        <Divider className="my-2" />
        
        {step >= 2 && fieldPrice > 0 && (
          <div className="flex justify-between items-center">
            <Text>Giá sân:</Text>
            <Text strong>{formatCurrency(fieldPrice)}</Text>
          </div>
        )}
        
        {step >= 3 && servicePrice > 0 && (
          <>
            <div className="flex justify-between items-center">
              <Text>Giá dịch vụ:</Text>
              <Text strong>{formatCurrency(servicePrice)}</Text>
            </div>
            
            {services.length > 0 && (
              <div className="pl-4 text-gray-500 text-sm">
                {services.map(service => {
                  const serviceInfo = allServices.find(s => s.id === service.serviceId);
                  if (!serviceInfo) return null;
                  return (
                    <div key={service.serviceId} className="flex justify-between items-center">
                      <Text type="secondary">{serviceInfo.name} x {service.quantity}</Text>
                      <Text type="secondary">{formatCurrency(serviceInfo.price * service.quantity)}</Text>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        
        <Divider className="my-2" />
        
        <div className="flex justify-between items-center font-semibold">
          <Text strong>Tổng tiền:</Text>
          <Text className="text-lg text-blue-600" strong>{formatCurrency(totalPrice)}</Text>
        </div>
      </div>
    </Card>
  );
};

export default BookingPaymentSummary; 