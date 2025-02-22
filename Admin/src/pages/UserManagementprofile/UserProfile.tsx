import React from 'react';

interface UserProfileProps {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  joinedDate?: string;
  totalBooking?: number;
  profileImage?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name = "NGUYỄN TUẤN ANH",
  role = "Player",
  email = "anhhello564@gmail.com",
  phone = "0976302687",
  gender = "Male",
  birthDate = "08/10/2001",
  joinedDate = "14/07/2024",
  totalBooking = 100,
  profileImage = "https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/unsplash.png"
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '50px',
      minWidth: '643px',
      padding: '20px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {/* Profile Image */}
      <div style={{
        width: '300px',
        height: '341px',
        borderRadius: '30px',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img 
          src={profileImage} 
          alt="Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* User Details */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        width: '293px',
        flexShrink: 1
      }}>
        {/* Name */}
        <h1 style={{
          margin: 0,
          fontFamily: 'Roboto',
          fontSize: '32px',
          fontWeight: 600,
          color: '#000000'
        }}>{name}</h1>

        {/* Role Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#6ef153b2',
          borderRadius: '10px',
          border: '2px solid #858585',
          padding: '13px 2px',
          width: '86px'
        }}>
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 500,
            color: '#858585',
            margin: '0 auto'
          }}>{role}</span>
        </div>

        {/* Info Row */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* Gender */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/page-1.png" alt="Gender" style={{ width: '20px', height: '20px' }} />
            <span style={{
              fontFamily: 'Roboto',
              fontSize: '16px',
              color: '#858585'
            }}>{gender}</span>
          </div>

          {/* Vertical Line */}
          <div style={{
            width: '1px',
            height: '20px',
            backgroundColor: '#000000'
          }} />

          {/* Birth Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/birthday.png" alt="Birthday" style={{ width: '20px', height: '20px' }} />
            <span style={{
              fontFamily: 'Roboto',
              fontSize: '16px',
              color: '#858585'
            }}>{birthDate}</span>
          </div>
        </div>

        {/* Email */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/email.png" alt="Email" style={{ width: '23px', height: '19px' }} />
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            color: '#858585'
          }}>{email}</span>
        </div>

        {/* Phone */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/vector.png" alt="Phone" style={{ width: '21px', height: '21px' }} />
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            color: '#858585'
          }}>{phone}</span>
        </div>

        {/* Joined Date */}
        <p style={{
          margin: 0,
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: 600,
          color: '#000000'
        }}>Joined Date: {joinedDate}</p>

        {/* Total Booking */}
        <p style={{
          margin: 0,
          fontFamily: 'Roboto',
          fontSize: '16px',
          color: '#000000'
        }}>Total Booking: {totalBooking}</p>
      </div>
    </div>
  );
};

export default UserProfile;

