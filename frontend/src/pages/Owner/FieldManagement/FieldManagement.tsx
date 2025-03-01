import React from 'react';

const FieldManagement: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center h-[77px] bg-white border-b border-[#e8e8e8] px-[31px]">
        <h1 className="text-[32px] font-bold font-roboto tracking-wider m-0">
          Quản lý sân
        </h1>
        
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/notifica.png" alt="notifications" className="w-[27px] h-[27px]" />
            <div className="absolute -top-[9px] -right-[9px] w-4 h-[18px] bg-[#f93c65] rounded-full flex items-center justify-center text-white text-xs font-bold">
              6
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-[9px]">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/vietnam.png" alt="flag" className="w-11 h-[42px]" />
              <div className="flex items-center gap-2">
                <span className="font-nunito font-semibold text-sm text-[#646464]">Vietnamese</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/drop-dow.png" alt="dropdown" className="w-2" />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/man-4380.png" alt="profile" className="w-11 h-12" />
              <div>
                <div className="font-nunito font-bold text-sm text-[#404040]">Moni Roy</div>
                <div className="font-nunito font-semibold text-xs text-[#565656]">Admin</div>
              </div>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/more.png" alt="more" className="w-[18px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-[34px_38px] bg-[#f5f6fa]">
        {/* Promotional Banner */}
        <div className="bg-white p-[27px_24px] rounded-md mb-[34px] flex justify-between flex-wrap">
          <div className="flex-[1_1_300px] mb-5">
            <h2 className="text-[35px] font-bold font-roboto tracking-wider m-0 mb-[23px]">
              Tạo thêm sân trong cơ sở của bạn nào!!!
            </h2>
            <p className="text-base font-roboto tracking-wider m-0 mb-14">
              Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.
            </p>
            <button className="bg-[#cc440a] text-white rounded-md px-5 py-2.5 text-2xl font-semibold cursor-pointer flex items-center gap-[13px]">
              Tạo sân ngay!
              <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/vector.png" alt="arrow" className="w-8" />
            </button>
          </div>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/image.png" alt="field" className="w-[599px] h-[259px] flex-[1_1_300px]" />
        </div>

        {/* Court List Section */}
        <div className="bg-white p-9 rounded-md">
          <h3 className="text-xl font-bold font-roboto tracking-wider m-0 mb-7">
            Danh sách sân
          </h3>

          {/* Search Dropdown */}
          <div className="border border-black/70 rounded-[15px] px-5 py-3 flex justify-between items-center mb-7">
            <span className="text-lg font-roboto font-normal">Sân cầu lông Phạm Kha</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/drop-dow-2.png" alt="dropdown" className="w-[15px]" />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-[35px] mb-7 flex-wrap">
            <span className="text-lg font-roboto font-medium text-[#448ff0] cursor-pointer">Tất cả</span>
            {['Đang hoạt động', 'Đang chờ phê duyệt', 'Đang bảo trì'].map((text) => (
              <span key={text} className="text-lg font-roboto font-normal cursor-pointer">
                {text}
              </span>
            ))}
          </div>

          {/* Table Header */}
          <div className="bg-[#448ff033] rounded-md px-2.5 py-[22px] flex mb-5">
            <span className="flex-3 font-opensans font-bold text-[15px]">Tên sân</span>
            <span className="flex-2 font-opensans font-bold text-[15px]">Giá</span>
            <span className="flex-3 font-opensans font-bold text-[15px]">Loại hình thể thao</span>
            <span className="flex-3 font-opensans font-bold text-[15px]">Trạng thái</span>
            <span className="flex-1 font-opensans font-bold text-[15px]">Thao tác</span>
          </div>

          {/* Table Rows */}
          {[
            { status: 'Đang hoạt động', statusColor: '#20b202' },
            { status: 'Đang chờ phê duyệt', statusColor: '#b29802' },
            { status: 'Đang bảo trì', statusColor: '#cd1010' }
          ].map((item, index) => (
            <div key={index} className="border border-[#9a9a9a]/50 rounded-md px-4 py-5 flex mb-2.5">
              <span className="flex-3 font-opensans font-bold text-sm">Nguyễn Tuấn Anh</span>
              <span className="flex-2 font-opensans text-sm">15.000đ/h</span>
              <span className="flex-3 font-opensans font-semibold text-sm">Cầu lông</span>
              <span className="flex-3 font-opensans font-bold text-sm" style={{color: item.statusColor}}>{item.status}</span>
              <div className="flex-1 flex gap-4">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/edit.png" alt="edit" className="w-5 cursor-pointer" />
                <img src="https://dashboard.codeparrot.ai/api/image/Z7otkzHWD6EJo6v1/bin.png" alt="delete" className="w-[17px] cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="h-[60px] bg-[#e6e6e6] flex items-center justify-between px-[38px]">
        <span className="font-roboto text-sm text-[#191919]">
          Copyright @ 2023 Safelet. All rights reserved.
        </span>
        
        <div className="flex gap-4 items-center">
          <a href="#" className="font-roboto text-sm font-bold text-[#5858fa] no-underline">Terms of Use</a>
          <div className="w-[1px] h-5 bg-black"></div>
          <a href="#" className="font-roboto text-sm font-bold text-[#5858fa] no-underline">Privacy Policy</a>
        </div>

        <span className="font-roboto text-sm text-[#191919]">
          Hand Crafted & made with Love
        </span>
      </div>
    </div>
  );
};

export default FieldManagement;

