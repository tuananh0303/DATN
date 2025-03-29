import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Select, Card, Tag, Space, Tooltip, Typography, Modal, Dropdown, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined, PlusOutlined, ArrowRightOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { mockFieldGroups } from '@/mocks/field/Groupfield_Field';
import { mockFacilitiesDropdown } from '@/mocks/facility/mockFacilities';
import { FieldGroup, Field } from '@/types/field.type';
import fieldImage from '@/assets/Owner/content/field.png';
import { formatPrice, formatTime, getStatusTag } from '../../../utils/statusUtils.tsx';
import FieldGroupDetail from './FieldGroupDetail.tsx';
import FieldGroupEdit from './FieldGroupEdit.tsx';

const { Title, Text } = Typography;
const { confirm } = Modal;

const FieldGroupManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('1');
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>(mockFieldGroups);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentFieldGroup, setCurrentFieldGroup] = useState<FieldGroup | null>(null);

  // Handle create field button click
  const handleCreateField = () => {
    navigate('/owner/create-field-group');
  };

  // Handle facility change
  const handleFacilityChange = (value: string) => {
    setSelectedFacilityId(value);
    // Trong thực tế, bạn sẽ gọi API để lấy danh sách fieldGroups dựa vào facilityId
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
        // Trong thực tế, bạn sẽ gọi API để kiểm tra và cập nhật
        // Giả lập kiểm tra booking
        if (currentStatus === 'active') {
          // Kiểm tra có booking nào không (thực tế sẽ gọi API)
          // Sử dụng ID của field để xác định xem field có booking không
          // Ở đây ta giả lập rằng field có ID là "1" hoặc "3" đang có booking
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

        // Nếu không có booking hoặc đang mở sân, tiến hành cập nhật
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
        
        // Hiển thị thông báo thành công
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
        // Trong thực tế, bạn sẽ gọi API để kiểm tra và xóa
        // Giả lập kiểm tra booking
        // Ở đây ta giả lập rằng field có ID là "1" hoặc "3" đang có booking
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

        // Nếu không có booking, tiến hành xóa
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
        
        // Hiển thị thông báo thành công
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
    
    // Hiển thị thông báo thành công
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
        // Trong thực tế, bạn sẽ gọi API để xóa
        setFieldGroups(fieldGroups.filter(group => group.id !== id));
      },
    });
  };

  // Render peak time information
  const renderPeakTimes = (fieldGroup: FieldGroup) => {
    const peakTimes = [];
    
    if (fieldGroup.peakStartTime1 && fieldGroup.peakEndTime1) {
      peakTimes.push(
        <div key="peak1">
          {formatTime(fieldGroup.peakStartTime1)} - {formatTime(fieldGroup.peakEndTime1)}: {formatPrice(fieldGroup.priceIncrease1)}
        </div>
      );
    }
    
    if (fieldGroup.peakStartTime2 && fieldGroup.peakEndTime2 && fieldGroup.priceIncrease2) {
      peakTimes.push(
        <div key="peak2">
          {formatTime(fieldGroup.peakStartTime2)} - {formatTime(fieldGroup.peakEndTime2)}: {formatPrice(fieldGroup.priceIncrease2)}
        </div>
      );
    }
    
    if (fieldGroup.peakStartTime3 && fieldGroup.peakEndTime3 && fieldGroup.priceIncrease3) {
      peakTimes.push(
        <div key="peak3">
          {formatTime(fieldGroup.peakStartTime3)} - {formatTime(fieldGroup.peakEndTime3)}: {formatPrice(fieldGroup.priceIncrease3)}
        </div>
      );
    }
    
    if (peakTimes.length === 0) {
      return <span>-</span>;
    }
    
    // Luôn hiển thị dropdown và số lượng giờ cao điểm kể cả chỉ có 1 giờ
    return (
      <Dropdown
        menu={{
          items: peakTimes.map((time, index) => ({
            key: `peak-${index}`,
            label: <div>{time}</div>,
          })),
        }}
        placement="bottomLeft"
        arrow
      >
        <Button type="link" style={{ padding: '0', height: 'auto' }}>
          {peakTimes[0]} <span style={{ color: '#1890ff', fontWeight: 'bold' }}>[{peakTimes.length}]</span>
        </Button>
      </Dropdown>
    );
  };

  // Render sports information
  const renderSports = (fieldGroup: FieldGroup) => {
    const sports = fieldGroup.sports;
    
    if (sports.length === 0) {
      return <span>-</span>;
    }
    
    if (sports.length === 1) {
      return (
        <Tag 
          color="blue" 
          style={{ margin: '2px', borderRadius: '4px', padding: '2px 8px' }}
        >
          {sports[0].name}
        </Tag>
      );
    }
    
    // Nếu có từ 2 loại sân trở lên, hiển thị "Tổng hợp"
    return (
      <Dropdown
        menu={{
          items: sports.map(sport => ({
            key: `sport-${sport.id}`,
            label: (
              <Tag 
                color="blue" 
                style={{ margin: '2px', borderRadius: '4px', padding: '2px 8px' }}
              >
                {sport.name}
              </Tag>
            ),
          })),
        }}
        placement="bottomLeft"
        arrow
      >
        <Button type="link" style={{ padding: '0', height: 'auto' }}>
          <Tag 
            color="purple" 
            style={{ margin: '2px', borderRadius: '4px', padding: '2px 8px' }}
          >
            Tổng hợp <span style={{ color: 'purple', fontWeight: 'bold', marginLeft: '4px' }}>[{sports.length}]</span>
          </Tag>
        </Button>
      </Dropdown>
    );
  };

  // Add new field
  const [addFieldModalVisible, setAddFieldModalVisible] = useState(false);
  const [currentFieldGroupId, setCurrentFieldGroupId] = useState<string>('');
  const [form] = Form.useForm();

  const showAddFieldModal = (fieldGroupId: string) => {
    setCurrentFieldGroupId(fieldGroupId);
    setAddFieldModalVisible(true);
  };

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
        // Tiếp tục xử lý thêm sân
        form.validateFields().then(values => {
          // Tạo sân mới với ID ngẫu nhiên
          const newField: Field = {
            id: `field-${Date.now()}`,
            name: values.fieldName,
            status: 'active'
          };

          // Cập nhật state
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

          // Hiển thị thông báo thành công
          Modal.success({
            title: 'Thêm sân thành công',
            content: `Sân "${values.fieldName}" đã được thêm vào nhóm sân.`
          });
        });
      },
    });
  };

  // Columns for main table
  const columns = [
    {
      title: 'Tên nhóm sân',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Kích thước',
      dataIndex: 'dimension',
      key: 'dimension',
    },
    {
      title: 'Mặt sân',
      dataIndex: 'surface',
      key: 'surface',
    },
    {
      title: 'Giá sân',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (price: number) => formatPrice(price),
    },
    {
      title: 'Giờ cao điểm',
      key: 'peakTimes',
      render: (record: FieldGroup) => renderPeakTimes(record),
    },
    {
      title: 'Loại hình sân',
      key: 'sports',
      render: (record: FieldGroup) => renderSports(record),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: FieldGroup) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined style={{ color: '#1890ff' }} />} 
              onClick={(e) => {
                e.stopPropagation();
                handleViewFieldGroup(record.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined style={{ color: '#52c41a' }} />} 
              onClick={(e) => {
                e.stopPropagation();
                handleEditFieldGroup(record.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />} 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFieldGroup(record.id);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Expanded row render function
  const expandedRowRender = (record: FieldGroup) => {
    const fieldColumns = [
      { 
        title: 'Tên sân', 
        dataIndex: 'name', 
        key: 'name' 
      },
      { 
        title: 'Trạng thái', 
        dataIndex: 'status', 
        key: 'status',
        render: (status: string) => getStatusTag(status),
      },
      {
        title: (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Thao tác</span>
            <Button 
              type="primary" 
              size="small"
              icon={<PlusCircleOutlined />} 
              onClick={(e) => {
                e.stopPropagation();
                showAddFieldModal(record.id);
              }}
            >
              Thêm sân
            </Button>
          </div>
        ),
        key: 'action',
        render: (text: string, field: Field) => (
          <Space>
            <Button 
              type={field.status === 'active' ? 'default' : 'primary'} 
              size="small"
              danger={field.status === 'active'}
              style={{ width: '100px' }}
              onClick={() => toggleFieldStatus(record.id, field.id, field.status)}
            >
              {field.status === 'active' ? 'Đóng sân' : 'Mở sân'}
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              style={{ width: '100px' }}
              onClick={() => handleDeleteField(record.id, field.id)}
            >
              Xóa sân
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <Table 
        columns={fieldColumns} 
        dataSource={record.fields} 
        pagination={false} 
        rowKey="id"
      />
    );
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
            value={selectedFacilityId}
            onChange={handleFacilityChange}
            style={{ width: '100%' }}
            placeholder="Chọn cơ sở của bạn"
          >
            {mockFacilitiesDropdown.map((facility) => (
              <Select.Option key={facility.id} value={facility.id}>
                {facility.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Field Groups Table */}
        <Table
          columns={columns}
          dataSource={fieldGroups}
          rowKey="id"
          expandable={{
            expandedRowRender,
            expandRowByClick: true,
          }}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1100 }}
        />
      </Card>

      {/* Add Field Modal */}
      <Modal
        title="Thêm sân mới"
        open={addFieldModalVisible}
        onCancel={() => setAddFieldModalVisible(false)}
        onOk={handleAddField}
        okText="Tiếp tục"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="fieldName"
            label="Tên sân"
            rules={[
              { required: true, message: 'Vui lòng nhập tên sân' },
              { min: 2, message: 'Tên sân phải có ít nhất 2 ký tự' }
            ]}
          >
            <Input placeholder="Nhập tên sân (VD: Sân số 1)" />
          </Form.Item>
          
          <div style={{ marginTop: '16px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <Text type="secondary">
              Lưu ý: Việc thêm sân mới đồng nghĩa với việc bạn xác nhận sân này có thực và thuộc quyền quản lý của cơ sở. 
              Bạn chịu hoàn toàn trách nhiệm về tính xác thực của thông tin này.
            </Text>
          </div>
        </Form>
      </Modal>

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