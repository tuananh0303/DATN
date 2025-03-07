import React from 'react';

interface UserProfileProps {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  joinedDate?: string;
  totalBooking?: number;
  profileImage?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name = "NGUYỄN TUẤN ANH",
  role = "Player",
  email = "anhhello564@gmail.com",
  phone = "0976302687",
  gender = "Male",
  birthDate = "08/10/2001",
  joinedDate = "14/07/2024",
  totalBooking = 100,
  profileImage = "https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/unsplash.png"
}) => {
  return (
    <div className="flex flex-row gap-[50px] min-w-[643px] p-5 items-center flex-wrap">
      {/* Profile Image */}
      <div className="w-[300px] h-[341px] rounded-[30px] overflow-hidden flex-shrink-0">
        <img 
          src={profileImage} 
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-[22px] w-[293px] flex-shrink">
        {/* Name */}
        <h1 className="m-0 font-roboto text-[32px] font-semibold text-black">
          {name}
        </h1>

        {/* Role Badge */}
        <div className="flex items-center bg-[#6ef153b2] rounded-[10px] border-2 border-[#858585] py-[13px] px-[2px] w-[86px]">
          <span className="font-roboto text-base font-medium text-[#858585] mx-auto">
            {role}
          </span>
        </div>

        {/* Info Row */}
        <div className="flex flex-row gap-5 items-center">
          {/* Gender */}
          <div className="flex items-center gap-[15px]">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/page-1.png" 
              alt="Gender" 
              className="w-5 h-5" 
            />
            <span className="font-roboto text-base text-[#858585]">
              {gender}
            </span>
          </div>

          {/* Vertical Line */}
          <div className="w-[1px] h-5 bg-black" />

          {/* Birth Date */}
          <div className="flex items-center gap-[15px]">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/birthday.png" 
              alt="Birthday" 
              className="w-5 h-5" 
            />
            <span className="font-roboto text-base text-[#858585]">
              {birthDate}
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-[15px]">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/email.png" 
            alt="Email" 
            className="w-[23px] h-[19px]" 
          />
          <span className="font-roboto text-base text-[#858585]">
            {email}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-[15px]">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/vector.png" 
            alt="Phone" 
            className="w-[21px] h-[21px]" 
          />
          <span className="font-roboto text-base text-[#858585]">
            {phone}
          </span>
        </div>

        {/* Joined Date */}
        <p className="m-0 font-roboto text-base font-semibold text-black">
          Joined Date: {joinedDate}
        </p>

        {/* Total Booking */}
        <p className="m-0 font-roboto text-base text-black">
          Total Booking: {totalBooking}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;

