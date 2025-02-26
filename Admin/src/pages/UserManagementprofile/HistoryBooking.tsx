import React from 'react';

interface BookingRecord {
  fieldName: string;
  facilityName: string;
  createdAt: string;
  startTime: string;
  duration: string;
  typeSport: string;
  status: 'Complete' | 'Pending';
}

const HistoryBooking: React.FC = () => {
  const bookings: BookingRecord[] = [
    {
      fieldName: 'Nguyễn Tuấn Anh',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Tennis',
      status: 'Complete'
    },
    {
      fieldName: 'Dương Văn Nghĩa',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '120m',
      typeSport: 'Football',
      status: 'Complete'
    },
    {
      fieldName: 'Nguyễn Tuấn Anh',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Badminton',
      status: 'Pending'
    },
    {
      fieldName: 'Dương Văn Nghĩa',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Synthetic',
      status: 'Pending'
    },
    {
      fieldName: 'Dương Văn Nghĩa',
      facilityName: 'Nguyễn Tuấn Anh',
      createdAt: '14/07/2024',
      startTime: '14/07/2024',
      duration: '60m',
      typeSport: 'Table Tennis',
      status: 'Complete'
    }
  ];

  return (
    <div className="w-full max-w-[995px] min-h-[540px] p-5 mx-auto">
      <h1 className="text-[36px] font-bold font-roboto tracking-[1px] mb-5 text-center">
        History booking
      </h1>

      <div className="bg-[#fdfdfd] rounded-[15px] w-full overflow-x-auto">
        {/* Header */}
        <div className="flex px-5 py-[25px] bg-[#488ff0b2] border-b border-[#979797]">
          <div className="w-[120px] font-opensans font-bold text-[15px]">Field Name</div>
          <div className="w-[125px] font-opensans font-bold text-[15px]">Facility Name</div>
          <div className="w-[90px] font-opensans font-bold text-[15px]">Created_At</div>
          <div className="w-[120px] font-opensans font-bold text-[15px]">Start time</div>
          <div className="w-24 font-opensans font-bold text-[15px]">Duration</div>
          <div className="w-[90px] font-opensans font-bold text-[15px]">Type Sport</div>
          <div className="w-[85px] font-opensans font-bold text-[15px]">Status</div>
        </div>

        {/* Booking Records */}
        {bookings.map((booking, index) => (
          <div key={index} className="flex px-5 py-[14px] bg-white border-b border-[#979797]">
            <div className="w-[120px] font-opensans font-semibold text-sm">{booking.fieldName}</div>
            <div className="w-[125px] font-opensans font-semibold text-sm">{booking.facilityName}</div>
            <div className="w-[90px] font-opensans font-semibold text-sm">{booking.createdAt}</div>
            <div className="w-[120px] font-opensans font-semibold text-sm">{booking.startTime}</div>
            <div className="w-24 font-nunito font-semibold text-sm">{booking.duration}</div>
            <div className="w-[90px] font-opensans font-semibold text-sm text-center">{booking.typeSport}</div>
            <div className={`w-[85px] font-opensans font-semibold text-sm text-center rounded-[10px] py-[2px]
              ${booking.status === 'Complete' ? 'bg-[#6ef153b2]' : 'bg-[#eae559b2]'}`}>
              {booking.status}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex flex-col items-center py-5">
          <div className="text-[#c91416] font-nunito text-base mb-[10px]">
            144 Total
          </div>
          <div className="flex gap-[14px] p-[10px] bg-white rounded-[10px]">
            <button className="border-none bg-transparent cursor-pointer">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/componen.png" alt="prev" className="w-[30px] h-[30px]" />
            </button>
            {[1, 2, 3, '...', 12].map((num, index) => (
              <button
                key={index}
                className={`w-[30px] h-[30px] border-none rounded-[10px] font-nunito text-base cursor-pointer
                  ${num === 1 ? 'bg-[#c91416] text-white' : 'bg-transparent text-[#737373]'}`}
              >
                {num}
              </button>
            ))}
            <button className="border-none bg-transparent cursor-pointer">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/paginati.png" alt="next" className="w-[30px] h-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBooking;

