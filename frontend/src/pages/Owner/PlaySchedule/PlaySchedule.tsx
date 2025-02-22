import React from 'react';
import Sidebar from '@/components/Owner/Sidebar';
import Content from '@/pages/Owner/PlaySchedule/ContentPlaySchedule';
import './PlaySchedule.css';

const PlaySchedule: React.FC = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <Content />
    </div>
  );
};

export default PlaySchedule;

