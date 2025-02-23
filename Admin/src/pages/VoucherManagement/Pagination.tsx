import React from 'react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 12,
  totalItems = 14,
  onPageChange = () => {},
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const displayPages = [1, 2, 3, '...', 12];

    for (let i = 0; i < displayPages.length; i++) {
      const page = displayPages[i];
      pages.push(
        <div
          key={i}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          style={{
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            cursor: typeof page === 'number' ? 'pointer' : 'default',
            backgroundColor: currentPage === page ? '#c91416' : '#ffffff',
            color: currentPage === page ? '#ffffff' : '#737373',
            fontFamily: 'Nunito',
            fontSize: '16px',
            lineHeight: '19px',
            fontWeight: 400,
            padding: '10px',
            margin: '5px',
            userSelect: 'none',
          }}
        >
          {page}
        </div>
      );
    }
    return pages;
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px',
      minWidth: '314px',
      height: '69px',
      alignItems: 'center',
    }}>
      <div style={{
        color: '#c91416',
        fontFamily: 'Nunito',
        fontSize: '16px',
        lineHeight: '19px',
        fontWeight: 400,
      }}>
        {totalItems} Total
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '14px',
        padding: '0 10px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        height: '40px',
        justifyContent: 'center',
      }}>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/componen.png"
          alt="Previous"
          style={{
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />
        {renderPageNumbers()}
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/paginati.png"
          alt="Next"
          style={{
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;

