import React from 'react';
import TopNavigationBar from './TopNavigationBar';
import Header_FacilityList_Footer from './Header_FacilityList_Footer';
import './Content.css';

const Content: React.FC = () => {
  return (
    <div className="facility-list-layout">
      <div className="top-navigation-bar-container">
        <TopNavigationBar />
      </div>
      <div className="header-facility-list-footer-container">
        <Header_FacilityList_Footer />
      </div>
    </div>
  );
};

export default Content;

