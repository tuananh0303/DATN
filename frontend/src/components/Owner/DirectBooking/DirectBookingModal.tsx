import React, { useState, useEffect } from 'react';
import { Modal, Steps, Form, Button, message, Alert } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import bookingService from '@/services/booking.service';
import { AvailableFieldGroup } from '@/types/field.type';
import { Service } from '@/types/service.type';

// Import step components
import BookingStepInfo from './BookingStepInfo';
import BookingStepField from './BookingStepField';
import BookingStepServices from './BookingStepServices';

// Add interface for form data
interface BookingFormData {
  sportId?: number;
  date?: dayjs.Dayjs;
  timeRange?: dayjs.Dayjs[];
  guestName?: string;
  guestPhone?: string;
  fieldGroupId?: string;
  fieldId?: number | string;
  services?: Array<{ serviceId: number; quantity: number }>;
}

interface DirectBookingModalProps {
  visible: boolean;
  facilityId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DirectBookingModal: React.FC<DirectBookingModalProps> = ({
  visible,
  facilityId,
  onClose,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({});
  
  // State for API data
  const [sports, setSports] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedWeekday, setSelectedWeekday] = useState<string>('');
  const [availableFieldGroups, setAvailableFieldGroups] = useState<AvailableFieldGroup[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  
  // State for facility operating times
  const [operatingTimes, setOperatingTimes] = useState<{
    openTime1: string | null;
    closeTime1: string | null;
    openTime2: string | null;
    closeTime2: string | null;
    openTime3: string | null;
    closeTime3: string | null;
  }>({
    openTime1: null,
    closeTime1: null,
    openTime2: null,
    closeTime2: null,
    openTime3: null,
    closeTime3: null
  });

  // Fetch operating times when facility changes
  useEffect(() => {
    if (facilityId && visible) {
      fetchOperatingTimes();
      fetchSports();
    }
  }, [facilityId, visible]);

  // Fetch facility operating times
  const fetchOperatingTimes = async () => {
    try {
      setLoading(true);
      const times = await bookingService.getActiveOperatingTime(facilityId);
      setOperatingTimes(times);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching operating times:', error);
      setError('Không thể tải thông tin giờ hoạt động của cơ sở');
      setLoading(false);
    }
  };

  // Fetch sports for facility
  const fetchSports = async () => {
    try {
      setLoading(true);
      const sportsList = await bookingService.getSportsByFacility(facilityId);
      setSports(sportsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sports:', error);
      setError('Không thể tải thông tin môn thể thao');
      setLoading(false);
    }
  };

  // Reset form when modal is closed
  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setCurrentStep(0);
      setFormData({});
      setError(null);
      setSelectedDate(null);
      setSelectedWeekday('');
      setAvailableFieldGroups([]);
      setAvailableServices([]);
      setBookingId(null);
      setPaymentId(null);
    }
  }, [visible, form]);

  // Cleanup booking when component unmounts or when modal is closed
  useEffect(() => {
    return () => {
      if (bookingId) {
        bookingService.deleteBookingDraft(bookingId).catch(err => {
          console.error('Failed to delete draft booking:', err);
        });
      }
    };
  }, [bookingId]);

  // Handle date change
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      const weekday = getWeekdayName(date);
      setSelectedWeekday(weekday);
    } else {
      setSelectedDate(null);
      setSelectedWeekday('');
    }
  };

  // Fetch available field groups
  const fetchAvailableFieldGroups = async () => {
    try {
      setLoading(true);
      
      const values = await form.validateFields(['sportId', 'date', 'timeRange']);
      
      if (!facilityId || !values.sportId || !values.date || !values.timeRange) {
        message.error('Vui lòng chọn đầy đủ thông tin thể thao, ngày và giờ');
        setLoading(false);
        return;
      }
      
      // Prepare the date string
      const dateString = values.date.format('YYYY-MM-DD');
      
      // Get start time and end time
      const startTime = values.timeRange[0].format('HH:mm');
      const endTime = values.timeRange[1].format('HH:mm');
      
      // Call API to get available field groups
      const fieldGroups = await bookingService.getAvailableFieldGroups(
        facilityId,
        values.sportId,
        [dateString],
        startTime,
        endTime
      );
      
      setAvailableFieldGroups(fieldGroups);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching available field groups:', error);
      message.error('Không thể tải thông tin sân khả dụng');
      setLoading(false);
    }
  };

  // Fetch available services
  const fetchAvailableServices = async (bookingId: string) => {
    try {
      setLoading(true);
      const services = await bookingService.getAvailableServices(facilityId, bookingId);
      setAvailableServices(services);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching available services:', error);
      message.error('Không thể tải thông tin dịch vụ');
      setLoading(false);
    }
  };

  // Create draft booking
  const createDraftBooking = async () => {
    try {
      setLoading(true);
      
      const fieldId = form.getFieldValue('fieldId');
      if (!fieldId) {
        message.error('Vui lòng chọn sân');
        setLoading(false);
        return null;
      }
      
      const values = await form.validateFields(['sportId', 'date', 'timeRange', 'guestName', 'guestPhone']);
      
      const startTime = values.timeRange[0].format('HH:mm');
      const endTime = values.timeRange[1].format('HH:mm');
      const dateString = values.date.format('YYYY-MM-DD');
      
      // Format phone number to international format
      const formatPhoneNumber = (phone: string): string => {
        // Remove any non-digit characters
        const digits = phone.replace(/\D/g, '');
        
        // Handle Vietnamese phone numbers
        if (digits.startsWith('84')) {
          return `+${digits}`;
        } else if (digits.startsWith('0')) {
          return `+84${digits.substring(1)}`;
        }
        
        // Default return with + prefix if not already there
        return phone.startsWith('+') ? phone : `+${digits}`;
      };
      
      // Format the phone number
      const formattedPhone = formatPhoneNumber(values.guestPhone);
      
      const response = await bookingService.createDraftBookingByOwner(
        startTime,
        endTime,
        {
          date: dateString,
          fieldId: Number(fieldId)
        },
        values.guestName,
        formattedPhone,
        values.sportId
      );
      
      setBookingId(response.id);
      if (response.payment && response.payment.id) {
        setPaymentId(response.payment.id);
      }
      
      setLoading(false);
      return response.id;
    } catch (error) {
      console.error('Error creating draft booking:', error);
      message.error('Không thể tạo đơn đặt sân');
      setLoading(false);
      return null;
    }
  };

  // Update services
  const updateServices = async () => {
    try {
      setLoading(true);
      
      if (!bookingId) {
        message.error('Không tìm thấy đơn đặt sân');
        setLoading(false);
        return false;
      }
      
      const services = form.getFieldValue('services') || [];
      
      // If no services selected, skip API call
      if (!Array.isArray(services) || services.length === 0) {
        setLoading(false);
        return true;
      }
      
      // Update services
      const response = await bookingService.updateAdditionalServicesByOwner(
        bookingId,
        services
      );
      
      // Update payment ID if needed
      if (response.payment && response.payment.id) {
        setPaymentId(response.payment.id);
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error updating services:', error);
      message.error('Không thể cập nhật dịch vụ');
      setLoading(false);
      return false;
    }
  };

  // Process payment
  const processPayment = async () => {
    try {
      setLoading(true);
      
      if (!paymentId) {
        message.error('Không tìm thấy thông tin thanh toán');
        setLoading(false);
        return false;
      }
      
      await bookingService.processPaymentByOwner(paymentId);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error processing payment:', error);
      message.error('Không thể xử lý thanh toán');
      setLoading(false);
      return false;
    }
  };

  // Handle next step
  const handleNext = async () => {
    try {
      setError(null);
      
      if (currentStep === 0) {
        // Step 0: Basic info validation
        const values = await form.validateFields(['sportId', 'date', 'timeRange', 'guestName', 'guestPhone']);
        setFormData({ ...formData, ...values });
        
        // Fetch available field groups
        await fetchAvailableFieldGroups();
      } else if (currentStep === 1) {
        // Step 1: Field selection
        const values = form.getFieldsValue(['fieldGroupId', 'fieldId']);
        setFormData({ ...formData, ...values });
        
        // Create draft booking
        const createdBookingId = await createDraftBooking();
        if (!createdBookingId) {
          return; // Stop if creation fails
        }
        
        // Fetch available services
        await fetchAvailableServices(createdBookingId);
      } else if (currentStep === 2) {
        // Step 2: Services selection
        const values = form.getFieldValue('services') || [];
        setFormData({ ...formData, services: values });
        
        // Update services
        const success = await updateServices();
        if (!success) return;
        
        // Process payment (final step)
        const paymentSuccess = await processPayment();
        if (paymentSuccess) {
          message.success('Đặt sân thành công');
          onSuccess();
          onClose();
          return;
        }
      }
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đã có lỗi xảy ra');
      }
    }
  };

  // Handle previous step
  const handlePrev = () => {
    // If going back from Field selection and already have a booking ID, delete it
    if (currentStep === 1 && bookingId) {
      bookingService.deleteBookingDraft(bookingId).catch(err => {
        console.error('Failed to delete draft booking:', err);
      });
      setBookingId(null);
      setPaymentId(null);
    }
    
    // Store current form values in formData
    const currentValues = form.getFieldsValue();
    setFormData({ ...formData, ...currentValues });
    
    // Go to previous step
    setCurrentStep(prev => prev - 1);
  };

  // Utility functions
  const getWeekdayName = (date: dayjs.Dayjs): string => {
    const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return weekdays[date.day()];
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Calculate total price
  const calculateTotalPrice = (): number => {
    let total = 0;
    
    // Calculate field price
    if (formData.fieldGroupId) {
      const fieldGroup = availableFieldGroups.find(fg => String(fg.id) === String(formData.fieldGroupId));
      if (fieldGroup) {
        const basePrice = fieldGroup.basePrice || 0;
        
        // Calculate duration in hours
        let duration = 0;
        if (formData.timeRange && formData.timeRange[0] && formData.timeRange[1]) {
          duration = formData.timeRange[1].diff(formData.timeRange[0], 'hour', true);
        }
        
        // Calculate peak hour price if applicable
        let peakHourPrice = 0;
        if (duration > 0 && formData.timeRange) {
          const start = formData.timeRange[0].format('HH:mm:00');
          const end = formData.timeRange[1].format('HH:mm:00');
          
          // Check peak hour 1
          if (fieldGroup.peakStartTime1 && fieldGroup.peakEndTime1 && fieldGroup.priceIncrease1) {
            const peakStart = fieldGroup.peakStartTime1;
            const peakEnd = fieldGroup.peakEndTime1;
            
            if (start >= peakStart && end <= peakEnd) {
              peakHourPrice = fieldGroup.priceIncrease1;
            }
          }
          
          // Add checks for peak hour 2 and 3 if needed
        }
        
        const fieldPrice = (basePrice + peakHourPrice) * duration;
        total += fieldPrice;
      }
    }
    
    // Add service prices
    if (Array.isArray(formData.services) && formData.services.length > 0) {
      const serviceCost = formData.services.reduce((sum: number, service: { serviceId: number; quantity: number }) => {
        const serviceInfo = availableServices.find(s => s.id === service.serviceId);
        return sum + (serviceInfo?.price || 0) * service.quantity;
      }, 0);
      
      total += serviceCost;
    }
    
    return total;
  };

  // Validate time range
  const validateTimeRange = (_: unknown, timeRange: [dayjs.Dayjs, dayjs.Dayjs] | null): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!timeRange) {
        reject('Vui lòng chọn thời gian');
        return;
      }

      const [startTime, endTime] = timeRange;
      
      // Check if duration is at least 30 minutes
      const durationMinutes = endTime.diff(startTime, 'minute');
      if (durationMinutes < 30) {
        reject('Thời gian chơi tối thiểu là 30 phút');
        return;
      }

      // If booking today, check if start time is at least 15 minutes from now
      const selectedDate = form.getFieldValue('date');
      const today = dayjs().startOf('day');
      const isToday = selectedDate && selectedDate.isSame(today, 'day');

      if (isToday) {
        const now = dayjs();
        const bufferTime = now.add(15, 'minute');
        
        if (startTime.isBefore(bufferTime)) {
          reject('Thời gian bắt đầu phải sau thời điểm hiện tại ít nhất 15 phút');
          return;
        }
      }

      // Check if time is within facility operating hours
      if (operatingTimes) {
        const timeRanges = [];
        
        if (operatingTimes.openTime1 && operatingTimes.closeTime1) {
          timeRanges.push({
            open: dayjs(operatingTimes.openTime1, 'HH:mm:ss'),
            close: dayjs(operatingTimes.closeTime1, 'HH:mm:ss')
          });
        }
        
        if (operatingTimes.openTime2 && operatingTimes.closeTime2) {
          timeRanges.push({
            open: dayjs(operatingTimes.openTime2, 'HH:mm:ss'),
            close: dayjs(operatingTimes.closeTime2, 'HH:mm:ss')
          });
        }
        
        if (operatingTimes.openTime3 && operatingTimes.closeTime3) {
          timeRanges.push({
            open: dayjs(operatingTimes.openTime3, 'HH:mm:ss'),
            close: dayjs(operatingTimes.closeTime3, 'HH:mm:ss')
          });
        }
        
        if (timeRanges.length === 0) {
          resolve();
          return;
        }
        
        const startTimeOfDay = dayjs().hour(startTime.hour()).minute(startTime.minute()).second(0);
        const endTimeOfDay = dayjs().hour(endTime.hour()).minute(endTime.minute()).second(0);
        
        const isWithinAnyTimeRange = timeRanges.some(range => {
          return (
            (startTimeOfDay.isAfter(range.open) || startTimeOfDay.isSame(range.open, 'minute')) &&
            (endTimeOfDay.isBefore(range.close) || endTimeOfDay.isSame(range.close, 'minute'))
          );
        });
        
        if (!isWithinAnyTimeRange) {
          const timeRangesText = timeRanges
            .map(range => `${range.open.format('HH:mm')} - ${range.close.format('HH:mm')}`)
            .join(' hoặc ');
          
          reject(`Thời gian phải nằm trong khung giờ hoạt động: ${timeRangesText}`);
          return;
        }
      }

      resolve();
    });
  };

  // Step content components
  const steps = [
    {
      title: 'Thông tin chung',
      content: (
        <BookingStepInfo
          form={form}
          formData={formData}
          sports={sports}
          handleDateChange={handleDateChange}
          selectedWeekday={selectedWeekday}
          validateTimeRange={validateTimeRange}
          operatingTimes={operatingTimes}
        />
      )
    },
    {
      title: 'Chọn sân',
      content: (
        <BookingStepField
          form={form}
          formData={formData}
          fieldGroups={availableFieldGroups}
          formatCurrency={formatCurrency}
          calculateTotalPrice={calculateTotalPrice}
          selectedDate={selectedDate || undefined}
        />
      )
    },
    {
      title: 'Dịch vụ',
      content: (
        <BookingStepServices
          form={form}
          formData={formData}
          services={availableServices}
          fieldGroups={availableFieldGroups}
          formatCurrency={formatCurrency}
          calculateTotalPrice={calculateTotalPrice}
          selectedDate={selectedDate || undefined}
        />
      )
    }
  ];

  return (
    <Modal
      title="Đặt sân trực tiếp"
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <div className="py-4">
        <Steps current={currentStep} className="mb-6">
          {steps.map(item => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        
        {error && (
          <Alert 
            type="error" 
            message="Lỗi" 
            description={error} 
            className="mb-4" 
            closable 
            onClose={() => setError(null)} 
          />
        )}
        
        <div className="mb-6">
          {steps[currentStep].content}
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            icon={<ArrowLeftOutlined />}
          >
            Quay lại
          </Button>
          
          <Button 
            type="primary" 
            onClick={handleNext}
            loading={loading}
            icon={currentStep === steps.length - 1 ? <CheckCircleOutlined /> : <ArrowRightOutlined />}
          >
            {currentStep === steps.length - 1 ? 'Xác nhận đặt sân' : 'Tiếp theo'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DirectBookingModal; 