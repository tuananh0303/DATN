import React, { useState } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  joined: string;
  permissions: 'Admin' | 'Player' | 'Owner';
}

const ContentArea: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const mockUsers: User[] = [
    { id: '0001', fullName: 'Nguyễn Tuấn Anh', email: 'anheello564@gmail.com', joined: '14/07/2024', permissions: 'Admin' },
    { id: '0002', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
    { id: '0003', fullName: 'Nguyễn Tuấn Anh', email: 'anhhello@gmail.com', joined: '14/07/2024', permissions: 'Owner' },
    { id: '0004', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Owner' },
    { id: '0005', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
    { id: '0006', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
    { id: '0007', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Admin' },
    { id: '0008', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
  ];

  const getPermissionStyle = (permission: string) => {
    switch (permission) {
      case 'Admin':
        return { backgroundColor: '#e33c3cb2' };
      case 'Player':
        return { backgroundColor: '#6ef153b2' };
      case 'Owner':
        return { backgroundColor: '#eae559b2' };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: '35px 96px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      {/* Search Bar */}
      <div style={{ 
        width: '100%',
        maxWidth: '540px',
        height: '40px',
        position: 'relative',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Search by Fullname/ Email"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '19px',
            border: '0.6px solid #d5d5d5',
            padding: '0 48px',
            backgroundColor: '#fff',
            fontFamily: 'Nunito Sans',
            fontSize: '14px'
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/search.png"
          alt="search"
          style={{
            position: 'absolute',
            right: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.6
          }}
        />
      </div>

      {/* Filter Bar */}
      <div style={{
        width: '100%',
        maxWidth: '711px',
        height: '50px',
        backgroundColor: '#f9f9fb',
        borderRadius: '10px',
        border: '0.6px solid #d5d5d5',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/filter-i.png" alt="filter" style={{ marginLeft: '20px' }} />
        
        <div style={{ 
          marginLeft: '20px',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '14px',
              color: '#202224'
            }}>Filter By</span>
            <div style={{ 
              width: '1px',
              height: '50px',
              backgroundColor: '#979797',
              opacity: 0.69,
              margin: '0 20px'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '14px',
              color: '#202224'
            }}>Joined</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/ic-keybo.png" alt="dropdown" style={{ marginLeft: '10px' }} />
            <div style={{ 
              width: '1px',
              height: '50px',
              backgroundColor: '#979797',
              opacity: 0.69,
              margin: '0 20px'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '14px',
              color: '#202224'
            }}>Permissions</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/ic-keybo-2.png" alt="dropdown" style={{ marginLeft: '10px' }} />
          </div>
        </div>

        <div style={{ 
          marginLeft: 'auto',
          marginRight: '20px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/ic-repla.png" alt="reset" style={{ marginRight: '8px' }} />
          <span style={{ 
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: '14px',
            color: '#ea0234'
          }}>Reset Filter</span>
        </div>
      </div>

      {/* User List */}
      <div style={{
        width: '100%',
        maxWidth: '996px',
        backgroundColor: '#fdfdfd',
        borderRadius: '15px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          padding: '25px 20px',
          backgroundColor: '#448ff080',
          borderBottom: '1px solid #979797'
        }}>
          <div style={{ width: '20px' }}>
            <input type="checkbox" />
          </div>
          <div style={{ width: '80px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px' }}>ID</div>
          <div style={{ width: '200px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '16px' }}>Full Name</div>
          <div style={{ width: '200px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '16px' }}>Email</div>
          <div style={{ width: '100px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '16px' }}>Joined</div>
          <div style={{ width: '120px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '16px' }}>Permissions</div>
          <div style={{ width: '100px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px' }}>Action</div>
        </div>

        {/* User Rows */}
        {mockUsers.map((user) => (
          <div key={user.id} style={{
            display: 'flex',
            padding: '15px 20px',
            borderBottom: '1px solid #979797',
            backgroundColor: '#fff'
          }}>
            <div style={{ width: '20px' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '80px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{user.id}</div>
            <div style={{ width: '200px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{user.fullName}</div>
            <div style={{ width: '200px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{user.email}</div>
            <div style={{ width: '100px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}>{user.joined}</div>
            <div style={{ width: '120px' }}>
              <span style={{
                padding: '5px 15px',
                borderRadius: '10px',
                fontFamily: 'Open Sans',
                fontWeight: 600,
                fontSize: '14px',
                ...getPermissionStyle(user.permissions)
              }}>
                {user.permissions}
              </span>
            </div>
            <div style={{ width: '100px', display: 'flex', gap: '10px' }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/error.png" alt="action" style={{ cursor: 'pointer' }} />
              <div style={{ 
                width: '1px',
                height: '32px',
                backgroundColor: '#979797',
                opacity: 0.7
              }} />
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/vector.png" alt="delete" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        gap: '10px'
      }}>
        <span style={{ 
          fontFamily: 'Nunito',
          fontSize: '16px',
          color: '#c91416'
        }}>144 Total</span>
        <div style={{
          display: 'flex',
          gap: '14px',
          padding: '10px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          alignItems: 'center'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/componen.png" alt="prev" style={{ cursor: 'pointer' }} />
          <span style={{ 
            padding: '5px 10px',
            borderRadius: '10px',
            backgroundColor: '#c91416',
            color: '#fff',
            fontFamily: 'Nunito',
            fontSize: '16px'
          }}>1</span>
          <span style={{ padding: '5px 10px', fontFamily: 'Nunito', fontSize: '16px', color: '#737373' }}>2</span>
          <span style={{ padding: '5px 10px', fontFamily: 'Nunito', fontSize: '16px', color: '#737373' }}>3</span>
          <span style={{ padding: '5px 10px', fontFamily: 'Nunito', fontSize: '16px', color: '#737373' }}>...</span>
          <span style={{ padding: '5px 10px', fontFamily: 'Nunito', fontSize: '16px', color: '#737373' }}>12</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/paginati.png" alt="next" style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

export default ContentArea;

