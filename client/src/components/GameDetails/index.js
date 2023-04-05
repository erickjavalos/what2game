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
  function createMarkup() {
    return { __html: game.description };
  }
  
  return (
<div className="container mx-auto p-4">
  <form onSubmit={handleSubmit} className="flex mb-4">
    <input
      type="text"
      value={gameQuery}
      onChange={handleInputChange}
      className="w-full rounded-l-lg py-2 px-4"
      placeholder="Enter game title"
    />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
    >
      Search
    </button>
  </form>
  {isLoading && <div>Loading game details...</div>}
  {error && <div>{error}</div>}
  {game && (
    <div className="flex flex-col items-center">
  <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
  <div className="flex flex-row">
    <img src={game.background_image} alt={game.name} className="mb-4" style={{ height: "200px", width: "200px"}} />
    <div className="w-1/2 p-2">
      <h2 className="font-bold bg-yellow-200" style={{ font:"32px", color:"#138D75"}}>Details</h2>
      <p>Release Date: {game.released}</p>
      <p style={{ font: "200px"}}>Rating: {game.rating}</p>
      <p>
        Platforms:{" "}
        {game.platforms
          .map((platform) => platform.platform.name)
          .join(", ")}
      </p>
      <p>Genre: {game.genres.map((genre) => genre.name).join(", ")}</p>
    </div>
        <div className="w-1/2 p-2">
          <h2 className="text-2xl font-bold">Description</h2>
          <div className="text-justify" innerHTML={game.description} />
        </div>
      </div>
    </div>
  )}
</div>

  );
}
export default GameDetails;