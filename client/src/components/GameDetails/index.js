import React, { useState } from "react";
import { API_KEY } from "../config/config";

function GameDetails() {
  const [gameQuery, setGameQuery] = useState("");
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGameDetails() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?search=${encodeURIComponent(
          gameQuery
        )}&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch game details");
      }

      const data = await response.json();
      const firstResult = data.results[0];

      if (!firstResult) {
        throw new Error("No game found");
      }

      const gameSlug = firstResult.slug;
      const gameResponse = await fetch(
        `https://api.rawg.io/api/games/${gameSlug}?key=${API_KEY}`
      );

      if (!gameResponse.ok) {
        throw new Error("Could not fetch game details");
      }

      const gameData = await gameResponse.json();
      setGame(gameData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchGameDetails();
  }

  function handleInputChange(event) {
    setGameQuery(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={gameQuery} onChange={handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>

      {isLoading && <div>Loading game details...</div>}
      {error && <div>{error}</div>}

      {game && (
        <div>
          <h1>{game.name}</h1>
          <img src={game.background_image} alt={game.name} />
          <p>Release Date: {game.released}</p>
          <p>Rating: {game.rating}</p>
          <p>
            Platforms:{" "}
            {game.platforms
              .map((platform) => platform.platform.name)
              .join(", ")}
          </p>
          <p>Genre: {game.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default GameDetails;
