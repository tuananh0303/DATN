import React, { useState } from 'react';

// SearchBar Component
interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch = () => {},
  placeholder = "Search by Voucher Name/ Code"
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-[540px] h-10 relative bg-white rounded-[19px] border-[0.6px] border-[#d5d5d5] flex items-center px-[18px] box-border">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className="flex-1 border-none outline-none bg-transparent text-sm font-nunito text-[#202224] opacity-50"
      />
      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/search.png"
        alt="search"
        className="w-[19.87px] h-[22.12px] opacity-60 cursor-pointer"
      />
    </div>
  );
};

// VoucherList Component
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
] }) => {
  return (
    <div className="w-full min-w-[1121px] bg-[#fdfdfd] rounded-[15px] overflow-hidden">
      {/* Header */}
      <div className="flex flex-row px-5 py-[25px] bg-[#448ff0b2] border-b border-[#979797] font-opensans font-bold text-[15px] text-black">
        <div className="flex-[1_0_178px] mr-1">Voucher Name | Voucher Code</div>
        <div className="flex-[1_0_158px] mr-1">Discount_percentage</div>
        <div className="flex-[1_0_61px] mr-1">Amount</div>
        <div className="flex-[1_0_58px] mr-1">Remain</div>
        <div className="flex-[1_0_103px] mr-1">Max_discount</div>
        <div className="flex-[1_0_73px] mr-1">Min_price</div>
        <div className="flex-[1_0_131px] mr-1">Status | Usage time</div>
        <div className="flex-[1_0_80px]">Action</div>
      </div>

      {/* Rows */}
      {vouchers.map((voucher, index) => (
        <div key={index} className="flex flex-row px-5 py-[14px] bg-white border-b border-[#979797] items-center min-h-[52px]">
          <div className="flex-[1_0_178px] mr-1 font-opensans font-semibold text-sm">
            {voucher.name}<br/>{voucher.code}
          </div>
          <div className="flex-[1_0_158px] mr-1 font-opensans font-semibold text-sm">
            {voucher.discountPercentage}
          </div>
          <div className="flex-[1_0_61px] mr-1 font-opensans font-semibold text-sm">
            {voucher.amount}
          </div>
          <div className="flex-[1_0_58px] mr-1 font-nunito font-semibold text-sm">
            {voucher.remain}
          </div>
          <div className="flex-[1_0_103px] mr-1 font-opensans font-semibold text-sm text-center">
            {voucher.maxDiscount}
          </div>
          <div className="flex-[1_0_73px] mr-1 font-opensans font-semibold text-sm text-center">
            {voucher.minPrice}
          </div>
          <div className="flex-[1_0_131px] mr-1 font-opensans font-bold text-[13px] leading-5">
            {voucher.status}<br/>{voucher.usageTime}
          </div>
          <div className="flex-[1_0_109px]">
            <div className="flex gap-4 px-3 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg h-7 items-center">
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/error.png" 
                alt="Error" 
                className="w-4 h-4 cursor-pointer"
              />
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/edit.png" 
                alt="Edit" 
                className="w-5 h-5 cursor-pointer"
              />
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/bin.png" 
                alt="Delete" 
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Pagination Component
interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 12,
  totalItems = 14,
  onPageChange = () => {},
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const displayPages = [1, 2, 3, '...', 12];

    for (let i = 0; i < displayPages.length; i++) {
      const page = displayPages[i];
      pages.push(
        <div
          key={i}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`
            w-[30px] h-[30px] flex items-center justify-center rounded-[10px]
            ${typeof page === 'number' ? 'cursor-pointer' : 'cursor-default'}
            ${currentPage === page ? 'bg-[#c91416] text-white' : 'bg-white text-[#737373]'}
            font-nunito text-base leading-[19px] font-normal p-[10px] m-[5px] select-none
          `}
        >
          {page}
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-[10px] min-w-[314px] h-[69px] items-center">
      <div className="text-[#c91416] font-nunito text-base leading-[19px] font-normal">
        {totalItems} Total
      </div>
      <div className="flex flex-row items-center gap-[14px] px-[10px] bg-white rounded-[10px] h-10 justify-center">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/componen.png"
          alt="Previous"
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />
        {renderPageNumbers()}
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/paginati.png"
          alt="Next"
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};


// Main ContentVoucher Component
const VoucherManagement: React.FC = () => {
  return (
    <div className="min-h-screen flex-grow p-5 bg-[#f5f6fa]">        
      {/* Search Bar */}
      <div className="mb-5">
        <SearchBar />
      </div>
      {/* Tabs */}
      <div className="flex justify-between mb-5">
        <div className="flex gap-[10px]">
          <button className="px-5 py-[10px] rounded-md bg-[#e0e0e0] border-none cursor-pointer">All</button>
          <button className="px-5 py-[10px] rounded-md bg-[#e0e0e0] border-none cursor-pointer">In progress</button>
          <button className="px-5 py-[10px] rounded-md bg-[#e0e0e0] border-none cursor-pointer">Coming soon</button>
          <button className="px-5 py-[10px] rounded-md bg-[#e0e0e0] border-none cursor-pointer">Finished</button>
        </div>
        <button className="px-5 py-[10px] rounded-md bg-[#ff7f50] border-none text-white cursor-pointer">
          Create Voucher
        </button>
      </div>

      {/* Voucher List */}
      <div className="flex-grow mb-5">
        <VoucherList />
      </div>

      {/* Pagination */}
      <div className="flex-none mb-5">
        <Pagination />
      </div>
    </div>
  );
};

export default VoucherManagement; 