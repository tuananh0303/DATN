import React, { useState } from 'react';

interface ContentProps {
  data?: Array<{
    facilityId: string;
    facilityName: string;
    ownerName: string;
    createdAt: string;
    totalFields: number;
    location: string;
    status: 'Active' | 'Suspended';
  }>;
}

const defaultData = [
  {
    facilityId: '0001',
    facilityName: 'Nguyễn Tuấn Anh',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 10,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0002',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 10,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0003',
    facilityName: 'Nguyễn Tuấn Anh',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 10,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityId: '0004',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 5,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityId: '0005',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 8,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0006',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 15,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0007',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 14,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0008',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 16,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  }
];

const Content: React.FC<ContentProps> = ({ data = defaultData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    minWidth: '1200px',
    height: '100%',
    background: '#f5f6fa'
  };

  const searchStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '540px',
    height: '40px',
    padding: '0 18px',
    border: '0.6px solid #d5d5d5',
    borderRadius: '19px',
    background: '#fff',
    marginBottom: '20px',
    fontFamily: 'Nunito Sans',
    fontSize: '14px'
  };

  const filterContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '674px',
    height: '50px',
    padding: '0 20px',
    background: '#f9f9fb',
    borderRadius: '10px',
    border: '0.6px solid #d5d5d5',
    marginBottom: '20px'
  };

  const filterItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: 600,
    color: '#202224',
    cursor: 'pointer'
  };

  const resetFilterStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ea0234',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginLeft: 'auto'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    padding: '25px 20px',
    background: '#448ff0b2',
    borderBottom: '1px solid #979797'
  };

  const headerCellStyle: React.CSSProperties = {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '15px',
    color: '#000000'
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    padding: '15px 20px',
    borderBottom: '1px solid #979797',
    background: '#fff'
  };

  const cellStyle: React.CSSProperties = {
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: '14px',
    color: '#000000'
  };

  const statusStyle = (status: string): React.CSSProperties => ({
    width: '85px',
    padding: '2px 0',
    background: status === 'Active' ? '#6ef153cc' : '#eae559cc',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: '14px'
  });

  const actionButtonStyle: React.CSSProperties = {
    width: '48px',
    height: '32px',
    background: '#fafbfd',
    border: '0.6px solid #d5d5d5',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const paginationStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    marginTop: '20px'
  };

  const pageButtonStyle = (active: boolean): React.CSSProperties => ({
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: active ? '#c91416' : '#fff',
    color: active ? '#fff' : '#737373',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '16px'
  });

  const footerStyle: React.CSSProperties = {
    width: '100%',
    height: '60px',
    background: '#e6e6e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    marginTop: 'auto'
  };

  return (
    <div style={containerStyle}>
      <input
        style={searchStyle}
        placeholder="Search by Fullname/ Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div style={filterContainerStyle}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/filter-i.png" alt="filter" style={{ width: '42px', height: '50px' }} />
        <div style={filterItemStyle}>
          <span>Filter By</span>
          <div style={{ width: '1px', height: '50px', background: '#979797', opacity: 0.69 }} />
        </div>
        <div style={filterItemStyle}>
          <span>Created_At</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/ic-keybo.png" alt="dropdown" />
          <div style={{ width: '1px', height: '50px', background: '#979797', opacity: 0.69 }} />
        </div>
        <div style={filterItemStyle}>
          <span>Status</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/ic-keybo-2.png" alt="dropdown" />
        </div>
        <div style={resetFilterStyle}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/ic-repla.png" alt="reset" style={{ width: '18px', height: '18px' }} />
          <span>Reset Filter</span>
        </div>
      </div>

      <div style={tableStyle}>
        <div style={headerStyle}>
          <div style={{ ...headerCellStyle, width: '75px' }}>Facility ID</div>
          <div style={{ ...headerCellStyle, width: '120px', marginLeft: '50px' }}>Facility Name</div>
          <div style={{ ...headerCellStyle, width: '125px', marginLeft: '30px' }}>Owner Name</div>
          <div style={{ ...headerCellStyle, width: '90px', marginLeft: '65px' }}>Created_At</div>
          <div style={{ ...headerCellStyle, width: '90px', marginLeft: '30px' }}>Total Fields</div>
          <div style={{ ...headerCellStyle, width: '170px', marginLeft: '30px' }}>Location</div>
          <div style={{ ...headerCellStyle, width: '85px', marginLeft: '115px' }}>Status</div>
          <div style={{ ...headerCellStyle, width: '50px', marginLeft: '65px' }}>Action</div>
        </div>

        {data.map((item, index) => (
          <div key={index} style={rowStyle}>
            <div style={{ ...cellStyle, width: '75px' }}>{item.facilityId}</div>
            <div style={{ ...cellStyle, width: '120px', marginLeft: '50px' }}>{item.facilityName}</div>
            <div style={{ ...cellStyle, width: '125px', marginLeft: '30px' }}>{item.ownerName}</div>
            <div style={{ ...cellStyle, width: '90px', marginLeft: '65px' }}>{item.createdAt}</div>
            <div style={{ ...cellStyle, width: '90px', marginLeft: '30px' }}>{item.totalFields}</div>
            <div style={{ ...cellStyle, width: '170px', marginLeft: '30px' }}>{item.location}</div>
            <div style={{ marginLeft: '115px' }}>
              <div style={statusStyle(item.status)}>{item.status}</div>
            </div>
            <div style={{ marginLeft: '65px' }}>
              <button style={actionButtonStyle}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/error.png" alt="action" style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={paginationStyle}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/componen.png" alt="prev" style={{ cursor: 'pointer' }} />
        <div style={pageButtonStyle(true)}>1</div>
        <div style={pageButtonStyle(false)}>2</div>
        <div style={pageButtonStyle(false)}>3</div>
        <div style={pageButtonStyle(false)}>...</div>
        <div style={pageButtonStyle(false)}>12</div>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/paginati.png" alt="next" style={{ cursor: 'pointer' }} />
      </div>

      <div style={footerStyle}>
        <span style={{ fontFamily: 'Roboto', fontSize: '14px' }}>Copyright @ 2023 Safelet. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span style={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: 700, color: '#5858fa' }}>Terms of Use</span>
          <div style={{ width: '1px', height: '20px', background: '#000' }} />
          <span style={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: 700, color: '#5858fa' }}>Privacy Policy</span>
        </div>
        <span style={{ fontFamily: 'Roboto', fontSize: '14px' }}>Hand Crafted & made with Love</span>
      </div>
    </div>
  );
};

export default Content;

