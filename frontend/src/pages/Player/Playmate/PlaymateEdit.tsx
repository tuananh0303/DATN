import React, { useState, useEffect } from 'react';
import { PlaymateFormData, BookingSlot, UpdatePlaymateFormData } from '@/types/playmate.type';
import playmateService from '@/services/playmate.service';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import {
  Form,
  Input,
  Button,
  Select,
  Radio,
  InputNumber,
  Card,
  Typography,
  Row,
  Col,
  message,
  Space,
  Checkbox,
  Upload,
  Divider,
  Modal,
  Spin
} from 'antd';
import {
  PlusOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TagOutlined
} from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Extended PlaymateFormData for form
interface PlaymateFormValues extends PlaymateFormData {
  imagesFileList?: UploadFile[];
}

interface PlaymateEditProps {
  visible: boolean;
  onClose: () => void;
  playmateId: string;
  onSuccess: () => void;
}

const PlaymateEdit: React.FC<PlaymateEditProps> = ({ visible, onClose, playmateId, onSuccess }) => {
  const [form] = Form.useForm<PlaymateFormValues>();
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [costType, setCostType] = useState<string>('total');
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedBookingSlot, setSelectedBookingSlot] = useState<BookingSlot | null>(null);

  // Fetch playmate data and booking slots when modal opens
  useEffect(() => {
    if (visible && playmateId) {
      fetchData();
    }
  }, [visible, playmateId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch playmate data
      const playmateData = await playmateService.getPlaymateSearchById(playmateId);
      if (!playmateData) {
        message.error('Không thể tải dữ liệu bài đăng');
        onClose();
        return;
      }

      // Fetch booking slots
      const bookingSlotsData = await playmateService.getBookingSlots();
      setBookingSlots(bookingSlotsData || []);

      // Set form values based on playmate data
      const initialValues: PlaymateFormValues = {
        title: playmateData.title,
        description: playmateData.description,
        bookingSlotId: playmateData.bookingSlotId || 0,
        costType: playmateData.costType || 'total',
        totalCost: playmateData.price,
        maleCost: playmateData.costMale,
        femaleCost: playmateData.costFemale,
        detailOfCost: playmateData.costDetails,
        isTeam: playmateData.playmateSearchType === 'group',
        numberOfParticipants: playmateData.numberOfParticipants,
        positions: playmateData.positions || [],
        genderPreference: playmateData.genderPreference || 'any',
        skillLevel: playmateData.requiredSkillLevel,
        additionalInfor: playmateData.communicationDescription
      };

      // Set cost type state
      setCostType(initialValues.costType || 'total');

      // Set uploaded images
      if (playmateData.image && playmateData.image.length > 0) {
        setUploadedImages(playmateData.image);
        
        // Create file list for upload component
        const newFileList: UploadFile[] = playmateData.image.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}.jpg`,
          status: 'done',
          url,
          thumbUrl: url,
        }));
        
        setFileList(newFileList);
      }

      // Find and set selected booking slot
      if (playmateData.bookingSlotId) {
        const selected = bookingSlotsData?.find(slot => slot.id === playmateData.bookingSlotId);
        setSelectedBookingSlot(selected || null);
      }

      // Set form values
      form.setFieldsValue(initialValues);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleCostTypeChange = (e: RadioChangeEvent) => {
    setCostType(e.target.value);
  };

  // Upload image handler
  const handleUpload = async (file: RcFile): Promise<boolean> => {
    try {
      setUploading(true);
      const imageUrl = await playmateService.uploadImage(file);
      setUploadedImages(prev => [...prev, imageUrl]);
      
      // Add file to fileList with status 'done'
      const newFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: imageUrl,
        thumbUrl: imageUrl,
        size: file.size,
        type: file.type
      };
      
      setFileList(prev => [...prev, newFile]);
      message.success('Tải ảnh lên thành công');
      return false; // prevent default upload behavior
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Tải ảnh lên thất bại. Vui lòng thử lại sau.');
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values: PlaymateFormValues) => {
    if (!playmateId) return;
    
    setSubmitting(true);
    
    try {
      // Prepare data for API
      const updateData: UpdatePlaymateFormData = {
        playmateId,
        title: values.title,
        description: values.description,
        imagesUrl: uploadedImages,
        bookingSlotId: values.bookingSlotId,
        additionalInfor: values.additionalInfor,
        costType: values.costType,
        totalCost: values.totalCost,
        maleCost: values.maleCost,
        femaleCost: values.femaleCost,
        detailOfCost: values.detailOfCost,
        isTeam: values.isTeam,
        numberOfParticipants: values.numberOfParticipants,
        genderPreference: values.genderPreference,
        skillLevel: values.skillLevel,
        positions: values.positions || []
      };
      
      // Update playmate search
      await playmateService.updatePlaymateSearch(updateData);
      
      // Hiển thị thông báo thành công
      message.success('Đã cập nhật bài đăng tìm bạn chơi thành công!');
      
      // Callback to refresh parent component
      onSuccess();
      
      // Close modal
      onClose();
    } catch (error: unknown) {
      console.error('Error updating playmate search:', error);
      
      // Thêm thông tin chi tiết của lỗi
      let errorMessage = 'Có lỗi xảy ra khi cập nhật bài đăng. Vui lòng thử lại sau.';
      
      if (error && typeof error === 'object') {
        const err = error as { response?: { data?: { message?: string } }, message?: string };
        if (err.response?.data?.message) {
          errorMessage = `Lỗi: ${err.response.data.message}`;
        } else if (err.message) {
          errorMessage = `Lỗi: ${err.message}`;
        }
      }
      
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file removal
  const handleRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    
    // Also remove from uploadedImages
    if (file.url) {
      setUploadedImages(prev => prev.filter(url => url !== file.url));
    }
    return true;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Handle booking slot selection change
  const handleBookingSlotChange = (value: number) => {
    const selected = bookingSlots.find(slot => slot.id === value);
    setSelectedBookingSlot(selected || null);
  };

  // Render the booking slot select options
  const renderBookingSlotOptions = () => {
    return bookingSlots.map(slot => {
      const date = formatDate(slot.date);
      const time = `${slot.booking.startTime.substring(0, 5)} - ${slot.booking.endTime.substring(0, 5)}`;
      const facilityName = slot.field?.fieldGroup?.facility?.name || '';
      const sportName = slot.booking.sport?.name || '';
      
      return (
        <Option key={slot.id} value={slot.id}>
          {`${date} (${time}) - ${facilityName} - ${getSportNameInVietnamese(sportName)}`}
        </Option>
      );
    });
  };

  return (
    <Modal
      title="Chỉnh sửa bài đăng tìm bạn chơi"
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
      destroyOnClose
    >
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          scrollToFirstError
          className="playmate-form"
        >
          <Card 
            title={
              <span>
                <InfoCircleOutlined className="mr-2" />
                Thông tin cơ bản
              </span>
            } 
            className="mb-6 border border-gray-200 rounded-lg playmate-inner-card"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item
                  label={<span className="required-field">Tiêu đề</span>}
                  name="title"
                  rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                  <Input placeholder="Nhập tiêu đề cho bài đăng của bạn" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Hình ảnh minh họa"
              name="imagesFileList"
            >
              <Upload 
                listType="picture-card" 
                beforeUpload={handleUpload}
                fileList={fileList}
                onRemove={handleRemove}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true
                }}
              >
                <div>
                  {uploading ? <Spin size="small" /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              label={<span className="required-field">Chọn lịch đặt sân</span>}
              name="bookingSlotId"
              rules={[{ required: true, message: 'Vui lòng chọn lịch đặt sân!' }]}
            >
              <Select 
                placeholder="Chọn lịch đặt sân đã đặt trước" 
                loading={loading}
                showSearch
                optionFilterProp="children"
                onChange={handleBookingSlotChange}
              >
                {renderBookingSlotOptions()}
              </Select>
            </Form.Item>

            {selectedBookingSlot && (
              <Card className="mb-4 bg-gray-50">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-blue-500" />
                    <Text strong>Ngày: </Text>
                    <Text className="ml-2">{formatDate(selectedBookingSlot.date)}</Text>
                  </div>
                  <div className="flex items-center">
                    <ClockCircleOutlined className="mr-2 text-blue-500" />
                    <Text strong>Thời gian: </Text>
                    <Text className="ml-2">{`${selectedBookingSlot.booking.startTime.substring(0, 5)} - ${selectedBookingSlot.booking.endTime.substring(0, 5)}`}</Text>
                  </div>
                  <div className="flex items-center">
                    <TagOutlined className="mr-2 text-blue-500" />
                    <Text strong>Môn thể thao: </Text>
                    <Text className="ml-2 capitalize">{getSportNameInVietnamese(selectedBookingSlot.booking.sport?.name || '')}</Text>
                  </div>
                  {selectedBookingSlot.field?.name && (
                    <div className="flex items-center">
                      <InfoCircleOutlined className="mr-2 text-blue-500" />
                      <Text strong>Sân: </Text>
                      <Text className="ml-2">{selectedBookingSlot.field.name}</Text>
                    </div>
                  )}
                  {selectedBookingSlot.field?.fieldGroup?.facility?.name && (
                    <div className="flex items-center">
                      <InfoCircleOutlined className="mr-2 text-blue-500" />
                      <Text strong>Cơ sở: </Text>
                      <Text className="ml-2">{selectedBookingSlot.field.fieldGroup.facility.name}</Text>
                    </div>
                  )}
                  {selectedBookingSlot.field?.fieldGroup?.facility?.location && (
                    <div className="flex items-start">
                      <EnvironmentOutlined className="mr-2 text-blue-500 mt-1" />
                      <Text strong className="mr-2">Địa chỉ:</Text>
                      <Text>{selectedBookingSlot.field.fieldGroup.facility.location}</Text>
                    </div>
                  )}
                </div>
              </Card>
            )}

            <Form.Item
              label="Mô tả"
              name="description"                    
            >
              <TextArea 
                rows={4} 
                placeholder="Mô tả chi tiết về buổi chơi thể thao (kĩ năng yêu cầu, dụng cụ cần mang theo...)" 
              />
            </Form.Item>
            
            <Form.Item
              label="Thông tin liên hệ"
              name="additionalInfor"
            >
              <TextArea 
                rows={2} 
                placeholder="Phương thức liên lạc (ví dụ: Sẽ lập nhóm Zalo, Liên hệ qua số điện thoại...)" 
              />
            </Form.Item>
          </Card>

          <Card 
            title={
              <span>
                <DollarOutlined className="mr-2" />
                Chi phí
              </span>
            } 
            className="mb-6 border border-gray-200 rounded-lg playmate-inner-card"
          >
            <Form.Item
              label={<span className="required-field">Loại chi phí</span>}
              name="costType"
              rules={[{ required: true, message: 'Vui lòng chọn loại chi phí!' }]}
            >
              <Radio.Group onChange={handleCostTypeChange}>
                <Space direction="vertical">                        
                  <Radio value="total">Tổng chi phí</Radio>
                  <Radio value="free">Miễn phí</Radio>
                  <Radio value="gender">Theo giới tính</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>                
            
            {(costType === 'total') && (
              <Form.Item
                label={<span className="required-field">Tổng chi phí</span>}
                name="totalCost"
                rules={[{ required: costType === 'total', message: 'Vui lòng nhập chi phí!' }]}
              >
                <InputNumber 
                  min={0} 
                  step={1000} 
                  className="w-full" 
                  formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
                  parser={(value: string | undefined) => {
                    if (!value) return 0;
                    return Number(value.replace(/\./g, ''));
                  }}
                  placeholder="Nhập chi phí" 
                  prefix={<DollarOutlined />}
                  addonAfter="VND"
                />
              </Form.Item>
            )}
            
            {costType === 'gender' && (
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span className="required-field">Chi phí cho Nam</span>}
                    name="maleCost"
                    rules={[{ required: costType === 'gender', message: 'Vui lòng nhập chi phí!' }]}
                  >
                    <InputNumber 
                      min={0} 
                      step={1000} 
                      className="w-full" 
                      formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
                      parser={(value: string | undefined) => {
                        if (!value) return 0;
                        return Number(value.replace(/\./g, ''));
                      }}
                      placeholder="Nhập chi phí cho nam" 
                      prefix={<DollarOutlined />}
                      addonAfter="VND"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span className="required-field">Chi phí cho Nữ</span>}
                    name="femaleCost"
                    rules={[{ required: costType === 'gender', message: 'Vui lòng nhập chi phí!' }]}
                  >
                    <InputNumber 
                      min={0} 
                      step={1000} 
                      className="w-full" 
                      formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
                      parser={(value: string | undefined) => {
                        if (!value) return 0;
                        return Number(value.replace(/\./g, ''));
                      }}
                      placeholder="Nhập chi phí cho nữ" 
                      prefix={<DollarOutlined />}
                      addonAfter="VND"
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
            
            <Form.Item
              label="Chi tiết chi phí"
              name="detailOfCost"
            >
              <TextArea 
                rows={2} 
                placeholder="Chi tiết về chi phí (ví dụ: phí thuê sân, nước uống, trang phục...)" 
              />
            </Form.Item>
          </Card>

          <Card 
            title={
              <span>
                <TeamOutlined className="mr-2" />
                Thông tin tìm kiếm
              </span>
            } 
            className="mb-6 border border-gray-200 rounded-lg playmate-inner-card"
          >
            <Form.Item
              label="Loại tìm kiếm"
              name="isTeam"
              valuePropName="checked"
            >
              <Checkbox>Tìm nhóm (đánh dấu nếu bạn đang tìm một nhóm, để trống nếu tìm cá nhân)</Checkbox>
            </Form.Item>
          
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="required-field">Số người/đội cần thiết</span>}
                  name="numberOfParticipants"
                  rules={[{ required: true, message: 'Vui lòng nhập số người/đội cần thiết!' }]}
                >
                  <InputNumber 
                    min={1} 
                    max={50} 
                    className="w-full" 
                    placeholder="Số người/đội cần thiết"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Positions section */}
          <Form.List name="positions">
            {(fields, { add, remove }) => (
              <>
                <div className="mb-2">
                  <Text strong>Các vị trí cần người tham gia</Text>
                  <Text type="secondary" className="ml-2">(Nhập các vị trí mà bạn cần người tham gia)</Text>
                </div>
                
                {fields.map((field, index) => (
                  <Form.Item
                    required={false}
                    key={field.key}
                    className="mb-2"
                  >
                    <div className="flex items-center">
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          { 
                            required: true, 
                            message: 'Vui lòng nhập vị trí hoặc xóa trường này' 
                          }
                        ]}
                        noStyle
                      >
                        <Input 
                          placeholder={`Vị trí ${index + 1}`} 
                          style={{ width: '90%' }} 
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <Button
                          danger
                          type="text"
                          className="ml-2"
                          onClick={() => remove(field.name)}
                        >
                          Xóa
                        </Button>
                      ) : null}
                    </div>
                  </Form.Item>
                ))}
                
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    className="w-full"
                    icon={<PlusOutlined />}
                  >
                    Thêm vị trí
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Card 
            title={
              <span>
                <UserOutlined className="mr-2" />
                Yêu cầu người tham gia
              </span>
            } 
            className="mb-6 border border-gray-200 rounded-lg playmate-inner-card"
          >
            <Form.Item
              label={<span className="required-field">Giới tính</span>}
              name="genderPreference"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            >
              <Select placeholder="Chọn giới tính">
                <Option value="any">Không giới hạn</Option>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              label={<span className="required-field">Trình độ yêu cầu tối thiểu</span>}
              name="skillLevel"
              rules={[{ required: true, message: 'Vui lòng chọn trình độ yêu cầu!' }]}
            >
              <Select placeholder="Chọn trình độ">
                <Option value="any">Không giới hạn</Option>
                <Option value="newbie">Mới bắt đầu</Option>
                <Option value="intermediate">Trung cấp</Option>
                <Option value="advance">Nâng cao</Option>
                <Option value="professional">Chuyên nghiệp</Option>
              </Select>
            </Form.Item>
          </Card>

          <Divider />

          <Form.Item className="text-center">
            <Space size="middle">
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />} 
                loading={submitting}
                size="large"
                className="min-w-[150px]"
              >
                Lưu thay đổi
              </Button>
              <Button 
                onClick={onClose} 
                size="large"
              >
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
      
      <style>{`
        .playmate-form .ant-form-item-label > label {
          font-weight: 500;
        }
        .playmate-form .ant-card-head-title {
          font-weight: 600;
        }
        .playmate-form .ant-input-number-group-wrapper {
          width: 100%;
        }
        .playmate-inner-card.ant-card {
          box-shadow: none;
        }
        .playmate-inner-card .ant-card-body {
          padding: 20px !important;
        }
        /* Required field indicator */
        .required-field::before {
          content: '* ';
          color: #ff4d4f;
        }
      `}</style>
    </Modal>
  );
};

export default PlaymateEdit; 