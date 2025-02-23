import React from 'react';

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 144,
  itemsPerPage = 12,
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      minWidth: '314px',
      fontFamily: 'Nunito',
      alignItems: 'center',
    }}>
      <div style={{
        color: '#C91416',
        fontSize: '16px',
        lineHeight: '19px',
        fontWeight: 400,
        textAlign: 'center',
      }}>
        {totalItems} Total
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '14px',
        padding: '10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Previous Arrow */}
        <button 
          onClick={() => handlePageClick(currentPage - 1)}
          style={{
            width: '30px',
            height: '30px',
            border: 'none',
            background: `url(https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/componen.png)`,
            backgroundSize: 'contain',
            cursor: 'pointer',
            padding: 0,
          }}
        />

        {/* Page Numbers */}
        {[1, 2, 3, '...', 12].map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageClick(page)}
            style={{
              width: '30px',
              height: '30px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: currentPage === page ? '#C91416' : '#FFFFFF',
              color: currentPage === page ? '#FFFFFF' : '#737373',
              fontSize: '16px',
              lineHeight: '19px',
              fontWeight: 400,
              cursor: typeof page === 'number' ? 'pointer' : 'default',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {page}
          </button>
        ))}

        {/* Next Arrow */}
        <button 
          onClick={() => handlePageClick(currentPage + 1)}
          style={{
            width: '30px',
            height: '30px',
            border: 'none',
            background: `url(https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/paginati.png)`,
            backgroundSize: 'contain',
            cursor: 'pointer',
            padding: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;

