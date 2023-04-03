import React, { useState } from 'react';
import './styles.css'

import QuickLinks from '../../components/Quicklinks'
import Trending from '../../components/Trending'
import Genre from '../../components/Genre'

const Home = () => {
  // set state to handle page changes 
  const [currentPage, setCurrentPage] = useState('trending');

  // checks which page we are currently on to render content
  const renderPage = () => {

    if (currentPage === 'trending'){
      return <Trending/>
    }
    else {
      // passing props to genre component to render relative info
      return <Genre currentPage={currentPage}/>
    }
    
  };

  // handles page change state
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      {/* buttons for quick games  */}
      <QuickLinks handlePageChange={handlePageChange}/>
      {/* divider */}
      <div className="drawLine" style={{width: '100%'}}></div>
      {/* render content based on selected quicklink */}
      {renderPage()}
    </>
  );
};

export default Home;
