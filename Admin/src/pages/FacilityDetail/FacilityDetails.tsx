import React from 'react';

interface FacilityDetailsProps {
  className?: string;
}

const FacilityDetails: React.FC<FacilityDetailsProps> = ({ className }) => {
  return (
    <div className={`w-full min-w-[320px] max-w-[1014px] bg-white p-5 box-border ${className}`}>
      <div className="flex flex-row justify-center items-center gap-2.5 mb-5 flex-wrap">
        <h1 className="text-[32px] font-roboto font-bold m-0 text-center">
          Sân Cầu Lông Phạm Kha
        </h1>
        <div className="bg-[#6ef153cc] rounded-[10px] px-5 h-5 flex items-center justify-center">
          <span className="text-base font-roboto text-center">Active</span>
        </div>
      </div>

      <p className="text-xl font-roboto text-center m-0 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad laborum.
      </p>

      <div className="flex flex-col gap-5 px-2.5">
        <div className="flex flex-row justify-between flex-wrap">
          <span className="font-bold">Facility ID: 123</span>
          <span className="font-bold">Owner Name: Nguyễn Tuấn Anh</span>
          <span className="font-bold">Email: anhhello564@gmail.com</span>
        </div>

        <div className="flex flex-row justify-between flex-wrap">
          <span className="font-semibold">Open Time: 05:00 - 23:00</span>
          <span className="font-bold">Created_At: 24/12/2024</span>
          <span className="font-bold">Updated_At: 24/12/2024</span>
        </div>

        <div className="flex flex-row justify-between flex-wrap">
          <span className="font-bold">Total Field: 100</span>
          <span className="font-bold">Total Service: 100</span>
          <span className="font-bold">Total Voucher: 0</span>
        </div>

        <div className="flex flex-row justify-between flex-wrap">
          <span className="font-bold">Total Event: 2</span>
          <span className="font-bold">Total Review: 50</span>
          <span className="font-bold">Avg Review: 4.2</span>
        </div>

        <span className="font-semibold">
          Location: Số 34 Đường 3/2 quận 10 tp Hồ Chí Minh.
        </span>

        <div className="flex flex-row gap-2.5 items-center flex-wrap">
          <span className="font-semibold">Type Sport: </span>
          <div className="flex flex-row gap-2.5">
            {['Tennis', 'Football', 'Badminton'].map((sport) => (
              <div key={sport} className="bg-[#e1e1e1cc] rounded-[10px] px-[15px] h-[19px] flex items-center justify-center">
                <span className="text-base font-roboto text-center">{sport}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;

