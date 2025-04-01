import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, Card, Typography, Modal, Form } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { mockFieldGroups } from '@/mocks/field/Groupfield_Field';
import { mockFacilitiesDropdown } from '@/mocks/facility/mockFacilities';
import { FieldGroup, Field } from '@/types/field.type';
import fieldImage from '@/assets/Owner/content/field.png';

// Component imports
import FieldGroupTable from './components/FieldGroupTable';
import AddFieldModal from './components/AddFieldModal';
import FieldGroupDetail from './components/FieldGroupDetail';
import FieldGroupEdit from './components/FieldGroupEdit';

const { Title, Text } = Typography;
const { confirm } = Modal;

// Key cho localStorage
const SELECTED_FACILITY_KEY = 'owner_selected_facility_id';

const FieldGroupManagement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addFieldModalVisible, setAddFieldModalVisible] = useState(false);
  const [currentFieldGroup, setCurrentFieldGroup] = useState<FieldGroup | null>(null);
  const [currentFieldGroupId, setCurrentFieldGroupId] = useState<string>('');

  // Lấy facilityId từ localStorage hoặc sử dụng cơ sở đầu tiên
  useEffect(() => {
    const savedFacilityId = localStorage.getItem(SELECTED_FACILITY_KEY);
    const initialFacilityId = savedFacilityId || (mockFacilitiesDropdown.length > 0 ? mockFacilitiesDropdown[0].id : '');
    
    if (initialFacilityId) {
      setSelectedFacilityId(initialFacilityId);
      fetchFieldGroups();
    }
  }, []);

  // Fetch field groups based on facility ID
  const fetchFieldGroups = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        
        // In real implementation, this would be an API call filtered by facilityId
        setFieldGroups(mockFieldGroups);
        setLoading(false);
      } catch (error) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
        console.error('Error fetching field groups:', error);
      }
    }, 500);
  };

  // Handle facility change
  const handleFacilityChange = (value: string) => {
    setSelectedFacilityId(value);
    localStorage.setItem(SELECTED_FACILITY_KEY, value);
    fetchFieldGroups();
  };

  // Navigate to create field group page
  const handleCreateField = () => {
    navigate('/owner/create-field-group');
  };

  // Toggle field status
  const toggleFieldStatus = (fieldGroupId: string, fieldId: string, currentStatus: 'active' | 'closed') => {
    const newStatus = currentStatus === 'active' ? 'closed' : 'active';
    const actionText = currentStatus === 'active' ? 'đóng' : 'mở';

    confirm({
      title: `Bạn có chắc chắn muốn ${actionText} sân này?`,
      icon: <ExclamationCircleOutlined />,
      content: currentStatus === 'active' 
        ? 'Hệ thống sẽ kiểm tra xem có lịch đặt sân nào tại sân này không. Nếu có, bạn sẽ không thể đóng sân.' 
        : 'Khi mở lại sân, khách hàng sẽ có thể đặt sân này.',
      okText: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} sân`,
      okType: currentStatus === 'active' ? 'danger' : 'primary',
      cancelText: 'Hủy',
      onOk() {
        // Check for existing bookings (mock implementation)
        if (currentStatus === 'active') {
          const hasBooking = ["1", "3"].includes(fieldId);

          if (hasBooking) {
            Modal.error({
              title: 'Không thể đóng sân',
              content: (
                <div>
                  <p>Sân này đang có lịch đặt. Bạn không thể đóng sân khi có lịch đặt.</p>
                  <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <p><strong>Chi tiết lịch đặt:</strong></p>
                    <p>- Đơn #{fieldId}001: Ngày 25/10/2023, 15:00 - 17:00</p>
                    <p>- Đơn #{fieldId}002: Ngày 26/10/2023, 09:00 - 11:00</p>
                  </div>
                  <p style={{ marginTop: '10px' }}>Vui lòng liên hệ với khách hàng để hủy lịch đặt trước khi đóng sân.</p>
                </div>
              )
            });
            return;
          }
        }

        // Update field status if no booking conflicts
        const updatedFieldGroups = fieldGroups.map(group => {
          if (group.id === fieldGroupId) {
            const updatedFields = group.fields.map(field => {
              if (field.id === fieldId) {
                return {
                  ...field,
                  status: newStatus as 'active' | 'closed'
                };
              }
              return field;
            });
            return { ...group, fields: updatedFields };
          }
          return group;
        });
        setFieldGroups(updatedFieldGroups);
        
        // Show success message
        Modal.success({
          title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} sân thành công`,
          content: currentStatus === 'active' 
            ? 'Sân đã được đóng thành công. Khách hàng sẽ không thể đặt sân này nữa.' 
            : 'Sân đã được mở lại thành công. Khách hàng có thể đặt sân này từ bây giờ.'
        });
      },
    });
  };

  // Handle delete field
  const handleDeleteField = (fieldGroupId: string, fieldId: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa sân này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hệ thống sẽ kiểm tra xem có lịch đặt sân nào tại sân này không. Nếu có, bạn sẽ không thể xóa sân.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // Check for existing bookings (mock implementation)
        const hasBooking = ["1", "3"].includes(fieldId);

        if (hasBooking) {
          Modal.error({
            title: 'Không thể xóa sân',
            content: (
              <div>
                <p>Sân này đang có lịch đặt. Bạn không thể xóa sân khi có lịch đặt.</p>
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  <p><strong>Chi tiết lịch đặt:</strong></p>
                  <p>- Đơn #{fieldId}001: Ngày 25/10/2023, 15:00 - 17:00</p>
                  <p>- Đơn #{fieldId}002: Ngày 26/10/2023, 09:00 - 11:00</p>
                </div>
                <p style={{ marginTop: '10px' }}>Vui lòng liên hệ với khách hàng để hủy lịch đặt trước khi xóa sân.</p>
              </div>
            )
          });
          return;
        }

        // Delete field if no booking conflicts
        const updatedFieldGroups = fieldGroups.map(group => {
          if (group.id === fieldGroupId) {
            return {
              ...group,
              fields: group.fields.filter(field => field.id !== fieldId)
            };
          }
          return group;
        });
        setFieldGroups(updatedFieldGroups);
        
        // Show success message
        Modal.success({
          title: 'Xóa sân thành công',
          content: 'Sân đã được xóa khỏi hệ thống.'
        });
      },
    });
  };

  // Handle view field group details
  const handleViewFieldGroup = (id: string) => {
    const fieldGroup = fieldGroups.find(group => group.id === id);
    if (fieldGroup) {
      setCurrentFieldGroup(fieldGroup);
      setDetailModalVisible(true);
    }
  };

  // Handle edit field group
  const handleEditFieldGroup = (id: string) => {
    const fieldGroup = fieldGroups.find(group => group.id === id);
    if (fieldGroup) {
      setCurrentFieldGroup(fieldGroup);
      setEditModalVisible(true);
    }
  };

  // Handle save edited field group
  const handleSaveFieldGroup = (updatedFieldGroup: FieldGroup) => {
    const updatedFieldGroups = fieldGroups.map(group => 
      group.id === updatedFieldGroup.id ? updatedFieldGroup : group
    );
    setFieldGroups(updatedFieldGroups);
    
    // Show success message
    Modal.success({
      title: 'Cập nhật thành công',
      content: 'Thông tin nhóm sân đã được cập nhật thành công.'
    });
  };

  // Handle delete field group
  const handleDeleteFieldGroup = (id: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa nhóm sân này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setFieldGroups(fieldGroups.filter(group => group.id !== id));
      },
    });
  };

  // // Render peak time information
  // const renderPeakTimes = (fieldGroup: FieldGroup) => {
  //   const peakTimes = [];
    
  //   if (fieldGroup.peakStartTime1 && fieldGroup.peakEndTime1) {
  //     peakTimes.push(
  //       <div key="peak1">
  //         {formatTime(fieldGroup.peakStartTime1)} - {formatTime(fieldGroup.peakEndTime1)}: {formatPrice(fieldGroup.priceIncrease1)}
  //       </div>
  //     );
  //   }
    
  //   if (fieldGroup.peakStartTime2 && fieldGroup.peakEndTime2 && fieldGroup.priceIncrease2) {
  //     peakTimes.push(
  //       <div key="peak2">
  //         {formatTime(fieldGroup.peakStartTime2)} - {formatTime(fieldGroup.peakEndTime2)}: {formatPrice(fieldGroup.priceIncrease2)}
  //       </div>
  //     );
  //   }
    
  //   if (fieldGroup.peakStartTime3 && fieldGroup.peakEndTime3 && fieldGroup.priceIncrease3) {
  //     peakTimes.push(
  //       <div key="peak3">
  //         {formatTime(fieldGroup.peakStartTime3)} - {formatTime(fieldGroup.peakEndTime3)}: {formatPrice(fieldGroup.priceIncrease3)}
  //       </div>
  //     );
  //   }
    
  //   if (peakTimes.length === 0) {
  //     return <span>-</span>;
  //   }
    
  //   // Luôn hiển thị dropdown và số lượng giờ cao điểm kể cả chỉ có 1 giờ
  //   return (
  //     <Dropdown
  //       menu={{
  //         items: peakTimes.map((time, index) => ({
  //           key: `peak-${index}`,
  //           label: <div>{time}</div>,
  //         })),
  //       }}
  //       placement="bottomLeft"
  //       arrow
  //     >
  //       <Button type="link" style={{ padding: '0', height: 'auto' }}>
  //         {peakTimes[0]} <span style={{ color: '#1890ff', fontWeight: 'bold' }}>[{peakTimes.length}]</span>
  //       </Button>
  //     </Dropdown>
  //   );
  // };

  // // Render sports information
  // const renderSports = (fieldGroup: FieldGroup) => {
  //   const sports = fieldGroup.sports;
    
  //   if (sports.length === 0) {
  //     return <span>-</span>;
  //   }
    
  //   if (sports.length === 1) {
  //     return (
  //       <Tag 
  //         color="blue" 
  //         style={{ margin: '2px', borderRadius: '4px', padding: '2px 8px' }}
  //       >
  //         {sports[0].name}
  //       </Tag>
  //     );
  //   }
    
  //   // Nếu có từ 2 loại sân trở lên, hiển thị "Tổng hợp"
  //   return (
  //     <Dropdown
  //       menu={{
  //         items: sports.map(sport => ({
  //           key: `sport-${sport.id}`,
  //           label: (
  //             <Tag 
  //               color="blue" 
  //               style={{ margin: '2px', borderRadius: '4px', padding: '2px 8px' }}
  //             >
  //               {sport.name}
  //             </Tag>
  //           ),
  //         })),
  //       }}
  //       placement="bottomLeft"
  //       arrow
  //     >
  //       <Button type="link" style={{ padding: '0', height: 'auto' }}>
  //         <Tag 
  //           color="purple" 
  //           style={{ margin: '2px', borderRadius: '4px', padding: '2px 8px' }}
  //         >
  //           Tổng hợp <span style={{ color: 'purple', fontWeight: 'bold', marginLeft: '4px' }}>[{sports.length}]</span>
  //         </Tag>
  //       </Button>
  //     </Dropdown>
  //   );
  // };

  // Show modal to add a new field
  const showAddFieldModal = (fieldGroupId: string) => {
    setCurrentFieldGroupId(fieldGroupId);
    setAddFieldModalVisible(true);
    form.resetFields();
  };

  // Handle add field confirmation
  const handleAddField = () => {
    confirm({
      title: 'Xác nhận thêm sân mới',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Bạn xác nhận muốn thêm sân mới vào nhóm sân này?</p>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Lưu ý:</p>
          <p>Việc thêm sân mới đồng nghĩa với việc bạn xác nhận sân này có thực và thuộc quyền quản lý của cơ sở. Bạn chịu hoàn toàn trách nhiệm về tính xác thực của thông tin này.</p>
        </div>
      ),
      okText: 'Xác nhận thêm',
      okType: 'primary',
      cancelText: 'Hủy',
      onOk() {
        form.validateFields().then(values => {
          // Create new field with random ID
          const newField: Field = {
            id: `field-${Date.now()}`,
            name: values.fieldName,
            status: 'active'
          };

          // Update state with new field
          const updatedFieldGroups = fieldGroups.map(group => {
            if (group.id === currentFieldGroupId) {
              return {
                ...group,
                fields: [...group.fields, newField]
              };
            }
            return group;
          });

          setFieldGroups(updatedFieldGroups);
          setAddFieldModalVisible(false);
          form.resetFields();

          // Show success message
          Modal.success({
            title: 'Thêm sân thành công',
            content: `Sân "${values.fieldName}" đã được thêm vào nhóm sân.`
          });
        });
      },
    });
  };

  return (
    <div className="p-6 md:p-8">
      {/* Promotional Banner */}
      <Card className="mb-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex-1">
            <Title level={2} style={{ fontSize: 26 }}>
              Tạo thêm nhóm sân trong cơ sở của bạn nào!!!
            </Title>
            <Text className="block mb-8 text-gray-600">
              Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.
            </Text>
            <Button 
              type="primary" 
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateField}
              style={{ background: '#cc440a', display: 'flex', alignItems: 'center' }}
            >
              Tạo nhóm sân ngay <ArrowRightOutlined />
            </Button>
          </div>
          <div className="max-w-md">
            <img 
              src={fieldImage} 
              alt="Field illustration" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </Card>

      {/* Field Group List Section */}
      <Card title="Danh sách nhóm sân" className="mb-8">
        {/* Facility Dropdown */}
        <div className="mb-6">
          <Select
            placeholder="Chọn cơ sở của bạn"
            style={{ width: '100%' }}
            value={selectedFacilityId || undefined}
            onChange={handleFacilityChange}
            popupMatchSelectWidth={false}
          >
            {mockFacilitiesDropdown.map((facility) => (
              <Select.Option key={facility.id} value={facility.id}>
                {facility.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Field Groups Table */}
        {selectedFacilityId ? (
          loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          ) : fieldGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
              <p className="text-lg text-gray-600 mb-4">Chưa có nhóm sân nào</p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateField}
              >
                Tạo nhóm sân mới
              </Button>
            </div>
          ) : (
            <FieldGroupTable 
              fieldGroups={fieldGroups}
              onViewFieldGroup={handleViewFieldGroup}
              onEditFieldGroup={handleEditFieldGroup}
              onDeleteFieldGroup={handleDeleteFieldGroup}
              onAddField={showAddFieldModal}
              onToggleFieldStatus={toggleFieldStatus}
              onDeleteField={handleDeleteField}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
            <p className="text-lg text-gray-600 mb-4">Vui lòng chọn cơ sở để xem danh sách nhóm sân</p>
          </div>
        )}
      </Card>

      {/* Add Field Modal */}
      <AddFieldModal
        visible={addFieldModalVisible}
        onClose={() => setAddFieldModalVisible(false)}
        onAddField={handleAddField}
        form={form}
      />

      {/* FieldGroup Detail Modal */}
      <FieldGroupDetail 
        open={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        fieldGroup={currentFieldGroup}
      />

      {/* FieldGroup Edit Modal */}
      <FieldGroupEdit
        open={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveFieldGroup}
        fieldGroup={currentFieldGroup}
      />
    </div>
  );
};

export default FieldGroupManagement;