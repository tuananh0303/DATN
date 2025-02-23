import React from 'react';

interface TopBarContentProps {
  style?: React.CSSProperties;
}

const TopBar_Content: React.FC<TopBarContentProps> = ({ style }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minWidth: '320px',
      ...style
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '77px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '32px',
            letterSpacing: '1px',
            color: '#000000'
          }}>
            Quản lý sân
          </span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-2.png" alt="dropdown" style={{ width: '12px', height: '15px' }} />
          <span style={{
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: '32px',
            letterSpacing: '1px',
            color: '#126da6'
          }}>
            Tạo sân mới
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/vietnam.png" alt="vietnam" style={{ width: '44px', height: '42px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{
                fontFamily: 'Nunito Sans',
                fontWeight: 600,
                fontSize: '14px',
                color: '#646464'
              }}>
                Vietnamese
              </span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow.png" alt="dropdown" style={{ width: '8px', height: '5px' }} />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/notifica.png" alt="notification" style={{ width: '27px', height: '27px' }} />
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '16px',
              height: '18px',
              backgroundColor: '#f93c65',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                fontFamily: 'Nunito Sans',
                fontWeight: 700,
                fontSize: '12px',
                color: '#fff'
              }}>
                6
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/man-4380.png" alt="profile" style={{ width: '44px', height: '48px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'Nunito Sans',
                fontWeight: 700,
                fontSize: '14px',
                color: '#404040'
              }}>
                Moni Roy
              </span>
              <span style={{
                fontFamily: 'Nunito Sans',
                fontWeight: 600,
                fontSize: '12px',
                color: '#565656'
              }}>
                Admin
              </span>
            </div>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/more.png" alt="more" style={{ width: '18px', height: '20px' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '20px',
        backgroundColor: '#f5f6fa',
        minHeight: 'calc(100vh - 137px)'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '25px',
          width: '100%',
          maxWidth: '1120px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: '24px',
            letterSpacing: '1px',
            marginBottom: '25px'
          }}>
            Thông tin sân
          </h1>

         {/* Form Fields */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
  {/* Facility Selection */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Chọn cơ sở áp dụng
    </label>
    <div style={{
      position: 'relative',
      flex: 1
    }}>
      <select style={{
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
        appearance: 'none',
        backgroundColor: '#fff'
      }}>
        <option>Sân cầu lông Phạm Kha</option>
      </select>
      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-3.png" 
        alt="dropdown"
        style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  </div>

  {/* Sport Type Selection */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Chọn loại hình thể thao
    </label>
    <div style={{
      position: 'relative',
      flex: 1
    }}>
      <select style={{
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
        appearance: 'none',
        backgroundColor: '#fff'
      }}>
        <option>Cầu lông</option>
      </select>
      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-3.png" 
        alt="dropdown"
        style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  </div>

  {/* Field Name */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Tên sân
    </label>
    <input 
      type="text"
      placeholder="Có thể gợi ý tên sân tương tự như các tên đang có trong cơ sở"
      style={{
        flex: 1,
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px'
      }}
    />
  </div>

  {/* Price */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Mức giá
    </label>
    <div style={{
      position: 'relative',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{
        position: 'relative',
        width: '150px'
      }}>
        <select style={{
          width: '100%',
          padding: '12px 15px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '16px',
          appearance: 'none',
          backgroundColor: '#fff'
        }}>
          <option>Theo số tiền</option>
        </select>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-3.png" 
          alt="dropdown"
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
        />
      </div>
      <input 
        type="text"
        style={{
          flex: 1,
          padding: '12px 15px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '16px'
        }}
      />
      <span style={{ color: '#191919', fontSize: '16px' }}>đ/h</span>
    </div>
  </div>

  {/* Dimensions */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Kích thước
    </label>
    <input 
      type="text"
      placeholder="Có thể gợi ý tên sân tương tự như các tên đang có trong cơ sở"
      style={{
        flex: 1,
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px'
      }}
    />
  </div>

  {/* Surface */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Mặt sân
    </label>
    <input 
      type="text"
      placeholder="Có thể gợi ý tên sân tương tự như các tên đang có trong cơ sở"
      style={{
        flex: 1,
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px'
      }}
    />
  </div>

  {/* Status */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{
      width: '200px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      color: '#191919'
    }}>
      Trạng thái
    </label>
    <div style={{
      position: 'relative',
      flex: 1
    }}>
      <select style={{
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
        appearance: 'none',
        backgroundColor: '#fff'
      }}>
        <option>Đang hoạt động</option>
      </select>
      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-3.png" 
        alt="dropdown"
        style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  </div>
</div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '40px'
          }}>
            <button style={{
              padding: '18px 65px',
              border: '1px solid #448ff0',
              borderRadius: '8px',
              backgroundColor: '#fff',
              color: '#191919',
              fontSize: '20px',
              cursor: 'pointer'
            }}>
              Hủy
            </button>
            <button style={{
              padding: '18px 69px',
              backgroundColor: '#448ff0',
              border: '1px solid #448ff0',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar_Content;

