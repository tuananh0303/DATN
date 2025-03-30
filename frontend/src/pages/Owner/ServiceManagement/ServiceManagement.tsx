import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, Card, Typography, Modal, Input, Radio } from 'antd';
import { PlusOutlined, ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { mockServices } from '@/mocks/service/serviceData';
import { mockFacilitiesDropdown } from '@/mocks/facility/mockFacilities';
import { Service, UpdatedServiceValues, ServiceStatus } from '@/types/service.type';
import serviceImage from '@/assets/Owner/content/service.png';
import { formatPrice } from '@/utils/statusUtils';

// Component imports
import ServiceTable from './components/ServiceTable';
import ServiceDetailModal from './components/ServiceDetailModal';
import ServiceEditModal from './components/ServiceEditModal';
import ServiceConfirmModal from './components/ServiceConfirmModal';

const { Title, Text } = Typography;
const { Option } = Select;

// Key lưu trữ trong localStorage
const SELECTED_FACILITY_KEY = 'owner_selected_facility_id';

// Mock sports data
const mockSports = [
  { id: 1, name: 'Bóng đá' },
  { id: 2, name: 'Bóng rổ' },
  { id: 3, name: 'Tennis' },
  { id: 4, name: 'Chung' }
];

const ServiceManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Trạng thái cho modal chỉnh sửa dịch vụ
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [updatedValues, setUpdatedValues] = useState<UpdatedServiceValues | null>(null);
  
  const itemsPerPage = 10;

  // Filter options
  const statusFilterOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'available', label: 'Còn hàng' },
    { value: 'low_stock', label: 'Sắp hết' },
    { value: 'out_of_stock', label: 'Hết hàng' },
    { value: 'discontinued', label: 'Ngừng kinh doanh' }
  ];

  // Lấy facilityId từ localStorage hoặc sử dụng cơ sở đầu tiên
  useEffect(() => {
    const savedFacilityId = localStorage.getItem(SELECTED_FACILITY_KEY);
    const initialFacilityId = savedFacilityId || (mockFacilitiesDropdown.length > 0 ? mockFacilitiesDropdown[0].id : '');
    
    if (initialFacilityId) {
      setSelectedFacilityId(initialFacilityId);
      fetchServices();
    }
  }, []);

  // Handle facility selection
  const handleFacilitySelect = (value: string) => {
    setSelectedFacilityId(value);
    localStorage.setItem(SELECTED_FACILITY_KEY, value);
    // Trong thực tế, bạn sẽ gọi API để lấy danh sách services dựa vào facilityId
    fetchServices();
  };

  // Fetch services based on facility ID (mock implementation)
  const fetchServices = () => {
    setLoading(true);
    setError(null);
    
    // Set services immediately without delay
    try {
      // Filter services based on facility ID (in real app, this would be an API call)
      // Here we're just returning all mock services
      setServices(mockServices);
      setLoading(false);
    } catch {
      setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  // Filter services based on search term and status
  const filteredServices = services.filter(service => {
    // Filter by search term
    const searchMatch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.sport.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const statusMatch = statusFilter === 'all' || service.status === statusFilter as ServiceStatus;
    
    return searchMatch && statusMatch;
  });

  // Pagination logic
  const totalServices = filteredServices.length;
  const currentServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle delete service
  const handleDeleteService = (serviceId: string) => {
    const serviceToDelete = services.find(service => service.id.toString() === serviceId);
    
    if (!serviceToDelete) return;
    
    Modal.confirm({
      title: 'Xác nhận xóa dịch vụ',
      content: (
        <div>
          <p>Bạn có chắc chắn muốn xóa dịch vụ sau đây?</p>
          <div className="bg-gray-50 p-3 mt-2 rounded-md">
            <p><strong>Tên dịch vụ:</strong> {serviceToDelete.name}</p>
            <p><strong>Loại hình:</strong> {serviceToDelete.sport.name}</p>
            <p><strong>Giá:</strong> {formatPrice(serviceToDelete.price)}</p>
            <p><strong>Số lượng hiện có:</strong> {serviceToDelete.amount}</p>
          </div>
          <p className="mt-2 text-red-500">Lưu ý: Hành động này không thể hoàn tác.</p>
        </div>
      ),
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In real app, this would be an API call
        setServices(prevServices => prevServices.filter(service => service.id.toString() !== serviceId));
        
        Modal.success({
          title: 'Xóa dịch vụ thành công',
          content: 'Dịch vụ đã được xóa khỏi hệ thống.'
        });
      }
    });
  };

  // Mở modal xem chi tiết dịch vụ
  const handleViewService = (service: Service) => {
    setCurrentService(service);
    setViewModalVisible(true);
  };

  // Mở modal chỉnh sửa dịch vụ
  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setEditModalVisible(true);
  };

  // Trước khi cập nhật, lưu giá trị mới và hiển thị popup xác nhận
  const handleConfirmUpdate = (values: UpdatedServiceValues) => {
    setUpdatedValues(values);
  };

  // Xử lý cập nhật dịch vụ
  const handleUpdateService = () => {
    if (!currentService || !updatedValues) return;
    
    setSubmitting(true);
    
    // Giả lập API call
    setTimeout(() => {
      // Cập nhật dịch vụ trong danh sách
      const updatedService: Service = {
        ...currentService,
        name: updatedValues.name,
        description: updatedValues.description,
        price: updatedValues.price,
        amount: updatedValues.amount,
        unit: updatedValues.unit,
        serviceType: updatedValues.serviceType,
        status: updatedValues.status,
        sport: {
          ...currentService.sport,
          id: updatedValues.sportId,
          name: mockSports.find(sport => sport.id === updatedValues.sportId)?.name || currentService.sport.name
        },
        // Cập nhật thời gian cập nhật cuối
        lastUpdated: new Date()
      };
      
      setServices(prevServices => 
        prevServices.map(service => 
          service.id === currentService.id ? updatedService : service
        )
      );
      
      setSubmitting(false);
      setEditModalVisible(false);
      setUpdatedValues(null);
      
      Modal.success({
        title: 'Cập nhật thành công',
        content: 'Thông tin dịch vụ đã được cập nhật.'
      });
    }, 1000);
  };

  // Find sport name for display in confirmation modal
  const getSportName = (sportId: number) => {
    return mockSports.find(sport => sport.id === sportId)?.name || 'Không xác định';
  };
 
  return (
    <div className="p-6 md:p-8">
      {/* Promotional Banner */}
      <Card className="mb-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex-1">
            <Title level={2} style={{ fontSize: 26 }}>
              Tạo ngay dịch vụ để tăng doanh thu cho cơ sở của bạn!!!
            </Title>
            <Text className="block mb-8 text-gray-600">
              Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo dịch vụ tiện ích cho Khách hàng.
            </Text>
            <Button 
              type="primary" 
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/owner/create-service')}
              style={{ background: '#cc440a', display: 'flex', alignItems: 'center' }}
            >
              Tạo dịch vụ ngay <ArrowRightOutlined />
            </Button>
          </div>
          <div className="max-w-md">
            <img 
              src={serviceImage} 
              alt="Service illustration" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </Card>

      {/* Service List Section */}
      <Card title="Danh sách dịch vụ" className="mb-8">
        {/* Facility selector */}
        <div className="mb-6">
          <Select
            placeholder="Chọn cơ sở của bạn"
            style={{ width: '100%' }}
            value={selectedFacilityId || undefined}
            onChange={handleFacilitySelect}
          >
            {mockFacilitiesDropdown.map((facility) => (
              <Option key={facility.id} value={facility.id}>
                {facility.name}
              </Option>
            ))}
          </Select>
        </div>

        {selectedFacilityId ? (
          <>
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <Radio.Group 
                  options={statusFilterOptions} 
                  onChange={e => setStatusFilter(e.target.value)} 
                  value={statusFilter}
                  optionType="button"
                  className="flex-nowrap"
                />
              </div>
              
              <Input
                placeholder="Tìm kiếm dịch vụ"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: 300, width: '100%' }}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-lg">Đang tải dữ liệu...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
                <p className="text-lg text-gray-600 mb-4">Chưa có dịch vụ nào</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/owner/create-service')}
                >
                  Thêm dịch vụ mới
                </Button>
              </div>
            ) : (
              <ServiceTable 
                services={currentServices}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalServices={totalServices}
                onPageChange={setCurrentPage}
                onViewService={handleViewService}
                onEditService={handleEditService}
                onDeleteService={handleDeleteService}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
            <p className="text-lg text-gray-600 mb-4">Vui lòng chọn cơ sở để xem danh sách dịch vụ</p>
          </div>
        )}
      </Card>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        visible={viewModalVisible}
        service={currentService}
        onClose={() => setViewModalVisible(false)}
        onEdit={(service) => {
          setViewModalVisible(false);
          handleEditService(service);
        }}
      />

      {/* Service Edit Modal */}
      <ServiceEditModal
        visible={editModalVisible}
        service={currentService}
        onClose={() => setEditModalVisible(false)}
        onConfirmUpdate={handleConfirmUpdate}
        submitting={submitting}
      />

      {/* Service Confirmation Modal */}
      {currentService && updatedValues && (
        <ServiceConfirmModal
          service={currentService}
          updatedValues={updatedValues}
          sportName={getSportName(updatedValues.sportId)}
          onOk={handleUpdateService}
          onCancel={() => setUpdatedValues(null)}
        />
      )}
    </div>
  );
};

export default ServiceManagement;