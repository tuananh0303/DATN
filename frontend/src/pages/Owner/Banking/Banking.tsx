import React, { useState } from 'react';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isVerified: boolean;
  status: string;
}

const Banking: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'TECHCOMBANK - NHTMCP Kỹ Thương Việt Nam',
      accountNumber: '0019',
      accountHolder: 'NGUYEN TUAN ANH',
      isVerified: true,
      status: 'MẶC ĐỊNH'
    }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tài khoản ngân hàng</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Add New Bank Account Card */}
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </div>
          <span className="text-gray-600">Thêm tài khoản ngân hàng</span>
        </div>

        {/* Bank Account Cards */}
        {bankAccounts.map((account) => (
          <div 
            key={account.id} 
            className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-2">
                <img 
                  src="/path-to-bank-logo.png" 
                  alt={account.bankName}
                  className="w-8 h-8"
                />
                <h3 className="font-medium">{account.bankName}</h3>
              </div>
              {account.isVerified && (
                <div className="flex items-center gap-1 text-sm text-emerald-400">
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  Đã kiểm tra
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="text-xl">★</span>
              ))}
              <span className="text-xl">{account.accountNumber}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg tracking-wider">{account.accountHolder}</span>
              <span className="px-2 py-1 bg-emerald-400/20 text-emerald-400 rounded text-sm">
                {account.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banking; 