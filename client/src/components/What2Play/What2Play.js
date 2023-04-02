import React, { useState } from 'react';

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
      <div key={option.value} className="flex items-center bg-white border-none text-black py-2 px-4 mr-2 mb-4 cursor-pointer">
      <input
        type="checkbox"
        id={option.value}
        value={option.value}
        onChange={(e) => handleOptionSelection(currentQuestionIndex, e.target.value)}
        className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out tailwind-checkbox-styles"
      />
      <label htmlFor={option.value} className="ml-2 text-sm leading-5 text-gray-700">
        {option.label}
      </label>
    </div>
    ));
    
    const renderedButton = currentQuestionIndex === questions.length - 1 ? (
      <button
        onClick={handleFindGame}
        className="inline-flex items-center px-4 py-2 bg-white border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest focus:outline-none focus:shadow-outline-gray transition ease-in-out duration-150 cursor-pointer mr-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!nextButtonEnabled}
      >
        Find Game
      </button>
    ) : (
      <button
        onClick={handleNextButtonClick}
        className="inline-flex items-center px-4 py-2 bg-white border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest focus:outline-none focus:shadow-outline-gray transition ease-in-out duration-150 cursor-pointer mr-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!nextButtonEnabled}
      >
        Next Question
      </button>
    );
    
    const renderedGameResults = gameResults?.results?.map((game) => (
      <div key={game.id} className="bg-white rounded-md shadow-md overflow-hidden tailwind-game-item-styles">
        <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{game.name}</h3>
        </div>
      </div>
    )) || [];
    
    const loadingIndicator = loading ? (
      <div className="bg-white rounded-md shadow-md p-4 text-center tailwind-loading-indicator-styles">Loading...</div>
    ) : null;
    
    const showQuestions = Object.keys(gameResults).length === 0;
    
    return (
      <div className="bg-custom-darkblue min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto p-8">
          {showQuestions && (
            <>
              <h2 className="text-2xl font-semibold text-orange-200 text-center mb-4">{currentQuestion.text}</h2>
              <div className="flex flex-wrap justify-center mt-4">{renderedOptions}</div>
              <div className="text-center mt-6">{renderedButton}</div>
            </>
          )}
          {loadingIndicator}
          {Object.keys(gameResults).length > 0 && (
            <>
              <h1 className="text-3xl font-semibold text-orange-200 text-center mb-8">Try These Games Out</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderedGameResults.slice(0, 10)}
              </div>
            </>
          )}
        </div>
      </div>
    );
};


export default What2Play;
