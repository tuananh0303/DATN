import React from 'react';

interface ContentStatisticsCardsProps {
  style?: React.CSSProperties;
}

const Content_StatisticsCards: React.FC<ContentStatisticsCardsProps> = ({ style }) => {
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      backgroundColor: '#f5f6fa',
      minWidth: '100%',
      ...style
    }}>
      {/* Statistics Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '30px',
        padding: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {statisticsData.map((stat, index) => (
          <div key={index} style={{
            flex: '1 1 200px',
            backgroundColor: '#fff',
            borderRadius: '14px',
            border: '1px solid #979797',
            padding: '20px',
            position: 'relative',
            minWidth: '200px',
            maxWidth: '262px',
            height: '161px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              fontSize: '16px',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              color: '#202224',
              opacity: 0.7,
              marginBottom: '10px'
            }}>
              {stat.title}
            </div>
            <div style={{
              fontSize: '28px',
              fontFamily: 'Nunito Sans',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#202224',
              marginBottom: '10px'
            }}>
              {stat.value}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: stat.trendColor,
              fontSize: '16px',
              fontFamily: 'Nunito Sans',
              fontWeight: 600
            }}>
              <img src={stat.trendIcon} alt="trend" style={{ width: '24px', height: '24px' }} />
              <span>{stat.trend}</span>
            </div>
            <img 
              src={stat.icon} 
              alt="icon"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '60px',
                height: '60px'
              }}
            />
          </div>
        ))}
      </div>

      {/* User Registration Trends */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '1px solid #f1f1f1',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontFamily: 'Roboto',
            fontWeight: 500,
            color: '#191919',
            margin: 0
          }}>
            User Registration Trends
          </h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <div style={{
                width: '30px',
                height: '10px',
                backgroundColor: '#fa9e93'
              }}></div>
              <span style={{
                fontSize: '10px',
                fontFamily: 'Roboto',
                color: '#191919'
              }}>Users Count</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '5px 10px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              <span style={{
                fontSize: '13px',
                fontFamily: 'Roboto',
                color: '#000'
              }}>Week</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/drop-dow.png" alt="dropdown" style={{ width: '8px', height: '6px' }} />
            </div>
          </div>
        </div>
        <div style={{ height: '300px', backgroundImage: `url(https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/bg-lines.png)`, backgroundSize: 'cover' }}>
          {/* Chart would go here - using background image for demonstration */}
        </div>
      </div>

      {/* Line Chart */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '1px solid #f1f1f1',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/intetity.png" alt="facility" style={{ width: '16px', height: '16px' }} />
              <span style={{
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                color: '#000'
              }}>Facility</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/intetity-2.png" alt="field" style={{ width: '16px', height: '16px' }} />
              <span style={{
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                color: '#000'
              }}>Field</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/intetity-3.png" alt="service" style={{ width: '16px', height: '16px' }} />
              <span style={{
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                color: '#000'
              }}>Service</span>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}>
            <span style={{
              fontSize: '12px',
              fontFamily: 'Poppins',
              fontWeight: 500,
              color: '#000'
            }}>This Week</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/dropdown.png" alt="dropdown" style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
        <div style={{ height: '300px', backgroundImage: `url(https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/group-26.png)`, backgroundSize: 'cover' }}>
          {/* Line chart would go here - using background image for demonstration */}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        borderTop: '1px solid #e6e6e6',
        marginTop: '20px'
      }}>
        <span style={{
          fontSize: '14px',
          fontFamily: 'Roboto',
          color: '#191919'
        }}>Copyright @ 2023 Safelet. All rights reserved.</span>
        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <a href="#" style={{
            fontSize: '14px',
            fontFamily: 'Roboto',
            fontWeight: 700,
            color: '#5858fa',
            textDecoration: 'none'
          }}>Terms of Use</a>
          <div style={{ width: '1px', height: '20px', backgroundColor: '#000' }}></div>
          <a href="#" style={{
            fontSize: '14px',
            fontFamily: 'Roboto',
            fontWeight: 700,
            color: '#5858fa',
            textDecoration: 'none'
          }}>Privacy Policy</a>
        </div>
        <span style={{
          fontSize: '14px',
          fontFamily: 'Roboto',
          color: '#191919'
        }}>Hand Crafted & made with Love</span>
      </div>
    </div>
  );
};

export default Content_StatisticsCards;

