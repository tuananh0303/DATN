import React, { useState } from 'react';

// Only keep the interface we use
interface Review {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  fieldFacility: string;
}

// Default Reviews Data
const defaultReviews: Review[] = [
  {
    userName: "Nguyễn Tuấn Anh",
    rating: 5,
    comment: "Chất lượng",
    createdAt: "14/07/2024",
    fieldFacility: "sân A/ sân cầu lông Phạm Kha"
  },
  // ... rest of the reviews
];

// Main Component
const ReviewManagement: React.FC = () => {
  // Add these states
  
  // Existing states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    createdAt: '',
    typeSport: '',
    status: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Implement search logic here
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Implement filter logic here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Implement pagination logic here
  };

  return (
    <div className="flex flex-col w-full">
      
    
      {/* Content Area */}
      <div className="flex-grow p-5 box-border">
        {/* Search and Filter Section */}
        <div className="flex flex-row mb-5 gap-5">
          {/* SearchBar */}
          <div className="flex-grow">
            <div className="w-full max-w-[540px] h-10 relative">
              <div className="w-full h-full bg-white rounded-[19px] border border-[#d5d5d5] flex items-center px-[18px] box-border">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by Fullname/ Email"
                  className="flex-1 border-none outline-none bg-transparent text-sm font-['Nunito_Sans'] text-[#202224] opacity-50"
                />
                <img 
                  src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/search.png"
                  alt="search"
                  className="w-[19.87px] h-[22.12px] opacity-60 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* FilterBar */}
          <div className="flex-grow">
            <div className="w-full max-w-[800px] h-[50px] bg-[#f9f9fb] rounded-[10px] border border-[#d5d5d5] flex items-center px-5 box-border gap-5">
              <div className="flex items-center gap-2.5">
                <label className="text-sm font-semibold">Created At:</label>
                <select
                  value={filters.createdAt}
                  onChange={(e) => handleFilterChange({ ...filters, createdAt: e.target.value })}
                  className="h-[30px] rounded border border-[#ccc] px-2.5"
                >
                  <option value="">All</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </select>
              </div>

              <div className="flex items-center gap-2.5">
                <label className="text-sm font-semibold">Type Sport:</label>
                <select
                  value={filters.typeSport}
                  onChange={(e) => handleFilterChange({ ...filters, typeSport: e.target.value })}
                  className="h-[30px] rounded border border-[#ccc] px-2.5"
                >
                  <option value="">All</option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                </select>
              </div>

              <div className="flex items-center gap-2.5">
                <label className="text-sm font-semibold">Status:</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange({ ...filters, status: e.target.value })}
                  className="h-[30px] rounded border border-[#ccc] px-2.5"
                >
                  <option value="">All</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => handleFilterChange({ createdAt: '', typeSport: '', status: '' })}
                className="h-[30px] rounded border border-[#ccc] bg-[#f93c65] text-white px-[15px] cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="flex-grow bg-[#fdfdfd] rounded-[15px] p-5 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
          <div className="w-full max-w-[1090px] min-h-[495px] bg-[#fdfdfd] rounded-[15px] flex flex-col overflow-x-auto">
            {/* Header */}
            <div className="flex flex-row px-5 py-[25px] bg-[#448ff0b2] border border-[#979797] font-['Open_Sans'] font-bold text-[15px] text-black">
              <div className="flex-[1_0_125px]">User Name</div>
              <div className="flex-[1_0_50px] ml-[15px]">Rating</div>
              <div className="flex-[1_0_185px] ml-[45px]">Comment</div>
              <div className="flex-[1_0_95px] ml-[45px]">Created_At</div>
              <div className="flex-[1_0_265px] ml-[45px]">Field/Facility</div>
              <div className="flex-[1_0_49px] ml-[45px]">Action</div>
            </div>

            {/* Review Rows */}
            {defaultReviews.map((review, index) => (
              <div 
                key={index} 
                className="flex flex-row px-5 py-3.5 bg-white border border-[#979797] font-['Open_Sans'] font-semibold text-sm text-black"
              >
                <div className="flex-[1_0_121px]">{review.userName}</div>
                <div className="flex-[1_0_9px] ml-[76px]">{review.rating}</div>
                <div className="flex-[1_0_170px] ml-[101px]">{review.comment}</div>
                <div className="flex-[1_0_76px] ml-[159px]">{review.createdAt}</div>
                <div className="flex-[1_0_220px] ml-[141px]">{review.fieldFacility}</div>
                <div className="flex-[1_0_48px] h-8 bg-[#fafbfd] rounded-lg border border-[#d5d5d5] ml-[65px] flex items-center justify-center cursor-pointer">
                  <img 
                    src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/error.png" 
                    alt="action"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex-none mt-5 flex justify-center">
          <div className="flex flex-col gap-2.5 min-w-[314px] font-['Nunito'] items-center">
            <div className="text-[#C91416] text-base leading-[19px] font-normal text-center">
              144 Total
            </div>
            
            <div className="flex flex-row gap-3.5 p-2.5 bg-white rounded-[10px] h-10 items-center justify-center">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-[30px] h-[30px] border-none bg-[url('https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/componen.png')] bg-contain cursor-pointer p-0"
              />

              {[1, 2, 3, '...', 12].map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  className={`
                    w-[30px] h-[30px] border-none rounded-[10px] p-0
                    flex items-center justify-center
                    text-base leading-[19px] font-normal
                    ${typeof page === 'number' ? 'cursor-pointer' : 'cursor-default'}
                    ${currentPage === page 
                      ? 'bg-[#C91416] text-white' 
                      : 'bg-white text-[#737373]'
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-[30px] h-[30px] border-none bg-[url('https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/paginati.png')] bg-contain cursor-pointer p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement; 