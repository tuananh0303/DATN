import React from 'react';

interface FacilityDetailsProps {
  style?: React.CSSProperties;
}

const FacilityDetails: React.FC<FacilityDetailsProps> = ({ style }) => {
  return (
    <div style={{
      width: '100%',
      minWidth: '320px',
      maxWidth: '1014px',
      backgroundColor: '#fff',
      padding: '20px',
      boxSizing: 'border-box',
      ...style
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontFamily: 'Roboto',
          fontWeight: 700,
          margin: 0,
          textAlign: 'center'
        }}>Sân Cầu Lông Phạm Kha</h1>
        <div style={{
          backgroundColor: '#6ef153cc',
          borderRadius: '10px',
          padding: '0 20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            fontSize: '16px',
            fontFamily: 'Roboto',
            textAlign: 'center'
          }}>Active</span>
        </div>
      </div>

      <p style={{
        fontSize: '20px',
        fontFamily: 'Roboto',
        textAlign: 'center',
        margin: '0 0 20px 0'
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad laborum.
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '0 10px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 700 }}>Facility ID: 123</span>
          <span style={{ fontWeight: 700 }}>Owner Name: Nguyễn Tuấn Anh</span>
          <span style={{ fontWeight: 700 }}>Email: anhhello564@gmail.com</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 600 }}>Open Time: 05:00 - 23:00</span>
          <span style={{ fontWeight: 700 }}>Created_At: 24/12/2024</span>
          <span style={{ fontWeight: 700 }}>Updated_At: 24/12/2024</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 700 }}>Total Field: 100</span>
          <span style={{ fontWeight: 700 }}>Total Service: 100</span>
          <span style={{ fontWeight: 700 }}>Total Voucher: 0</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 700 }}>Total Event: 2</span>
          <span style={{ fontWeight: 700 }}>Total Review: 50</span>
          <span style={{ fontWeight: 700 }}>Avg Review: 4.2</span>
        </div>

        <span style={{ fontWeight: 600 }}>
          Location: Số 34 Đường 3/2 quận 10 tp Hồ Chí Minh.
        </span>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 600 }}>Type Sport: </span>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px'
          }}>
            {['Tennis', 'Football', 'Badminton'].map((sport) => (
              <div key={sport} style={{
                backgroundColor: '#e1e1e1cc',
                borderRadius: '10px',
                padding: '0 15px',
                height: '19px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  textAlign: 'center'
                }}>{sport}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

FacilityDetails.defaultProps = {
  style: {}
};

export default FacilityDetails;

