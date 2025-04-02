import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tag, 
  Button, 
  Tooltip, 
  Modal, 
  message, 
  Empty, 
  Input, 
  Card, 
  Row, 
  Col, 
  Pagination,
  Spin,
  Tabs
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  EnvironmentOutlined,
  StarOutlined
} from '@ant-design/icons';
import { Facility } from '@/types/facility.type';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { facilityService } from '@/services/facility.service';
import FacilityDetail from './components/FacilityDetail';
import FacilityEdit from './components/FacilityEdit';
import OperatingHoursDisplay from '@/components/shared/OperatingHoursDisplay';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchOwnerFacilities } from '@/store/slices/facilitySlice';

const FacilityManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  // Local state
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [totalItems, setTotalItems] = useState<number>(0);
  
  // Modal states
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  
  // Fetch facilities on component mount
  useEffect(() => {
    fetchFacilities(currentPage, pageSize, activeFilter, searchQuery);
  }, [currentPage, pageSize, activeFilter, searchQuery]);
  
  const fetchFacilities = async (page: number, pageSize: number, status: string = 'all', query: string = '') => {
    try {
      setLoading(true);
      // Get the userId from localStorage to fetch facilities for this owner
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        message.error('Không thể xác định người dùng hiện tại, vui lòng đăng nhập lại');
        return;
      }
      
      // Use the service which now uses the real API with fallback to mock data
      const response = await facilityService.getMyFacilities(page, pageSize, status, query);
      
      // Also dispatch the Redux action (this is optional, based on if other components need this data)
      dispatch(fetchOwnerFacilities(userId));
      
      // Update local state with the data
      setFacilities(response.data || response);
      setFilteredFacilities(response.data || response);
      setTotalItems(response.total || response.data.length);
    } catch (error) {
      console.error('Failed to fetch facilities:', error);
      message.error('Không thể tải danh sách cơ sở');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const filterButtons = [
    { id: 'all', label: 'Tất cả cơ sở' },
    { id: 'active', label: 'Đang hoạt động' },
    { id: 'unactive', label: 'Đang đóng cửa' },
    { id: 'pending', label: 'Đang chờ phê duyệt' },
    { id: 'rejected', label: 'Đã bị từ chối' }
  ];
  
  // Generate tab items for Tabs component
  const tabItems = filterButtons.map(button => ({
    key: button.id,
    label: button.label
  }));
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi filter
  }; 
  
  const handleCreateFacility = () => {
    navigate('/owner/create-facility');
  };
  
  const handleViewDetail = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    setDetailModalVisible(true);
  };
  
  const handleEditFacility = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    setEditModalVisible(true);
  };
  
  const showDeleteConfirm = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    setDeleteModalVisible(true);
  };
  
  const handleDeleteFacility = async () => {
    if (!selectedFacilityId) return;
    
    try {
      setDeleteLoading(true);
      await facilityService.deleteFacility(selectedFacilityId);
      message.success('Cơ sở đã được xóa thành công');
      fetchFacilities(currentPage, pageSize, activeFilter, searchQuery);
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Failed to delete facility:', error);
      message.error('Không thể xóa cơ sở');
    } finally {
      setDeleteLoading(false);
      setSelectedFacilityId(null);
    }
  };
  
  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedFacilityId(null);
  };
  
  const closeEditModal = (updated: boolean = false) => {
    setEditModalVisible(false);
    setSelectedFacilityId(null);
    if (updated) {
      fetchFacilities(currentPage, pageSize, activeFilter, searchQuery);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'success';
      case 'unactive': return 'default';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Đang hoạt động';
      case 'unactive': return 'Đang đóng cửa';
      case 'pending': return 'Đang chờ phê duyệt';
      case 'rejected': return 'Đã bị từ chối';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title */}
        <div className="mb-8">          
          <h1 className="text-2xl font-bold text-gray-800">Quản lý tất cả các cơ sở của bạn</h1>
          <p className="text-gray-500 mt-2">Quản lý, theo dõi và cập nhật thông tin các cơ sở thể thao của bạn</p>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 mb-8 gap-4">
          <Input
            placeholder="Tìm kiếm cơ sở theo tên, địa chỉ..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            className="max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            size="large"
          />
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreateFacility}
            size="large"
            className="bg-blue-500"
          >
            Thêm cơ sở mới
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="mb-8">
          <Tabs 
            activeKey={activeFilter} 
            onChange={handleFilterClick}
            type="card"
            className="facility-filter-tabs"
            items={tabItems}
          />
        </div>
        
        {/* Facility Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64 flex-col">
            <Spin size="large" />
            <div className="mt-3">Đang tải dữ liệu...</div>
          </div>
        ) : filteredFacilities.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {filteredFacilities.map((facility) => (
                <Col key={facility.id} xs={24} sm={12} lg={8}>
                  <Card 
                    hoverable
                    className="h-full shadow-sm hover:shadow-md transition-shadow"
                    cover={
                      <div className="h-48 overflow-hidden relative">
                        {facility.imagesUrl && facility.imagesUrl.length > 0 ? (
                          <img 
                            src={facility.imagesUrl[0]} 
                            alt={facility.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          <Tag color={getStatusColor(facility.status)}>
                            {getStatusText(facility.status)}
                          </Tag>
                        </div>
                      </div>
                    }
                    actions={[
                      <Tooltip title="Xem chi tiết">
                        <Button 
                          type="text" 
                          icon={<EyeOutlined style={{ color: '#1890ff' }} />} 
                          onClick={() => handleViewDetail(facility.id)}
                        />
                      </Tooltip>,
                      <Tooltip title="Chỉnh sửa">
                        <Button 
                          type="text" 
                          icon={<EditOutlined style={{ color: '#52c41a' }} />} 
                          onClick={() => handleEditFacility(facility.id)}
                        />
                      </Tooltip>,
                      <Tooltip title="Xóa">
                        <Button 
                          type="text" 
                          danger 
                          icon={<DeleteOutlined />} 
                          onClick={() => showDeleteConfirm(facility.id)}
                        />
                      </Tooltip>
                    ]}
                  >
                    <div className="p-2">
                      {/* Tên cơ sở */}
                      <h3 className="text-lg font-semibold line-clamp-2 mb-2">{facility.name}</h3>
                      
                      {/* Giờ hoạt động */}
                      <div className="flex items-center text-gray-500 mb-2">
                        <OperatingHoursDisplay facility={facility} />
                        
                        {/* Rating */}
                        <div className="ml-auto flex items-center">
                          <StarOutlined className="text-yellow-500 mr-1" />
                          <span className="font-medium">{facility.avgRating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      {/* Môn thể thao */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {facility.sports && facility.sports.map((sport) => (
                            <Tag key={sport.id} color="blue">{getSportNameInVietnamese(sport.name)}</Tag>
                          ))}
                        </div>
                      </div>
                      
                      {/* Địa chỉ */}
                      <div className="flex items-start mb-3 text-gray-600">
                        <EnvironmentOutlined className="mr-2 mt-1 flex-shrink-0" />
                        <p className="line-clamp-2 text-sm">{facility.location}</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination 
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={['9', '18', '36', '72']}
                showTotal={(total) => `Tổng cộng ${total} cơ sở`}
              />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12">
            <Empty 
              description={
                <span className="text-gray-500">
                  {searchQuery 
                    ? "Không tìm thấy cơ sở phù hợp với tìm kiếm của bạn" 
                    : activeFilter !== 'all'
                      ? `Không có cơ sở nào trong trạng thái "${getStatusText(activeFilter)}"`
                      : "Bạn chưa có cơ sở nào. Hãy bắt đầu bằng việc thêm cơ sở mới!"
                  }
                </span>
              }
            >
              {!searchQuery && activeFilter === 'all' && facilities.length === 0 && (
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleCreateFacility}
                  className="mt-4"
                >
                  Thêm cơ sở mới
                </Button>
              )}
            </Empty>
          </div>
        )}
        
        {/* Detail Modal */}
        <Modal
          title={null}
          open={detailModalVisible}
          onCancel={closeDetailModal}
          footer={null}
          width={900}
          style={{ top: 20 }}
          styles={{ body: { padding: 0 } }}
          destroyOnClose
        >
          {selectedFacilityId && (
            <FacilityDetail 
              facilityId={selectedFacilityId} 
              onClose={closeDetailModal}
              onEdit={() => {
                closeDetailModal();
                handleEditFacility(selectedFacilityId);
              }}
            />
          )}
        </Modal>
        
        {/* Edit Modal */}
        <Modal
          title={null}
          open={editModalVisible}
          onCancel={() => closeEditModal()}
          footer={null}
          width={800}
          style={{ top: 20 }}
          styles={{ body: { padding: 0 } }}
          destroyOnClose
        >
          {selectedFacilityId && (
            <FacilityEdit 
              facilityId={selectedFacilityId} 
              onClose={(updated) => closeEditModal(updated)}
            />
          )}
        </Modal>
        
        {/* Delete Confirmation Modal */}
        <Modal
          title="Xác nhận xóa cơ sở"
          open={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
              Hủy bỏ
            </Button>,
            <Button 
              key="delete" 
              type="primary" 
              danger 
              loading={deleteLoading}
              onClick={handleDeleteFacility}
            >
              Xóa
            </Button>,
          ]}
        >
          <p>Bạn có chắc chắn muốn xóa cơ sở này không? Hành động này không thể hoàn tác và sẽ xóa tất cả dữ liệu liên quan đến cơ sở.</p>
        </Modal>
      </div>
    </div>
  );
};

export default FacilityManagement;