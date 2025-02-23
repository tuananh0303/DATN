import React from 'react';

const Content_TopBar_Footer: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      {/* Top Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        height: '77px', 
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 31px'
      }}>
        <h1 style={{ 
          fontSize: '32px',
          fontWeight: 700,
          fontFamily: 'Roboto',
          letterSpacing: '1px',
          margin: 0
        }}>Quản lý sân</h1>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/notifica.png" alt="notifications" style={{ width: '27px', height: '27px' }} />
            <div style={{
              position: 'absolute',
              top: '-9px',
              right: '-9px',
              width: '16px',
              height: '18px',
              backgroundColor: '#f93c65',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700
            }}>6</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/vietnam.png" alt="flag" style={{ width: '44px', height: '42px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  fontFamily: 'Nunito Sans',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#646464'
                }}>Vietnamese</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/drop-dow.png" alt="dropdown" style={{ width: '8px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/man-4380.png" alt="profile" style={{ width: '44px', height: '48px' }} />
              <div>
                <div style={{ 
                  fontFamily: 'Nunito Sans',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#404040'
                }}>Moni Roy</div>
                <div style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: 600,
                  fontSize: '12px',
                  color: '#565656'
                }}>Admin</div>
              </div>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/more.png" alt="more" style={{ width: '18px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '34px 38px', backgroundColor: '#f5f6fa' }}>
        {/* Promotional Banner */}
        <div style={{ 
          backgroundColor: '#fff',
          padding: '27px 24px',
          borderRadius: '5px',
          marginBottom: '34px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 300px', marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '35px',
              fontWeight: 700,
              fontFamily: 'Roboto',
              letterSpacing: '1px',
              margin: '0 0 23px 0'
            }}>Tạo thêm sân trong cơ sở của bạn nào!!!</h2>
            <p style={{
              fontSize: '16px',
              fontFamily: 'Roboto',
              letterSpacing: '1px',
              margin: '0 0 56px 0'
            }}>Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.</p>
            <button style={{
              backgroundColor: '#cc440a',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              fontSize: '24px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '13px'
            }}>
              Tạo sân ngay!
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/vector.png" alt="arrow" style={{ width: '32px' }} />
            </button>
          </div>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/image.png" alt="field" style={{ width: '599px', height: '259px', flex: '1 1 300px' }} />
        </div>

        {/* Court List Section */}
        <div style={{ backgroundColor: '#fff', padding: '36px', borderRadius: '5px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'Roboto',
            letterSpacing: '1px',
            margin: '0 0 28px 0'
          }}>Danh sách sân</h3>

          {/* Search Dropdown */}
          <div style={{
            border: '1px solid rgba(0,0,0,0.7)',
            borderRadius: '15px',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px'
          }}>
            <span style={{
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 400
            }}>Sân cầu lông Phạm Kha</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/drop-dow-2.png" alt="dropdown" style={{ width: '15px' }} />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '35px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 500,
              color: '#448ff0',
              cursor: 'pointer'
            }}>Tất cả</span>
            <span style={{
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 400,
              cursor: 'pointer'
            }}>Đang hoạt động</span>
            <span style={{
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 400,
              cursor: 'pointer'
            }}>Đang chờ phê duyệt</span>
            <span style={{
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 400,
              cursor: 'pointer'
            }}>Đang bảo trì</span>
          </div>

          {/* Table Header */}
          <div style={{
            backgroundColor: '#448ff033',
            borderRadius: '5px',
            padding: '22px 10px',
            display: 'flex',
            marginBottom: '20px'
          }}>
            <span style={{ flex: '3', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Tên sân</span>
            <span style={{ flex: '2', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Giá</span>
            <span style={{ flex: '3', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Loại hình thể thao</span>
            <span style={{ flex: '3', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Trạng thái</span>
            <span style={{ flex: '1', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Thao tác</span>
          </div>

          {/* Table Rows */}
          {[
            { status: 'Đang hoạt động', statusColor: '#20b202' },
            { status: 'Đang chờ phê duyệt', statusColor: '#b29802' },
            { status: 'Đang bảo trì', statusColor: '#cd1010' }
          ].map((item, index) => (
            <div key={index} style={{
              border: '1px solid rgba(154,154,154,0.5)',
              borderRadius: '5px',
              padding: '20px 15px',
              display: 'flex',
              marginBottom: '10px'
            }}>
              <span style={{ flex: '3', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px' }}>Nguyễn Tuấn Anh</span>
              <span style={{ flex: '2', fontFamily: 'Open Sans', fontSize: '14px' }}>15.000đ/h</span>
              <span style={{ flex: '3', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>Cầu lông</span>
              <span style={{ flex: '3', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px', color: item.statusColor }}>{item.status}</span>
              <div style={{ flex: '1', display: 'flex', gap: '16px' }}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/edit.png" alt="edit" style={{ width: '20px', cursor: 'pointer' }} />
                <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/bin.png" alt="delete" style={{ width: '17px', cursor: 'pointer' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        height: '60px',
        backgroundColor: '#e6e6e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 38px'
      }}>
        <span style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          color: '#191919'
        }}>Copyright @ 2023 Safelet. All rights reserved.</span>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <a href="#" style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            color: '#5858fa',
            textDecoration: 'none'
          }}>Terms of Use</a>
          <div style={{ width: '1px', height: '20px', backgroundColor: '#000' }}></div>
          <a href="#" style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            color: '#5858fa',
            textDecoration: 'none'
          }}>Privacy Policy</a>
        </div>

        <span style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          color: '#191919'
        }}>Hand Crafted & made with Love</span>
      </div>
    </div>
  );
};

export default Content_TopBar_Footer;

