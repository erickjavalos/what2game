import React, { useState } from 'react';
import './What2Play.css';

// const APIKEY = process.env.REACT_APP_RAWG_API_KEY;

const What2Play = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState([]);
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
        { value: '18', label: 'PlayStation 4' },
        { value: '16', label: 'PlayStation 5' },
        { value: '1', label: 'Xbox One' },
        { value: '14', label: 'Xbox Series S/X' },
        { value: '7', label: 'Nintendo Switch' },
      ],
    },
    {
      text: 'What is your preferred age rating?',
      paramKey: 'esrb_rating',
      options: [
        { value: '1', label: 'Everyone (E)' },
        { value: '2', label: 'Everyone 10+ (E10+)' },
        { value: '3', label: 'Teen (T)' },
        { value: '4', label: 'Mature 17+ (M)' },
        { value: '5', label: 'Adults Only 18+ (AO)' },
      ],
    },
  ];

  const handleOptionSelection = (questionIndex, optionValue) => {
    const updatedSelections = [...userSelections];
    updatedSelections[questionIndex] = optionValue;
    setUserSelections(updatedSelections);
    setNextButtonEnabled(true);  };

  const handleNextButtonClick = () => {
    setNextButtonEnabled(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);  };

    const handleFindGame = async () => {
      setLoading(true);
      
      const params = userSelections.reduce((acc, selection, index) => {
        const paramKey = questions[index].paramKey;
        return { ...acc, [paramKey]: selection };
      }, {});

      console.log(params)
    
      const paramString = new URLSearchParams(params).toString();
  
      try {
        const response = await fetch(`/api/games?${paramString}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        setGameResults(data);
        setLoading(false);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
      const currentQuestion = questions[currentQuestionIndex];
     const renderedOptions = currentQuestion.options.map((option) => (
    <div key={option.value} className="flex items-center space-x-2 mb-2">
      <input
        type="checkbox"
        id={option.value}
        value={option.value}
        onChange={(e) => handleOptionSelection(currentQuestionIndex, e.target.value)}
        className="tailwind-checkbox-styles"
      />
      <label htmlFor={option.value} className="text-white">
        {option.label}
      </label>
    </div>
  ));

      

  const renderedButton = currentQuestionIndex === questions.length - 1 ? (
    <button
      onClick={handleFindGame}
      className="tailwind-button-styles"
      disabled={!nextButtonEnabled}
    >
      Find Game
    </button>
  ) : (
    <button
      onClick={handleNextButtonClick}
      className="tailwind-button-styles"
      disabled={!nextButtonEnabled}
    >
      Next Question
    </button>
  );
  // console.log('gameResults:', gameResults);
  const renderedGameResults = gameResults?.results?.map((game) => (
    <div key={game.id} className="tailwind-game-item-styles">
      <h3>{game.name}</h3>
      <img src={game.background_image} alt={game.name} />
    </div>
  )) || [];
  

  const loadingIndicator = loading ? (
    <div className="tailwind-loading-indicator-styles">Loading...</div>
  ) : null;

  const showQuestions = Object.keys(gameResults).length === 0;

  return (
    <div className="bg-custom-darkblue min-h-screen flex items-center">
      <div className="tailwind-container-styles mx-auto p-8">
        {showQuestions && (
          <>
            <h2 className="text-orange-200 text-center">{currentQuestion.text}</h2>
            <div className="flex flex-wrap justify-center mt-4">{renderedOptions}</div>
            <div className="text-center mt-6">{renderedButton}</div>
          </>
        )}
        {loadingIndicator}
        {Object.keys(gameResults).length > 0 && (
          <>
            <h1 className="text-orange-200 text-center mb-8">Try These Games Out</h1>
            <div className="game-grid grid gap-4">
              {renderedGameResults.slice(0, 10)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default What2Play;
