import React, { useState } from "react";
import GameReviews from "./GameReviews";
import GameDetails from "./GameDetails";

function App() {
  const [gameSlug, setGameSlug] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform validation and other checks
    // set gameSlug to the selected game's slug
    setGameSlug("selected-game-slug");
  };

  return (
    <div>
      <h1>Game Reviews App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select a game:
          <select value={gameSlug} onChange={(e) => setGameSlug(e.target.value)}>
            <option value="">Select a game</option>
            <option value="game-1-slug">Game 1</option>
            <option value="game-2-slug">Game 2</option>
            <option value="game-3-slug">Game 3</option>
          </select>
        </label>
        <button type="submit">Show Reviews</button>
      </form>
      {gameSlug && (
        <div>
          <GameDetails gameSlug={gameSlug} />
          <GameReviews gameSlug={gameSlug} />
        </div>
      )}
    </div>
  );
}

export default App;
