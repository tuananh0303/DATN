import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  Spin, 
  message, 
  Divider, 
  TimePicker, 
  Select, 
  Upload, 
  Tabs,
  Card,
  Tag,
  Space,
  Empty,
  List,
  Table
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SaveOutlined, 
  UploadOutlined, 
  MinusCircleOutlined,
  InfoCircleOutlined,
  FileImageOutlined,
  TagOutlined,
  FileOutlined,
  FolderOpenOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  GiftOutlined,
  LinkOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Facility } from '@/types/facility.type';
import { facilityService } from '@/services/facility.service';
import { Sport } from '@/types/sport.type';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import type { UploadFile as AntdUploadFile, RcFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FacilityEditProps {
  facilityId: string;
  onClose: (updated?: boolean) => void;
}

interface FacilityFormValues {
  name: string;
  description: string;
  location: string;
  openTime1: dayjs.Dayjs | null;
  closeTime1: dayjs.Dayjs | null;
  openTime2: dayjs.Dayjs | null;
  closeTime2: dayjs.Dayjs | null;
  openTime3: dayjs.Dayjs | null;
  closeTime3: dayjs.Dayjs | null;
  numberOfShifts: number;
  sportIds: number[];
  status?: string;
}

// Khai báo interface cho file upload từ Ant Design
interface UploadFile extends Omit<AntdUploadFile, 'originFileObj'> {
  uid: string;
  name: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  originFileObj?: RcFile;
  response?: unknown;
  error?: unknown;
  linkProps?: unknown;
  type?: string;
  size?: number;
  percent?: number;
}

const FacilityEdit: React.FC<FacilityEditProps> = ({ facilityId, onClose }) => {
  const [form] = Form.useForm<FacilityFormValues>();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [allSports, setAllSports] = useState<Sport[]>([]);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [licenseFiles, setLicenseFiles] = useState<Record<number, File>>({});
  const [numberOfShifts, setNumberOfShifts] = useState<number>(1);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  
  // Update numberOfShifts when form values change
  const handleNumberOfShiftsChange = (value: number) => {
    setNumberOfShifts(value);
  };

  // Handle form submission
  const handleSubmit = async (values: FacilityFormValues) => {
    try {
      setSubmitting(true);
      
      // Format times for submission
      const formattedValues: Partial<Facility> = {
        description: values.description,
        location: values.location,
        openTime1: values.openTime1 ? values.openTime1.format('HH:mm') : '',
        closeTime1: values.closeTime1 ? values.closeTime1.format('HH:mm') : '',
        openTime2: values.openTime2 ? values.openTime2.format('HH:mm') : '',
        closeTime2: values.closeTime2 ? values.closeTime2.format('HH:mm') : '',
        openTime3: values.openTime3 ? values.openTime3.format('HH:mm') : '',
        closeTime3: values.closeTime3 ? values.closeTime3.format('HH:mm') : '',
        numberOfShifts: values.numberOfShifts,
        status: values.status as 'pending' | 'active' | 'unactive' | 'closed' | 'banned'
      };
      
      // Nếu tên bị thay đổi, sử dụng API approval cho cập nhật tên
      if (facility && values.name !== facility.name) {
        try {
          await facilityService.updateFacilityName(facilityId, values.name);
          message.success('Yêu cầu cập nhật tên cơ sở đã được gửi và đang chờ phê duyệt');
        } catch (error) {
          console.error('Không thể gửi yêu cầu cập nhật tên:', error);
          message.error('Không thể gửi yêu cầu cập nhật tên cơ sở');
        }
      } else {
        // Nếu không thay đổi tên, sử dụng API cập nhật thông thường
        formattedValues.name = values.name;
      }
      
      // Cập nhật thông tin cơ bản của cơ sở
      await facilityService.updateFacility(facilityId, formattedValues);
      
      // Xử lý upload hình ảnh mới nếu có
      const fileList = uploadFileList || [];
      if (fileList.length > 0) {
        const fileObjects = fileList
          .filter((file) => file.originFileObj)
          .map((file) => file.originFileObj);
        
        if (fileObjects.length > 0 && fileObjects.every(Boolean)) {
          await facilityService.uploadFacilityImages(facilityId, fileObjects as File[]);
        }
      }
      
      message.success('Cập nhật cơ sở thành công');
      onClose(true);
    } catch (error) {
      console.error('Failed to update facility:', error);
      message.error('Không thể cập nhật thông tin cơ sở');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    onClose();
  };
  
  // File upload configuration
  const uploadProps = {
    beforeUpload: (file: RcFile) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên file hình ảnh!');
      }
      return isImage ? false : Upload.LIST_IGNORE;
    },
    accept: 'image/*',
    fileList: uploadFileList,
    onChange: ({ fileList }: { fileList: UploadFile[] }) => {
      setUploadFileList(fileList);
    }
  };
  
  // Navigation to management pages
  const navigateToFieldManagement = () => {
    navigate(`/owner/field-management?facilityId=${facilityId}`);
  };
  
  const navigateToServiceManagement = () => {
    navigate(`/owner/service-management?facilityId=${facilityId}`);
  };
  
  const navigateToEventManagement = () => {
    navigate(`/owner/event-management?facilityId=${facilityId}`);
  };
  
  const navigateToVoucherManagement = () => {
    navigate(`/owner/voucher-management?facilityId=${facilityId}`);
  };
  
  // Certificate file upload
  const handleCertificateUpload = (file: File) => {
    setCertificateFile(file);
    return false; // prevent auto upload
  };
  
  // Submit certificate qua approval API
  const handleCertificateSubmit = async () => {
    if (!certificateFile) {
      message.error('Vui lòng chọn file giấy chứng nhận trước khi gửi');
      return;
    }
    
    try {
      setSubmitting(true);
      await facilityService.updateCertificate(facilityId, certificateFile);
      message.success('Yêu cầu cập nhật giấy chứng nhận đã được gửi và đang chờ phê duyệt');
      setCertificateFile(null);
      // Refresh data
      const data = await facilityService.getFacilityById(facilityId);
      setFacility(data);
    } catch (error) {
      console.error('Không thể gửi yêu cầu cập nhật giấy chứng nhận:', error);
      message.error('Không thể gửi yêu cầu cập nhật giấy chứng nhận');
    } finally {
      setSubmitting(false);
    }
  };
  
  // License file upload
  const handleLicenseUpload = (file: File, sportId: number) => {
    setLicenseFiles(prev => ({
      ...prev,
      [sportId]: file
    }));
    return false; // prevent auto upload
  };
  
  // Submit license qua approval API
  const handleLicenseSubmit = async (sportId: number) => {
    const licenseFile = licenseFiles[sportId];
    if (!licenseFile) {
      message.error('Vui lòng chọn file giấy phép trước khi gửi');
      return;
    }
    
    try {
      setSubmitting(true);
      await facilityService.updateLicense(facilityId, sportId, licenseFile);
      message.success('Yêu cầu cập nhật giấy phép đã được gửi và đang chờ phê duyệt');
      // Xóa file đã upload khỏi state
      setLicenseFiles(prev => {
        const newFiles = {...prev};
        delete newFiles[sportId];
        return newFiles;
      });
      // Refresh data
      const data = await facilityService.getFacilityById(facilityId);
      setFacility(data);
    } catch (error) {
      console.error('Không thể gửi yêu cầu cập nhật giấy phép:', error);
      message.error('Không thể gửi yêu cầu cập nhật giấy phép');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Fetch facility data and sports data on component mount
  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy dữ liệu cơ sở
        const data = await facilityService.getFacilityById(facilityId);
        setFacility(data);
        setNumberOfShifts(data.numberOfShifts || 1);        
        
        // Set initial form values
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          location: data.location,
          openTime1: data.openTime1 ? dayjs(data.openTime1, 'HH:mm') : null,
          closeTime1: data.closeTime1 ? dayjs(data.closeTime1, 'HH:mm') : null,
          openTime2: data.openTime2 ? dayjs(data.openTime2, 'HH:mm') : null,
          closeTime2: data.closeTime2 ? dayjs(data.closeTime2, 'HH:mm') : null,
          openTime3: data.openTime3 ? dayjs(data.openTime3, 'HH:mm') : null,
          closeTime3: data.closeTime3 ? dayjs(data.closeTime3, 'HH:mm') : null,
          numberOfShifts: data.numberOfShifts || 1,
          status: data.status
        });
        
        // Xử lý danh sách sport IDs từ fieldGroups
        if (data.fieldGroups && data.fieldGroups.length > 0) {
          // Thu thập tất cả các sportIds từ tất cả các fieldGroups
          const allSportIds = data.fieldGroups.flatMap(group => {
            if (group.sports) return group.sports.map(sport => sport.id);
            return [];
          });
          
          // Loại bỏ các ID trùng lặp
          const uniqueSportIds = [...new Set(allSportIds)];
          
          // Cập nhật form với danh sách sportIds đã trích xuất
          form.setFieldsValue({
            sportIds: uniqueSportIds
          });
        }
        
        // Xử lý danh sách hình ảnh
        if (data.imagesUrl && data.imagesUrl.length > 0) {
          const fileList: UploadFile[] = data.imagesUrl.map((url, index) => ({
            uid: `-${index}`,
            name: url.split('/').pop() || `image-${index}.jpg`,
            status: 'done',
            url,
          }));
          setUploadFileList(fileList);
        }
      } catch (error) {
        console.error('Failed to fetch facility details:', error);
        message.error('Không thể tải thông tin cơ sở.');
      } finally {
        setLoading(false);
      }
    };
    
    // Gọi API lấy danh sách thể thao - Nếu không có getAllSports, sử dụng mock data
    const fetchSports = async () => {
      try {
        // TODO: Thay thế bằng API thực tế khi có
        // Nếu có thực hiện và khi có getAllSports:
        // const data = await facilityService.getAllSports();
        // setAllSports(data || []);
        
        // Tạm thời sử dụng mock data
        const sportsList = [
          { id: 1, name: 'football' },
          { id: 2, name: 'badminton' },
          { id: 3, name: 'futsal' },
          { id: 4, name: 'basketball' },
          { id: 5, name: 'volleyball' },
          { id: 6, name: 'tennis' },
          { id: 7, name: 'golf' },
          { id: 8, name: 'swimming' },
          { id: 9, name: 'table_tennis' },
          { id: 10, name: 'baseball' }
        ];
        setAllSports(sportsList);
      } catch (error) {
        console.error('Failed to fetch sports:', error);
      }
    };
    
    if (facilityId) {
      fetchFacilityData();
      fetchSports();
    }
  }, [facilityId, form]);
  
  // Phương thức xóa hình ảnh
  const handleDeleteImage = async (imageUrl: string) => {
    try {
      setSubmitting(true);
      await facilityService.deleteFacilityImages(facilityId, imageUrl);
      
      // Cập nhật lại danh sách hình ảnh trong state
      setUploadFileList(prev => prev.filter(file => file.url !== imageUrl));
      
      message.success('Đã xóa hình ảnh');
    } catch (error) {
      console.error('Failed to delete image:', error);
      message.error('Không thể xóa hình ảnh');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spin size="large" tip="Đang tải thông tin cơ sở..." />
      </div>
    );
  }
  
  if (!facility) {
    return (
      <div className="p-8 text-center">
        <Text>Không tìm thấy thông tin cơ sở</Text>
        <div className="mt-4">
          <Button onClick={() => onClose()}>Đóng</Button>
        </div>
      </div>
    );
  }
  
  const tabItems = [
    { key: 'basic', label: 'Thông tin cơ bản', icon: <InfoCircleOutlined /> },
    { key: 'images', label: 'Hình ảnh', icon: <FileImageOutlined /> },
    { key: 'fields', label: 'Nhóm sân', icon: <AppstoreOutlined /> },
    { key: 'services', label: 'Dịch vụ', icon: <FolderOpenOutlined /> },
    { key: 'events', label: 'Sự kiện', icon: <CalendarOutlined /> },
    { key: 'vouchers', label: 'Khuyến mãi', icon: <GiftOutlined /> },
    { key: 'documents', label: 'Giấy tờ xác thực', icon: <FileOutlined /> },
    { key: 'status', label: 'Trạng thái', icon: <TagOutlined /> }
  ];
  
  return (
    <div className="facility-edit">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleCancel}
              className="mr-4"
            >
              Quay lại
            </Button>
            <div>
              <div className="flex items-center">
                <Title level={4} className="m-0 mr-2">{facility.name}</Title>
              </div>
              <Text type="secondary">{facility.location}</Text>
            </div>
          </div>
          
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={() => form.submit()}
            loading={submitting}
          >
            Lưu thay đổi
          </Button>
        </div>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={(value) => setActiveTab(value)}
          items={tabItems.map(item => ({
            key: item.key,
            label: (
              <span>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </span>
            )
          }))}
        />
      </div>
      
      {/* Form */}
      <div className="p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          className="w-full"
        >
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin cơ bản */}
              <Card title="Thông tin chung" className="h-full">
                <Form.Item 
                  name="name" 
                  label="Tên cơ sở" 
                  rules={[{ required: true, message: 'Vui lòng nhập tên cơ sở' }]}
                >
                  <Input placeholder="Nhập tên cơ sở" />
                </Form.Item>
                
                <Form.Item 
                  name="location" 
                  label="Địa chỉ" 
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                  <Input placeholder="Nhập địa chỉ chi tiết" />
                </Form.Item>
                
                <Form.Item 
                  name="description" 
                  label="Mô tả" 
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                  <TextArea 
                    placeholder="Nhập mô tả chi tiết về cơ sở" 
                    rows={4} 
                  />
                </Form.Item>
              </Card>
              
              <div className="space-y-6">
                <Card title="Giờ hoạt động" className="mb-6">
                  <Form.Item
                    name="numberOfShifts"
                    label="Số lượng khung giờ hoạt động"
                    rules={[{ required: true, message: 'Vui lòng chọn số lượng khung giờ' }]}
                  >
                    <Select onChange={handleNumberOfShiftsChange}>
                      <Option value={1}>1 khung giờ</Option>
                      <Option value={2}>2 khung giờ</Option>
                      <Option value={3}>3 khung giờ</Option>
                    </Select>
                  </Form.Item>
                  
                  <div className="border p-4 rounded-md mb-4">
                    <div className="mb-2 font-medium">Khung giờ 1</div>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item 
                        name="openTime1" 
                        label="Giờ mở cửa" 
                        rules={[{ required: true, message: 'Vui lòng chọn giờ mở cửa' }]}
                      >
                        <TimePicker format="HH:mm" className="w-full" placeholder="Chọn giờ" />
                      </Form.Item>
                      
                      <Form.Item 
                        name="closeTime1" 
                        label="Giờ đóng cửa" 
                        rules={[{ required: true, message: 'Vui lòng chọn giờ đóng cửa' }]}
                      >
                        <TimePicker format="HH:mm" className="w-full" placeholder="Chọn giờ" />
                      </Form.Item>
                    </div>
                  </div>
                  
                  {numberOfShifts >= 2 && (
                    <div className="border p-4 rounded-md mb-4">
                      <div className="mb-2 font-medium">Khung giờ 2</div>
                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item 
                          name="openTime2" 
                          label="Giờ mở cửa" 
                          rules={[{ required: true, message: 'Vui lòng chọn giờ mở cửa' }]}
                        >
                          <TimePicker format="HH:mm" className="w-full" placeholder="Chọn giờ" />
                        </Form.Item>
                        
                        <Form.Item 
                          name="closeTime2" 
                          label="Giờ đóng cửa" 
                          rules={[{ required: true, message: 'Vui lòng chọn giờ đóng cửa' }]}
                        >
                          <TimePicker format="HH:mm" className="w-full" placeholder="Chọn giờ" />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                  
                  {numberOfShifts >= 3 && (
                    <div className="border p-4 rounded-md mb-4">
                      <div className="mb-2 font-medium">Khung giờ 3</div>
                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item 
                          name="openTime3" 
                          label="Giờ mở cửa" 
                          rules={[{ required: true, message: 'Vui lòng chọn giờ mở cửa' }]}
                        >
                          <TimePicker format="HH:mm" className="w-full" placeholder="Chọn giờ" />
                        </Form.Item>
                        
                        <Form.Item 
                          name="closeTime3" 
                          label="Giờ đóng cửa" 
                          rules={[{ required: true, message: 'Vui lòng chọn giờ đóng cửa' }]}
                        >
                          <TimePicker format="HH:mm" className="w-full" placeholder="Chọn giờ" />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                </Card>
                
                <Card title="Môn thể thao">
                  <Form.Item 
                    name="sportIds" 
                    rules={[{ required: true, message: 'Vui lòng chọn ít nhất một môn thể thao' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Chọn môn thể thao"
                      style={{ width: '100%' }}
                    >
                      {allSports.map((sport) => (
                        <Option key={sport.id} value={sport.id}>
                          {getSportNameInVietnamese(sport.name)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'images' && (
            <Card title="Quản lý hình ảnh">
              <div className="mb-4">
                <Title level={5}>Hình ảnh hiện tại</Title>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {facility.imagesUrl && facility.imagesUrl.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`facility-${index}`} 
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                        <Button 
                          danger 
                          type="primary" 
                          size="small" 
                          icon={<MinusCircleOutlined />}
                          onClick={() => handleDeleteImage(image)}
                        >
                          Xoá ảnh
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Divider />
              
              <div>
                <Title level={5}>Thêm hình ảnh mới</Title>
                <Upload
                  listType="picture-card"
                  {...uploadProps}
                  multiple
                >
                  <div>
                    <UploadOutlined />
                    <div className="mt-2">Tải ảnh lên</div>
                  </div>
                </Upload>
              </div>
            </Card>
          )}
          
          {activeTab === 'fields' && (
            <Card title="Nhóm sân" extra={
              <Button 
                type="primary" 
                icon={<LinkOutlined />} 
                onClick={navigateToFieldManagement}
              >
                Quản lý nhóm sân
              </Button>
            }>
              {facility.fieldGroups && facility.fieldGroups.length > 0 ? (
                <div>
                  <div className="text-gray-500 mb-4">
                    <Space direction="vertical">
                      <Text>
                        <ExclamationCircleOutlined className="mr-2 text-yellow-500" />
                        Để quản lý chi tiết nhóm sân, vui lòng sử dụng trang Quản lý sân chuyên dụng.
                      </Text>
                    </Space>
                  </div>
                  
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }}
                    dataSource={facility.fieldGroups}
                    renderItem={group => (
                      <List.Item>
                        <Card 
                          size="small" 
                          title={group.name}
                          extra={<Tag color="blue">{group.fields.length} sân</Tag>}
                        >
                          <div>
                            <div className="flex justify-between mb-1">
                              <Text type="secondary">Kích thước:</Text>
                              <Text>{group.dimension}</Text>
                            </div>
                            <div className="flex justify-between mb-1">
                              <Text type="secondary">Giá cơ bản:</Text>
                              <Text className="text-blue-600">{group.basePrice?.toLocaleString()}đ/giờ</Text>
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              ) : (
                <Empty description="Cơ sở này chưa có nhóm sân nào" />
              )}
            </Card>
          )}
          
          {activeTab === 'services' && (
            <Card title="Dịch vụ" extra={
              <Button 
                type="primary" 
                icon={<LinkOutlined />} 
                onClick={navigateToServiceManagement}
              >
                Quản lý dịch vụ
              </Button>
            }>
              {facility.services && facility.services.length > 0 ? (
                <div>
                  <div className="text-gray-500 mb-4">
                    <Space direction="vertical">
                      <Text>
                        <ExclamationCircleOutlined className="mr-2 text-yellow-500" />
                        Để quản lý chi tiết dịch vụ, vui lòng sử dụng trang Quản lý dịch vụ chuyên dụng.
                      </Text>
                    </Space>
                  </div>
                  
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
                    dataSource={facility.services}
                    renderItem={service => (
                      <List.Item>
                        <Card size="small">
                          <div className="flex justify-between mb-2">
                            <Text strong>{service.name}</Text>                           
                          </div>
                          <div className="flex justify-between text-sm">
                            <Text type="secondary">{service.type === 'rental' ? 'Cho thuê' : 'Dịch vụ'}</Text>
                            <Text className="text-blue-600">{service.price.toLocaleString()}đ/{service.unit}</Text>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              ) : (
                <Empty description="Cơ sở này chưa có dịch vụ nào" />
              )}
            </Card>
          )}
          
          {activeTab === 'events' && (
            <Card title="Sự kiện" extra={
              <Button 
                type="primary" 
                icon={<LinkOutlined />} 
                onClick={navigateToEventManagement}
              >
                Quản lý sự kiện
              </Button>
            }>
              {facility.events && facility.events.length > 0 ? (
                <div>
                  <div className="text-gray-500 mb-4">
                    <Space direction="vertical">
                      <Text>
                        <ExclamationCircleOutlined className="mr-2 text-yellow-500" />
                        Để quản lý chi tiết sự kiện, vui lòng sử dụng trang Quản lý sự kiện chuyên dụng.
                      </Text>
                    </Space>
                  </div>
                  
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
                    dataSource={facility.events}
                    renderItem={event => (
                      <List.Item>
                        <Card size="small">
                          <div className="flex justify-between mb-2">
                            <Text strong>{event.name}</Text>
                            <Tag color={
                              event.status === 'active' ? 'success' : 
                              event.status === 'upcoming' ? 'processing' : 'default'
                            }>
                              {event.status === 'active' ? 'Đang diễn ra' : 
                               event.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                            </Tag>
                          </div>
                          <div className="text-gray-500 text-sm">
                            <div>
                              {new Date(event.startDate).toLocaleDateString('vi-VN')} - {new Date(event.endDate).toLocaleDateString('vi-VN')}
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              ) : (
                <Empty description="Cơ sở này chưa có sự kiện nào" />
              )}
            </Card>
          )}
          
          {activeTab === 'vouchers' && (
            <Card title="Khuyến mãi" extra={
              <Button 
                type="primary" 
                icon={<LinkOutlined />} 
                onClick={navigateToVoucherManagement}
              >
                Quản lý khuyến mãi
              </Button>
            }>
              {facility.vouchers && facility.vouchers.length > 0 ? (
                <div>
                  <div className="text-gray-500 mb-4">
                    <Space direction="vertical">
                      <Text>
                        <ExclamationCircleOutlined className="mr-2 text-yellow-500" />
                        Để quản lý chi tiết khuyến mãi, vui lòng sử dụng trang Quản lý khuyến mãi chuyên dụng.
                      </Text>
                    </Space>
                  </div>
                  
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
                    dataSource={facility.vouchers}
                    renderItem={voucher => (
                      <List.Item>
                        <Card size="small" className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                          <div className="flex justify-between mb-2">
                            <Text strong className="text-blue-700">{voucher.name}</Text>
                            <Text className="bg-white px-2 py-1 rounded-full border border-blue-200 text-blue-700 font-bold text-xs">
                              {voucher.code}
                            </Text>
                          </div>
                          <div className="text-center mb-2">
                            <Text className="font-bold text-red-600">
                              {voucher.voucherType === 'percent' ? `Giảm ${voucher.discount}%` : `Giảm ${voucher.discount.toLocaleString()}đ`}
                            </Text>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              ) : (
                <Empty description="Cơ sở này chưa có khuyến mãi nào" />
              )}
            </Card>
          )}
          
          {activeTab === 'documents' && (
            <div>
              <Card title="Giấy chứng nhận cơ sở" className="mb-6">
                <div className="mb-4">
                  <Title level={5}>Giấy chứng nhận hiện tại</Title>
                  {facility?.certificate?.verified ? (
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileOutlined className="mr-2" />
                          <Text>Giấy chứng nhận</Text>
                        </div>
                        <a href={facility.certificate.verified} target="_blank" rel="noopener noreferrer">
                          <Button type="link">Xem</Button>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <Empty description="Không có giấy chứng nhận" />
                  )}
                </div>
                
                <Divider />
                
                <div className="mb-4">
                  <Title level={5}>Cập nhật giấy chứng nhận</Title>
                  <Text type="secondary" className="block mb-4">
                    Việc cập nhật giấy chứng nhận mới sẽ yêu cầu phê duyệt từ quản trị viên. Giấy chứng nhận hiện tại vẫn được sử dụng cho đến khi giấy mới được duyệt.
                  </Text>
                  
                  <Upload
                    beforeUpload={handleCertificateUpload}
                    accept="image/*,.pdf"
                    maxCount={1}
                    fileList={certificateFile ? [{ uid: '1', name: certificateFile.name, status: 'done' }] as UploadFile[] : []}
                    onRemove={() => setCertificateFile(null)}
                  >
                    <Button icon={<UploadOutlined />}>Chọn file giấy chứng nhận</Button>
                  </Upload>
                  
                  <Button 
                    type="primary" 
                    className="mt-4"
                    onClick={handleCertificateSubmit}
                    loading={submitting}
                    disabled={!certificateFile || facility?.status !== 'active'}
                  >
                    Gửi yêu cầu cập nhật
                  </Button>
                  
                  {facility?.status !== 'active' && (
                    <div className="mt-2">
                      <Text type="danger">
                        <ExclamationCircleOutlined className="mr-1" />
                        Cơ sở phải ở trạng thái hoạt động mới có thể cập nhật giấy tờ.
                      </Text>
                    </div>
                  )}
                </div>
              </Card>
              
              <Card title="Giấy phép kinh doanh theo môn thể thao">
                <div className="mb-4">
                  <Title level={5}>Giấy phép hiện tại</Title>
                  {facility?.licenses && facility.licenses.length > 0 ? (
                    <Table 
                      dataSource={facility.licenses}
                      rowKey={(record) => `${record.facilityId}-${record.sportId}`}
                      pagination={false}
                      columns={[
                        {
                          title: 'Môn thể thao',
                          dataIndex: 'sportId',
                          key: 'sportId',
                          render: (sportId) => {
                            // Tìm sport trong danh sách allSports
                            const sport = allSports.find(s => s.id === sportId);
                            if (sport) {
                              return getSportNameInVietnamese(sport.name);
                            }
                            return "Không xác định";
                          }
                        },
                        {
                          title: 'Trạng thái',
                          key: 'status',
                          render: (_, record) => (
                            <Tag color={record.verified ? 'success' : 'warning'}>
                              {record.verified ? 'Đã xác thực' : 'Đang chờ xác thực'}
                            </Tag>
                          )
                        },
                        {
                          title: 'Hành động',
                          key: 'action',
                          render: (_, record) => (
                            <Space>
                              {record.verified && (
                                <Button type="link" href={record.verified} target="_blank">
                                  Xem giấy phép
                                </Button>
                              )}
                            </Space>
                          )
                        }
                      ]}
                    />
                  ) : (
                    <Empty description="Chưa có giấy phép kinh doanh" />
                  )}
                </div>
                
                <Divider />
                
                <div>
                  <Title level={5}>Cập nhật giấy phép</Title>
                  <Text type="secondary" className="block mb-4">
                    Việc cập nhật giấy phép mới sẽ yêu cầu phê duyệt từ quản trị viên. Giấy phép hiện tại vẫn được sử dụng cho đến khi giấy mới được duyệt.
                  </Text>
                  
                  {allSports.length > 0 ? (
                    <div>
                      {allSports.map(sport => (
                        <Card key={sport.id} size="small" className="mb-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <Text strong>{getSportNameInVietnamese(sport.name)}</Text>
                              
                              {/* Check if license exists for this sport */}
                              {facility?.licenses && facility.licenses.some(license => license.sportId === sport.id) && (
                                <Tag color="success" className="ml-2">Đã có giấy phép</Tag>
                              )}
                            </div>
                            
                            <div className="flex items-center">
                              <Upload
                                beforeUpload={(file) => handleLicenseUpload(file, sport.id)}
                                accept="image/*,.pdf"
                                maxCount={1}
                                fileList={licenseFiles[sport.id] ? [{ uid: '1', name: licenseFiles[sport.id].name, status: 'done' }] as UploadFile[] : []}
                                onRemove={() => {
                                  setLicenseFiles(prev => {
                                    const newFiles = {...prev};
                                    delete newFiles[sport.id];
                                    return newFiles;
                                  });
                                }}
                                className="mr-3"
                              >
                                <Button icon={<UploadOutlined />}>Chọn file</Button>
                              </Upload>
                              
                              <Button 
                                type="primary"
                                onClick={() => handleLicenseSubmit(sport.id)}
                                loading={submitting}
                                disabled={!licenseFiles[sport.id] || facility?.status !== 'active'}
                              >
                                Gửi yêu cầu
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Empty description="Không có môn thể thao nào được đăng ký. Hãy thêm môn thể thao vào cơ sở trước." />
                  )}
                  
                  {facility?.status !== 'active' && (
                    <div className="mt-4">
                      <Text type="danger">
                        <ExclamationCircleOutlined className="mr-1" />
                        Cơ sở phải ở trạng thái hoạt động mới có thể cập nhật giấy tờ.
                      </Text>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'status' && (
            <Card title="Trạng thái cơ sở">
              <div className="mb-4">
                <Title level={5}>Thay đổi trạng thái</Title>
                <Form.Item 
                  name="status" 
                  initialValue={facility.status}
                >
                  <Select>
                    <Option value="active">Đang hoạt động</Option>
                    <Option value="unactive">Đang đóng cửa</Option>
                  </Select>
                </Form.Item>
                
                <div className="text-gray-500 text-sm mb-4">
                  <p>- <strong>Đang hoạt động</strong>: Cơ sở mở cửa và có thể nhận đặt sân</p>
                  <p>- <strong>Đang đóng cửa</strong>: Cơ sở tạm thời đóng cửa, không nhận đặt sân</p>
                </div>
              </div>
            </Card>
          )}
        </Form>
      </div>
    </div>
  );
};

export default FacilityEdit; 