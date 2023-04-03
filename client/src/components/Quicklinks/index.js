import React from 'react';


const QuickLinks = ({ currentPage, handlePageChange }) => {
  return (
   <>
   <div className="inline-flex flex-wrap mx-auto justify-center lg:m-3 m-1" style={{width:'100%'}}>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('trending')}
      >
      Trending 🔥
    </button>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('action')}
      >
      Action
    </button>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('adventure')}
    >
      Adventure
    </button>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('platform')}
    >
      Platform
    </button>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('puzzle')}
    >
      Puzzle
    </button>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('strategy')}
    >
      Strategy
    </button>
    <button 
      className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1"
      onClick={() => handlePageChange('casual')}
    >
      Casual
    </button>
  </div>
    
   </>
  );
};

export default QuickLinks;
