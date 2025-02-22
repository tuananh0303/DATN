import React from 'react';

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
      <div style={{
        width: '100%',
        maxWidth: '262px',
        height: '161px',
        backgroundColor: '#fff',
        borderRadius: '14px',
        border: '1px solid #979797',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <div style={{
              fontFamily: 'Nunito Sans',
              fontSize: '16px',
              fontWeight: 600,
              color: '#202224',
              opacity: 0.7,
              marginBottom: '8px'
            }}>
              {title}
            </div>
            <div style={{
              fontFamily: 'Nunito Sans',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#202224'
            }}>
              {value}
            </div>
          </div>
          <img 
            src={icon} 
            alt={title}
            style={{
              width: '60px',
              height: '60px'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <img 
            src={trend.icon}
            alt="trend"
            style={{
              width: '24px',
              height: '24px'
            }}
          />
          <span style={{
            fontFamily: 'Nunito Sans',
            fontSize: '16px',
            fontWeight: 600,
            color: trend.isUp ? '#00b69b' : '#f93c65'
          }}>
            {trend.value}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '30px',
      padding: '0 10px',
      minWidth: '1158px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default OverviewCards;

