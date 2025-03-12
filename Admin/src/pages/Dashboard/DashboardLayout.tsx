import React from 'react';

// FacilityList Types
interface Facility {
  facilityName: string;
  ownerName: string;
  createdAt: string;
  totalFields: number;
  location: string;
  status: 'Active' | 'Suspended';
}

// OverviewCards Types
interface CardProps {
  icon: string;
  title: string;
  value: string;
  trend: {
    value: string;
    isUp: boolean;
    icon: string;
  };
}

// DataPoint Type for RecentActivity
interface DataPoint {
  day: string;
  users: number;
}


const OverviewCards: React.FC = () => {
  const cards: CardProps[] = [
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/icon.png',
      title: 'Total User',
      value: '40,689',
      trend: {
        value: '8.5% Up from yesterday',
        isUp: true,
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/ic-trend.png'
      }
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/icon-2.png',
      title: 'Total Facility',
      value: '10293',
      trend: {
        value: '1.3% Up from past week',
        isUp: true,
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/ic-trend-2.png'
      }
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/icon-3.png',
      title: 'Total Field',
      value: '20000',
      trend: {
        value: '4.3% Down from yesterday',
        isUp: false,
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/ic-trend-3.png'
      }
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/icon-4.png',
      title: 'Total Service',
      value: '2040',
      trend: {
        value: '1.8% Up from yesterday',
        isUp: true,
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/ic-trend-4.png'
      }
    }
  ];

  const Card: React.FC<CardProps> = ({ icon, title, value, trend }) => {
    return (
      <div className="w-full max-w-[262px] h-[161px] bg-white rounded-[14px] border border-[#979797] p-5 flex flex-col justify-between box-border">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-roboto text-base font-semibold text-[#202224] opacity-70 mb-2">
              {title}
            </div>
            <div className="font-roboto text-[28px] font-bold tracking-[1px] text-[#202224]">
              {value}
            </div>
          </div>
          <img src={icon} alt={title} className="w-[60px] h-[60px]" />
        </div>
        <div className="flex items-center gap-2">
          <img src={trend.icon} alt="trend" className="w-6 h-6" />
          <span className={`font-roboto text-base font-semibold ${trend.isUp ? 'text-[#00b69b]' : 'text-[#f93c65]'}`}>
            {trend.value}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row gap-[30px] px-[10px] min-w-[1158px] flex-wrap justify-center">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

const RecentActivity: React.FC = () => {
  const data: DataPoint[] = [
    { day: 'Monday', users: 400 },
    { day: 'Tuesday', users: 450 },
    { day: 'Wednesday', users: 400 },
    { day: 'Thursday', users: 200 },
    { day: 'Friday', users: 450 },
    { day: 'Saturday', users: 400 },
    { day: 'Sunday', users: 500 }
  ];

  const chartWidth = 979;
  const chartHeight = 180;
  const maxValue = 2000;

  const generatePath = () => {
    const points = data.map((point, index) => {
      const x = (index * (chartWidth - 40)) / (data.length - 1);
      const y = chartHeight - (point.users / maxValue) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="w-full min-w-[300px] bg-white p-5 rounded-lg mb-5 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="m-0 font-roboto text-2xl font-medium leading-7 text-[#191919]">
          User Registration Trends
        </h2>
        <div className="flex items-center gap-[5px]">
          <div className="w-[30px] h-[10px] bg-[#fa9e93]" />
          <span className="font-roboto text-[10px] text-[#191919]">Users Count</span>
        </div>
      </div>

      <div className="relative h-[250px] mt-5">
        <div className="absolute left-0 h-full flex flex-col justify-between pr-[10px]">
          {[2000, 1000, 500, 400, 300, 200, 100].map((value) => (
            <span key={value} className="font-rubik text-sm text-[#808080]">{value}</span>
          ))}
        </div>

        <div className="ml-[40px] h-[180px] bg-[url('https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/bg-lines.png')] bg-repeat relative">
          <svg width={chartWidth} height={chartHeight} className="absolute top-0 left-0">
            <path d={generatePath()} stroke="#2D62ED" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="ml-[40px] mt-[10px] flex justify-between">
          {data.map((point) => (
            <span key={point.day} className="font-rubik text-sm text-[#808080]">{point.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const FacilitiesList: React.FC<{ facilities?: Facility[] }> = ({ facilities = [
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 2,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 2,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 2,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 5,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityName: 'Sân cầu lông ABCI',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 8,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  }
] }) => {
  return (
    <div className="flex flex-col bg-[#fdfdfd] rounded-[15px] w-full box-border">
      <div className="flex flex-row p-[10px_20px] bg-[#448ff0b2] border border-[#979797] min-w-full box-border">
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Facility Name</div>
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Owner Name</div>
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Created_At</div>
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Total Fields</div>
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Location</div>
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Status</div>
        <div className="font-sans font-bold text-[15px] text-black flex-1 text-center">Action</div>
      </div>

      {facilities.map((facility, index) => (
        <div key={index} className="flex flex-row p-[10px_20px] bg-white border border-[#979797] min-w-full box-border">
          <div className="font-sans font-semibold text-[14px] text-black flex-1 text-center">{facility.facilityName}</div>
          <div className="font-sans font-semibold text-[14px] text-black flex-1 text-center">{facility.ownerName}</div>
          <div className="font-sans font-semibold text-[14px] text-black flex-1 text-center">{facility.createdAt}</div>
          <div className="font-sans font-semibold text-[14px] text-black flex-1 text-center">{facility.totalFields}</div>
          <div className="font-sans font-semibold text-[14px] text-black flex-1 text-center">{facility.location}</div>
          <div className={`w-[85px] h-[20px] ${facility.status === 'Active' ? 'bg-[#6ef153b2]' : 'bg-[#eae559b2]'} rounded-[10px] flex items-center justify-center mx-auto`}>
            <span className="font-sans font-semibold text-[14px] text-black">{facility.status}</span>
          </div>
          <div className="flex-1 flex justify-center">
            <button className="w-[48px] h-[32px] bg-[#fafbfd] rounded-[8px] border-[0.6px] border-[#d5d5d5] flex items-center justify-center cursor-pointer">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/error.png" alt="action" className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <div className="font-sans flex flex-col gap-6 p-6">      
      <OverviewCards />
      <RecentActivity />
      <FacilitiesList />
    </div>
  );
};

export default DashboardLayout; 