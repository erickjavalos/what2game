import React from 'react';


const QuickLinks = () => {
  return (
   <>
   <div className="inline-flex flex-wrap mx-auto justify-center lg:m-3 m-1" style={{width:'100%'}}>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Trending 🔥
    </button>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Action
    </button>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Adventure
    </button>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Platform
    </button>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Puzzle
    </button>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Strategy
    </button>
    <button className="bg-[rgb(255,212,0)] hover:bg-[rgb(130,2,99)] text-gray-800 hover:text-white font-bold py-2 px-4 rounded lg:mr-4 m-1">
      Casual
    </button>
  </div>
    
   </>
  );
};

export default QuickLinks;
