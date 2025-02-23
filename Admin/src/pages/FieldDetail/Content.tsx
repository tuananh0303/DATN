import React from 'react';

interface ContentProps {
  title?: string;
  description?: string;
  fieldId?: string;
  ownerName?: string;
  email?: string;
  facilityName?: string;
  createdAt?: string;
  updatedAt?: string;
  price?: string;
  dimension?: string;
  yardSurface?: string;
  totalReview?: string;
  avgReview?: string;
  typeSport?: string;
  location?: string;
  images?: string[];
}

const Content: React.FC<ContentProps> = ({
  title = "Sân A",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad laborum.",
  fieldId = "123",
  ownerName = "Nguyễn Tuấn Anh", 
  email = "anhhello564@gmail.com",
  facilityName = "Sân Cầu Lông Phạm Kha",
  createdAt = "24/12/2024",
  updatedAt = "24/12/2024",
  price = "200.000đ /h",
  dimension = "4.8",
  yardSurface = "4.8",
  totalReview = "20",
  avgReview = "4.8",
  typeSport = "Badminton",
  location = "Số 34 Đường 3/2 quận 10 tp Hồ Chí Minh",
  images = [
    "https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/frame-37.png",
    "https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/frame-37-2.png",
    "https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/frame.png"
  ]
}) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f6fa',
      padding: '18px 50px'
    }}>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <span style={{
          color: '#3d4d54',
          fontSize: '14px',
          textTransform: 'uppercase'
        }}>FACILITY MANAGEMENT</span>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/icons.png" alt="arrow" style={{width: '16px', height: '16px'}} />
        <span style={{
          color: '#3d4d54',
          fontSize: '14px',
          textTransform: 'uppercase'
        }}>FACILITY DETAIL</span>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/icons-2.png" alt="arrow" style={{width: '16px', height: '16px'}} />
        <span style={{
          color: '#126da6',
          fontSize: '14px',
          textTransform: 'uppercase'
        }}>Field detail</span>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1014px',
        backgroundColor: '#fff',
        padding: '28px',
        marginBottom: '26px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: 0
          }}>{title}</h1>
          <div style={{
            backgroundColor: '#6ef153cc',
            borderRadius: '10px',
            padding: '0 10px',
            height: '20px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{fontSize: '16px'}}>Available</span>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '20px',
          margin: '20px 0 40px'
        }}>{description}</p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '0 10px'
        }}>
          <div style={{display: 'flex', gap: '110px', flexWrap: 'wrap'}}>
            <span style={{fontWeight: 700}}>Field ID: {fieldId}</span>
            <span style={{fontWeight: 700}}>Owner Name: {ownerName}</span>
            <span style={{fontWeight: 700}}>Email: {email}</span>
          </div>

          <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
            <span style={{fontWeight: 700}}>Facility Name: {facilityName}</span>
            <span style={{fontWeight: 700}}>Created_At: {createdAt}</span>
            <span style={{fontWeight: 700}}>Updated_At: {updatedAt}</span>
          </div>

          <div style={{display: 'flex', gap: '65px', flexWrap: 'wrap'}}>
            <span style={{fontWeight: 700}}>Price: {price}</span>
            <span style={{fontWeight: 700}}>Dimension: {dimension}</span>
            <span style={{fontWeight: 700}}>Yard surface: {yardSurface}</span>
          </div>

          <div style={{display: 'flex', gap: '80px', flexWrap: 'wrap'}}>
            <span style={{fontWeight: 700}}>Total Review: {totalReview}</span>
            <span style={{fontWeight: 700}}>Avg Review: {avgReview}</span>
          </div>

          <div style={{display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap'}}>
            <span style={{fontWeight: 600}}>Type Sport:</span>
            <div style={{
              backgroundColor: '#e1e1e1cc',
              borderRadius: '10px',
              padding: '0 10px'
            }}>
              <span>{typeSport}</span>
            </div>
          </div>

          <div>
            <span style={{fontWeight: 600}}>Location: {location}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div style={{
        maxWidth: '1014px',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: '40px'
        }}>IMAGE & VIDEO</h2>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center'
        }}>
          {images.map((img, index) => (
            <img 
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              style={{
                width: '200px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#e6e6e6',
        marginTop: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}>
        <span style={{fontSize: '14px'}}>Copyright @ 2023 Safelet. All rights reserved.</span>
        <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
          <a href="#" style={{color: '#5858fa', fontSize: '14px', fontWeight: 700}}>Terms of Use</a>
          <div style={{width: '1px', height: '20px', backgroundColor: '#000'}} />
          <a href="#" style={{color: '#5858fa', fontSize: '14px', fontWeight: 700}}>Privacy Policy</a>
        </div>
        <span style={{fontSize: '14px'}}>Hand Crafted & made with Love</span>
      </div>
    </div>
  );
};

export default Content;

