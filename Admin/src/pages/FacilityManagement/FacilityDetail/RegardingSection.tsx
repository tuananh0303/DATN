import React from 'react';

interface RegardingSectionProps {
  className?: string;
}

const RegardingSection: React.FC<RegardingSectionProps> = ({ className }) => {
  const data = [
    {
      id: '0001',
      name: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      typeSport: 'Tennis',
      price: '200.000đ/h',
      status: 'Available',
    },
    {
      id: '0002',
      name: 'Dương Văn Nghĩa',
      createdAt: '14/07/2024',
      typeSport: 'Football',
      price: '200.000đ/h',
      status: 'Available',
    },
    {
      id: '0003',
      name: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      typeSport: 'Badminton',
      price: '200.000đ/h',
      status: 'Suspended',
    },
    {
      id: '0004',
      name: 'Dương Văn Nghĩa',
      createdAt: '14/07/2024',
      typeSport: 'Tennis, Badminton',
      price: '200.000đ/h',
      status: 'Suspended',
    },
    {
      id: '0005',
      name: 'Dương Văn Nghĩa',
      createdAt: '14/07/2024',
      typeSport: 'Football',
      price: '200.000đ/h',
      status: 'Available',
    },
  ];

  const tabs = ['Field', 'Service', 'Voucher', 'Review', 'Event'];
  const [activeTab, setActiveTab] = React.useState('Field');

  return (
    <div className={`w-full min-w-[945px] flex flex-col gap-5 ${className || ''}`}>
      <h1 className="text-2xl font-semibold font-sans text-center m-0">
        REGARDING
      </h1>

      <div className="flex flex-row gap-2.5 justify-start">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded border border-[#d5d5d5] cursor-pointer min-w-[100px] text-center
              ${activeTab === tab ? 'bg-[#4880ff21]' : 'bg-[#fcfdfd]'}`}
          >
            <span className={`text-xs font-sans font-normal
              ${activeTab === tab ? 'text-[#4880ff]' : 'text-[#2b3034a6]'}`}>
              {tab}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#fdfdfd] rounded-[15px] w-full overflow-x-auto">
        <div className="flex flex-row px-5 py-6 bg-[#448ff0b2] border-b border-[#979797]">
          <div className="w-[75px] font-['Open_Sans'] font-bold text-[15px]">Field ID</div>
          <div className="w-[120px] font-['Open_Sans'] font-bold text-[15px]">Field Name</div>
          <div className="w-[90px] font-['Open_Sans'] font-bold text-[15px]">Created_At</div>
          <div className="w-[90px] font-['Open_Sans'] font-bold text-[15px]">Type Sport</div>
          <div className="w-[100px] font-['Open_Sans'] font-bold text-[15px]">Price</div>
          <div className="w-[68px] font-['Open_Sans'] font-bold text-[15px]">Status</div>
          <div className="w-[50px] font-['Open_Sans'] font-bold text-[15px]">Action</div>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-row px-5 py-3.5 bg-white border-b border-[#979797]"
          >
            <div className="w-[75px] font-['Open_Sans'] font-semibold text-sm">{item.id}</div>
            <div className="w-[120px] font-['Open_Sans'] font-semibold text-sm">{item.name}</div>
            <div className="w-[90px] font-['Open_Sans'] font-semibold text-sm">{item.createdAt}</div>
            <div className="w-[90px] font-['Open_Sans'] font-semibold text-sm">{item.typeSport}</div>
            <div className="w-[100px] font-['Nunito_Sans'] font-semibold text-sm">{item.price}</div>
            <div className={`w-[85px] px-2.5 rounded-[10px] text-center font-['Open_Sans'] font-semibold text-sm
              ${item.status === 'Available' ? 'bg-[#6ef153cc]' : 'bg-[#eae559cc]'}`}>
              {item.status}
            </div>
            <div className="w-12 h-8 bg-[#fafbfd] rounded-lg border border-[#d5d5d5] flex items-center justify-center cursor-pointer">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/error.png" alt="info" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <span className="text-[#c91416] font-['Nunito'] text-base">20 Total</span>
        <div className="flex flex-row gap-3.5 p-2.5 bg-white rounded-[10px]">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/componen.png" alt="prev" className="w-[30px] h-[30px] cursor-pointer" />
          
          {[1, 2, 3, '...', 6].map((page, index) => (
            <div
              key={index}
              className={`w-[30px] h-[30px] rounded-[10px] flex items-center justify-center font-['Nunito'] text-base cursor-pointer
                ${page === 1 ? 'bg-[#c91416] text-white' : 'bg-white text-[#737373]'}`}
            >
              {page}
            </div>
          ))}
          
          <img src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/paginati.png" alt="next" className="w-[30px] h-[30px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default RegardingSection;

