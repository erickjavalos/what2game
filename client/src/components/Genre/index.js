import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADD_LIKE } from '../../utils/mutations';


import Auth from '../../utils/auth';


const HeartIcon = ({game = [], genre}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [addLike, { error, data }] = useMutation(ADD_LIKE);

  
    const heartStyle = { color: isClicked ? 'red' : 'white' };
  
    const handleClick = async () => {
        // XOR expression
        setIsClicked(!isClicked);
        console.log(game)
        console.log('rating')
        console.log(game.rating.toFixed(2))

        // navigate to login page if not authenticated
        if (!Auth.loggedIn()){
            window.location.replace("/login")
            return
        }

        try {
            const { data } = await addLike({
              variables: { 
                name: game.name,
                boxArtUrl: game.background_image,
                genre: genre,
                rating: game.rating.toFixed(2),
            },
            });
            console.log('executed')
            console.log(data)
      
          } catch (e) {
            console.error(e);
          }
    };
  
    return <FontAwesomeIcon icon={faHeart} style={heartStyle} onClick={handleClick} />;
}

const Genre = ({ games = [], title, genre }) => {
    if (!games.length) {
        return (
            <>
            <div className="mt-6 mb-6 text-center">
                <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </div>

            <h3 className='text-white text-center'>loading...</h3>
            </>)
    }

    return (
        <>
            <div className="mt-6 mb-6 text-center">
                <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
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
                                    genre={genre}
                                />
                            </button>
                        </div>
                        <a className="mt-2 flex items-center justify-center">
                            <img className="w-24 h-24 rounded-full shadow-lg" src={game.background_image} alt=""/>
                        </a>
                        <div className="flex-grow">
                            <a className="h-full flex items-center">
                                <h5 className="mx-2 mb-6 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{game.name}</h5>
                            </a>
                        </div>
                        <div className="flex-grow">
                            <a  className="h-full flex items-center">
                                <p className="mx-2 font-bold tracking-tight text-gray-900 dark:text-white">Genre: {genre}</p>
                            </a>
                        </div>
                        <div className="flex-grow">
                            <a  className="h-full flex items-center">
                                <p className="mx-2 mb-4 font-bold tracking-tight text-gray-900 dark:text-white">Rating: {(game.rating !== 'null') ? Math.trunc(game.rating) + '%' : 'N/A'}</p>
                            </a>
                        </div>
                    </div>
                </div>
                ))}

            </div>
        
        </>
    );
};

export default Genre;

              