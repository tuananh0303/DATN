import React from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Card, Avatar, Typography, Divider, Row, Col, Spin, Alert } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserProfile: React.FC = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Error Loading Profile"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Not Logged In"
          description="Please log in to view your profile"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Title level={2}>Account Information</Title>
      
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar 
            size={100} 
            icon={<UserOutlined />} 
            src={user.avatarUrl} 
            style={{ marginRight: '20px' }}
          />
          <div>
            <Title level={3} style={{ margin: 0 }}>{user.name}</Title>
            <Text type="secondary">{user.role === 'owner' ? 'Venue Owner' : 'Player'}</Text>
          </div>
        </div>
        
        <Divider />
        
        <Title level={4}>Personal Information</Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <UserOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">Full Name</Text>
                <div>{user.name}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <UserOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">Gender</Text>
                <div>{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">Date of Birth</Text>
                <div>{user.dob ? new Date(user.dob).toLocaleDateString() : 'Not specified'}</div>
              </div>
            </div>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4}>Contact Information</Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <MailOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">Email</Text>
                <div>{user.email}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <PhoneOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">Phone Number</Text>
                <div>{user.phoneNumber || 'Not specified'}</div>
              </div>
            </div>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4}>Account Details</Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <BankOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">Bank Account</Text>
                <div>{user.bankAccount || 'Not specified'}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <UserOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
              <div>
                <Text type="secondary">User ID</Text>
                <div>{user.id}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;