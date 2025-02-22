import React from 'react';
import './TopNavigationBar.css';

const TopNavigationBar: React.FC = () => {
  return (
    <div className="top-navigation-bar">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Tìm kiếm cơ sở theo tên hoặc địa điểm"
          className="search-input"
        />
        <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/search.png" alt="Search" className="search-icon" />
      </div>
      
      <div className="right-section">
        <div className="notification-container">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/notifica.png" alt="Notifications" className="notification-icon" />
          <div className="notification-badge">
            <span>6</span>
          </div>
        </div>
        
        <div className="language-selector">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/vietnam.png" alt="Vietnam" className="flag-icon" />
          <div className="language-text">
            <span>Vietnamese</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/drop-dow.png" alt="Dropdown" className="dropdown-icon" />
          </div>
        </div>

        <div className="profile-section">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/man-4380.png" alt="Profile" className="profile-image" />
          <div className="profile-info">
            <div className="profile-name">Moni Roy</div>
            <div className="profile-role">Admin</div>
          </div>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/more.png" alt="More" className="more-icon" />
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;

