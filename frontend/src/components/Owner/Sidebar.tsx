import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  style?: React.CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ style }) => {
  return (
    <div className="sidebar" style={style}>
      <div className="logo-section">
        <div className="frame-37153">
          <img
            src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/frame-37-2.png"
            alt="Logo"
          />
        </div>
        <img
          src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/frame.png"
          alt="Frame"
          className="frame-logo"
        />
      </div>
      <div className="divider" />

      <div className="menu-container">
        <div className="menu-item active">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector.png"
              alt="Calendar"
            />
          </div>
          <span>Lịch đặt sân</span>
        </div>

        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/factory.png"
              alt="Facility"
            />
          </div>
          <span>Quản lý cơ sở</span>
        </div>

        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/field.png"
              alt="Field"
            />
          </div>
          <span>Quản lý sân</span>
        </div>

        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector-2.png"
              alt="Service"
            />
          </div>
          <span>Quản lý dịch vụ</span>
        </div>

        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector-3.png"
              alt="Voucher"
            />
          </div>
          <span>Quản lý voucher</span>
        </div>

        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector-4.png"
              alt="Ads"
            />
          </div>
          <span>quảng cáo sự kiện</span>
        </div>

        <div className="menu-section">
          <div className="section-header">
            <span>Chăm sóc khách hàng</span>
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/drop-dow-6.png"
              alt="Dropdown"
            />
          </div>

          <div className="menu-item">
            <div className="icon">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/message.png"
                alt="Chat"
              />
            </div>
            <span>quản lý chat</span>
          </div>

          <div className="menu-item">
            <div className="icon">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector-5.png"
                alt="Review"
              />
            </div>
            <span>quản lý đánh giá</span>
          </div>
        </div>

        <div className="menu-section">
          <div className="section-header">
            <span>tài chính</span>
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/drop-dow-7.png"
              alt="Dropdown"
            />
          </div>

          <div className="menu-item">
            <div className="icon">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector-6.png"
                alt="Revenue"
              />
            </div>
            <span>doanh thu</span>
          </div>

          <div className="menu-item">
            <div className="icon">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/group.png"
                alt="Bank"
              />
            </div>
            <span>Tài khoản ngân hàng</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="bottom-menu">
        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/frame-37.png"
              alt="Support"
            />
          </div>
          <span>Hỗ trợ liên hệ</span>
        </div>

        <div className="menu-item delete-account">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/bin.png"
              alt="Delete"
            />
          </div>
          <span>xóa tài khoản</span>
        </div>

        <div className="menu-item">
          <div className="icon">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/vector-8.png"
              alt="Logout"
            />
          </div>
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  style: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "236px",
    height: "auto",
  },
};

export default Sidebar;
