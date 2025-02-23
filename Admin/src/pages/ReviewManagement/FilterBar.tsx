import React, { useState } from 'react';

interface FilterBarProps {
  onFilterChange?: (filters: {
    createdAt: string;
    typeSport: string;
    status: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    createdAt: '',
    typeSport: '',
    status: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleResetFilter = () => {
    const resetFilters = {
      createdAt: '',
      typeSport: '',
      status: ''
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      height: '50px',
      backgroundColor: '#f9f9fb',
      borderRadius: '10px',
      border: '0.6px solid #d5d5d5',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      gap: '20px'
    }}>
      {/* Created At Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 600 }}>Created At:</label>
        <select
          value={filters.createdAt}
          onChange={(e) => handleFilterChange('createdAt', e.target.value)}
          style={{
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '0 10px'
          }}
        >
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      {/* Type Sport Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 600 }}>Type Sport:</label>
        <select
          value={filters.typeSport}
          onChange={(e) => handleFilterChange('typeSport', e.target.value)}
          style={{
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '0 10px'
          }}
        >
          <option value="">All</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="tennis">Tennis</option>
        </select>
      </div>

      {/* Status Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 600 }}>Status:</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          style={{
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '0 10px'
          }}
        >
          <option value="">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={handleResetFilter}
        style={{
          height: '30px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#f93c65',
          color: '#fff',
          padding: '0 15px',
          cursor: 'pointer'
        }}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default FilterBar;
