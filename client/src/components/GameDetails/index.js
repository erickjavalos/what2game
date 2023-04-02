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
      {isLoading && <div className="font-bold" style={{ fontSize: "32px", color: "#FFD400"}}>Loading game details...</div>}
      {error && <div>{error}</div>}
      {game && (
    <div className="flex flex-col md:flex-row" style={{ fontSize: "20px" }}>
    <img
      src={game.background_image}
      alt={game.name}
      className="w-full md:w-1/2 h-auto"
      style={{ maxHeight: "675px" }}
    />
    <div className="flex-1 p-3 bg-yellow-100">
      <h2 className="font-bold text-4xl mb-4">Details</h2>
      <p className="mb-2">
        <span className="font-bold">Release Date:</span> {game.released}
      </p>
      <p className="mb-2">
        <span className="font-bold">Rating:</span> {game.rating}
      </p>
      <p className="mb-2">
        <span className="font-bold">Platforms:</span>{" "}
        {game.platforms.map((platform) => platform.platform.name).join(", ")}
      </p>
      <p className="mb-2">
        <span className="font-bold">Genres:</span>{" "}
        {game.genres.map((genre) => genre.name).join(", ")}
      </p>
      <h2 className="text-2xl font-bold mt-4 mb-4" style={{ fontSize: "40px" }}>
        Description
      </h2>
      <div
        className="text-justify"
        style={{ fontSize: "17px" }}
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  </div>
  
      )}
    </div>
  );
}
export default GameDetails;