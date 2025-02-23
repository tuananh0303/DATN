import React from 'react';

interface VoucherData {
  name: string;
  code: string;
  discountPercentage: string;
  amount: string;
  remain: string;
  maxDiscount: string;
  minPrice: string;
  status: string;
  usageTime: string;
}

const VoucherList: React.FC<{ vouchers?: VoucherData[] }> = ({ vouchers = [
  {
    name: 'Nguyễn Tuấn Anh',
    code: 'TA2607',
    discountPercentage: '10%',
    amount: '100',
    remain: '30',
    maxDiscount: '200.000đ',
    minPrice: '300.000đ',
    status: 'In Progress',
    usageTime: '20:00 05/12/2024 - 11:00 08/12/2024'
  },
  // Repeat similar data for other rows...
] }) => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    padding: '25px 20px',
    backgroundColor: '#448ff0b2',
    borderBottom: '1px solid #979797',
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '15px',
    color: '#000000'
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    padding: '14px 20px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #979797',
    alignItems: 'center',
    minHeight: '52px'
  };

  const actionButtonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    padding: '0 12px',
    backgroundColor: '#fafbfd',
    border: '0.6px solid #d5d5d5',
    borderRadius: '8px',
    height: '28px',
    alignItems: 'center'
  };

  const actionIconStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={{ 
      width: '100%',
      minWidth: '1121px',
      backgroundColor: '#fdfdfd',
      borderRadius: '15px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ flex: '1 0 178px', marginRight: '4px' }}>Voucher Name | Voucher Code</div>
        <div style={{ flex: '1 0 158px', marginRight: '4px' }}>Discount_percentage</div>
        <div style={{ flex: '1 0 61px', marginRight: '4px' }}>Amount</div>
        <div style={{ flex: '1 0 58px', marginRight: '4px' }}>Remain</div>
        <div style={{ flex: '1 0 103px', marginRight: '4px' }}>Max_discount</div>
        <div style={{ flex: '1 0 73px', marginRight: '4px' }}>Min_price</div>
        <div style={{ flex: '1 0 131px', marginRight: '4px' }}>Status | Usage time</div>
        <div style={{ flex: '1 0 80px' }}>Action</div>
      </div>

      {/* Rows */}
      {vouchers.map((voucher, index) => (
        <div key={index} style={rowStyle}>
          <div style={{ 
            flex: '1 0 178px', 
            marginRight: '4px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontSize: '14px'
          }}>
            {voucher.name}<br/>{voucher.code}
          </div>
          <div style={{ 
            flex: '1 0 158px', 
            marginRight: '4px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontSize: '14px'
          }}>{voucher.discountPercentage}</div>
          <div style={{ 
            flex: '1 0 61px', 
            marginRight: '4px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontSize: '14px'
          }}>{voucher.amount}</div>
          <div style={{ 
            flex: '1 0 58px', 
            marginRight: '4px',
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: '14px'
          }}>{voucher.remain}</div>
          <div style={{ 
            flex: '1 0 103px', 
            marginRight: '4px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontSize: '14px',
            textAlign: 'center'
          }}>{voucher.maxDiscount}</div>
          <div style={{ 
            flex: '1 0 73px', 
            marginRight: '4px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontSize: '14px',
            textAlign: 'center'
          }}>{voucher.minPrice}</div>
          <div style={{ 
            flex: '1 0 131px', 
            marginRight: '4px',
            fontFamily: 'Open Sans',
            fontWeight: 700,
            fontSize: '13px',
            lineHeight: '20px'
          }}>
            {voucher.status}<br/>{voucher.usageTime}
          </div>
          <div style={{ flex: '1 0 109px' }}>
            <div style={actionButtonStyle}>
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/error.png" 
                alt="Error" 
                style={actionIconStyle}
              />
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/edit.png" 
                alt="Edit" 
                style={{ ...actionIconStyle, width: '20px', height: '20px' }}
              />
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/bin.png" 
                alt="Delete" 
                style={actionIconStyle}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoucherList;

