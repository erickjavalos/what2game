import React, { useState } from 'react';
const APIKEY = process.env.REACT_APP_RAWG_API_KEY;

// https://api.rawg.io/api/games?genres=sports&platforms=4&esrb_rating=1&key=df0a6dbf13504aefb411f7298892a149

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
      // turns the object from
      // { esrb_rating: 1}
      // to "esrb_rating=1&"

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
        <button
          key={option.value}
          onClick={() => handleOptionSelection(currentQuestionIndex, option.value)}
          className="tailwind-button-styles"
        >
          {option.label}
        </button>
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
  console.log('gameResults:', gameResults);
  const renderedGameResults = gameResults?.results?.map((game) => (
    <div key={game.id} className="tailwind-game-item-styles">
      <h3>{game.name}</h3>
      <img src={game.background_image} alt={game.name} />
    </div>
  )) || [];
  

  const loadingIndicator = loading ? (
    <div className="tailwind-loading-indicator-styles">Loading...</div>
  ) : null;

  return (
    <div className="tailwind-container-styles">
      <h2 className="text-orange-200">{currentQuestion.text}</h2>
      {renderedOptions}
      {renderedButton}
      {loadingIndicator}
      {renderedGameResults}
    </div>
  );
};

export default What2Play;
