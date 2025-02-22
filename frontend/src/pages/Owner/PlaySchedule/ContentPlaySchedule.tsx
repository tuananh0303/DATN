import React from 'react';
import './ContentPlaySchedule.css';

interface ContentProps {
  style?: React.CSSProperties;
}

const Content: React.FC<ContentProps> = ({ style }) => {
  return (
    <div className="content" style={style}>
      {/* Top Navigation Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <h1 className="title">Lịch đặt sân</h1>
          
          <div className="right-section">
            <div className="language-selector">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vietnam.png" alt="Vietnam flag" />
              <div className="language">
                <span>Vietnamese</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/drop-dow.png" alt="Dropdown" />
              </div>
            </div>

            <div className="notification">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/notifica.png" alt="Notification" />
              <div className="notification-badge">
                <span>6</span>
              </div>
            </div>

            <div className="profile">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/man-4380.png" alt="Profile" className="avatar" />
              <div className="profile-info">
                <span className="name">Moni Roy</span>
                <span className="role">Admin</span>
              </div>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/more.png" alt="More" className="more-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="search-section">
          <div className="venue-selector">
            <select className="venue-select">
              <option>Sân cầu lông Phạm Kha</option>
            </select>
            <select className="court-select">
              <option>Cầu lông</option>
            </select>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm tên người chơi" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/search.png" alt="Search" />
          </div>

          <div className="date-selector">
            <button className="today-btn">Hôm nay</button>
            <div className="date-picker">
              <span>02/10/2024</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/drop-dow-5.png" alt="Calendar" />
            </div>
          </div>

          <button className="book-btn">Đặt sân</button>
          <span className="history-link">Lịch sử đặt sân</span>
        </div>

        <div className="schedule-grid">
          <div className="court-headers">
            <div className="time-header">Thời gian/sân</div>
            {[1, 2, 3, 4, 5, 6, 7].map(court => (
              <div key={court} className="court-header">
                <div className="court-indicator">
                  <div className="court-status"></div>
                  <span>Sân {court}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="time-slots">
            {/* Time slots will be rendered here */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span className="copyright">Copyright @ 2023 Safelet. All rights reserved.</span>
          <div className="footer-links">
            <a href="#">Terms of Use</a>
            <span className="divider">|</span>
            <a href="#">Privacy Policy</a>
          </div>
          <span className="made-with">Hand Crafted & made with Love</span>
        </div>
      </footer>
    </div>
  );
};

Content.defaultProps = {
  style: {},
};

export default Content;

