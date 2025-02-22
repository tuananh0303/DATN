import React from 'react';

interface ApprovalItem {
  facilitieName: string;
  ownerName: string;
  email: string;
  createdAt: string;
  location: string;
}

const ContentArea: React.FC = () => {
  const approvalItems: ApprovalItem[] = [
    {
      facilitieName: 'abc',
      ownerName: 'Nguyễn Tuấn Anh',
      email: 'anheello564@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'aaaa',
      ownerName: 'Dương Văn Nghĩa',
      email: 'Nghiaduong@gmail.com', 
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'bbbb',
      ownerName: 'Nguyễn Tuấn Anh',
      email: 'anhhello@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'cass',
      ownerName: 'Dương Văn Nghĩa',
      email: 'Nghiaduong@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'hnhu',
      ownerName: 'Dương Văn Nghĩa',
      email: 'Nghiaduong@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    }
  ];

  return (
    <div style={{
      padding: '24px',
      minWidth: '100%',
      height: '100%',
      background: '#f5f6fa'
    }}>
      {/* Pending Approvals Section */}
      <div style={{
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          fontFamily: 'Roboto',
          letterSpacing: '1px',
          marginBottom: '20px'
        }}>Pending Approvals</h2>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* Facilities Card */}
          <div style={{
            flex: '1 1 45%',
            background: '#fff',
            borderRadius: '14px',
            padding: '20px',
            border: '1px solid #979797'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: 'Roboto',
              opacity: 0.7,
              marginBottom: '10px'
            }}>Facilities</div>
            <div style={{
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#de0004',
              marginBottom: '10px'
            }}>5</div>
            <div style={{
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'Roboto',
              opacity: 0.7,
              marginBottom: '10px'
            }}>New added facility: 3</div>
            <div style={{
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'Roboto',
              opacity: 0.7,
              marginBottom: '10px'
            }}>Edit an existing facility: 2</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              color: '#00b69b'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/ic-trend.png" alt="trend" />
              8.5% Up from yesterday
            </div>
          </div>

          {/* Fields Card */}
          <div style={{
            flex: '1 1 45%',
            background: '#fff', 
            borderRadius: '14px',
            padding: '20px',
            border: '1px solid #979797'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: 'Roboto',
              opacity: 0.7,
              marginBottom: '10px'
            }}>Fields</div>
            <div style={{
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#de0004',
              marginBottom: '10px'
            }}>10</div>
            <div style={{
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'Roboto',
              opacity: 0.7,
              marginBottom: '10px'
            }}>New added field: 5</div>
            <div style={{
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'Roboto',
              opacity: 0.7,
              marginBottom: '10px'
            }}>Edit an existing field: 5</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              color: '#00b69b'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/ic-trend-2.png" alt="trend" />
              1.3% Up from past week
            </div>
          </div>
        </div>
      </div>

      {/* List Approvals Section */}
      <div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          fontFamily: 'Roboto',
          letterSpacing: '1px',
          marginBottom: '20px'
        }}>List Approvals</h2>

        <div style={{
          background: '#fff',
          borderRadius: '15px',
          border: '1px solid #979797'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            padding: '15px 20px',
            background: '#448ff0b2',
            borderBottom: '1px solid #979797'
          }}>
            <div style={{flex: '1 1 105px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>Facilitie Name</div>
            <div style={{flex: '1 1 125px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>Owner Name</div>
            <div style={{flex: '1 1 165px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>Email</div>
            <div style={{flex: '1 1 76px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>Created_at</div>
            <div style={{flex: '1 1 155px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>Location</div>
            <div style={{flex: '1 1 90px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>View Detail</div>
            <div style={{flex: '1 1 50px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px'}}>Action</div>
          </div>

          {/* Rows */}
          {approvalItems.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              padding: '15px 20px',
              borderBottom: '1px solid #979797',
              background: '#fff'
            }}>
              <div style={{flex: '1 1 105px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.facilitieName}</div>
              <div style={{flex: '1 1 125px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.ownerName}</div>
              <div style={{flex: '1 1 165px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.email}</div>
              <div style={{flex: '1 1 76px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.createdAt}</div>
              <div style={{flex: '1 1 155px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.location}</div>
              <div style={{flex: '1 1 90px'}}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/error.png" alt="view" style={{cursor: 'pointer'}} />
              </div>
              <div style={{flex: '1 1 116px', display: 'flex', gap: '5px'}}>
                <button style={{
                  padding: '2px 10px',
                  background: '#6ef153cc',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  fontFamily: 'Nunito',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>Approve</button>
                <button style={{
                  padding: '2px 10px',
                  background: '#fb2222cc',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  fontFamily: 'Nunito',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            gap: '14px',
            padding: '10px',
            background: '#fff',
            borderRadius: '10px'
          }}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/componen.png" alt="prev" style={{cursor: 'pointer'}} />
            <div style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#c91416',
              borderRadius: '10px',
              color: '#fff',
              fontFamily: 'Nunito',
              fontSize: '16px'
            }}>1</div>
            <div style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#737373',
              fontFamily: 'Nunito',
              fontSize: '16px'
            }}>2</div>
            <div style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#737373',
              fontFamily: 'Nunito',
              fontSize: '16px'
            }}>3</div>
            <div style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#737373',
              fontFamily: 'Nunito',
              fontSize: '16px'
            }}>...</div>
            <div style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#737373',
              fontFamily: 'Nunito',
              fontSize: '16px'
            }}>5</div>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/paginati.png" alt="next" style={{cursor: 'pointer'}} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        height: '60px',
        background: '#e6e6e6',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between'
      }}>
        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          color: '#191919'
        }}>Copyright @ 2023 Safelet. All rights reserved.</div>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <a href="#" style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            color: '#5858fa',
            textDecoration: 'none'
          }}>Terms of Use</a>
          <div style={{
            width: '1px',
            height: '20px',
            background: '#000'
          }}></div>
          <a href="#" style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            color: '#5858fa',
            textDecoration: 'none'
          }}>Privacy Policy</a>
        </div>

        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          color: '#191919'
        }}>Hand Crafted & made with Love</div>
      </div>
    </div>
  );
};

export default ContentArea;

