import React from 'react';

interface DataPoint {
  day: string;
  users: number;
}

const RecentActivity: React.FC = () => {
  // Sample data for the chart
  const data: DataPoint[] = [
    { day: 'Monday', users: 400 },
    { day: 'Tuesday', users: 450 },
    { day: 'Wednesday', users: 400 },
    { day: 'Thursday', users: 200 },
    { day: 'Friday', users: 450 },
    { day: 'Saturday', users: 400 },
    { day: 'Sunday', users: 500 }
  ];

  // Calculate chart dimensions
  const chartWidth = 979;
  const chartHeight = 180;
  const maxValue = 2000;

  // Generate SVG path for the line chart
  const generatePath = () => {
    const points = data.map((point, index) => {
      const x = (index * (chartWidth - 40)) / (data.length - 1);
      const y = chartHeight - (point.users / maxValue) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div style={{
      width: '100%',
      minWidth: '300px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          margin: 0,
          fontFamily: 'Roboto',
          fontSize: '24px',
          fontWeight: 500,
          lineHeight: '28px',
          color: '#191919'
        }}>
          User Registration Trends
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <div style={{
            width: '30px',
            height: '10px',
            backgroundColor: '#fa9e93'
          }} />
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '10px',
            color: '#191919'
          }}>
            Users Count
          </span>
        </div>
      </div>

      <div style={{
        position: 'relative',
        height: '250px',
        marginTop: '20px'
      }}>
        {/* Y-axis labels */}
        <div style={{
          position: 'absolute',
          left: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingRight: '10px'
        }}>
          {[2000, 1000, 500, 400, 300, 200, 100].map((value) => (
            <span key={value} style={{
              fontFamily: 'Rubik',
              fontSize: '14px',
              color: '#808080'
            }}>
              {value}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div style={{
          marginLeft: '40px',
          height: '180px',
          backgroundImage: `url(https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/bg-lines.png)`,
          backgroundRepeat: 'repeat',
          position: 'relative'
        }}>
          <svg
            width={chartWidth}
            height={chartHeight}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <path
              d={generatePath()}
              stroke="#2D62ED"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div style={{
          marginLeft: '40px',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {data.map((point) => (
            <span key={point.day} style={{
              fontFamily: 'Rubik',
              fontSize: '14px',
              color: '#808080'
            }}>
              {point.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;

