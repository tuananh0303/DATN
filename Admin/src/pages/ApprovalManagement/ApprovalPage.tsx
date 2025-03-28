import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, Tag, message, Card, Tabs, Modal } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { apiClient } from '@/services/api.service';

const { Option } = Select;
const { TabPane } = Tabs;

interface Approval {
  id: string;
  name: string;
  type: 'facility' | 'owner' | 'event' | 'other';
  requestedBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  details: string;
}

const ApprovalPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, [activeTab]);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      // Trong môi trường thực tế, bạn sẽ gọi API thực sự
      // const response = await apiClient.get(`/admin/approvals?status=${activeTab}`);
      // setApprovals(response.data);
      
      // Mock data for development
      setTimeout(() => {
        const mockApprovals: Approval[] = [
          { 
            id: '1', 
            name: 'Đăng ký cơ sở Sân vận động Thống Nhất', 
            type: 'facility', 
            requestedBy: { id: '101', name: 'Nguyễn Văn A', email: 'nguyenvana@example.com' },
            createdAt: '2023-05-15T10:30:00Z', 
            status: 'pending',
            details: 'Yêu cầu phê duyệt cơ sở mới tại 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM. Cơ sở gồm 5 sân bóng đá với đầy đủ tiện nghi.'
          },
          { 
            id: '2', 
            name: 'Đăng ký vai trò chủ sân - Trần Thị B', 
            type: 'owner', 
            requestedBy: { id: '102', name: 'Trần Thị B', email: 'tranthib@example.com' },
            createdAt: '2023-05-14T09:15:00Z', 
            status: activeTab === 'pending' ? 'pending' : (activeTab === 'approved' ? 'approved' : 'rejected'),
            details: 'Người dùng yêu cầu nâng cấp tài khoản lên chủ sân. Đã xác minh danh tính và giấy tờ liên quan.'
          },
          { 
            id: '3', 
            name: 'Tổ chức giải đấu Tennis mùa hè', 
            type: 'event', 
            requestedBy: { id: '103', name: 'Lê Văn C', email: 'levanc@example.com' },
            createdAt: '2023-05-13T14:45:00Z', 
            status: activeTab === 'pending' ? 'pending' : (activeTab === 'approved' ? 'approved' : 'rejected'),
            details: 'Yêu cầu tổ chức giải đấu Tennis từ ngày 01/07/2023 đến 15/07/2023 tại Sân Tennis Hòa Bình. Dự kiến có 20 đội tham gia.'
          },
          { 
            id: '4', 
            name: 'Đăng ký cơ sở Sân cầu lông Victory', 
            type: 'facility', 
            requestedBy: { id: '104', name: 'Hoàng Văn D', email: 'hoangvand@example.com' },
            createdAt: '2023-05-12T16:20:00Z', 
            status: activeTab === 'pending' ? 'pending' : (activeTab === 'approved' ? 'approved' : 'rejected'),
            details: 'Yêu cầu phê duyệt cơ sở mới tại 456 Lê Lợi, Quận 3, TP.HCM. Cơ sở gồm 8 sân cầu lông với hệ thống ánh sáng và điều hòa hiện đại.'
          },
          { 
            id: '5', 
            name: 'Đăng ký vai trò chủ sân - Phạm Thị E', 
            type: 'owner', 
            requestedBy: { id: '105', name: 'Phạm Thị E', email: 'phamthie@example.com' },
            createdAt: '2023-05-11T11:10:00Z', 
            status: activeTab === 'pending' ? 'pending' : (activeTab === 'approved' ? 'approved' : 'rejected'),
            details: 'Người dùng yêu cầu nâng cấp tài khoản lên chủ sân. Đã cung cấp giấy phép kinh doanh và các giấy tờ liên quan.'
          },
        ];
        
        setApprovals(mockApprovals);
        setLoading(false);
      }, 100);
      
    } catch (error) {
      console.error('Error fetching approvals:', error);
      setLoading(false);
      message.error('Không thể tải danh sách yêu cầu phê duyệt');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      // Trong môi trường thực tế, bạn sẽ gọi API approve
      // await apiClient.post(`/admin/approvals/${id}/approve`);
      
      // Mock approve
      setApprovals(prevApprovals => 
        prevApprovals.map(approval => 
          approval.id === id ? { ...approval, status: 'approved' } : approval
        )
      );
      
      message.success('Đã phê duyệt yêu cầu');
    } catch (error) {
      console.error('Error approving request:', error);
      message.error('Không thể phê duyệt yêu cầu');
    }
  };

  const handleReject = async (id: string) => {
    try {
      // Trong môi trường thực tế, bạn sẽ gọi API reject
      // await apiClient.post(`/admin/approvals/${id}/reject`);
      
      // Mock reject
      setApprovals(prevApprovals => 
        prevApprovals.map(approval => 
          approval.id === id ? { ...approval, status: 'rejected' } : approval
        )
      );
      
      message.success('Đã từ chối yêu cầu');
    } catch (error) {
      console.error('Error rejecting request:', error);
      message.error('Không thể từ chối yêu cầu');
    }
  };

  const handleViewDetails = (approval: Approval) => {
    setSelectedApproval(approval);
    setDetailsModalVisible(true);
  };

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = searchText === '' || 
      approval.name.toLowerCase().includes(searchText.toLowerCase()) || 
      approval.requestedBy.name.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesType = filterType === null || approval.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const columns = [
    {
      title: 'Tên yêu cầu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = '';
        let text = '';
        
        switch (type) {
          case 'facility':
            color = 'blue';
            text = 'Cơ sở';
            break;
          case 'owner':
            color = 'green';
            text = 'Chủ sân';
            break;
          case 'event':
            color = 'purple';
            text = 'Sự kiện';
            break;
          default:
            color = 'default';
            text = 'Khác';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Người yêu cầu',
      key: 'requestedBy',
      render: (_: any, record: Approval) => (
        <div>
          <div>{record.requestedBy.name}</div>
          <div className="text-xs text-gray-500">{record.requestedBy.email}</div>
        </div>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        // Hiển thị ngày đẹp hơn
        const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        return formattedDate;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';
        
        switch (status) {
          case 'pending':
            color = 'orange';
            text = 'Đang chờ';
            break;
          case 'approved':
            color = 'green';
            text = 'Đã duyệt';
            break;
          case 'rejected':
            color = 'red';
            text = 'Từ chối';
            break;
          default:
            color = 'default';
            text = 'Không xác định';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Approval) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            type="link"
          />
          {record.status === 'pending' && (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record.id)}
                type="link"
                style={{ color: 'green' }}
              />
              <Button
                icon={<CloseOutlined />}
                onClick={() => handleReject(record.id)}
                type="link"
                danger
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý phê duyệt</h1>
      </div>
      
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      >
        <TabPane tab="Đang chờ" key="pending" />
        <TabPane tab="Đã duyệt" key="approved" />
        <TabPane tab="Đã từ chối" key="rejected" />
      </Tabs>
      
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm theo tên, người yêu cầu..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          
          <Select
            placeholder="Lọc theo loại yêu cầu"
            allowClear
            style={{ width: 200 }}
            onChange={value => setFilterType(value)}
          >
            <Option value="facility">Cơ sở</Option>
            <Option value="owner">Chủ sân</Option>
            <Option value="event">Sự kiện</Option>
            <Option value="other">Khác</Option>
          </Select>
        </div>
      </Card>
      
      <Table
        columns={columns}
        dataSource={filteredApprovals}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      {/* Modal Chi tiết yêu cầu */}
      <Modal
        title="Chi tiết yêu cầu phê duyệt"
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={
          selectedApproval?.status === 'pending' 
            ? [
                <Button key="reject" danger onClick={() => {
                  if (selectedApproval) handleReject(selectedApproval.id);
                  setDetailsModalVisible(false);
                }}>
                  Từ chối
                </Button>,
                <Button key="approve" type="primary" onClick={() => {
                  if (selectedApproval) handleApprove(selectedApproval.id);
                  setDetailsModalVisible(false);
                }}>
                  Phê duyệt
                </Button>,
              ]
            : [
                <Button key="close" onClick={() => setDetailsModalVisible(false)}>
                  Đóng
                </Button>
              ]
        }
        width={700}
      >
        {selectedApproval && (
          <div>
            <div className="mb-4">
              <strong>Loại yêu cầu:</strong>{' '}
              <Tag color={
                selectedApproval.type === 'facility' ? 'blue' : 
                selectedApproval.type === 'owner' ? 'green' : 
                selectedApproval.type === 'event' ? 'purple' : 'default'
              }>
                {
                  selectedApproval.type === 'facility' ? 'Cơ sở' :
                  selectedApproval.type === 'owner' ? 'Chủ sân' :
                  selectedApproval.type === 'event' ? 'Sự kiện' : 'Khác'
                }
              </Tag>
            </div>
            
            <div className="mb-4">
              <strong>Tên yêu cầu:</strong> {selectedApproval.name}
            </div>
            
            <div className="mb-4">
              <strong>Người yêu cầu:</strong> {selectedApproval.requestedBy.name} ({selectedApproval.requestedBy.email})
            </div>
            
            <div className="mb-4">
              <strong>Ngày tạo:</strong> {new Date(selectedApproval.createdAt).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            
            <div className="mb-4">
              <strong>Trạng thái:</strong>{' '}
              <Tag color={
                selectedApproval.status === 'pending' ? 'orange' : 
                selectedApproval.status === 'approved' ? 'green' : 
                selectedApproval.status === 'rejected' ? 'red' : 'default'
              }>
                {
                  selectedApproval.status === 'pending' ? 'Đang chờ' :
                  selectedApproval.status === 'approved' ? 'Đã duyệt' :
                  selectedApproval.status === 'rejected' ? 'Từ chối' : 'Không xác định'
                }
              </Tag>
            </div>
            
            <div className="mb-4">
              <strong>Chi tiết:</strong>
              <Card className="mt-2 bg-gray-50">
                <p>{selectedApproval.details}</p>
              </Card>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovalPage;