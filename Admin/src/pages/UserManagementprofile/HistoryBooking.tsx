import React from 'react';

interface BookingRecord {
  fieldName: string;
  facilityName: string;
  createdAt: string;
  startTime: string;
  duration: string;
  typeSport: string;
  status: 'Complete' | 'Pending';
}

const HistoryBooking: React.FC = () => {
  const bookings: BookingRecord[] = [
    {
      fieldName: 'Nguyễn Tuấn Anh',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Tennis',
      status: 'Complete'
    },
    {
      fieldName: 'Dương Văn Nghĩa',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '120m',
      typeSport: 'Football',
      status: 'Complete'
    },
    {
      fieldName: 'Nguyễn Tuấn Anh',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Badminton',
      status: 'Pending'
    },
    {
      fieldName: 'Dương Văn Nghĩa',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Synthetic',
      status: 'Pending'
    },
    {
      fieldName: 'Dương Văn Nghĩa',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Table Tennis',
      status: 'Complete'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '995px', minHeight: '540px', padding: '20px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 700,
        fontFamily: 'Roboto',
        letterSpacing: '1px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        History booking
      </h1>

      <div style={{
        backgroundColor: '#fdfdfd',
        borderRadius: '15px',
        width: '100%',
        overflowX: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          padding: '25px 20px',
          backgroundColor: '#488ff0b2',
          borderBottom: '1px solid #979797'
        }}>
          <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Field Name</div>
          <div style={{ width: '125px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Facility Name</div>
          <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Created_At</div>
          <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Start time</div>
          <div style={{ width: '96px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Duration</div>
          <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Type Sport</div>
          <div style={{ width: '85px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px' }}>Status</div>
        </div>

        {/* Booking Records */}
        {bookings.map((booking, index) => (
          <div key={index} style={{
            display: 'flex',
            padding: '14px 20px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #979797'
          }}>
            <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{booking.fieldName}</div>
            <div style={{ width: '125px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{booking.facilityName}</div>
            <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{booking.createdAt}</div>
            <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{booking.startTime}</div>
            <div style={{ width: '96px', fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px' }}>{booking.duration}</div>
            <div style={{ width: '90px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>{booking.typeSport}</div>
            <div style={{
              width: '85px',
              fontFamily: 'Open Sans',
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'center',
              backgroundColor: booking.status === 'Complete' ? '#6ef153b2' : '#eae559b2',
              borderRadius: '10px',
              padding: '2px 0'
            }}>
              {booking.status}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0'
        }}>
          <div style={{ 
            color: '#c91416',
            fontFamily: 'Nunito',
            fontSize: '16px',
            marginBottom: '10px'
          }}>
            144 Total
          </div>
          <div style={{
            display: 'flex',
            gap: '14px',
            padding: '10px',
            backgroundColor: '#ffffff',
            borderRadius: '10px'
          }}>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/componen.png" alt="prev" width="30" height="30" />
            </button>
            {[1, 2, 3, '...', 12].map((num, index) => (
              <button
                key={index}
                style={{
                  width: '30px',
                  height: '30px',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: num === 1 ? '#c91416' : 'transparent',
                  color: num === 1 ? '#ffffff' : '#737373',
                  fontFamily: 'Nunito',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                {num}
              </button>
            ))}
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/paginati.png" alt="next" width="30" height="30" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBooking;

