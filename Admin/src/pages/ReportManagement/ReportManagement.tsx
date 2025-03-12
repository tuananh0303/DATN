import React from 'react';

interface ContentStatisticsCardsProps {
  className?: string;
  
}

const ReportManagement: React.FC<ContentStatisticsCardsProps> = ({ className }) => {
  const statisticsData = [
    {
      title: 'Total Users',
      value: '40,689',
      trend: '8.5% Up from yesterday',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/icon.png',
      trendIcon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/ic-trend.png',
      trendColor: '#00b69b'
    },
    {
      title: 'Total Facilities',
      value: '10293',
      trend: '1.3% Up from past week',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/icon-2.png', 
      trendIcon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/ic-trend-2.png',
      trendColor: '#00b69b'
    },
    {
      title: 'Total Fields',
      value: '10000',
      trend: '4.3% Down from yesterday',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/icon-3.png',
      trendIcon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/ic-trend-3.png',
      trendColor: '#f93c65'
    },
    {
      title: 'Total Service',
      value: '2040',
      trend: '1.8% Up from yesterday',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/icon-4.png',
      trendIcon: 'https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/ic-trend-4.png',
      trendColor: '#00b69b'
    }
    
  ];

  return (
    <>
    
    <div className={`flex flex-col p-5 bg-[#f5f6fa] min-w-full ${className}`}>
      {/* Statistics Cards */}
      <div className="flex flex-row gap-[30px] p-2.5 mb-[30px] flex-wrap justify-center">
        {statisticsData.map((stat, index) => (
          <div key={index} className="flex-[1_1_200px] bg-white rounded-[14px] border border-[#979797] p-5 relative min-w-[200px] max-w-[262px] h-[161px] box-border">
            <div className="text-base font-['Nunito_Sans'] font-semibold text-[#202224] opacity-70 mb-2.5">
              {stat.title}
            </div>
            <div className="text-[28px] font-['Nunito_Sans'] font-bold tracking-[1px] text-[#202224] mb-2.5">
              {stat.value}
            </div>
            <div className="flex items-center gap-2" style={{ color: stat.trendColor }}>
              <img src={stat.trendIcon} alt="trend" className="w-6 h-6" />
              <span className="text-base font-['Nunito_Sans'] font-semibold">{stat.trend}</span>
            </div>
            <img 
              src={stat.icon} 
              alt="icon"
              className="absolute top-5 right-5 w-[60px] h-[60px]"
            />
          </div>
        ))}
      </div>

      {/* User Registration Trends */}
      <div className="bg-white rounded border border-[#f1f1f1] p-5 mb-[30px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-sans font-medium text-[#191919] m-0">
            User Registration Trends
          </h2>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-[30px] h-2.5 bg-[#fa9e93]"></div>
              <span className="text-[10px] font-sans text-[#191919]">Users Count</span>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-1.5 bg-white rounded cursor-pointer">
              <span className="text-[13px] font-sans text-black">Week</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/drop-dow.png" alt="dropdown" className="w-2 h-1.5" />
            </div>
          </div>
        </div>
        <div className="h-[300px] bg-[url('https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/bg-lines.png')] bg-cover">
          {/* Chart would go here */}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded border border-[#f1f1f1] p-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-5">
            {[
              { icon: 'intetity.png', label: 'Facility' },
              { icon: 'intetity-2.png', label: 'Field' },
              { icon: 'intetity-3.png', label: 'Service' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <img 
                  src={`https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/${item.icon}`} 
                  alt={item.label.toLowerCase()} 
                  className="w-4 h-4" 
                />
                <span className="text-xs font-['Poppins'] font-medium text-black">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2.5 cursor-pointer">
            <span className="text-xs font-['Poppins'] font-medium text-black">This Week</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/dropdown.png" alt="dropdown" className="w-6 h-6" />
          </div>
        </div>
        <div className="h-[300px] bg-[url('https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/group-26.png')] bg-cover">
          {/* Line chart would go here */}
        </div>
      </div>

    </div>
    </>
  );
};

export default ReportManagement;

