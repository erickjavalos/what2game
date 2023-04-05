import React, { useState } from 'react';
import './styles.css'

import QuickLinks from '../../components/Quicklinks'
import Trending from '../../components/Trending'
import Genres from '../../components/Genres'
import Action from '../../components/Action';
import Adventure from '../../components/Adventure';
import Puzzle from '../../components/Puzzle';
import Casual from '../../components/Casual';
import Strategy from '../../components/Strategy';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('trending');

  const renderPage = () => {
    switch (currentPage) {
      case 'trending':
        return <Trending />;
      case 'action':
        return <Action genre="action" />;
      case 'adventure':
        return <Adventure genre="adventure" />;
      case 'puzzle':
        return <Puzzle genre="puzzle" />;
      case 'strategy':
        return <Strategy genre="Strategy" />;
      case 'casual':
        return <Casual genre="casual" />;
      case 'genres':
        return <Genres genre="genres" />;
      default:
        return null;
    }
  };
  

  const handlePageChange = (page) => setCurrentPage(page.toLowerCase());

  return (
    <>
      <QuickLinks handlePageChange={handlePageChange}/>
      <div className="drawLine" style={{width: '100%'}}></div>
      {renderPage()}
    </>
  );
};

export default Home;
