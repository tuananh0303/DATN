import React from 'react';

interface ContentAreaFooterProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
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

const FieldManagement: React.FC<ContentAreaFooterProps> = ({ 
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
    <>
    <div className="flex flex-col w-full h-full pt-[90px] px-[46px] bg-[#f5f6fa]">
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-5 mb-[30px]">
        {/* Search */}
        <div className="w-full max-w-[540px] h-10 relative bg-white rounded-[19px] border border-[#d5d5d5]">
          <input 
            type="text"
            placeholder="Search by Fullname/ Email"
            className="w-full h-full px-[18px] border-none rounded-[19px] font-['Nunito_Sans'] text-sm opacity-50"
          />
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/search.png"
            alt="search"
            className="absolute right-[18px] top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        {/* Filter */}
        <div className="w-full max-w-[800px] h-[50px] flex items-center px-5 bg-[#f9f9fb] rounded-[10px] border border-[#d5d5d5]">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/filter-i.png" alt="filter" className="w-[42.75px] h-[50px]"/>
          
          <div className="flex items-center gap-10 flex-1">
            <div className="flex items-center gap-2.5">
              <span className="font-['Nunito_Sans'] font-semibold text-sm">Filter By</span>
              <div className="w-[1px] h-[50px] bg-[#979797] opacity-69"/>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-['Nunito_Sans'] font-semibold text-sm">Created_At</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-keybo.png" alt="dropdown" className="w-6"/>
              <div className="w-[1px] h-[50px] bg-[#979797] opacity-69"/>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-['Nunito_Sans'] font-semibold text-sm">Type Sport</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-keybo-2.png" alt="dropdown" className="w-6"/>
              <div className="w-[1px] h-[50px] bg-[#979797] opacity-69"/>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-['Nunito_Sans'] font-semibold text-sm">Status</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-keybo-3.png" alt="dropdown" className="w-6"/>
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/ic-repla.png" alt="reset" className="w-[18px]"/>
              <span className="font-['Nunito_Sans'] font-semibold text-sm text-[#ea0234]">Reset Filter</span>
            </div>
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="w-full max-w-[1109px] bg-[#fdfdfd] rounded-[15px] mb-[30px]">
        {/* Header */}
        <div className="flex px-5 py-6 bg-[#448ff0b2] border-b border-[#979797]">
          <div className="w-[75px] font-['Open_Sans'] font-bold text-[15px]">Field ID</div>
          <div className="w-[120px] font-['Open_Sans'] font-bold text-[15px]">Field Name</div>
          <div className="w-[125px] font-['Open_Sans'] font-bold text-[15px]">Facility Name</div>
          <div className="w-[105px] font-['Open_Sans'] font-bold text-[15px]">Created_At</div>
          <div className="w-[90px] font-['Open_Sans'] font-bold text-[15px]">Type Sport</div>
          <div className="w-[130px] font-['Open_Sans'] font-bold text-[15px] text-center">Price</div>
          <div className="w-[79px] font-['Open_Sans'] font-bold text-[15px] text-center">Status</div>
          <div className="w-[71px] font-['Open_Sans'] font-bold text-sm text-center">Action</div>
        </div>

        {/* List Items */}
        {data.map((item) => (
          <div key={item.id} className="flex px-5 py-3.5 border-b border-[#979797] bg-white">
            <div className="w-[75px] font-['Open_Sans'] font-semibold text-sm">{item.id}</div>
            <div className="w-[120px] font-['Open_Sans'] font-semibold text-sm">{item.fieldName}</div>
            <div className="w-[125px] font-['Open_Sans'] font-semibold text-sm">{item.facilityName}</div>
            <div className="w-[105px] font-['Open_Sans'] font-semibold text-sm">{item.createdAt}</div>
            <div className="w-[90px] font-['Open_Sans'] font-semibold text-sm">{item.typeSport}</div>
            <div className="w-[130px] font-['Nunito_Sans'] font-semibold text-sm text-center">{item.price}</div>
            <div className={`w-[85px] px-2.5 font-['Open_Sans'] font-semibold text-sm text-center rounded
              ${item.status === 'Available' ? 'bg-[#6ef153cc]' : 'bg-[#eae559cc]'}`}>
              {item.status}
            </div>
            <div className="w-12 h-8 ml-auto bg-[#fafbfd] border border-[#d5d5d5] rounded-lg flex items-center justify-center">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/error.png" alt="action" className="w-4"/>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="self-end mr-[46px] mb-[30px]">
        <div className="font-['Nunito'] text-base text-[#c91416] text-center mb-2.5">
          144 Total
        </div>
        
        <div className="flex gap-3.5 p-2.5 bg-white rounded-[10px] items-center">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/componen.png" alt="prev" className="w-[30px] h-[30px]"/>
          {[
            { num: 1, active: true },
            { num: 2, active: false },
            { num: 3, active: false },
            { num: '...', active: false },
            { num: 12, active: false }
          ].map((page, index) => (
            <div key={index} className={`w-[30px] h-[30px] flex items-center justify-center font-['Nunito'] text-base
              ${page.active ? 'bg-[#c91416] text-white' : 'text-[#737373]'} rounded-[10px]`}>
              {page.num}
            </div>
          ))}
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n5FjHWD6EJo6vE/paginati.png" alt="next" className="w-[30px] h-[30px]"/>
        </div>
      </div>

      
    </div>
    </>
  );
};

export default FieldManagement;

