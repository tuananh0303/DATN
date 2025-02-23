import React from 'react';

interface RegardingSectionProps {
  style?: React.CSSProperties;
}

const RegardingSection: React.FC<RegardingSectionProps> = ({ style }) => {
  const data = [
    {
      id: '0001',
      name: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      typeSport: 'Tennis',
      price: '200.000đ/h',
      status: 'Available',
    },
    {
      id: '0002',
      name: 'Dương Văn Nghĩa',
      createdAt: '14/07/2024',
      typeSport: 'Football',
      price: '200.000đ/h',
      status: 'Available',
    },
    {
      id: '0003',
      name: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      typeSport: 'Badminton',
      price: '200.000đ/h',
      status: 'Suspended',
    },
    {
      id: '0004',
      name: 'Dương Văn Nghĩa',
      createdAt: '14/07/2024',
      typeSport: 'Tennis, Badminton',
      price: '200.000đ/h',
      status: 'Suspended',
    },
    {
      id: '0005',
      name: 'Dương Văn Nghĩa',
      createdAt: '14/07/2024',
      typeSport: 'Football',
      price: '200.000đ/h',
      status: 'Available',
    },
  ];

  const tabs = ['Field', 'Service', 'Voucher', 'Review', 'Event'];
  const [activeTab, setActiveTab] = React.useState('Field');

  return (
    <div style={{ 
      width: '100%',
      minWidth: '945px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      ...style
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 600,
        fontFamily: 'Roboto',
        textAlign: 'center',
        margin: '0'
      }}>
        REGARDING
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        justifyContent: 'flex-start'
      }}>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '4px',
              border: '0.6px solid #d5d5d5',
              backgroundColor: activeTab === tab ? '#4880ff21' : '#fcfdfd',
              cursor: 'pointer',
              minWidth: '100px',
              textAlign: 'center'
            }}
          >
            <span style={{
              color: activeTab === tab ? '#4880ff' : '#2b3034a6',
              fontSize: '12px',
              fontFamily: 'Roboto',
              fontWeight: 400
            }}>
              {tab}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#fdfdfd',
        borderRadius: '15px',
        width: '100%',
        overflowX: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '25px 20px',
          backgroundColor: '#448ff0b2',
          borderBottom: '1px solid #979797'
        }}>
          <div style={{ width: '75px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Field ID</div>
          <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Field Name</div>
          <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Created_At</div>
          <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Type Sport</div>
          <div style={{ width: '100px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Price</div>
          <div style={{ width: '68px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Status</div>
          <div style={{ width: '50px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Action</div>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '14px 20px',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #979797'
            }}
          >
            <div style={{ width: '75px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.id}</div>
            <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.name}</div>
            <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.createdAt}</div>
            <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.typeSport}</div>
            <div style={{ width: '100px', fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px' }}>{item.price}</div>
            <div style={{
              width: '85px',
              padding: '0 10px',
              backgroundColor: item.status === 'Available' ? '#6ef153cc' : '#eae559cc',
              borderRadius: '10px',
              textAlign: 'center',
              fontFamily: 'Open Sans',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              {item.status}
            </div>
            <div style={{
              width: '48px',
              height: '32px',
              backgroundColor: '#fafbfd',
              borderRadius: '8px',
              border: '0.6px solid #d5d5d5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/error.png" alt="info" style={{ width: '16px', height: '16px' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ color: '#c91416', fontFamily: 'Nunito', fontSize: '16px' }}>20 Total</span>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '14px',
          padding: '10px',
          backgroundColor: '#ffffff',
          borderRadius: '10px'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/componen.png" alt="prev" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#c91416',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'Nunito',
            fontSize: '16px',
            cursor: 'pointer'
          }}>1</div>
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#737373',
            fontFamily: 'Nunito',
            fontSize: '16px',
            cursor: 'pointer'
          }}>2</div>
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#737373',
            fontFamily: 'Nunito',
            fontSize: '16px',
            cursor: 'pointer'
          }}>3</div>
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#737373',
            fontFamily: 'Nunito',
            fontSize: '16px',
            cursor: 'pointer'
          }}>...</div>
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#737373',
            fontFamily: 'Nunito',
            fontSize: '16px',
            cursor: 'pointer'
          }}>6</div>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/paginati.png" alt="next" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

RegardingSection.defaultProps = {
  style: {}
};

export default RegardingSection;

