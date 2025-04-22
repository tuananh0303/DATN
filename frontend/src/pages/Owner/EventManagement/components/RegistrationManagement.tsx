import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Descriptions,
  Typography,
  Image,
  message,
  Input,
  Select,
  Spin
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  ExportOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { EventRegistration, RegistrationApprovalStatus, Event } from '@/types/event.type';
import { mockEventRegistrations } from '@/mocks/event/registrationData';
import { formatDate } from '@/utils/dateUtils';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

interface RegistrationManagementProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
}

const RegistrationManagement: React.FC<RegistrationManagementProps> = ({
  visible,
  event,
  onClose,
}) => {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentRegistration, setCurrentRegistration] = useState<EventRegistration | null>(null);

  // Fetch registrations data
  useEffect(() => {
    if (visible && event) {
      setLoading(true);
      
      // Simulate API call - Replace with actual API call
      setTimeout(() => {
        const mockEventRegistrations: EventRegistration[] = Array(10).fill(null).map((_, index) => ({
          id: index + 1,
          eventId: event.id,
          userId: 100 + index,
          userName: `Người dùng ${index + 1}`,
          userEmail: `user${index + 1}@example.com`,
          userPhone: `098765432${index}`,
          status: ['pending', 'confirmed', 'cancelled', 'attended'][Math.floor(Math.random() * 4)] as any,
          registrationDate: dayjs().subtract(Math.floor(Math.random() * 10), 'day').toISOString(),
          paymentStatus: ['unpaid', 'paid', 'refunded'][Math.floor(Math.random() * 3)] as any,
          notes: Math.random() > 0.7 ? `Ghi chú ${index + 1}` : undefined,
        }));
        
        setRegistrations(mockEventRegistrations);
        setLoading(false);
      }, 1000);
    }
  }, [visible, event]);

  // Render status tag
  const renderStatusTag = (status: RegistrationApprovalStatus) => {
    const config = {
      pending: { color: 'warning', text: 'Chờ phê duyệt', icon: <ExclamationCircleOutlined /> },
      approved: { color: 'success', text: 'Đã phê duyệt', icon: <CheckCircleOutlined /> },
      rejected: { color: 'error', text: 'Đã từ chối', icon: <CloseCircleOutlined /> }
    };
    
    const { color, text, icon } = config[status];
    return <Tag color={color} icon={icon}>{text}</Tag>;
  };
  
  // Render payment status tag
  const renderPaymentStatusTag = (status?: string) => {
    if (!status) return <Tag>Không có thông tin</Tag>;
    
    const config = {
      pending: { color: 'warning', text: 'Chờ thanh toán' },
      paid: { color: 'success', text: 'Đã thanh toán' },
      refunded: { color: 'default', text: 'Đã hoàn tiền' }
    };
    
    const { color, text } = config[status as keyof typeof config] || { color: 'default', text: status };
    return <Tag color={color}>{text}</Tag>;
  };
  
  // Handle view registration details
  const handleViewDetails = (registration: EventRegistration) => {
    setCurrentRegistration(registration);
    setDetailModalVisible(true);
  };
  
  // Handle approve registration
  const handleApproveRegistration = (registration: EventRegistration) => {
    confirm({
      title: 'Xác nhận phê duyệt',
      content: `Bạn có chắc chắn muốn phê duyệt đăng ký của ${registration.userName}?`,
      onOk() {
        // Update registration status
        const updatedRegistrations = registrations.map(reg => {
          if (reg.id === registration.id) {
            return {
              ...reg,
              status: 'approved' as RegistrationApprovalStatus,
              approvedBy: 'owner-001', // Giả sử owner ID
              approvedDate: new Date().toISOString()
            };
          }
          return reg;
        });
        
        setRegistrations(updatedRegistrations);
        message.success('Đã phê duyệt đăng ký thành công');
      }
    });
  };
  
  // Handle reject registration
  const handleRejectRegistration = (registration: EventRegistration) => {
    let rejectionReason = '';
    
    Modal.confirm({
      title: 'Từ chối đăng ký',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Bạn có chắc chắn muốn từ chối đăng ký của {registration.userName}?</p>
          <p>Vui lòng nhập lý do từ chối:</p>
          <Input.TextArea 
            rows={3} 
            onChange={e => { rejectionReason = e.target.value; }} 
            placeholder="Lý do từ chối" 
          />
        </div>
      ),
      onOk() {
        // Update registration status
        const updatedRegistrations = registrations.map(reg => {
          if (reg.id === registration.id) {
            return {
              ...reg,
              status: 'rejected' as RegistrationApprovalStatus,
              rejectionReason: rejectionReason || 'Không đáp ứng yêu cầu',
              approvedBy: 'owner-001', // Giả sử owner ID
              approvedDate: new Date().toISOString()
            };
          }
          return reg;
        });
        
        setRegistrations(updatedRegistrations);
        message.success('Đã từ chối đăng ký');
      }
    });
  };
  
  // Handle mark as paid
  const handleMarkAsPaid = (registration: EventRegistration) => {
    confirm({
      title: 'Xác nhận thanh toán',
      content: `Xác nhận ${registration.userName} đã thanh toán phí tham gia?`,
      onOk() {
        // Update payment status
        const updatedRegistrations = registrations.map(reg => {
          if (reg.id === registration.id) {
            return {
              ...reg,
              paymentStatus: 'paid',
              paymentDate: new Date().toISOString()
            };
          }
          return reg;
        });
        
        setRegistrations(updatedRegistrations);
        message.success('Đã cập nhật trạng thái thanh toán');
      }
    });
  };
  
  // Filter registrations based on tab and search text
  const getFilteredRegistrations = () => {
    // First filter by tab (status)
    let filtered = registrations;
    if (activeTab !== 'all') {
      filtered = registrations.filter(reg => reg.status === activeTab);
    }
    
    // Then filter by search text
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.userName.toLowerCase().includes(lowerCaseSearch) ||
        reg.userEmail.toLowerCase().includes(lowerCaseSearch) ||
        reg.userPhone.includes(searchText) ||
        (reg.teamName && reg.teamName.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    return filtered;
  };
  
  // Table columns
  const columns: ColumnsType<EventRegistration> = [
    {
      title: 'Người đăng ký',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-gray-500 text-sm">{record.userEmail}</div>
          <div className="text-gray-500 text-sm">{record.userPhone}</div>
          {record.teamName && (
            <Tag color="blue" className="mt-1">
              <TeamOutlined /> {record.teamName}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      render: (date) => formatDate(date),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status as RegistrationApprovalStatus),
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => renderPaymentStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small" wrap>
          <Button 
            type="primary" 
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
          </Button>
          
          {record.status === 'pending' && (
            <>
              <Button 
                type="primary" 
                size="small"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveRegistration(record)}
                className="bg-green-600 hover:bg-green-700"
              >
                Phê duyệt
              </Button>
              
              <Button 
                danger 
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectRegistration(record)}
              >
                Từ chối
              </Button>
            </>
          )}
          
          {record.status === 'confirmed' && (
            <Button 
              type="text" 
              onClick={() => handleMarkAsPaid(record)}
              title="Đánh dấu đã thanh toán"
            >
              Đã thanh toán
            </Button>
          )}
        </Space>
      ),
    },
  ];
  
  return (
    <Modal
      open={visible}
      title={
        <div>
          <Title level={4}>Quản lý đăng ký</Title>
          {event && <Text>{event.name}</Text>}
        </div>
      }
      onCancel={onClose}
      width={1000}
      footer={[
        <Button 
          key="export" 
          type="primary" 
          icon={<ExportOutlined />} 
          onClick={() => {
            message.success('Đã xuất danh sách đăng ký thành công');
          }}
        >
          Xuất danh sách
        </Button>,
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      {event ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <Space>
              <Input
                placeholder="Tìm kiếm theo tên, email, số điện thoại"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Select
                placeholder="Lọc theo trạng thái"
                style={{ width: 200 }}
                allowClear
                onChange={(value) => setFilteredStatus(value)}
              >
                <Option value="pending">Chờ xác nhận</Option>
                <Option value="confirmed">Đã xác nhận</Option>
                <Option value="cancelled">Đã hủy</Option>
                <Option value="attended">Đã tham dự</Option>
              </Select>
            </Space>
            <div>
              <Text strong>Tổng số: </Text>
              <Text>{getFilteredRegistrations().length} đăng ký</Text>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={getFilteredRegistrations()}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            locale={{ emptyText: 'Không có đăng ký nào' }}
          />
        </>
      ) : (
        <div className="flex justify-center items-center p-10">
          <Spin />
        </div>
      )}
      
      {/* Registration detail modal */}
      <Modal
        title="Chi tiết đăng ký"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          currentRegistration?.status === 'pending' && (
            <Button
              key="approve"
              type="primary"
              onClick={() => {
                handleApproveRegistration(currentRegistration);
                setDetailModalVisible(false);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Phê duyệt
            </Button>
          ),
          currentRegistration?.status === 'pending' && (
            <Button
              key="reject"
              danger
              onClick={() => {
                handleRejectRegistration(currentRegistration);
                setDetailModalVisible(false);
              }}
            >
              Từ chối
            </Button>
          ),
          currentRegistration?.status === 'confirmed' && (
            <Button
              key="markPaid"
              onClick={() => {
                handleMarkAsPaid(currentRegistration);
                setDetailModalVisible(false);
              }}
            >
              Đánh dấu đã thanh toán
            </Button>
          )
        ].filter(Boolean)}
        width={700}
      >
        {currentRegistration && (
          <div>
            <Descriptions bordered column={2} className="mb-4">
              <Descriptions.Item label="Tên người đăng ký" span={2}>
                <Space>
                  <UserOutlined />
                  {currentRegistration.userName}
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  {currentRegistration.userEmail}
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Số điện thoại">
                <Space>
                  <PhoneOutlined />
                  {currentRegistration.userPhone}
                </Space>
              </Descriptions.Item>
              
              {currentRegistration.teamName && (
                <Descriptions.Item label="Tên đội" span={2}>
                  <Space>
                    <TeamOutlined />
                    {currentRegistration.teamName}
                  </Space>
                </Descriptions.Item>
              )}
              
              <Descriptions.Item label="Thời gian đăng ký">
                {formatDate(currentRegistration.registrationDate)}
              </Descriptions.Item>
              
              <Descriptions.Item label="Trạng thái">
                {renderStatusTag(currentRegistration.status as RegistrationApprovalStatus)}
              </Descriptions.Item>
              
              {currentRegistration.paymentStatus && (
                <Descriptions.Item label="Trạng thái thanh toán">
                  {renderPaymentStatusTag(currentRegistration.paymentStatus)}
                </Descriptions.Item>
              )}
              
              {currentRegistration.paymentMethod && (
                <Descriptions.Item label="Phương thức thanh toán">
                  {currentRegistration.paymentMethod}
                </Descriptions.Item>
              )}
              
              {currentRegistration.notes && (
                <Descriptions.Item label="Ghi chú" span={2}>
                  {currentRegistration.notes}
                </Descriptions.Item>
              )}
              
              {currentRegistration.status === 'approved' && (
                <Descriptions.Item label="Phê duyệt bởi">
                  {currentRegistration.approvedBy || 'Không có thông tin'}
                </Descriptions.Item>
              )}
              
              {currentRegistration.approvedDate && (
                <Descriptions.Item label="Thời gian phê duyệt">
                  {formatDate(currentRegistration.approvedDate)}
                </Descriptions.Item>
              )}
              
              {currentRegistration.status === 'rejected' && currentRegistration.rejectionReason && (
                <Descriptions.Item label="Lý do từ chối" span={2}>
                  <Text type="danger">{currentRegistration.rejectionReason}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
            
            {/* Payment proof image */}
            {currentRegistration.paymentProof && (
              <div className="mb-4">
                <Title level={5}>Bằng chứng thanh toán:</Title>
                <Image 
                  src={currentRegistration.paymentProof} 
                  alt="Payment proof" 
                  style={{ maxWidth: '100%', maxHeight: '300px' }} 
                />
              </div>
            )}
            
            {/* Team members if any */}
            {currentRegistration.teamMembers && currentRegistration.teamMembers.length > 0 && (
              <div>
                <Title level={5}>Danh sách thành viên đội:</Title>
                <Table
                  dataSource={currentRegistration.teamMembers}
                  columns={[
                    {
                      title: 'Tên',
                      dataIndex: 'name',
                      key: 'name'
                    },
                    {
                      title: 'Email',
                      dataIndex: 'email',
                      key: 'email'
                    },
                    {
                      title: 'Số điện thoại',
                      dataIndex: 'phone',
                      key: 'phone'
                    }
                  ]}
                  rowKey="name"
                  pagination={false}
                  size="small"
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </Modal>
  );
};

export default RegistrationManagement; 