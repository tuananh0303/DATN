import React from 'react';

interface ContentAreaFooterProps {
  data?: {
    id: string;
    fieldName: string;
    facilityName: string;
    createdAt: string;
    typeSport: string;
    price: string;
    status: 'Available' | 'Unavailable';
  }[];
}

const ContentArea_Footer: React.FC<ContentAreaFooterProps> = ({ 
  data = [
    {id: '0001', fieldName: 'Nguyễn Tuấn Anh', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Tennis', price: '500.000đ/h', status: 'Available'},
    {id: '0002', fieldName: 'Dương Văn Nghĩa', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Football', price: '300.000đ/h', status: 'Available'},
    {id: '0003', fieldName: 'Nguyễn Tuấn Anh', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Badminton', price: '120.000đ/h', status: 'Unavailable'},
    {id: '0004', fieldName: 'Dương Văn Nghĩa', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Tennis, Badminton', price: '200.000đ/h', status: 'Unavailable'},
    {id: '0005', fieldName: 'Dương Văn Nghĩa', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Table Tennis', price: '70.000đ/h', status: 'Available'},
    {id: '0006', fieldName: 'Dương Văn Nghĩa', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Basketball', price: '200.000đ/h', status: 'Available'},
    {id: '0007', fieldName: 'Dương Văn Nghĩa', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Badminton', price: '120.000đ/h', status: 'Available'},
    {id: '0008', fieldName: 'Dương Văn Nghĩa', facilityName: 'Nguyễn Tuấn Anh', createdAt: '14/07/2024', typeSport: 'Badminton', price: '120.000đ/h', status: 'Available'}
  ]
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '90px 46px 0',
      background: '#f5f6fa'
    }}>
      {/* Search and Filter Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Search */}
        <div style={{
          width: '100%',
          maxWidth: '540px',
          height: '40px',
          position: 'relative',
          background: '#fff',
          borderRadius: '19px',
          border: '0.6px solid #d5d5d5'
        }}>
          <input 
            type="text"
            placeholder="Search by Fullname/ Email"
            style={{
              width: '100%',
              height: '100%',
              padding: '0 18px',
              border: 'none',
              borderRadius: '19px',
              fontFamily: 'Nunito Sans',
              fontSize: '14px',
              opacity: 0.5
            }}
          />
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/search.png"
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

        {/* Filter */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          background: '#f9f9fb',
          borderRadius: '10px',
          border: '0.6px solid #d5d5d5'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/filter-i.png" alt="filter" style={{width: '42.75px', height: '50px'}}/>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            flex: 1
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px'}}>Filter By</span>
              <div style={{width: '1px', height: '50px', background: '#979797', opacity: 0.69}}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px'}}>Created_At</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-keybo.png" alt="dropdown" style={{width: '24px'}}/>
              <div style={{width: '1px', height: '50px', background: '#979797', opacity: 0.69}}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px'}}>Type Sport</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-keybo-2.png" alt="dropdown" style={{width: '24px'}}/>
              <div style={{width: '1px', height: '50px', background: '#979797', opacity: 0.69}}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px'}}>Status</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-keybo-3.png" alt="dropdown" style={{width: '24px'}}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto'}}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-repla.png" alt="reset" style={{width: '18px'}}/>
              <span style={{fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px', color: '#ea0234'}}>Reset Filter</span>
            </div>
          </div>
        </div>
      </div>

      {/* List Section */}
      <div style={{
        width: '100%',
        maxWidth: '1109px',
        background: '#fdfdfd',
        borderRadius: '15px',
        marginBottom: '30px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          padding: '25px 20px',
          background: '#448ff0b2',
          borderBottom: '1px solid #979797'
        }}>
          <div style={{width: '75px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px'}}>Field ID</div>
          <div style={{width: '120px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px'}}>Field Name</div>
          <div style={{width: '125px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px'}}>Facility Name</div>
          <div style={{width: '105px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px'}}>Created_At</div>
          <div style={{width: '90px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px'}}>Type Sport</div>
          <div style={{width: '130px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px', textAlign: 'center'}}>Price</div>
          <div style={{width: '79px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '15px', textAlign: 'center'}}>Status</div>
          <div style={{width: '71px', fontFamily: 'Open Sans', fontWeight: 700, fontSize: '14px', textAlign: 'center'}}>Action</div>
        </div>

        {/* List Items */}
        {data.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            padding: '14px 20px',
            borderBottom: '1px solid #979797',
            background: '#fff'
          }}>
            <div style={{width: '75px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.id}</div>
            <div style={{width: '120px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.fieldName}</div>
            <div style={{width: '125px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.facilityName}</div>
            <div style={{width: '105px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.createdAt}</div>
            <div style={{width: '90px', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px'}}>{item.typeSport}</div>
            <div style={{width: '130px', fontFamily: 'Nunito Sans', fontWeight: 600, fontSize: '14px', textAlign: 'center'}}>{item.price}</div>
            <div style={{
              width: '85px',
              padding: '0 10px',
              fontFamily: 'Open Sans',
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'center',
              background: item.status === 'Available' ? '#6ef153cc' : '#eae559cc',
              borderRadius: '5px'
            }}>{item.status}</div>
            <div style={{
              width: '48px',
              height: '32px',
              marginLeft: 'auto',
              background: '#fafbfd',
              border: '0.6px solid #d5d5d5',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/error.png" alt="action" style={{width: '16px'}}/>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{
        alignSelf: 'flex-end',
        marginRight: '46px',
        marginBottom: '30px'
      }}>
        <div style={{
          fontFamily: 'Nunito',
          fontSize: '16px',
          color: '#c91416',
          textAlign: 'center',
          marginBottom: '10px'
        }}>144 Total</div>
        
        <div style={{
          display: 'flex',
          gap: '14px',
          padding: '5px 10px',
          background: '#fff',
          borderRadius: '10px',
          alignItems: 'center'
        }}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/componen.png" alt="prev" style={{width: '30px', height: '30px'}}/>
          <div style={{
            width: '30px',
            height: '30px',
            background: '#c91416',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          }}>12</div>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/paginati.png" alt="next" style={{width: '30px', height: '30px'}}/>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        width: '100%',
        height: '60px',
        background: '#e6e6e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}>
        <span style={{fontFamily: 'Roboto', fontSize: '14px', color: '#191919'}}>
          Copyright @ 2023 Safelet. All rights reserved.
        </span>
        
        <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
          <span style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: '14px', color: '#5858fa'}}>
            Terms of Use
          </span>
          <div style={{width: '1px', height: '20px', background: '#000'}}/>
          <span style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: '14px', color: '#5858fa'}}>
            Privacy Policy
          </span>
        </div>

        <span style={{fontFamily: 'Roboto', fontSize: '14px', color: '#191919'}}>
          Hand Crafted & made with Love
        </span>
      </div>
    </div>
  );
};

export default ContentArea_Footer;

