import React from 'react';
import './Header_FacilityList_Footer.css';

interface Facility {
  name: string;
  location: string;
  openingHours: string;
  status: 'active' | 'maintenance' | 'pending';
  image: string;
}

const Header_FacilityList_Footer: React.FC = () => {
  const facilities: Facility[] = [
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'active',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh', 
      openingHours: '5:00 - 23:00',
      status: 'active',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-2.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'maintenance',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-3.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Bình Chánh, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'pending',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-4.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha', 
      location: 'Bình Chánh, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'maintenance',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-5.png'
    }
  ];

  return (
    <div className="container">
      <div className="title-section">
        <h1>Cơ sở thể thao của bạn</h1>
        <button className="create-button">Tạo cơ sở mới</button>
      </div>

      <div className="filter-section">
        <div className="filter-active">Tất cả cơ sở</div>
        <div className="filter-item">Đang hoạt động</div>
        <div className="filter-item">Đang bảo trì</div>
        <div className="filter-item">Đang chờ phê duyệt</div>
      </div>

      <div className="facilities-list">
        <div className="list-header">
          <div className="header-item">Cơ sở</div>
          <div className="header-item">Vị trí</div>
          <div className="header-item">Giờ mở cửa</div>
          <div className="header-item">Trạng thái</div>
          <div className="header-item">Thao tác</div>
        </div>

        {facilities.map((facility, index) => (
          <div key={index} className="facility-row">
            <div className="facility-info">
              <img src={facility.image} alt="Facility" className="facility-image" />
              <span>{facility.name}</span>
            </div>
            <div className="facility-location">{facility.location}</div>
            <div className="facility-hours">{facility.openingHours}</div>
            <div className={`facility-status ${facility.status}`}>
              {facility.status === 'active' && 'Đang hoạt động'}
              {facility.status === 'maintenance' && 'Đang bảo trì'}
              {facility.status === 'pending' && 'Đang chờ phê duyệt'}
            </div>
            <div className="facility-actions">
              <button className="action-button">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/edit.png" alt="Edit" />
              </button>
              <div className="action-divider"></div>
              <button className="action-button">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/bin.png" alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <span>Copyright © 2023 Safelet. All rights reserved.</span>
          <div className="footer-links">
            <a href="#">Terms of Use</a>
            <div className="footer-divider"></div>
            <a href="#">Privacy Policy</a>
          </div>
          <span>Hand Crafted & made with Love</span>
        </div>
      </footer>
    </div>
  );
};

export default Header_FacilityList_Footer;

