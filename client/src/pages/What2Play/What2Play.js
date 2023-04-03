import React, { useState, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';

// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';

// const APIKEY = process.env.REACT_APP_RAWG_API_KEY;

const What2Play = () => {
  const client = useApolloClient();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState([]);
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedDescriptionId, setDisplayedDescriptionId] = useState(null);

  const questions = [
     {
      text: 'Which genre do you prefer?',
      paramKey: 'genres',
      options: [
        { value: 'action', label: 'Action' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'strategy', label: 'Strategy' },
        { value: 'rpg', label: 'RPG' },
        { value: 'simulation', label: 'Simulation' },
        { value: 'sports', label: 'Sports' },
      ],
    },
    {
      text: 'Which platform do you play on?',
      paramKey: 'platforms',
      options: [
        { value: '4', label: 'PC' },
        { value: '16', label: 'PlayStation 5' },
        { value: '14', label: 'Xbox Series S/X' },
        { value: '7', label: 'Nintendo Switch' },

      ],
    },
    {
      text: 'What is your preferred age rating?',
      paramKey: 'esrb_rating',
      options: [
        { value: '1', label: 'Everyone (E)' },
        { value: '2', label: 'Teen (T)' },
        { value: '3', label: 'Mature 17+ (M)' },
        { value: '4', label: 'Adults Only 18+ (AO)' },
      ],
    },
  ];

  useEffect(() => {
    return () => {
      setGameResults([]);
      setUserSelections([]);
    };
  }, []);

  const toggleDescription = (gameId) => {
    if (displayedDescriptionId === gameId) {
      setDisplayedDescriptionId(null);
    } else {
      setDisplayedDescriptionId(gameId);
    }
  };

  const removeHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  
  const handleOptionSelection = (questionIndex, optionValue) => {
    const updatedSelections = [...userSelections];
    updatedSelections[questionIndex] = optionValue;
    setUserSelections(updatedSelections);
    setNextButtonEnabled(true);
  };
  const handleNextButtonClick = () => {
    setNextButtonEnabled(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
    
      const QUERY = gql`
      query GetRecommendedGames($genres: String, $platforms: String, $esrb_rating: String) {
        recommendedGames(genres: $genres, platforms: $platforms, esrb_rating: $esrb_rating) {
          id
          name
          background_image
          description  
        }
      }
    `;
       // Find Game Here

       const handleFindGame = async () => {
        setLoading(true);
      
        const params = userSelections.reduce((acc, selection, index) => {
          const paramKey = questions[index].paramKey;
          return { ...acc, [paramKey]: selection };
        }, {});
      
        try {
          const { data } = await client.query({
            query: QUERY,
            variables: params,
          });
          setGameResults(data.recommendedGames);
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    
  const currentQuestion = questions[currentQuestionIndex];
   
  const renderedOptions = currentQuestion.options.map((option) => (
<div key={option.value} className="flex items-center justify-center space-x-4 my-8">
  <input
    type="checkbox"
    id={option.value}
    value={option.value}
    onChange={(e) => handleOptionSelection(currentQuestionIndex, e.target.value)}
    className="tailwind-checkbox-styles mr-2"
  />
  <label htmlFor={option.value} className="text-white pl-2 pr-4 py-18">
    {option.label}
  </label>
</div>

  ));
  

  
  const renderedButton = currentQuestionIndex === questions.length - 1 ? (
    <button
      onClick={handleFindGame}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={!nextButtonEnabled}
    >
      Find Game
    </button>
  ) : (
    <button
      onClick={handleNextButtonClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={!nextButtonEnabled}
    >
      Next Question
    </button>
  );
  
  const renderedGameResults = gameResults.map((game) => {
    const plainDescription = removeHtmlTags(game.description || "No description available");
  
    return (
<div key={game.id} className="bg-gray-800 p-4 rounded-lg overflow-hidden w-72 h-[500px]" style={{ backgroundColor: '#820263' }}>
        <h3 className="text-white font-bold mb-2 truncate">{game.name}</h3>
        <div className="h-64 relative" style={{ backgroundColor: "#820263" }}>

          <img src={game.background_image} alt={game.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <button
          onClick={() => toggleDescription(game.id)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4 truncate flex items-center"
        >
          {displayedDescriptionId === game.id ? "Hide Description" : "Show Description"}
        </button>
        <div className={`description h-24 overflow-y-auto ${displayedDescriptionId === game.id ? '' : 'hidden'} text-white`}>
          {displayedDescriptionId === game.id ? plainDescription : ""}
        </div>
      </div>
    );
  });
  
  const loadingIndicator = loading && Object.keys(gameResults).length === 0 ? (
    <div className="spinner text-white">Loading...</div>
  ) : null;
  
  const showQuestions = Object.keys(gameResults).length === 0;
  
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="mx-auto p-8 w-full max-w-screen-md">
        {showQuestions && (
          <>
            <h2 className="text-orange-200 text-center font-bold text-xl mb-4">{currentQuestion.text}</h2>
            <div className="flex flex-wrap justify-center mb-4">{renderedOptions}</div>
            <div className="text-center mb-6">{renderedButton}</div>
          </>
        )}
        {loadingIndicator}
        {Object.keys(gameResults).length > 0 && (
          <>
            <h1 className="text-orange-200 text-center font-bold text-3xl mb-8">Try These Games Out</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {renderedGameResults.slice(0, 10)}
          </div>

          </>
        )}
      </div>
    </div>
  );
  
  
};


export default What2Play;
