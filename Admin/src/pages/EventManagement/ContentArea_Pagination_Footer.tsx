import React from 'react';

interface ContentArea_Pagination_FooterProps {
  style?: React.CSSProperties;
}

const ContentArea_Pagination_Footer: React.FC<ContentArea_Pagination_FooterProps> = ({ style }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%',
      minWidth: '1200px',
      background: '#f5f6fa',
      ...style 
    }}>
      {/* Search and Filter Section */}
      <div style={{ padding: '40px 50px' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          gap: '35px',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            background: '#4880ff',
            opacity: 0.13,
            padding: '9px 35px',
            borderRadius: '4px',
            border: '0.6px solid #d5d5d5'
          }}>
            <span style={{
              color: '#4880ff',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 500
            }}>System</span>
          </div>
          <div style={{
            padding: '9px 35px',
            borderRadius: '4px',
            border: '0.6px solid #d5d5d5',
            background: '#fcfdfd'
          }}>
            <span style={{
              color: '#2b3034',
              opacity: 0.4,
              fontFamily: 'Roboto',
              fontSize: '18px'
            }}>Owner</span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          width: '540px',
          height: '40px',
          background: '#fff',
          borderRadius: '19px',
          border: '0.6px solid #d5d5d5',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px'
        }}>
          <input 
            placeholder="Search by Event Name"
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontFamily: 'Nunito Sans',
              fontSize: '14px'
            }}
          />
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/search.png" alt="search" style={{ width: '20px', height: '22px' }} />
        </div>
      </div>

      {/* Event List */}
      <div style={{
        margin: '0 50px',
        background: '#fdfdfd',
        borderRadius: '15px',
        border: '1px solid #979797'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          padding: '25px 20px',
          background: 'rgba(68, 143, 240, 0.7)',
          borderBottom: '1px solid #979797'
        }}>
          <div style={{ width: '20%', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Event Name</div>
          <div style={{ width: '25%', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Description</div>
          <div style={{ width: '20%', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Image</div>
          <div style={{ width: '20%', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Status | Usage time</div>
          <div style={{ width: '15%', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Action</div>
        </div>

        {/* Event Items */}
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} style={{
            display: 'flex',
            padding: '14px 20px',
            background: '#fff',
            borderBottom: '1px solid #979797'
          }}>
            <div style={{ width: '20%', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>Nguyễn Tuấn Anh</div>
            <div style={{ width: '25%', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>Giải cầu lông được diễn ra,....</div>
            <div style={{ width: '20%', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>=i&url=u-de-sports-ielts-</div>
            <div style={{ width: '20%', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '13px', lineHeight: '20px' }}>
              In Progress<br />
              20:00 05/12/2024 -<br />
              11:00 08/12/2024
            </div>
            <div style={{ width: '15%' }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '0 12px',
                background: '#fafbfd',
                borderRadius: '8px',
                border: '0.6px solid #d5d5d5',
                height: '28px',
                alignItems: 'center'
              }}>
                <img src={`https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/error${item > 1 ? `-${item}` : ''}.png`} alt="error" style={{ width: '16px', height: '16px' }} />
                <img src={`https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/edit${item > 1 ? `-${item}` : ''}.png`} alt="edit" style={{ width: '20px', height: '20px' }} />
                <img src={`https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/bin${item > 1 ? `-${item}` : ''}.png`} alt="delete" style={{ width: '17px', height: '16px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        margin: '40px 0'
      }}>
        <span style={{ 
          fontFamily: 'Nunito',
          fontSize: '16px',
          lineHeight: '19px',
          color: '#c91416'
        }}>144 Total</span>
        <div style={{
          display: 'flex',
          gap: '14px',
          padding: '5px 10px',
          background: '#fff',
          borderRadius: '10px',
          alignItems: 'center'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/componen.png" alt="prev" style={{ width: '30px', height: '30px' }} />
          {[1, 2, 3, '...', 12].map((num, idx) => (
            <div key={num} style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: num === 1 ? '#c91416' : 'transparent',
              borderRadius: '10px',
              color: num === 1 ? '#fff' : '#737373',
              fontFamily: 'Nunito',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              {num}
            </div>
          ))}
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/paginati.png" alt="next" style={{ width: '30px', height: '30px' }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        width: '100%',
        height: '60px',
        background: '#e6e6e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}>
        <span style={{ 
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '16px',
          color: '#191919'
        }}>Copyright @ 2023 Safelet. All rights reserved.</span>
        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '16px',
            color: '#5858fa',
            cursor: 'pointer'
          }}>Terms of Use</span>
          <div style={{ width: '1px', height: '20px', background: '#000' }} />
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '16px',
            color: '#5858fa',
            cursor: 'pointer'
          }}>Privacy Policy</span>
        </div>
        <span style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '16px',
          color: '#191919'
        }}>Hand Crafted & made with Love</span>
      </div>
    </div>
  );
};

export default ContentArea_Pagination_Footer;

