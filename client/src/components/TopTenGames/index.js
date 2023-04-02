import React from 'react';
import { Link } from 'react-router-dom';

const TopTenGames = ({ games = [] }) => {
  if (!games.length) {
    return <h3>No Games Rendered</h3>;
  }

  return (
    <>
        <div className="mt-6 mb-6 text-center">
            <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Top Ten Games</h5>
        </div>
        <div className='flex flex-wrap justify-center'>
        {games &&
            games.map((game) => (
            <div key={game.id}className="w-full md:w-1/3 lg:w-1/4 p-3 text-center m-1">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col hover:bg-[rgb(186,215,242)]">
                    <a href="#" className="mt-2 flex items-center justify-center">
                        <img className="w-24 h-24 rounded-full shadow-lg" src={game.box_art_url} alt="game art"/>
                    </a>
                    <div className="flex-grow">
                        <a href="#" className="h-full flex items-center">
                            <h5 className="mx-2 mb-6 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
                        </a>
                    </div>
                    <div className="flex-grow">
                        <a href="#" className="h-full flex items-center">
                            <p className="mx-2 font-bold tracking-tight text-gray-900 dark:text-white">Genre: {game.genre}</p>
                        </a>
                    </div>
                    <div className="flex-grow">
                        <a href="#" className="h-full flex items-center">
                            <p className="mx-2 mb-4 font-bold tracking-tight text-gray-900 dark:text-white">Rating: {Math.trunc(game.rating)}%</p>
                        </a>
                    </div>
                </div>
            </div>
            ))}

        </div>
      
    </>
  );
};

export default TopTenGames;

              