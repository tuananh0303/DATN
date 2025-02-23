import React, { useState } from 'react';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch = () => {}, 
  placeholder = "Search by Fullname/ Email"
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '540px',
      height: '40px',
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '19px',
        border: '0.6px solid #d5d5d5',
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        boxSizing: 'border-box',
      }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            fontFamily: 'Nunito Sans',
            color: '#202224',
            opacity: 0.5,
          }}
        />
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/search.png"
          alt="search"
          style={{
            width: '19.87px',
            height: '22.12px',
            opacity: 0.6,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;

