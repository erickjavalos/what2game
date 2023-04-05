import React from 'react';
import { useState } from 'react';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { DELETE_LIKE } from '../../utils/mutations';


function HeartIcon({game = []}) {
    const [isClicked, setIsClicked] = useState(true);
    const [deleteLike, { error, data }] = useMutation(DELETE_LIKE);

  
    const heartStyle = { color: isClicked ? 'red' : 'white' };
  
    const handleClick = async () => {
      setIsClicked(!isClicked);

      try {
        console.log(game)
        const { data } = await deleteLike({
          variables: { 
            name: game.name 
        },
        });
        console.log('executed')
        console.log(data)
        window.location.reload(); // Refresh the page
  
      } catch (e) {
        console.error(e);
      }
    };
  
    return <FontAwesomeIcon icon={faHeart} style={heartStyle} onClick={handleClick} />;
}

const LikedGames = ({ games = [] }) => {
    if (!games.length) {
        return(
        <div>
            <div className="flex-row justify-center mb-3 text-center">
                <h2 className="text-4xl text-white col-12 col-md-10 bg-dark text-light p-3 mb-5 m-2">
                My Profile
                </h2>
                <div className="mt-6 mb-6 text-center">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Liked Games 🫶</h5>
                    <h5 className="text-1xl tracking-tight text-gray-900 dark:text-white m-10">No Liked Games...</h5>
                </div>
            </div>
        </div>
            
        )
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
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
                        <div className="flex justify-center items-center mt-4">
                            <button>
                                <HeartIcon  
                                    game={game}    
                                />
                            </button>
                        </div>
                        <a className="mt-2 flex items-center justify-center">
                            <img className="w-24 h-24 rounded-full shadow-lg" src={game.box_art_url} alt=""/>
                        </a>
                        <div className="flex-grow">
                            <a  className="h-full flex items-center">
                                <h5 className="mx-2 mb-6 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
                            </a>
                        </div>
                        <div className="flex-grow">
                            <a className="h-full flex items-center">
                                <p className="mx-2 font-bold tracking-tight text-gray-900 dark:text-white">Genre: {(game.genre) !== 'null' ? game.genre : 'N/A'}</p>
                            </a>
                        </div>
                        <div className="flex-grow">
                            <a className="h-full flex items-center">
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

              