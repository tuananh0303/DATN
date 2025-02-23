import React, { useState } from 'react';

interface ContentAreaProps {
  data?: Array<{
    id: string;
    serviceName: string;
    ownerName: string;
    facilityName: string;
    createdAt: string;
    typeSport: string;
    status: number;
    price: string;
  }>;
}

const defaultData = [
  {
    id: '0001',
    serviceName: 'Tennis',
    ownerName: 'Nguyễn Tuấn Anh',
    facilityName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    typeSport: 'Tennis',
    status: 20,
    price: '200.000đ'
  },
  {
    id: '0002',
    serviceName: 'Football',
    ownerName: 'Dương Văn Nghĩa',
    facilityName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    typeSport: 'Football', 
    status: 20,
    price: '200.000đ'
  },
  // Add more default data items as needed
];

const ContentArea: React.FC<ContentAreaProps> = ({ data = defaultData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  // const [filterType, setFilterType] = useState('');
  // const [filterStatus, setFilterStatus] = useState('');
  // const [filterDate, setFilterDate] = useState('');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      background: '#f5f6fa',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Search Bar */}
      <div style={{
        width: '100%',
        maxWidth: '540px',
        height: '40px',
        position: 'relative',
        marginBottom: '34px'
      }}>
        <input
          type="text"
          placeholder="Search by Fullname/ Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            height: '100%',
            padding: '9px 18px',
            border: '0.6px solid #d5d5d5',
            borderRadius: '19px',
            background: '#fff',
            fontSize: '14px',
            fontFamily: 'Nunito Sans',
            opacity: 0.5
          }}
        />
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/search.png"
          alt="search"
          style={{
            position: 'absolute',
            right: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '22px',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Filter Bar */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '50px',
        background: '#f9f9fb',
        borderRadius: '10px',
        border: '0.6px solid #d5d5d5',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        marginBottom: '30px'
      }}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/filter-i.png" alt="filter" style={{ width: '43px', height: '50px' }} />
        
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          marginLeft: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '14px',
              color: '#202224'
            }}>Filter By</span>
            <div style={{ width: '1px', height: '50px', background: '#979797', opacity: 0.69, margin: '0 20px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {['Created_At', 'Type Sport', 'Status'].map((filter, index) => (
              <div key={filter} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  fontFamily: 'Nunito Sans',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#202224'
                }}>{filter}</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/ic-keybo.png" alt="dropdown" style={{ marginLeft: '10px' }} />
                {index < 2 && <div style={{ width: '1px', height: '50px', background: '#979797', opacity: 0.69, margin: '0 20px' }} />}
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#ea0234',
            cursor: 'pointer',
            marginLeft: '20px'
          }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/ic-repla.png" alt="reset" style={{ marginRight: '8px' }} />
            <span style={{ 
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '14px'
            }}>Reset Filter</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{
        background: '#fdfdfd',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '1109px',
        marginBottom: '30px',
        overflowX: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          padding: '25px 20px',
          background: '#448ff0b2',
          borderBottom: '1px solid #979797'
        }}>
          {['Service Name', 'Owner Name', 'Facility Name', 'Created_At', 'Type Sport', 'Status', 'Price', 'Action'].map((header) => (
            <div key={header} style={{
              flex: header === 'Action' ? '0 0 50px' : '1 1 0',
              fontFamily: 'Open Sans',
              fontWeight: 700,
              fontSize: '15px',
              color: '#000000'
            }}>
              {header}
            </div>
          ))}
        </div>

        {/* Rows */}
        {data.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            padding: '14px 20px',
            borderBottom: '1px solid #979797',
            background: '#ffffff'
          }}>
            <div style={{ flex: 1, fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.id}</div>
            <div style={{ flex: 1, fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.ownerName}</div>
            <div style={{ flex: 1, fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.facilityName}</div>
            <div style={{ flex: 1, fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{item.createdAt}</div>
            <div style={{ flex: 1, fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>{item.typeSport}</div>
            <div style={{ flex: 1, fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>{item.status}</div>
            <div style={{ flex: 1, fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px' }}>{item.price}</div>
            <div style={{ flex: '0 0 50px' }}>
              <div style={{
                width: '48px',
                height: '32px',
                background: '#fafbfd',
                borderRadius: '8px',
                border: '0.6px solid #d5d5d5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/error.png" alt="action" style={{ width: '16px', height: '16px' }} />
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
        alignSelf: 'flex-end',
        marginRight: '46px'
      }}>
        <span style={{
          fontFamily: 'Nunito',
          fontSize: '16px',
          color: '#c91416',
          lineHeight: '19px'
        }}>144 Total</span>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#ffffff',
          borderRadius: '10px',
          padding: '5px 10px'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/componen.png" alt="prev" style={{ cursor: 'pointer' }} />
          {[1, 2, 3, '...', 12].map((page, index) => (
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: currentPage === page ? '#c91416' : 'transparent',
                borderRadius: '10px',
                color: currentPage === page ? '#ffffff' : '#737373',
                fontFamily: 'Nunito',
                fontSize: '16px',
                cursor: 'pointer'
              }}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/paginati.png" alt="next" style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

export default ContentArea;

