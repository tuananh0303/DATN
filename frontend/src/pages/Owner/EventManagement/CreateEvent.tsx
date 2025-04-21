import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber, Card, Typography, Space, Divider, List, Tag, Modal, DatePicker, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { EventFormData, EventType, EventStatus } from '@/types/event.type';
import { mockFacilitiesDropdown } from '@/mocks/facility/mockFacilities';
import { mockEventTypes } from '@/mocks/event/eventData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Local storage key
const SELECTED_FACILITY_KEY = 'owner_selected_facility_id';

// Mock sports data
const mockSports = [
  { id: 1, name: 'Bóng đá' },
  { id: 2, name: 'Bóng rổ' },
  { id: 3, name: 'Tennis' },
  { id: 4, name: 'Cầu lông' }
];

interface CreateEventProps {
  onCancel?: () => void;
  onSubmit?: (data: EventFormData[]) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onCancel, onSubmit }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [selectedEventType, setSelectedEventType] = useState<EventType | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [eventsList, setEventsList] = useState<EventFormData[]>([]);
  
  // Fetch initial facility from localStorage
  useEffect(() => {
    const savedFacilityId = localStorage.getItem(SELECTED_FACILITY_KEY);
    
    // Kiểm tra xem savedFacilityId có còn hợp lệ không (có tồn tại trong danh sách facilities không)
    const isValidSavedId = savedFacilityId && mockFacilitiesDropdown.some(f => f.id === savedFacilityId);
    
    // Nếu ID trong localStorage không hợp lệ, sử dụng ID đầu tiên trong danh sách
    const initialFacilityId = isValidSavedId ? savedFacilityId : (mockFacilitiesDropdown.length > 0 ? mockFacilitiesDropdown[0].id : '');
    
    if (initialFacilityId) {
      // Nếu ID đã thay đổi, cập nhật lại localStorage
      if (initialFacilityId !== savedFacilityId) {
        localStorage.setItem(SELECTED_FACILITY_KEY, initialFacilityId);
      }
      setSelectedFacilityId(initialFacilityId);
      form.setFieldsValue({ facilityId: initialFacilityId });
    }
  }, [form]);
  
  // Handle facility selection
  const handleFacilitySelect = (value: string) => {
    setSelectedFacilityId(value);
    localStorage.setItem(SELECTED_FACILITY_KEY, value);
  };

  // Handle event type change
  const handleEventTypeChange = (value: EventType) => {
    setSelectedEventType(value);
    // Reset specific fields when event type changes
    form.setFieldsValue({
      targetSportId: undefined,
      fields: undefined,
      maxParticipants: undefined,
      registrationEndDate: undefined,
      prizes: undefined,
      discountPercent: undefined,
      conditions: undefined,
      minBookingValue: undefined,
      activities: undefined,
      specialServices: undefined
    });
  };

  // Update the handleAddEvent function to better handle fields
  const handleAddEvent = () => {
    form.validateFields().then(values => {
      // Process values for tournament type
      if (values.eventType === 'TOURNAMENT' && values.isFreeRegistration === true) {
        // Set registration fee to 0 for free registration
        values.registrationFee = 0;
      }

      const baseEventData = {
        name: values.name,
        description: values.description,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
        status: 'upcoming' as EventStatus,
        facilityId: selectedFacilityId,
        eventType: values.eventType,
      };

      let eventData: EventFormData;
      
      if (values.eventType === 'TOURNAMENT') {
        eventData = {
          ...baseEventData,
          sportTypes: values.sportTypes,
          fields: values.fields,
          maxParticipants: values.maxParticipants,
          minParticipants: values.minParticipants,
          registrationType: values.registrationType,
          registrationEndDate: values.registrationEndDate?.toISOString(),
          ageLimit: values.ageLimit,
          tournamentFormat: values.tournamentFormat,
          tournamentFormatDescription: values.tournamentFormatDescription,
          totalPrize: values.totalPrize,
          prizeDescription: values.prizeDescription,
          prizes: values.prizes,
          registrationFee: values.registrationFee,
          isFreeRegistration: values.isFreeRegistration,
          // Only include payment fields if not free registration
          ...(values.isFreeRegistration === false && {
            paymentInstructions: values.paymentInstructions,
            paymentMethod: values.paymentMethod,
            paymentDeadline: values.paymentDeadline?.toISOString(),
            paymentAccountInfo: values.paymentAccountInfo,
            paymentQrImage: values.paymentQrImage,
            registrationProcess: values.registrationProcess,
          }),
          rulesAndRegulations: values.rulesAndRegulations
        };
      } else if (values.eventType === 'DISCOUNT') {
        eventData = {
          ...baseEventData,
          discountType: values.discountType,
          discountPercent: values.discountType === 'PERCENT' ? values.discountPercent : undefined,
          discountAmount: values.discountType === 'AMOUNT' ? values.discountAmount : undefined,
          freeSlots: values.discountType === 'FREE_SLOT' ? values.freeSlots : undefined,
          discountCode: values.discountCode,
          conditions: values.conditions,
          minBookingValue: values.minBookingValue,
          targetUserType: values.targetUserType,
          targetProducts: values.targetProducts,
          maxUsageCount: values.maxUsageCount
        };
      } else {
        // For future event types
        eventData = baseEventData;
      }
      
      setEventsList(prev => [...prev, eventData]);
      
      // Reset form fields except facility
      form.setFieldsValue({
        name: '',
        description: '',
        dateRange: undefined,
        eventType: undefined,
        // Reset type-specific fields
        sportTypes: undefined,
        fields: undefined,
        maxParticipants: undefined,
        minParticipants: undefined,
        registrationType: undefined,
        registrationEndDate: undefined,
        ageLimit: undefined,
        tournamentFormat: undefined,
        tournamentFormatDescription: undefined,
        totalPrize: undefined,
        prizeDescription: undefined,
        prizes: undefined,
        registrationFee: undefined,
        isFreeRegistration: undefined,
        paymentInstructions: undefined,
        paymentMethod: undefined,
        paymentDeadline: undefined,
        paymentAccountInfo: undefined,
        paymentQrImage: undefined,
        registrationProcess: undefined,
        rulesAndRegulations: undefined,
        // Discount fields
        discountType: undefined,
        discountPercent: undefined,
        discountAmount: undefined,
        freeSlots: undefined,
        discountCode: undefined,
        conditions: undefined,
        minBookingValue: undefined,
        targetUserType: undefined,
        targetProducts: undefined,
        maxUsageCount: undefined
      });
      
      // Reset selected event type
      setSelectedEventType(undefined);
    });
  };

  // Remove event from the list
  const handleRemoveEvent = (index: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa sự kiện',
      content: 'Bạn có chắc chắn muốn xóa sự kiện này khỏi danh sách?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setEventsList(prev => prev.filter((_, i) => i !== index));
      }
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedFacilityId) {
      Modal.error({
        title: 'Chưa chọn cơ sở',
        content: 'Vui lòng chọn cơ sở trước khi lưu'
      });
      return;
    }

    if (eventsList.length === 0) {
      Modal.error({
        title: 'Chưa có sự kiện',
        content: 'Vui lòng thêm ít nhất một sự kiện'
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Success message
      Modal.success({
        title: 'Tạo sự kiện thành công',
        content: `Đã tạo ${eventsList.length} sự kiện mới cho cơ sở ${mockFacilitiesDropdown.find(f => f.id === selectedFacilityId)?.name || ''}`,
        onOk: () => {
          if (onSubmit) {
            onSubmit(eventsList);
          } else {
            navigate('/owner/event-management');
          }
        }
      });
      
      setSubmitting(false);
    }, 1000);
  };

  // Handle Cancel
  const handleCancel = () => {
    if (eventsList.length > 0) {
      Modal.confirm({
        title: 'Hủy tạo sự kiện',
        content: `Bạn đã thêm ${eventsList.length} sự kiện vào danh sách. Bạn có chắc chắn muốn hủy?`,
        okText: 'Có, hủy tạo sự kiện',
        cancelText: 'Không, tiếp tục',
        onOk() {
          if (onCancel) {
            onCancel();
          } else {
            navigate('/owner/event-management');
          }
        }
      });
    } else {
      if (onCancel) {
        onCancel();
      } else {
        navigate('/owner/event-management');
      }
    }
  };

  // Get sport name by ID
  const getSportName = (sportId: number) => {
    const sport = mockSports.find(s => s.id === sportId);
    return sport ? sport.name : 'Không xác định';
  };

  // Display tournament format in a readable way
  const formatTournamentType = (format: string[] | string | undefined): string => {
    if (!format) return 'Không xác định';
    
    if (Array.isArray(format)) {
      const formatMap: Record<string, string> = {
        'knockout': 'Đấu loại trực tiếp',
        'roundRobin': 'Vòng tròn',
        'hybrid': 'Vòng bảng + loại trực tiếp',
        'points': 'Tính điểm',
        'other': 'Khác'
      };
      
      return format.map(f => formatMap[f] || f).join(', ');
    }
    
    return format;
  };

  // Helper function để hiển thị loại sự kiện
  const getEventTypeTag = (type: EventType) => {
    const config: Record<EventType, { color: string, text: string }> = {
      TOURNAMENT: { color: 'blue', text: 'Giải đấu' },
      DISCOUNT: { color: 'green', text: 'Khuyến mãi' },      
    };
    return <Tag color={config[type].color}>{config[type].text}</Tag>;
  };

  // Add this function to render labels with red asterisks for required fields
  const renderLabel = (label: string, required: boolean = false) => (
    <span>
      {required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}
      {label}
    </span>
  );

  // Render specific fields based on event type
  const renderEventTypeFields = () => {
    if (!selectedEventType) return null;
    
    switch (selectedEventType) {
      case 'TOURNAMENT':
        return (
          <>
            <Form.Item
              name="sportTypes"
              label={renderLabel('Loại hình thể thao', true)}
              rules={[{ required: true, message: 'Vui lòng chọn loại hình thể thao' }]}
            >
              <Select 
                mode="multiple"
                placeholder="Chọn loại hình thể thao" 
                disabled={submitting}
                optionLabelProp="label"
                style={{ width: '100%' }}
                popupMatchSelectWidth={false}
              >
                {mockSports.map((sport) => (
                  <Option 
                    key={sport.id} 
                    value={sport.id} 
                    label={sport.name}
                  >
                    <div style={{ minWidth: '120px' }}>{sport.name}</div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="fields"
              label={renderLabel('Danh sách sân sử dụng', true)}
              rules={[{ required: true, message: 'Vui lòng chọn các sân tổ chức' }]}
              tooltip="Các sân được sử dụng để tổ chức giải đấu"
            >
              <Select
                mode="multiple"
                placeholder="Chọn các sân tổ chức"
                disabled={submitting}
              >
                <Option value="Field 1">Sân 1</Option>
                <Option value="Field 2">Sân 2</Option>
                <Option value="Field 3">Sân 3</Option>
                <Option value="Field 4">Sân 4</Option>
              </Select>
            </Form.Item>

            <Divider orientation="left">Quy định người tham gia</Divider>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="maxParticipants"
                label={renderLabel('Số lượng người/đội tối đa', true)}
                rules={[{ required: true, message: 'Vui lòng nhập số lượng tham gia tối đa' }]}
                tooltip="Số lượng người hoặc đội tham gia tối đa"
              >
                <InputNumber
                  min={1}
                  placeholder="VD: 32 người hoặc 16 đội"
                  style={{ width: '100%' }}
                  disabled={submitting}
                />
              </Form.Item>

              <Form.Item
                name="minParticipants"
                label={renderLabel('Số lượng người/đội tối thiểu')}
                tooltip="Số lượng người hoặc đội tham gia tối thiểu để giải đấu có hiệu lực"
              >
                <InputNumber
                  min={1}
                  placeholder="Để quyết định có tổ chức giải không"
                  style={{ width: '100%' }}
                  disabled={submitting}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="registrationType"
              label={renderLabel('Đăng ký theo cá nhân hay đội', true)}
              rules={[{ required: true, message: 'Vui lòng chọn hình thức đăng ký' }]}
            >
              <Select
                placeholder="Chọn hình thức đăng ký"
                disabled={submitting}
              >
                <Option value="individual">Cá nhân</Option>
                <Option value="team">Đội</Option>
                <Option value="both">Cả hai</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="registrationEndDate"
              label={renderLabel('Hạn cuối đăng ký', true)}
              rules={[{ required: true, message: 'Vui lòng chọn hạn đăng ký' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                disabled={submitting}
                placeholder="Chọn hạn cuối đăng ký"
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item
              name="ageLimit"
              label={renderLabel('Giới hạn độ tuổi / trình độ')}
              tooltip="Giới hạn độ tuổi hoặc trình độ của người tham gia"
            >
              <Input
                placeholder="VD: U18, hoặc chỉ cho người chơi có > 10 lượt đặt sân"
                disabled={submitting}
              />
            </Form.Item>

            <Divider orientation="left">Thể thức thi đấu</Divider>

            <Form.Item
              name="tournamentFormat"
              label={renderLabel('Loại thể thức', true)}
              rules={[{ required: true, message: 'Vui lòng chọn thể thức thi đấu' }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn thể thức thi đấu"
                disabled={submitting}
              >
                <Option value="knockout">Đấu loại trực tiếp</Option>
                <Option value="roundRobin">Vòng tròn</Option>
                <Option value="hybrid">Kết hợp (vòng bảng + loại trực tiếp)</Option>
                <Option value="points">Tính điểm</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="tournamentFormatDescription"
              label={renderLabel('Mô tả thể thức thi đấu')}
              tooltip="Mô tả chi tiết về thể thức thi đấu, số vòng, cách chia bảng, v.v."
            >
              <TextArea
                rows={3}
                placeholder="Nhập mô tả chi tiết về thể thức thi đấu, số vòng đấu, cách chia bảng..."
                disabled={submitting}
              />
            </Form.Item>

            <Form.Item
              name="rulesAndRegulations"
              label={renderLabel('Luật thi đấu', true)}
              tooltip="Mô tả luật thi đấu của giải"
              rules={[{ required: true, message: 'Vui lòng nhập luật thi đấu' }]}
            >
              <TextArea
                rows={3}
                placeholder="Mô tả luật thi đấu của giải (luật tính điểm, xử lý tranh chấp, v.v.)"
                disabled={submitting}
              />
            </Form.Item>

            <Divider orientation="left">Phần thưởng và phí tham gia</Divider>

            <Form.Item
              name="totalPrize"
              label={renderLabel('Tổng giải thưởng', true)}
              tooltip="Tổng giá trị giải thưởng hoặc mô tả chung về giải thưởng"
              rules={[{ required: true, message: 'Vui lòng nhập tổng giải thưởng' }]}
            >
              <Input
                placeholder="VD: 10.000.000 VNĐ hoặc Cup + Tiền thưởng + Voucher"
                disabled={submitting}
              />
            </Form.Item>

            <Form.Item
              name="prizeDescription"
              label={renderLabel('Mô tả giải thưởng')}
              tooltip="Mô tả chi tiết về giải thưởng và cách thức trao giải"
            >
              <TextArea
                rows={2}
                placeholder="Mô tả chi tiết về giải thưởng và cách thức trao giải"
                disabled={submitting}
              />
            </Form.Item>

            <Form.List name="prizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex gap-4 mb-4">
                      <Form.Item
                        {...restField}
                        name={[name, 'position']}
                        rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Vị trí"
                          style={{ width: '100px' }}
                          disabled={submitting}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'prize']}
                        rules={[{ required: true, message: 'Vui lòng nhập giải thưởng' }]}
                      >
                        <Input
                          placeholder="VD: Tiền mặt / voucher / miễn phí đặt sân / cup hay chương"
                          disabled={submitting}
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)} disabled={submitting}>
                        Xóa
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm giải thưởng
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Divider orientation="left">Phí tham gia và thanh toán</Divider>

            <Form.Item
              name="isFreeRegistration"
              label={renderLabel('Loại phí')}
              tooltip="Miễn phí hay có phí tham gia"
              rules={[{ required: true, message: 'Vui lòng chọn loại phí tham gia' }]}
            >
              <Select
                placeholder="Chọn loại phí tham gia"
                disabled={submitting}
              >
                <Option value={true}>Miễn phí tham gia</Option>
                <Option value={false}>Có phí tham gia</Option>
              </Select>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.isFreeRegistration !== currentValues.isFreeRegistration}
            >
              {({ getFieldValue }) => {
                const isFreeRegistration = getFieldValue('isFreeRegistration');
                
                if (isFreeRegistration === false) {
                  return (
                    <>
                      <Form.Item
                        name="registrationFee"
                        label={renderLabel('Phí tham gia')}
                        tooltip="Phí tham gia giải đấu"
                        rules={[{ required: true, message: 'Vui lòng nhập phí tham gia' }]}
                      >
                        <InputNumber
                          min={1000}
                          step={10000}
                          placeholder="Nhập phí tham gia (VD: 50.000đ/người)"
                          style={{ width: '100%' }}
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          parser={(value: string | undefined) => {
                            if (!value) return 0;
                            return Number(value.replace(/\./g, ''));
                          }}
                          disabled={submitting}
                          addonAfter="đ"
                        />
                      </Form.Item>

                      <Form.Item
                        name="paymentInstructions"
                        label={renderLabel('Hướng dẫn thanh toán')}
                        tooltip="Hướng dẫn cách thức thanh toán phí tham gia"
                        rules={[{ required: true, message: 'Vui lòng nhập hướng dẫn thanh toán' }]}
                      >
                        <TextArea
                          rows={2}
                          placeholder="Hướng dẫn cách thanh toán phí tham gia (thời hạn, phương thức, v.v.)"
                          disabled={submitting}
                        />
                      </Form.Item>

                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                          name="paymentMethod"
                          label={renderLabel('Phương thức thanh toán')}
                          tooltip="Phương thức thanh toán phí tham gia"
                          rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Chọn phương thức thanh toán"
                            disabled={submitting}
                          >
                            <Option value="bank">Chuyển khoản ngân hàng</Option>
                            <Option value="momo">Ví MoMo</Option>
                            <Option value="vnpay">VNPay</Option>
                            <Option value="zalopay">ZaloPay</Option>
                            <Option value="cash">Tiền mặt tại cơ sở</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          name="paymentDeadline"
                          label={renderLabel('Hạn cuối thanh toán')}
                          tooltip="Hạn cuối cùng để thanh toán phí tham gia"
                          rules={[{ required: true, message: 'Vui lòng chọn hạn thanh toán' }]}
                        >
                          <DatePicker
                            style={{ width: '100%' }}
                            disabled={submitting}
                            format="DD/MM/YYYY"
                          />
                        </Form.Item>
                      </div>

                      <Form.Item
                        name="paymentAccountInfo"
                        label={renderLabel('Thông tin tài khoản thanh toán')}
                        tooltip="Thông tin tài khoản để người tham gia chuyển phí"
                        rules={[{ required: true, message: 'Vui lòng nhập thông tin tài khoản thanh toán' }]}
                      >
                        <TextArea
                          rows={2}
                          placeholder="VD: Ngân hàng: Vietcombank | STK: 1234567890 | Chủ TK: Nguyễn Văn A | Nội dung CK: Tên giải đấu - Tên người tham gia"
                          disabled={submitting}
                        />
                      </Form.Item>

                      <Form.Item
                        name="paymentQrImage"
                        label={renderLabel('Mã QR thanh toán (nếu có)')}
                        tooltip="Thêm ảnh mã QR để người chơi quét thanh toán"
                      >
                        <Input
                          placeholder="Nhập link ảnh mã QR thanh toán"
                          disabled={submitting}
                        />
                      </Form.Item>

                      <Form.Item
                        name="registrationProcess"
                        label={renderLabel('Quy trình đăng ký và xác nhận')}
                        tooltip="Mô tả quy trình đăng ký và xác nhận sau khi người chơi thanh toán"
                        rules={[{ required: true, message: 'Vui lòng nhập quy trình đăng ký và xác nhận' }]}
                      >
                        <TextArea
                          rows={3}
                          placeholder="Mô tả quy trình: 1. Đăng ký và thanh toán, 2. Gửi bằng chứng thanh toán cho BTC, 3. BTC xác nhận và phê duyệt đăng ký,..."
                          disabled={submitting}
                        />
                      </Form.Item>
                    </>
                  );
                }
                
                // Handle the case where registration is free
                return null;
              }}
            </Form.Item>
          </>
        );

      case 'DISCOUNT':
        return (
          <>
            <Form.Item
              name="discountType"
              label={renderLabel('Loại khuyến mãi')}
              rules={[{ required: true, message: 'Vui lòng chọn loại khuyến mãi' }]}
            >
              <Select
                placeholder="Chọn loại khuyến mãi"
                disabled={submitting}
              >
                <Option value="PERCENT">% giảm giá</Option>
                <Option value="AMOUNT">Giảm số tiền cụ thể</Option>
                <Option value="FREE_SLOT">Tặng lượt đặt miễn phí</Option>
              </Select>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.discountType !== currentValues.discountType}
            >
              {({ getFieldValue }) => {
                const discountType = getFieldValue('discountType');
                return (
                  <>
                    {discountType === 'PERCENT' && (
                      <Form.Item
                        name="discountPercent"
                        label={renderLabel('Phần trăm giảm giá')}
                        rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá' }]}
                      >
                        <InputNumber
                          min={1}
                          max={100}
                          placeholder="Nhập phần trăm giảm giá"
                          style={{ width: '100%' }}
                          disabled={submitting}
                          addonAfter="%"
                        />
                      </Form.Item>
                    )}

                    {discountType === 'AMOUNT' && (
                      <Form.Item
                        name="discountAmount"
                        label={renderLabel('Số tiền giảm')}
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền giảm' }]}
                      >
                        <InputNumber
                          min={1000}
                          step={1000}
                          placeholder="Nhập số tiền giảm"
                          style={{ width: '100%' }}
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          parser={(value: string | undefined) => {
                            if (!value) return 0;
                            return Number(value.replace(/\./g, ''));
                          }}
                          disabled={submitting}
                          addonAfter="đ"
                        />
                      </Form.Item>
                    )}

                    {discountType === 'FREE_SLOT' && (
                      <Form.Item
                        name="freeSlots"
                        label={renderLabel('Số lượt đặt miễn phí')}
                        rules={[{ required: true, message: 'Vui lòng nhập số lượt đặt miễn phí' }]}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Nhập số lượt đặt miễn phí"
                          style={{ width: '100%' }}
                          disabled={submitting}
                          addonAfter="lượt"
                        />
                      </Form.Item>
                    )}
                  </>
                );
              }}
            </Form.Item>

            <Form.Item
              name="discountCode"
              label={renderLabel('Mã giảm giá')}
              tooltip="Mã để khách hàng sử dụng khi đặt sân"
            >
              <Input
                placeholder="Nhập mã giảm giá (nếu có)"
                disabled={submitting}
              />
            </Form.Item>

            <Form.Item
              name="minBookingValue"
              label={renderLabel('Giá trị đơn hàng tối thiểu')}
              rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu' }]}
            >
              <InputNumber
                min={0}
                step={10000}
                placeholder="Nhập giá trị đơn hàng tối thiểu"
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value: string | undefined) => {
                  if (!value) return 0;
                  return Number(value.replace(/\./g, ''));
                }}
                disabled={submitting}
                addonAfter="đ"
              />
            </Form.Item>

            <Form.Item
              name="targetUserType"
              label={renderLabel('Áp dụng cho đối tượng nào')}
              rules={[{ required: true, message: 'Vui lòng chọn đối tượng được áp dụng' }]}
            >
              <Select
                placeholder="Chọn đối tượng áp dụng"
                disabled={submitting}
              >
                <Option value="ALL">Tất cả người chơi</Option>
                <Option value="NEW">Chỉ người mới</Option>
                <Option value="VIP">Người dùng VIP</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="targetProducts"
              label={renderLabel('Áp dụng cho sản phẩm/dịch vụ')}
              rules={[{ required: true, message: 'Vui lòng chọn sản phẩm/dịch vụ được áp dụng' }]}
            >
              <Select
                placeholder="Chọn sản phẩm/dịch vụ áp dụng"
                disabled={submitting}
                mode="multiple"
              >
                <Option value="ALL">Tất cả sân</Option>
                <Option value="FIELD_FOOTBALL">Sân bóng đá</Option>
                <Option value="FIELD_BADMINTON">Sân cầu lông</Option>
                <Option value="FIELD_TENNIS">Sân tennis</Option>
                <Option value="FIELD_BASKETBALL">Sân bóng rổ</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="maxUsageCount"
              label={renderLabel('Số lượng người dùng tối đa')}
              tooltip="Giới hạn số lượng người dùng có thể sử dụng khuyến mãi này"
            >
              <InputNumber
                min={0}
                placeholder="Nhập số lượng tối đa (để trống nếu không giới hạn)"
                style={{ width: '100%' }}
                disabled={submitting}
                addonAfter="người"
              />
            </Form.Item>

            <Form.Item
              name="conditions"
              label={renderLabel('Điều kiện áp dụng')}
              rules={[{ required: true, message: 'Vui lòng nhập điều kiện áp dụng' }]}
            >
              <TextArea
                placeholder="Mô tả chi tiết điều kiện áp dụng khuyến mãi. VD: Đơn hàng tối thiểu, chỉ áp dụng cho người mới, v.v."
                rows={3}
                disabled={submitting}
              />
            </Form.Item>
          </>
        );
     

      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8">
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <Space size="middle">  
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleCancel}
              type="text"
            />          
            <Title level={3} style={{ margin: 0 }}>Tạo sự kiện mới</Title>
          </Space>
          
          <Button 
            type="primary" 
            onClick={handleSubmit}
            loading={submitting}
            disabled={eventsList.length === 0}
          >
            Lưu sự kiện
          </Button>
        </div>

        <Divider />

        <Spin spinning={submitting}>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ status: 'upcoming' }}
          >
            <Form.Item
              name="facilityId"
              label={renderLabel('Cơ sở áp dụng', true)}
              rules={[{ required: true, message: 'Vui lòng chọn cơ sở' }]}
            >
              <Select
                placeholder="Chọn cơ sở của bạn"
                onChange={handleFacilitySelect}
                disabled={submitting}
                value={selectedFacilityId || undefined}
              >
                {mockFacilitiesDropdown.map((facility) => (
                  <Option key={facility.id} value={facility.id}>
                    {facility.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {selectedFacilityId && (
              <>
                <Form.Item
                  name="eventType"
                  label={renderLabel('Loại sự kiện', true)}
                  rules={[{ required: true, message: 'Vui lòng chọn loại sự kiện' }]}
                >
                  <Select 
                    placeholder="Chọn loại sự kiện" 
                    disabled={submitting}
                    onChange={handleEventTypeChange}
                  >
                    {mockEventTypes.map((type) => (
                      <Option key={type.id} value={type.id}>
                        {type.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="name"
                  label={renderLabel('Tên sự kiện', true)}
                  rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện' }]}
                >
                  <Input placeholder="Nhập tên sự kiện" disabled={submitting} />
                </Form.Item>

                <Form.Item
                  name="dateRange"
                  label={renderLabel('Thời gian diễn ra', true)}
                  rules={[{ required: true, message: 'Vui lòng chọn thời gian diễn ra' }]}
                >
                  <RangePicker
                    style={{ width: '100%' }}
                    disabled={submitting}
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label={renderLabel('Mô tả sự kiện')}
                >
                  <TextArea 
                    placeholder="Nhập mô tả chi tiết về sự kiện. Bạn có thể nhập chi tiết thể lệ giải đấu, giải thưởng và các luật liên quan đến giải đấu,..." 
                    rows={3} 
                    disabled={submitting}
                  />
                </Form.Item>               

                {/* Render event type specific fields */}
                {renderEventTypeFields()}

                <Form.Item>
                  <Button 
                    type="dashed" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddEvent}
                    disabled={submitting}
                    block
                  >
                    Thêm sự kiện vào danh sách
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>
        </Spin>

        {eventsList.length > 0 && (
          <div className="mt-8">
            <Divider orientation="left">
              <Text strong>Danh sách sự kiện đã thêm ({eventsList.length})</Text>
            </Divider>
            
            <div className="overflow-x-auto">
              <List
                itemLayout="horizontal"
                dataSource={eventsList}
                renderItem={(event, index) => (
                  <List.Item
                    actions={[
                      <Button 
                        key="delete" 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveEvent(index)}
                        disabled={submitting}
                      >
                        Xóa
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={event.name}
                      description={
                        <Space direction="vertical" size={1}>
                          <div className="flex gap-1 mt-1">
                            {event.eventType && getEventTypeTag(event.eventType)}
                          </div>
                          <Text type="secondary">
                            Thời gian: {dayjs(event.startDate).format('DD/MM/YYYY')} - {dayjs(event.endDate).format('DD/MM/YYYY')}
                          </Text>
                          {event.description && <Text type="secondary">Mô tả: {event.description}</Text>}
                          {event.eventType === 'TOURNAMENT' && (
                            <>
                              <Text type="secondary">
                                Thể thao: {event.sportTypes?.map(id => getSportName(id)).join(', ') || 'Không xác định'}
                              </Text>
                              <Text type="secondary">
                                Số người tham gia: tối đa {event.maxParticipants || '?'}{event.minParticipants ? `, tối thiểu ${event.minParticipants}` : ''}
                              </Text>
                              <Text type="secondary">
                                Hạn đăng ký: {event.registrationEndDate ? dayjs(event.registrationEndDate).format('DD/MM/YYYY') : 'Không quy định'}
                              </Text>
                              <Text type="secondary">
                                Thể thức: {formatTournamentType(event.tournamentFormat) || 'Không quy định'}
                                {event.tournamentFormatDescription && ` (${event.tournamentFormatDescription})`}
                              </Text>
                              <Text type="secondary">
                                Giải thưởng: {event.totalPrize || 'Không quy định'}
                              </Text>
                              {event.isFreeRegistration === false ? (
                                <Text type="secondary">Phí tham gia: {event.registrationFee?.toLocaleString('vi-VN')}đ | Phương thức: {Array.isArray(event.paymentMethod) ? event.paymentMethod.join(', ') : event.paymentMethod || 'Không quy định'}</Text>
                              ) : (
                                <Text type="secondary">Phí tham gia: Miễn phí</Text>
                              )}
                            </>
                          )}
                          {event.eventType === 'DISCOUNT' && (
                            <>
                              <Text type="secondary">
                                {event.discountType === 'PERCENT' && `Giảm giá: ${event.discountPercent}%`}
                                {event.discountType === 'AMOUNT' && `Giảm giá: ${event.discountAmount?.toLocaleString('vi-VN')}đ`}
                                {event.discountType === 'FREE_SLOT' && `Tặng: ${event.freeSlots} lượt đặt miễn phí`}
                              </Text>
                              <Text type="secondary">Điều kiện: {event.conditions}</Text>
                              <Text type="secondary">Áp dụng cho: {event.targetUserType === 'ALL' ? 'Tất cả người chơi' : 
                                event.targetUserType === 'NEW' ? 'Chỉ người mới' : 'Người dùng VIP'}</Text>
                            </>
                          )}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
                style={{ minWidth: '600px' }}
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <Space>
                <Button onClick={handleCancel} disabled={submitting}>
                  Hủy
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Lưu sự kiện ({eventsList.length})
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CreateEvent;