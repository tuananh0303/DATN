import React from 'react';

interface ApprovalItem {
  facilitieName: string;
  ownerName: string;
  email: string;
  createdAt: string;
  location: string;
}

interface ContentAreaProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const ApprovalManagement: React.FC<ContentAreaProps> = () => {
  const approvalItems: ApprovalItem[] = [
    {
      facilitieName: 'abc',
      ownerName: 'Nguyễn Tuấn Anh',
      email: 'anheello564@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'aaaa',
      ownerName: 'Dương Văn Nghĩa',
      email: 'Nghiaduong@gmail.com', 
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'bbbb',
      ownerName: 'Nguyễn Tuấn Anh',
      email: 'anhhello@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'cass',
      ownerName: 'Dương Văn Nghĩa',
      email: 'Nghiaduong@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    },
    {
      facilitieName: 'hnhu',
      ownerName: 'Dương Văn Nghĩa',
      email: 'Nghiaduong@gmail.com',
      createdAt: '14/07/2024',
      location: '089 Kutch Green Apt. 448'
    }
  ];

  return (
    <>
      {/* Main Content */}
      <div className="p-6 min-w-full h-full bg-[#f5f6fa]">
        {/* Pending Approvals Section */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold font-sans tracking-[1px] mb-5">
            Pending Approvals
          </h2>

          <div className="flex flex-wrap gap-5 mb-10">
            {/* Facilities Card */}
            <div className="flex-1 basis-[45%] bg-white rounded-[14px] p-5 border border-[#979797]">
              <div className="text-xl font-bold font-sans opacity-70 mb-[10px]">Facilities</div>
              <div className="text-[32px] font-bold tracking-[1px] text-[#de0004] mb-[10px]">5</div>
              <div className="text-base font-medium font-sans opacity-70 mb-[10px]">New added facility: 3</div>
              <div className="text-base font-medium font-sans opacity-70 mb-[10px]">Edit an existing facility: 2</div>
              <div className="flex items-center gap-[10px] text-base font-sans font-semibold text-[#00b69b]">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/ic-trend.png" alt="trend" />
                8.5% Up from yesterday
              </div>
            </div>

            {/* Fields Card */}
            <div className="flex-1 basis-[45%] bg-white rounded-[14px] p-5 border border-[#979797]">
              <div className="text-xl font-bold font-sans opacity-70 mb-[10px]">Fields</div>
              <div className="text-[32px] font-bold tracking-[1px] text-[#de0004] mb-[10px]">10</div>
              <div className="text-base font-medium font-sans opacity-70 mb-[10px]">New added field: 5</div>
              <div className="text-base font-medium font-sans opacity-70 mb-[10px]">Edit an existing field: 5</div>
              <div className="flex items-center gap-[10px] text-base font-sans font-semibold text-[#00b69b]">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/ic-trend-2.png" alt="trend" />
                1.3% Up from past week
              </div>
            </div>
          </div>
        </div>

        {/* List Approvals Section */}
        <div>
          <h2 className="text-2xl font-semibold font-sans tracking-[1px] mb-5">
            List Approvals
          </h2>

          <div className="bg-white rounded-[15px] border border-[#979797]">
            {/* Header */}
            <div className="flex p-[15px_20px] bg-[#448ff0b2] border-b border-[#979797]">
              <div className="flex-1 basis-[105px] font-sans font-bold text-sm">Facilitie Name</div>
              <div className="flex-1 basis-[125px] font-sans font-bold text-sm">Owner Name</div>
              <div className="flex-1 basis-[165px] font-sans font-bold text-sm">Email</div>
              <div className="flex-1 basis-[76px] font-sans font-bold text-sm">Created_at</div>
              <div className="flex-1 basis-[155px] font-sans font-bold text-sm">Location</div>
              <div className="flex-1 basis-[90px] font-sans font-bold text-sm">View Detail</div>
              <div className="flex-1 basis-[50px] font-sans font-bold text-sm">Action</div>
            </div>

            {/* Rows */}
            {approvalItems.map((item, index) => (
              <div key={index} className="flex p-[15px_20px] border-b border-[#979797] bg-white">
                <div className="flex-1 basis-[105px] font-sans font-semibold text-sm">{item.facilitieName}</div>
                <div className="flex-1 basis-[125px] font-sans font-semibold text-sm">{item.ownerName}</div>
                <div className="flex-1 basis-[165px] font-sans font-semibold text-sm">{item.email}</div>
                <div className="flex-1 basis-[76px] font-sans font-semibold text-sm">{item.createdAt}</div>
                <div className="flex-1 basis-[155px] font-sans font-semibold text-sm">{item.location}</div>
                <div className="flex-1 basis-[90px]">
                  <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/error.png" alt="view" className="cursor-pointer" />
                </div>
                <div className="flex-1 basis-[116px] flex gap-[5px]">
                  <button className="px-[10px] py-[2px] bg-[#6ef153cc] border border-black rounded-[5px] font-sans text-sm cursor-pointer">
                    Approve
                  </button>
                  <button className="px-[10px] py-[2px] bg-[#fb2222cc] border border-black rounded-[5px] font-sans text-sm cursor-pointer">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-5 mb-5">
            <div className="flex gap-[14px] p-[10px] bg-white rounded-[10px]">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/componen.png" alt="prev" className="cursor-pointer" />
              <div className="w-[30px] h-[30px] flex items-center justify-center bg-[#c91416] rounded-[10px] text-white font-sans text-base">1</div>
              <div className="w-[30px] h-[30px] flex items-center justify-center text-[#737373] font-sans text-base">2</div>
              <div className="w-[30px] h-[30px] flex items-center justify-center text-[#737373] font-sans text-base">3</div>
              <div className="w-[30px] h-[30px] flex items-center justify-center text-[#737373] font-sans text-base">...</div>
              <div className="w-[30px] h-[30px] flex items-center justify-center text-[#737373] font-sans text-base">5</div>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/paginati.png" alt="next" className="cursor-pointer" />
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default ApprovalManagement;

