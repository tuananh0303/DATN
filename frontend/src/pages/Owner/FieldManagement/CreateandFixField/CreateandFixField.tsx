import React from 'react';

interface TopBarContentProps {
  style?: React.CSSProperties;
}

const CreateandFixField: React.FC<TopBarContentProps> = ({ style }) => {
  return (
    <div className="flex flex-col w-full min-w-[320px]" style={style}>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between h-[77px] bg-white border-b border-[#e8e8e8] px-5">
        <div className="flex items-center gap-5">
          <span className="font-roboto font-bold text-[32px] tracking-wider text-black">
            Quản lý sân
          </span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-2.png" alt="dropdown" className="w-3 h-[15px]" />
          <span className="font-roboto font-semibold text-[32px] tracking-wider text-[#126da6]">
            Tạo sân mới
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/vietnam.png" alt="vietnam" className="w-11 h-[42px]" />
            <div className="flex items-center gap-[9px]">
              <span className="font-nunito font-semibold text-sm text-[#646464]">
                Vietnamese
              </span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow.png" alt="dropdown" className="w-2 h-[5px]" />
            </div>
          </div>

          <div className="relative">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/notifica.png" alt="notification" className="w-[27px] h-[27px]" />
            <div className="absolute -top-2 -right-2 w-4 h-[18px] bg-[#f93c65] rounded-full flex items-center justify-center">
              <span className="font-nunito font-bold text-xs text-white">6</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/man-4380.png" alt="profile" className="w-11 h-12" />
            <div className="flex flex-col">
              <span className="font-nunito font-bold text-sm text-[#404040]">Moni Roy</span>
              <span className="font-nunito font-semibold text-xs text-[#565656]">Admin</span>
            </div>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/more.png" alt="more" className="w-[18px] h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 bg-[#f5f6fa] min-h-[calc(100vh-137px)]">
        <div className="bg-white rounded-md p-6 w-full max-w-[1120px] mx-auto">
          <h1 className="font-roboto font-semibold text-2xl tracking-wider mb-6">
            Thông tin sân
          </h1>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Form Field Components */}
            {[
              { label: "Chọn cơ sở áp dụng", type: "select", options: ["Sân cầu lông Phạm Kha"] },
              { label: "Chọn loại hình thể thao", type: "select", options: ["Cầu lông"] },
              { label: "Tên sân", type: "text", placeholder: "Có thể gợi ý tên sân tương tự như các tên đang có trong cơ sở" },
              { 
                label: "Mức giá", 
                type: "price", 
                options: ["Theo số tiền"],
                suffix: "đ/h"
              },
              { label: "Kích thước", type: "text", placeholder: "Có thể gợi ý tên sân tương tự như các tên đang có trong cơ sở" },
              { label: "Mặt sân", type: "text", placeholder: "Có thể gợi ý tên sân tương tự như các tên đang có trong cơ sở" },
              { label: "Trạng thái", type: "select", options: ["Đang hoạt động"] }
            ].map((field, index) => (
              <div key={index} className="flex items-center">
                <label className="w-[200px] font-roboto text-base text-[#191919]">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <div className="relative flex-1">
                    <select className="w-full py-3 px-4 border border-[#e0e0e0] rounded-lg text-base appearance-none bg-white">
                      {field.options?.map(option => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <img 
                      src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-3.png" 
                      alt="dropdown"
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                ) : field.type === "price" ? (
                  <div className="relative flex-1 flex items-center gap-2.5">
                    <div className="relative w-[150px]">
                      <select className="w-full py-3 px-4 border border-[#e0e0e0] rounded-lg text-base appearance-none bg-white">
                        {field.options?.map(option => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <img 
                        src="https://dashboard.codeparrot.ai/api/image/Z7ov8DHWD6EJo6v2/drop-dow-3.png" 
                        alt="dropdown"
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                    <input 
                      type="text"
                      className="flex-1 py-3 px-4 border border-[#e0e0e0] rounded-lg text-base"
                    />
                    <span className="text-[#191919] text-base">{field.suffix}</span>
                  </div>
                ) : (
                  <input 
                    type="text"
                    placeholder={field.placeholder}
                    className="flex-1 py-3 px-4 border border-[#e0e0e0] rounded-lg text-base"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2.5 mt-10">
            <button className="px-16 py-[18px] border border-[#448ff0] rounded-lg bg-white text-[#191919] text-xl cursor-pointer">
              Hủy
            </button>
            <button className="px-[69px] py-[18px] bg-[#448ff0] border border-[#448ff0] rounded-lg text-white text-xl font-semibold cursor-pointer">
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateandFixField;

