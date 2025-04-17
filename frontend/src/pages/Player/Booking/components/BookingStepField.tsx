import React, { useState, useEffect } from 'react';
import { Form, Card, Radio, Space, FormInstance, Typography, Divider, Tag, Tooltip, 
  Empty, Row, Col, Select, Table, Alert } from 'antd';
import { AvailableFieldGroup } from '@/types/field.type';
import { BookingFormData } from '@/types/booking.type';
import { 
  InfoCircleOutlined, 
  EnvironmentOutlined, TeamOutlined, FieldTimeOutlined,
  CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getSportNameInVietnamese } from '@/utils/translateSport';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Interface cho các lựa chọn sân của từng ngày
interface FieldSelection {
  [date: string]: number | null;
}

// Interface cho Field trong booking slot
interface Field {
  id: number;
  name: string;
  status: string;
}

// Interface cho table row data
interface TableRowData {
  key: number;
  date: string;
  fields: Field[];
}

interface BookingStepFieldProps {
  form: FormInstance;
  formData: Partial<BookingFormData>;
  fieldGroups: AvailableFieldGroup[];
  formatCurrency: (amount: number) => string;
}

const BookingStepField: React.FC<BookingStepFieldProps> = ({
  form,
  formData,
  fieldGroups,
  formatCurrency
}) => {
  const [selectedFieldGroup, setSelectedFieldGroup] = useState<AvailableFieldGroup | null>(
    formData.fieldGroupId ? fieldGroups.find(g => String(g.id) === String(formData.fieldGroupId)) || null : null
  );
  
  // State để lưu trữ lựa chọn sân cho từng ngày
  const [fieldSelections, setFieldSelections] = useState<FieldSelection>({});

  // Cập nhật lại field selections khi chọn field group hoặc khi formData thay đổi
  useEffect(() => {
    if (formData.fieldGroupId) {
      const fieldGroup = fieldGroups.find(g => String(g.id) === String(formData.fieldGroupId));
      if (fieldGroup) {
        setSelectedFieldGroup(fieldGroup);
        
        // Khởi tạo lựa chọn sân cho mỗi ngày
        if (fieldGroup.bookingSlot) {
          const initialSelections: FieldSelection = {};
          let firstSelectedFieldId: number | null = null;
          
          fieldGroup.bookingSlot.forEach(slot => {
            const dateStr = dayjs(slot.date).format('YYYY-MM-DD');
            
            // Nếu đã có sân được chọn trước đó trong formData
            if (formData.fieldId) {
              const existingField = slot.fields.find(f => f.id === Number(formData.fieldId));
              if (existingField && existingField.status === 'active') {
                initialSelections[dateStr] = existingField.id;
                if (!firstSelectedFieldId) firstSelectedFieldId = existingField.id;
                return;
              }
            }
            
            // Nếu không, chọn sân đầu tiên có status là 'active'
            const firstActiveField = slot.fields.find(field => field.status === 'active');
            if (firstActiveField) {
              initialSelections[dateStr] = firstActiveField.id;
              if (!firstSelectedFieldId) firstSelectedFieldId = firstActiveField.id;
            } else {
              initialSelections[dateStr] = null;
            }
          });
          
          setFieldSelections(initialSelections);
          
          // Always update the form with a valid fieldId
          if (firstSelectedFieldId) {
            console.log('Setting default fieldId:', firstSelectedFieldId);
            form.setFieldValue('fieldId', firstSelectedFieldId);
            
            // Đảm bảo cập nhật cả formData.fieldId để tránh lỗi
            setTimeout(() => {
              const formValues = form.getFieldsValue();
              if (formValues.fieldId !== formData.fieldId) {
                console.log('Updating parent form with fieldId:', firstSelectedFieldId);
                form.setFieldsValue({ fieldId: firstSelectedFieldId });
              }
            }, 0);
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

  // Render thông tin giá
  const renderPriceInfo = (fieldGroup: AvailableFieldGroup) => {
    const prices = [];

    // Giá cơ bản
    prices.push(
      <div key="base" className="flex justify-between">
        <span>Giá cơ bản:</span>
        <span className="font-medium">{formatCurrency(fieldGroup.basePrice)}/giờ</span>
      </div>
    );

    // Các mức giá cao điểm
    if (fieldGroup.peakStartTime1 && fieldGroup.peakEndTime1 && fieldGroup.priceIncrease1) {
      prices.push(
        <div key="peak1" className="flex justify-between text-orange-500">
          <span>
            <FieldTimeOutlined className="mr-1" />
            Cao điểm ({fieldGroup.peakStartTime1.substring(0, 5)}-{fieldGroup.peakEndTime1.substring(0, 5)}):
          </span>
          <span className="font-medium">{formatCurrency(fieldGroup.basePrice + fieldGroup.priceIncrease1)}/giờ</span>
        </div>
      );
    }

    if (fieldGroup.peakStartTime2 && fieldGroup.peakEndTime2 && fieldGroup.priceIncrease2) {
      prices.push(
        <div key="peak2" className="flex justify-between text-orange-500">
          <span>
            <FieldTimeOutlined className="mr-1" />
            Cao điểm ({fieldGroup.peakStartTime2.substring(0, 5)}-{fieldGroup.peakEndTime2.substring(0, 5)}):
          </span>
          <span className="font-medium">{formatCurrency(fieldGroup.basePrice + fieldGroup.priceIncrease2)}/giờ</span>
        </div>
      );
    }

    if (fieldGroup.peakStartTime3 && fieldGroup.peakEndTime3 && fieldGroup.priceIncrease3) {
      prices.push(
        <div key="peak3" className="flex justify-between text-orange-500">
          <span>
            <FieldTimeOutlined className="mr-1" />
            Cao điểm ({fieldGroup.peakStartTime3.substring(0, 5)}-{fieldGroup.peakEndTime3.substring(0, 5)}):
          </span>
          <span className="font-medium">{formatCurrency(fieldGroup.basePrice + fieldGroup.priceIncrease3)}/giờ</span>
        </div>
      );
    }

    return (
      <div className="space-y-1 bg-gray-50 p-3 rounded-md mt-2">
        {prices}
      </div>
    );
  };

  // Xử lý khi thay đổi field group
  const handleFieldGroupChange = (fieldGroupId: string) => {
    const selected = fieldGroups.find(g => g.id === fieldGroupId) || null;
    setSelectedFieldGroup(selected);
    
    // Reset và khởi tạo lại lựa chọn sân
    if (selected) {
      const initialSelections: FieldSelection = {};
      let firstSelectedFieldId: number | null = null;
      
      if (selected.bookingSlot) {
        selected.bookingSlot.forEach(slot => {
          const dateStr = dayjs(slot.date).format('YYYY-MM-DD');
          
          // Chọn sân đầu tiên có status là 'active'
          const firstActiveField = slot.fields.find(field => field.status === 'active');
          if (firstActiveField) {
            initialSelections[dateStr] = firstActiveField.id;
            if (!firstSelectedFieldId) firstSelectedFieldId = firstActiveField.id;
          } else {
            initialSelections[dateStr] = null;
          }
        });
      }
      
      setFieldSelections(initialSelections);
      
      // Always update with a valid fieldId to prevent API errors
      if (firstSelectedFieldId) {
        console.log('Setting default fieldId after group change:', firstSelectedFieldId);
        form.setFieldsValue({
          fieldGroupId,
          fieldId: firstSelectedFieldId
        });
      } else {
        form.setFieldsValue({
          fieldGroupId,
          fieldId: ""
        });
      }
    } else {
      // Reset nếu không có field group nào được chọn
      setFieldSelections({});
      form.setFieldsValue({
        fieldGroupId: null,
        fieldId: ""
      });
    }
  };

  // Xử lý khi chọn sân cho một ngày cụ thể
  const handleFieldSelect = (date: string, fieldId: number) => {
    // Cập nhật field selection cho ngày đã chọn
    setFieldSelections(prev => ({
      ...prev,
      [date]: fieldId
    }));
    
    // Cập nhật form với fieldId mới nhất được chọn
    form.setFieldValue('fieldId', fieldId);
    
    console.log(`Selected field ID ${fieldId} for date ${date}`);
  };

  // Format ngày hiển thị
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  // Render bảng lựa chọn sân
  const renderFieldsTable = () => {
    if (!selectedFieldGroup || !selectedFieldGroup.bookingSlot || selectedFieldGroup.bookingSlot.length === 0) {
      return <Empty description="Không có dữ liệu sân khả dụng" />;
    }

    // Định nghĩa cột cho bảng
    const columns = [
      {
        title: 'Ngày đặt sân',
        dataIndex: 'date',
        key: 'date',
        width: '40%',
        render: (text: string) => (
          <div className="flex items-center">
            <CalendarOutlined className="mr-2" />
            <span>{formatDate(text)}</span>
          </div>
        )
      },
      {
        title: 'Sân khả dụng',
        dataIndex: 'fields',
        key: 'fields',
        width: '60%',
        render: (fields: Field[], record: TableRowData) => {
          const dateStr = dayjs(record.date).format('YYYY-MM-DD');
          
          // Kiểm tra xem có sân nào khả dụng không
          const availableFields = fields.filter(f => f.status === 'active');
          
          if (availableFields.length === 0) {
            return (
              <Alert 
                message="Không có sân khả dụng" 
                type="error" 
                showIcon 
                icon={<CloseCircleOutlined />}
              />
            );
          }
          
          const selectedId = fieldSelections[dateStr] || undefined;
          
          return (
            <div>
              <Select
                style={{ width: '100%' }}
                placeholder="Chọn sân"
                value={selectedId}
                onChange={(value) => handleFieldSelect(dateStr, Number(value))}
              >
                {availableFields.map(field => (
                  <Option key={field.id} value={field.id}>{field.name}</Option>
                ))}
              </Select>
              {selectedId && (
                <div className="mt-2 text-green-500 flex items-center">
                  <CheckCircleOutlined className="mr-1" /> Đã chọn
                </div>
              )}
            </div>
          );
        }
      }
    ];

    // Tạo data source từ bookingSlot
    const dataSource = selectedFieldGroup.bookingSlot.map((slot, idx) => ({
      key: idx,
      date: slot.date,
      fields: slot.fields
    }));

    // Tính số ngày có sân khả dụng và tổng số ngày
    const totalDays = dataSource.length;
    const daysWithAvailableFields = dataSource.filter(item => 
      item.fields.some(field => field.status === 'active')
    ).length;

    return (
      <div className="mt-3">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-600 text-sm">
            <span className="font-semibold text-blue-600">{daysWithAvailableFields}</span>/{totalDays} ngày có sân khả dụng
          </div>
          {daysWithAvailableFields < totalDays && (
            <div className="text-xs text-orange-500">
              <InfoCircleOutlined className="mr-1" />
              Một số ngày không có sân khả dụng
            </div>
          )}
        </div>

        <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table 
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="middle"
            bordered
            scroll={{ y: dataSource.length > 5 ? 350 : undefined }}
          />
        </div>
      </div>
    );
  };

  // Kiểm tra xem đã chọn sân cho tất cả các ngày có sân khả dụng chưa
  const hasSelectedAllFields = () => {
    if (!selectedFieldGroup || !selectedFieldGroup.bookingSlot) return false;
    
    // Lấy tất cả các ngày có sân khả dụng
    const datesWithAvailableFields = selectedFieldGroup.bookingSlot
      .filter(slot => slot.fields.some(field => field.status === 'active'))
      .map(slot => dayjs(slot.date).format('YYYY-MM-DD'));
    
    // Kiểm tra xem tất cả các ngày đều có sân được chọn chưa
    return datesWithAvailableFields.every(date => fieldSelections[date] !== undefined && fieldSelections[date] !== null);
  };

  // Tóm tắt sân đã chọn cho mỗi ngày
  const renderSelectedFieldsSummary = () => {
    if (!selectedFieldGroup || !selectedFieldGroup.bookingSlot) return null;
    
    const summary = selectedFieldGroup.bookingSlot.map(slot => {
      const dateStr = dayjs(slot.date).format('YYYY-MM-DD');
      const selectedFieldId = fieldSelections[dateStr];
      
      if (selectedFieldId === undefined || selectedFieldId === null) {
        if (!slot.fields.some(f => f.status === 'active')) {
          return (
            <div key={dateStr} className="mb-1">
              <span>{formatDate(slot.date)}: </span>
              <span className="text-red-500">Không có sân khả dụng</span>
            </div>
          );
        }
        return (
          <div key={dateStr} className="mb-1">
            <span>{formatDate(slot.date)}: </span>
            <span className="text-orange-500">Chưa chọn sân</span>
          </div>
        );
      }
      
      const selectedField = slot.fields.find(f => f.id === selectedFieldId);
      
      return (
        <div key={dateStr} className="mb-1">
          <span>{formatDate(slot.date)}: </span>
          <span className="text-green-500">{selectedField ? selectedField.name : 'Unknown'}</span>
        </div>
      );
    });
    
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <Text strong>Tóm tắt lựa chọn sân:</Text>
        <div className="mt-2">{summary}</div>
      </div>
    );
  };

  return (
    <Card className="shadow-md">
      {fieldGroups.length === 0 ? (
        <Empty description="Không có sân nào phù hợp" />
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...formData,
            fieldId: formData.fieldId || "",
          }}
        >
          <Form.Item 
            name="fieldId" 
            rules={[{ required: true, message: 'Vui lòng chọn sân' }]}
            style={{ display: 'none' }}
          >
            <input type="hidden" />
          </Form.Item>
          
          <Row gutter={[10, 30]}>
            <Col xs={24} md={12}>
              <Title level={5} className="mb-4">Chọn loại sân</Title>
              <Form.Item
                name="fieldGroupId"
                rules={[{ required: true, message: 'Vui lòng chọn loại sân' }]}
              >
                <Radio.Group 
                  className="w-full"
                  onChange={(e) => handleFieldGroupChange(e.target.value)}
                >
                  <Space direction="vertical" className="w-full">
                    {fieldGroups.map(group => (
                      <Radio key={group.id} value={group.id} className="w-full">
                        <Card 
                          className={`w-full mb-2 cursor-pointer hover:bg-gray-50 transition-all ${
                            selectedFieldGroup && selectedFieldGroup.id === group.id 
                              ? 'border-blue-500 shadow-sm' 
                              : 'border-gray-200'
                          }`}
                          style={{ padding: '12px' }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Text strong className="text-lg">{group.name}</Text>
                              <div className="text-sm text-gray-600 mt-1">
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
                              </div>
                              <div className="mt-2">
                                {group.sports && group.sports.map(sport => (
                                  <Tag color="blue" key={sport.id}>{getSportNameInVietnamese(sport.name)}</Tag>
                                ))}
                              </div>
                            </div>
                            <div className="text-right min-w-[100px]">
                              <div className="text-lg text-blue-600 font-semibold">
                                {formatCurrency(group.basePrice)}/giờ
                              </div>
                              <Tooltip 
                                title="Xem chi tiết giá" 
                                className="cursor-help text-blue-500 mt-1 inline-block"
                              >
                                <InfoCircleOutlined /> Chi tiết giá
                              </Tooltip>
                            </div>
                          </div>
                        </Card>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              {selectedFieldGroup && (
                <div className="bg-gray-50 p-3 rounded-lg h-full">
                  <Title level={5}>Thông tin chi tiết</Title>
                  <Paragraph className="mb-4">
                    <strong>{selectedFieldGroup.name}</strong> - Chọn sân cho từng ngày đặt
                  </Paragraph>
                  
                  {renderPriceInfo(selectedFieldGroup)}
                  
                  <Divider />
                  
                  <Title level={5}>Danh sách sân khả dụng</Title>
                  {renderFieldsTable()}
                  
                  {renderSelectedFieldsSummary()}
                  
                  {!hasSelectedAllFields() ? (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                      <Text type="warning">
                        <InfoCircleOutlined className="mr-2" />
                        Vui lòng chọn sân cho tất cả các ngày có sân khả dụng
                      </Text>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <Text type="secondary">
                        <InfoCircleOutlined className="mr-2" />
                        Bạn đã chọn sân cho tất cả các ngày. Nhấn "Tiếp theo" để tiếp tục
                      </Text>
                    </div>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </Card>
  );
};

export default BookingStepField; 