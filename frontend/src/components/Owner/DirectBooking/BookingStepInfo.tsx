import React, { useState, useEffect } from 'react';
import { Form, Card, Col, Select, DatePicker, TimePicker, FormInstance, Input, Typography } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { OperatingHoursDisplay } from '@/components/shared';

const { Option } = Select;
const { RangePicker } = TimePicker;
const { Text } = Typography;

interface BookingStepInfoProps {
  form: FormInstance;
  formData: {
    sportId?: number;
    date?: dayjs.Dayjs;
    timeRange?: dayjs.Dayjs[];
    guestName?: string;
    guestPhone?: string;
  };
  sports: { id: number; name: string }[];
  handleDateChange: (date: dayjs.Dayjs | null) => void;
  selectedWeekday: string;
  validateTimeRange?: (rule: unknown, timeRange: [dayjs.Dayjs, dayjs.Dayjs] | null) => Promise<void>;
  operatingTimes?: {
    openTime1: string | null;
    closeTime1: string | null;
    openTime2: string | null;
    closeTime2: string | null;
    openTime3: string | null;
    closeTime3: string | null;
  };
}

// Function to format phone number to international format
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

const BookingStepInfo: React.FC<BookingStepInfoProps> = ({
  form,
  formData,
  sports,
  handleDateChange,
  selectedWeekday,
  validateTimeRange,
  operatingTimes
}) => {
  const [timeRangeSelected, setTimeRangeSelected] = useState(false);
  const [displayTimeRange, setDisplayTimeRange] = useState<dayjs.Dayjs[] | null>(
    formData.timeRange && Array.isArray(formData.timeRange) ? formData.timeRange : null
  );
  
  // Set timeRangeSelected state when timeRange is present in formData
  useEffect(() => {
    if (formData.timeRange && Array.isArray(formData.timeRange) && 
        formData.timeRange.length === 2 && 
        formData.timeRange[0] && formData.timeRange[1]) {
      setTimeRangeSelected(true);
      setDisplayTimeRange(formData.timeRange);
    }
  }, [formData.timeRange]);
  
  // Auto-select the first sport option if no sport is selected
  useEffect(() => {
    if (sports.length > 0 && !form.getFieldValue('sportId')) {
      form.setFieldsValue({ sportId: sports[0].id });
    }
  }, [sports, form]);

  // Format time range for display
  const formatTimeRange = (timeRange: dayjs.Dayjs[]): string => {
    if (timeRange.length >= 2 && timeRange[0] && timeRange[1]) {
      return `${timeRange[0].format('HH:mm')} - ${timeRange[1].format('HH:mm')}`;
    }
    return '';
  };

  // Time range picker handler
  const handleTimeRangeChange = (times: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    // Mark time range as selected when valid times are chosen
    if (times && times[0] && times[1]) {
      setTimeRangeSelected(true);
      // Filter out any null values and ensure we have valid dayjs objects
      const validTimes = [times[0], times[1]].filter(Boolean) as dayjs.Dayjs[];
      setDisplayTimeRange(validTimes);
      
      // Trigger form validation to update UI state
      form.validateFields(['timeRange']).catch(() => {
        // Ignore validation errors
      });
    } else {
      setTimeRangeSelected(false);
      setDisplayTimeRange(null);
    }
  };

  // Format phone number before form submission
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    form.setFieldsValue({ 
      guestPhone: rawValue // Keep the raw input for display
    });
  };

  // Handle form values change to process phone number
  const handleValuesChange = (changedValues: { date?: dayjs.Dayjs }) => {
    // Update UI immediately when date changes
    if (changedValues.date) {
      handleDateChange(changedValues.date);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onValuesChange={handleValuesChange}
      onFinish={(values) => {
        // Format phone number when form is submitted
        if (values.guestPhone) {
          values.guestPhone = formatPhoneNumber(values.guestPhone);
        }
      }}
    >
      <Col span={24}>
        <Form.Item
          name="sportId"
          label="Loại hình thể thao"
          rules={[{ required: true, message: 'Vui lòng chọn loại hình thể thao' }]}
        >
          <Select placeholder="Chọn loại hình thể thao">
            {sports.map(sport => (
              <Option key={sport.id} value={sport.id}>{getSportNameInVietnamese(sport.name)}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      
      <Col span={24}>
        <Card className="border border-gray-200 shadow-sm">
          <h5 className="text-lg font-medium mb-3">Chọn thời gian</h5>
          
          <Form.Item
            name="date"
            label="Ngày đặt sân"
            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt sân' }]}
            tooltip={{
              title: 'Chọn ngày đặt sân phù hợp.',
              icon: <InfoCircleOutlined />
            }}
            style={{
              marginBottom: '0px'
            }}
          >
            <DatePicker 
              className="w-full" 
              format="DD/MM/YYYY"
              disabledDate={current => {
                return current && current < dayjs().startOf('day');
              }}
              onChange={handleDateChange}
            />
          </Form.Item>            
          {selectedWeekday && (
            <div className="mb-4 ml-2 text-blue-600 text-sm font-semibold">
              {selectedWeekday}
            </div>
          )}
          
          <Form.Item
            name="timeRange"
            label="Thời gian chơi"
            rules={[
              { required: true, message: 'Vui lòng chọn thời gian' },
              ...(validateTimeRange ? [{ validator: validateTimeRange }] : [])
            ]}
          >
            <RangePicker 
              className="w-full" 
              format="HH:mm"
              minuteStep={30}
              onChange={handleTimeRangeChange}
            />
          </Form.Item>
          
          {/* Hiển thị thông tin giờ hoạt động của cơ sở */}
          {operatingTimes && operatingTimes.openTime1 && operatingTimes.closeTime1 && (
            <div className="text-gray-500 text-xs mb-4">
              <OperatingHoursDisplay 
                facility={operatingTimes} 
                showIcon={true}
                className="text-gray-600"
              />
              <div className="mt-1 text-xs italic">
                <InfoCircleOutlined className="mr-1" />
                Bạn chỉ có thể đặt sân trong khung giờ hoạt động của cơ sở
              </div>
            </div>
          )}
        </Card>
      </Col>

      <Col span={24} className="mt-4">
        <Card className="border border-gray-200 shadow-sm">
          <h5 className="text-lg font-medium mb-3">Thông tin khách hàng</h5>
          
          <Form.Item
            name="guestName"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>
          
          <Form.Item
            name="guestPhone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                pattern: /^(\+84|84|0)[1-9]\d{8}$/,
                message: 'Số điện thoại không hợp lệ (định dạng: +84, 84 hoặc 0 đầu)'
              }
            ]}
            getValueFromEvent={(e) => {
              return e.target.value;
            }}
            getValueProps={(value) => {
              return {
                value: value
              };
            }}
            normalize={(value) => {
              // Only for display, keeps the original input
              return value;
            }}
          >
            <Input 
              placeholder="Nhập số điện thoại" 
              onChange={handlePhoneChange}
              maxLength={12}
            />
          </Form.Item>
        </Card>
      </Col>

      {timeRangeSelected && displayTimeRange && (
        <Col span={24} className="mt-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <ClockCircleOutlined className="mr-2 text-blue-500" />
              <Text strong>Thời gian chơi: <span className="text-blue-600">{formatTimeRange(displayTimeRange)}</span></Text>
            </div>
          </div>
        </Col>
      )}
    </Form>
  );
};

export default BookingStepInfo; 