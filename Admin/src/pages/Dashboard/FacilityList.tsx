import React from 'react';

interface Facility {
  facilityName: string;
  ownerName: string;
  createdAt: string;
  totalFields: number;
  location: string;
  status: 'Active' | 'Suspended';
}

const FacilitiesList: React.FC<{ facilities?: Facility[] }> = ({ facilities = [
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 2,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh', 
    createdAt: '14/07/2024',
    totalFields: 2,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 2,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 5,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 8,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  }
] }) => {

  const headerStyle = {
    display: 'flex',
    flexDirection: 'row' as const,
    padding: '10px 20px',
    background: '#448ff0b2',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#979797',
    minWidth: '100%',
    boxSizing: 'border-box'
  };

  const headerTextStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '15px',
    color: '#000000',
    flex: 1,
    textAlign: 'center' as const
  };

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row' as const,
    padding: '10px 20px',
    background: '#ffffff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#979797',
    minWidth: '100%',
    boxSizing: 'border-box'
  };

  const cellStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: '14px',
    color: '#000000',
    flex: 1,
    textAlign: 'center' as const
  };

  const actionButtonStyle = {
    width: '48px',
    height: '32px',
    background: '#fafbfd',
    borderRadius: '8px',
    border: '0.6px solid #d5d5d5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  };

  const statusStyle = (status: string) => ({
    width: '85px',
    height: '20px',
    background: status === 'Active' ? '#6ef153b2' : '#eae559b2',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column' as const,
      background: '#fdfdfd',
      borderRadius: '15px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={headerStyle}>
        <div style={headerTextStyle}>Facility Name</div>
        <div style={headerTextStyle}>Owner Name</div>
        <div style={headerTextStyle}>Created_At</div>
        <div style={headerTextStyle}>Total Fields</div>
        <div style={headerTextStyle}>Location</div>
        <div style={headerTextStyle}>Status</div>
        <div style={headerTextStyle}>Action</div>
      </div>

      {facilities.map((facility, index) => (
        <div key={index} style={rowStyle}>
          <div style={cellStyle}>{facility.facilityName}</div>
          <div style={cellStyle}>{facility.ownerName}</div>
          <div style={cellStyle}>{facility.createdAt}</div>
          <div style={cellStyle}>{facility.totalFields}</div>
          <div style={cellStyle}>{facility.location}</div>
          <div style={statusStyle(facility.status)}>
            <span style={cellStyle}>{facility.status}</span>
          </div>
          <div style={{...cellStyle, display: 'flex', justifyContent: 'center'}}>
            <button style={actionButtonStyle}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/error.png" alt="action" style={{width: '16px', height: '16px'}} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacilitiesList;

