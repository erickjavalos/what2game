import React from 'react';
import { Link } from 'react-router-dom';

const LikedGames = ({ games = [] }) => {
    // console.log('art')
    // console.log(games)
  if (!games.length) {
    return <h3>No Liked Games</h3>;
  }

  return (
    <>
    <div>
      <div className="flex-row justify-center mb-3 text-center">
        <h2 className="text-4xl text-white col-12 col-md-10 bg-dark text-light p-3 mb-5 m-2">
          My Profile
        </h2>
        <div className="mt-6 mb-6 text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Liked Games 🫶</h5>
        </div>
        <div className='flex flex-wrap justify-center'>
        {games &&
            games.map((game) => (
            <div key={game.id} className="w-full md:w-1/3 lg:w-1/4 p-3 text-center m-1">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col hover:bg-[rgb(186,215,242)]">
                    <a href={'/asset?idgb_id=' + game.igdb_id} className="mt-2 flex items-center justify-center">
                        <img className="w-24 h-24 rounded-full shadow-lg" src={'https://' + game.box_art_url} alt=""/>
                    </a>
                    <div className="flex-grow">
                        <a href={'/asset?idgb_id=' + game.igdb_id} className="h-full flex items-center">
                            <h5 className="mx-2 mb-6 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
                        </a>
                    </div>
                    <div className="flex-grow">
                        <a href={'/asset?idgb_id=' + game.igdb_id} className="h-full flex items-center">
                            <p className="mx-2 font-bold tracking-tight text-gray-900 dark:text-white">Genre: {(game.genre) !== 'null' ? game.genre : 'N/A'}</p>
                        </a>
                    </div>
                    <div className="flex-grow">
                        <a href={'/asset?idgb_id=' + game.igdb_id} className="h-full flex items-center">
                            <p className="mx-2 mb-4 font-bold tracking-tight text-gray-900 dark:text-white">Rating: {(game.rating !== 'null') ? Math.trunc(game.rating) + '%' : 'N/A'}</p>
                        </a>
                    </div>
                </div>
            </div>
            ))}

        </div>
        </div>
        </div>
      
    </>
  );
};

export default LikedGames;

              