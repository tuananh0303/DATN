import React, { useState, useEffect } from 'react';
import { Form, Card, Radio, Space, FormInstance, Typography, Tag, Tooltip, 
   Empty, Row, Col } from 'antd';
import { AvailableFieldGroup } from '@/types/field.type';
import { 
  InfoCircleOutlined, 
  EnvironmentOutlined, TeamOutlined, FieldTimeOutlined,
  CheckCircleOutlined, DollarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import BookingPaymentSummary from './BookingPaymentSummary';

const { Title, Text } = Typography;

interface BookingStepFieldProps {
  form: FormInstance;
  formData: {
    fieldGroupId?: string;
    fieldId?: number | string;
    timeRange?: dayjs.Dayjs[];
    date?: dayjs.Dayjs;
  };
  fieldGroups: AvailableFieldGroup[];
  formatCurrency: (amount: number) => string;
  calculateTotalPrice: () => number;
  selectedDate?: dayjs.Dayjs;
}

const BookingStepField: React.FC<BookingStepFieldProps> = ({
  form,
  formData,
  fieldGroups,
  formatCurrency,
  calculateTotalPrice,
  selectedDate
}) => {
  const [selectedFieldGroup, setSelectedFieldGroup] = useState<AvailableFieldGroup | null>(
    formData.fieldGroupId ? fieldGroups.find(g => String(g.id) === String(formData.fieldGroupId)) || null : null
  );
  
  // Cập nhật lại field selections khi chọn field group hoặc khi formData thay đổi
  useEffect(() => {
    if (formData.fieldGroupId) {
      const fieldGroup = fieldGroups.find(g => String(g.id) === String(formData.fieldGroupId));
      if (fieldGroup) {
        setSelectedFieldGroup(fieldGroup);
        
        // Khởi tạo lựa chọn sân cho mỗi ngày
        if (fieldGroup.bookingSlot) {
          let firstSelectedFieldId: number | null = null;
          
          const firstSlot = fieldGroup.bookingSlot[0];
          if (firstSlot) {
            // Nếu đã có sân được chọn trước đó trong formData
            if (formData.fieldId) {
              const existingField = firstSlot.fields.find(f => f.id === Number(formData.fieldId));
              if (existingField && existingField.status === 'active') {
                firstSelectedFieldId = existingField.id;
              }
            }
            
            // Nếu không, chọn sân đầu tiên có status là 'active'
            if (!firstSelectedFieldId) {
              const firstActiveField = firstSlot.fields.find(field => field.status === 'active');
              if (firstActiveField) {
                firstSelectedFieldId = firstActiveField.id;
              }
            }
            
            // Set the selected field ID to the form
            if (firstSelectedFieldId) {
              console.log('Setting default fieldId:', firstSelectedFieldId);
              form.setFieldValue('fieldId', firstSelectedFieldId);
            }
          }
        }
      }
    }
  }, [formData.fieldGroupId, formData.fieldId, fieldGroups, form]);

  // Thêm useEffect mới để đảm bảo fieldId luôn được khởi tạo sau khi render
  useEffect(() => {
    // Chỉ thực hiện nếu đã có fieldGroup nhưng chưa có fieldId
    if (formData.fieldGroupId && (!formData.fieldId) && fieldGroups.length > 0) {
      const fieldGroup = fieldGroups.find(g => String(g.id) === String(formData.fieldGroupId));
      if (fieldGroup && fieldGroup.bookingSlot && fieldGroup.bookingSlot.length > 0) {
        // Tìm field đầu tiên có status active trong slot đầu tiên
        const firstSlot = fieldGroup.bookingSlot[0];
        const firstActiveField = firstSlot.fields.find(field => field.status === 'active');
        
        if (firstActiveField) {
          console.log('Auto-initializing fieldId on first render:', firstActiveField.id);
          form.setFieldValue('fieldId', firstActiveField.id);
          
          // Update parent component via form values
          setTimeout(() => {
            console.log('Auto-updating parent form with fieldId:', firstActiveField.id);
            form.setFieldsValue({ fieldId: firstActiveField.id });
          }, 0);
        }
      }
    }
  }, [formData.fieldGroupId, formData.fieldId, fieldGroups, form]);

  // Thêm effect để đảm bảo fieldId luôn có giá trị khi form được submit
  useEffect(() => {
    // Trigger this effect any time the selectedFieldGroup changes
    if (selectedFieldGroup && selectedFieldGroup.bookingSlot && selectedFieldGroup.bookingSlot.length > 0) {
      const currentFieldId = form.getFieldValue('fieldId');
      
      // If no fieldId is set, set a default
      if (!currentFieldId) {
        const firstSlot = selectedFieldGroup.bookingSlot[0];
        const firstActiveField = firstSlot.fields.find(field => field.status === 'active');
        
        if (firstActiveField) {
          console.log('Setting default field on group change:', firstActiveField.id);
          form.setFieldValue('fieldId', firstActiveField.id);
        }
      }
    }
  }, [selectedFieldGroup, form]);

  // Hàm helper để định dạng giờ từ "HH:MM:SS" sang "HH:MM"
  const formatTimeString = (timeStr: string | null | undefined): string => {
    if (!timeStr) return '';
    return timeStr.substring(0, 5);
  };

  // Render thông tin giờ cao điểm trong card field group
  const renderPeakHourInfo = (fieldGroup: AvailableFieldGroup): JSX.Element[] => {
    const peakHourElements: JSX.Element[] = [];
    
    if (fieldGroup.peakStartTime1 && fieldGroup.peakEndTime1 && fieldGroup.priceIncrease1) {
      peakHourElements.push(
        <div key="peak1" className="flex items-center mt-1 text-orange-500">
          <FieldTimeOutlined className="mr-1" />
          <span> Giá cao điểm 1: {formatTimeString(fieldGroup.peakStartTime1)}-{formatTimeString(fieldGroup.peakEndTime1)}: </span>
          <span className="font-medium pl-2">{formatCurrency(fieldGroup.basePrice + fieldGroup.priceIncrease1)}/giờ</span>
        </div>
      );
    }
    
    if (fieldGroup.peakStartTime2 && fieldGroup.peakEndTime2 && fieldGroup.priceIncrease2) {
      peakHourElements.push(
        <div key="peak2" className="flex items-center mt-1 text-orange-500">
          <FieldTimeOutlined className="mr-1" />
          <span> Giá cao điểm 2: {formatTimeString(fieldGroup.peakStartTime2)}-{formatTimeString(fieldGroup.peakEndTime2)}: </span>
          <span className="font-medium pl-2">{formatCurrency(fieldGroup.basePrice + fieldGroup.priceIncrease2)}/giờ</span>
        </div>
      );
    }
    
    if (fieldGroup.peakStartTime3 && fieldGroup.peakEndTime3 && fieldGroup.priceIncrease3) {
      peakHourElements.push(
        <div key="peak3" className="flex items-center mt-1 text-orange-500">
          <FieldTimeOutlined className="mr-1" />
          <span> Giá cao điểm 3: {formatTimeString(fieldGroup.peakStartTime3)}-{formatTimeString(fieldGroup.peakEndTime3)}: </span>
          <span className="font-medium pl-2">{formatCurrency(fieldGroup.basePrice + fieldGroup.priceIncrease3)}/giờ</span>
        </div>
      );
    }
    
    if (peakHourElements.length === 0) {
      return [
        <div key="no-peak" className="flex items-center mt-1 text-gray-500">
          <FieldTimeOutlined className="mr-1" />
          <span>Không có giờ cao điểm</span>
        </div>
      ];
    }
    
    return peakHourElements;
  };

  // Xử lý khi thay đổi field group
  const handleFieldGroupChange = (fieldGroupId: string) => {
    const selected = fieldGroups.find(g => g.id === fieldGroupId) || null;
    setSelectedFieldGroup(selected);
    
    // Reset và khởi tạo lại lựa chọn sân
    if (selected && selected.bookingSlot && selected.bookingSlot.length > 0) {
      // Find an active field in the first booking slot
      const firstSlot = selected.bookingSlot[0];
      const firstActiveField = firstSlot.fields.find(field => field.status === 'active');
      
      if (firstActiveField) {
        console.log('Setting default fieldId after group change:', firstActiveField.id);
        form.setFieldsValue({
          fieldGroupId,
          fieldId: firstActiveField.id
        });
      } else {
        form.setFieldsValue({
          fieldGroupId,
          fieldId: ""
        });
      }
    } else {
      // Reset if no field group is selected
      form.setFieldsValue({
        fieldGroupId: null,
        fieldId: ""
      });
    }
  };

  // Field selection radio button group
  const renderFieldSelectionRadio = () => {
    if (!selectedFieldGroup || !selectedFieldGroup.bookingSlot || selectedFieldGroup.bookingSlot.length === 0) {
      return <Empty description="Không có sân khả dụng" />;
    }

    const firstSlot = selectedFieldGroup.bookingSlot[0];
    const availableFields = firstSlot.fields.filter(field => field.status === 'active');

    if (availableFields.length === 0) {
      return <Empty description="Không có sân khả dụng trong ngày này" />;
    }

    return (
      <Form.Item
        name="fieldId"
        label="Chọn sân"
        rules={[{ required: true, message: 'Vui lòng chọn sân' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            {availableFields.map(field => (
              <Radio key={field.id} value={field.id}>
                {field.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    );
  };

  return (
    <>
      {fieldGroups.length === 0 ? (
        <Empty description="Không có sân nào phù hợp" />
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...formData,
            fieldId: formData.fieldId || ""
          }}
        >
          <Form.Item 
            name="fieldId" 
            hidden
            rules={[{ required: true, message: 'Vui lòng chọn sân' }]}
          >
            <input type="hidden" />
          </Form.Item>
          
          <Row gutter={[10, 30]}>
            <Col xs={24} md={10}>
              <div className="p-3 rounded-lg h-full">
              <Title level={5} className="mb-4">Chọn loại sân</Title>
              <Form.Item
                name="fieldGroupId"
                rules={[{ required: true, message: 'Vui lòng chọn loại sân' }]}
                style={{ width: '100%' }}
              >
                <Radio.Group 
                  className="w-full"
                  style={{ width: '100%' }}
                  onChange={(e) => handleFieldGroupChange(e.target.value)}
                >
                  <Space direction="vertical" className="w-full" style={{ width: '100%' }}>
                    {fieldGroups.map(group => (
                      <Radio key={group.id} value={group.id} className="w-full custom-radio-card" style={{ width: '100%' }}>
                        <Card 
                          className={`w-full mb-2 cursor-pointer hover:bg-gray-50 transition-all ${
                            selectedFieldGroup && selectedFieldGroup.id === group.id 
                              ? 'border-blue-500 shadow-md bg-blue-50' 
                              : 'border-gray-200'
                          }`}
                          style={{ 
                            padding: '12px', 
                            width: '100%',
                            borderWidth: selectedFieldGroup && selectedFieldGroup.id === group.id ? '2px' : '1px'
                          }}
                        >
                          <div className="flex justify-between items-start w-full pr-10">
                            <div className="w-full flex flex-col gap-1">
                              <Text strong className={`text-lg ${selectedFieldGroup && selectedFieldGroup.id === group.id ? 'text-blue-700' : ''}`}>{group.name}</Text>
                              <div className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
                                <div className="flex items-center">
                                  <EnvironmentOutlined className="mr-1" />
                                  <span>Kích thước: {group.dimension}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <TeamOutlined className="mr-1" />
                                  <span>Bề mặt: {group.surface}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <FieldTimeOutlined className="mr-1" />
                                  <span>Số sân: {group.bookingSlot && group.bookingSlot[0] ? 
                                    group.bookingSlot[0].fields.length : 0}</span>
                                </div>                                
                                <div className="flex items-center mt-1">
                                  <DollarOutlined className="mr-1" />
                                  <span>Giá cơ bản: {formatCurrency(group.basePrice)}/giờ</span>
                                </div>
                                <div className="mt-1">
                                  {renderPeakHourInfo(group)}
                                </div>
                              </div>
                              <div className="mt-2">
                                {group.sports && group.sports.map(sport => (
                                  <Tag color="blue" key={sport.id}>{getSportNameInVietnamese(sport.name)}</Tag>
                                ))}
                              </div>
                            </div>                            
                          </div>
                          {selectedFieldGroup && selectedFieldGroup.id === group.id && (
                            <div className="absolute top-2 right-2">
                              <CheckCircleOutlined className="text-blue-500 text-lg" />
                            </div>
                          )}
                        </Card>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
              </div>
            </Col>
            
            <Col xs={24} md={14}>
              {selectedFieldGroup ? (
                <div className="p-3 rounded-lg h-full">
                  <div>                                                    
                    {/* Add Payment Summary */}
                    <div className="mt-4">
                      <BookingPaymentSummary 
                        step={2}
                        fieldGroup={selectedFieldGroup}
                        startTime={formData.timeRange?.[0]?.format('HH:mm:ss')}
                        endTime={formData.timeRange?.[1]?.format('HH:mm:ss')}
                        selectedDate={selectedDate}
                        formatCurrency={formatCurrency}
                        calculateTotalPrice={calculateTotalPrice}
                      />
                    </div>
                
                    <Title level={5} className="mb-4 mt-4">
                      Danh sách sân khả dụng
                      <Tooltip title="Chọn một sân trong nhóm đã chọn">
                        <InfoCircleOutlined className="ml-2 text-blue-500" />
                      </Tooltip>
                    </Title>
                    {renderFieldSelectionRadio()}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-lg h-full flex items-center justify-center">
                  <Empty description="Vui lòng chọn loại sân để xem chi tiết" />
                </div>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default BookingStepField; 