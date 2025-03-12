import React from 'react';

interface ContentProps {
  title?: string;
  description?: string;
  fieldId?: string;
  ownerName?: string;
  email?: string;
  facilityName?: string;
  createdAt?: string;
  updatedAt?: string;
  price?: string;
  dimension?: string;
  yardSurface?: string;
  totalReview?: string;
  avgReview?: string;
  typeSport?: string;
  location?: string;
  images?: string[];
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const FieldDetailManagement: React.FC<ContentProps> = ({
  title = "Sân A",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad laborum.",
  fieldId = "123",
  ownerName = "Nguyễn Tuấn Anh", 
  email = "anhhello564@gmail.com",
  facilityName = "Sân Cầu Lông Phạm Kha",
  createdAt = "24/12/2024",
  updatedAt = "24/12/2024",
  price = "200.000đ /h",
  dimension = "4.8",
  yardSurface = "4.8",
  totalReview = "20",
  avgReview = "4.8",
  typeSport = "Badminton",
  location = "Số 34 Đường 3/2 quận 10 tp Hồ Chí Minh",
  images = [
    "https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/frame-37.png",
    "https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/frame-37-2.png",
    "https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/frame.png"
  ],
}) => {
  return (
    <>

      {/* Main Content */}
      <div className="w-full min-h-screen bg-[#f5f6fa] p-[18px_50px]">
        {/* Breadcrumb */}
        <div className="flex flex-row gap-1 items-center mb-5">
          <span className="text-[#3d4d54] text-sm uppercase">FACILITY MANAGEMENT</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/icons.png" alt="arrow" className="w-4 h-4" />
          <span className="text-[#3d4d54] text-sm uppercase">FACILITY DETAIL</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oJylCHtJJZ6wCn/icons-2.png" alt="arrow" className="w-4 h-4" />
          <span className="text-[#126da6] text-sm uppercase">Field detail</span>
        </div>

        {/* Main Content Box */}
        <div className="max-w-[1014px] bg-white p-7 mb-[26px] shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg">
          <div className="flex flex-row items-center justify-center gap-[10px] mb-5">
            <h1 className="text-[32px] font-bold m-0">{title}</h1>
            <div className="bg-[#6ef153cc] rounded-[10px] px-[10px] h-5 flex items-center">
              <span className="text-base">Available</span>
            </div>
          </div>

          <p className="text-center text-xl my-5 mb-10">{description}</p>

          <div className="flex flex-col gap-5 px-[10px]">
            <div className="flex gap-[110px] flex-wrap">
              <span className="font-bold">Field ID: {fieldId}</span>
              <span className="font-bold">Owner Name: {ownerName}</span>
              <span className="font-bold">Email: {email}</span>
            </div>

            <div className="flex gap-[30px] flex-wrap">
              <span className="font-bold">Facility Name: {facilityName}</span>
              <span className="font-bold">Created_At: {createdAt}</span>
              <span className="font-bold">Updated_At: {updatedAt}</span>
            </div>

            <div className="flex gap-[65px] flex-wrap">
              <span className="font-bold">Price: {price}</span>
              <span className="font-bold">Dimension: {dimension}</span>
              <span className="font-bold">Yard surface: {yardSurface}</span>
            </div>

            <div className="flex gap-[80px] flex-wrap">
              <span className="font-bold">Total Review: {totalReview}</span>
              <span className="font-bold">Avg Review: {avgReview}</span>
            </div>

            <div className="flex gap-5 items-center flex-wrap">
              <span className="font-semibold">Type Sport:</span>
              <div className="bg-[#e1e1e1cc] rounded-[10px] px-[10px]">
                <span>{typeSport}</span>
              </div>
            </div>

            <div>
              <span className="font-semibold">Location: {location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-[1014px] bg-white p-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-10">IMAGE & VIDEO</h2>
          
          <div className="flex flex-wrap gap-5 justify-center">
            {images.map((img, index) => (
              <img 
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-[200px] h-[150px] object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldDetailManagement;

