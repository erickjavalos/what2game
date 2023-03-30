import React, { useState } from 'react';

const What2Play = () => {
  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What genre of game are you in the mood for?',
      options: ['Action', 'Adventure', 'RPG', 'Simulation', 'Sports', 'Strategy'],
      selected: [],
    },
    {
      id: 2,
      question: 'Do you prefer single-player or multiplayer games?',
      options: ['Single-Player', 'Multiplayer'],
      selected: [],
    },
    {
      id: 3,
      question: 'What platform do you want to play on?',
      options: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
      selected: [],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleQuestionChange = (value) => {
    const newQuestions = [...questions];
    if (newQuestions[currentQuestion].selected.includes(value)) {
      newQuestions[currentQuestion].selected = newQuestions[currentQuestion].selected.filter((option) => option !== value);
    } else {
      newQuestions[currentQuestion].selected.push(value);
    }
    setQuestions(newQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const genre = questions.find((q) => q.id === 1).selected;
    const platform = questions.find((q) => q.id === 3).selected;
    const response = await fetch(`https://api.twitch.tv/helix/games/top?first=100&platform=${platform}&genre=${genre}`, {
      headers: {
        'Client-ID': '7b5rjeearbqz99sz6f9v2vin4ve7ai',
        Authorization: `Bearer $"ihxsm7ap5nrhb8zkuuho3bsaz6kuqe"`,
      },
    });
    const data = await response.json();
    console.log('data:', data); // add this line to log the data variable
    if (data && data.data && data.data.length > 0) {
      setGame(data.data[Math.floor(Math.random() * data.data.length)]);
    } else {
      console.log('no game data available');
    }
  };
  

  return (
    <div>
      <h1>Don't Know What to Play?</h1>
      <div key={questions[currentQuestion].id}>
        <h2>{questions[currentQuestion].question}</h2>
        <ul>
          {questions[currentQuestion].options.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  name={`question-${questions[currentQuestion].id}`}
                  value={option}
                  checked={questions[currentQuestion].selected.includes(option)}
                  onChange={(e) => handleQuestionChange(e.target.value)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <button disabled={!questions[currentQuestion].selected.length} onClick={handleNextQuestion}>
          Next
        </button>
      </div>
      {game && (
        <div>
          <h2>Recommended Game:</h2>
          <h3>{game.name}</h3>
          <img src={game.box_art_url.replace('{width}', '300').replace('{height}', '400')} alt={`${game.name} Box Art`} />
        </div>
      )}
    </div>
  );
};

export default What2Play;
