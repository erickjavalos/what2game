import React, { useState } from 'react';
import { API_KEY } from '../config/config';
const SearchGame = () => {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`);
    const data = await response.json();
    setGames(data.results);
    setQuery('');
  };
  const renderGame = (game) => (
    <div className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg" key={game.id}>
      <img
        src={game.background_image}
        alt={game.name}
        style={{ height: "350px", width: "500px" }}
        className="object-cover"
      />
      <div className="p-4 text-center">
        <div className="w-full flex flex-col items-center justify-center mb-4">
  <div className="bg-yellow-400 rounded-lg px-4 py-2">
    <h5 className="text-lg font-bold mb-2" style={{ fontSize: "36px", color: "#FFD400" }}>{game.name}</h5>
    <p className="text-gray-700 text-base mb-0" style={{ fontSize: "24px", color: "#FFD400" }}>{game.released}</p>
  </div>
</div>
      </div>
    </div>
  );
  const renderGames = () => {
    const rows = [];
    for (let i = 0; i < games.length; i += 3) {
      rows.push(
        <div className="flex justify-center mt-8" key={i}>
          {games.slice(i, i + 3).map(renderGame)}
        </div>
      );
    }
    return rows;
  };
  return (
    <div className="container mx-auto bg-purple-900" style={{ backgroundColor: "#2E294E" }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Search for a Game</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4 justify-center">
          <input
            type="text"
            className="w-full rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white px-4 py-2"
            placeholder="Enter game title"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="px-6 rounded-r-lg bg-blue-600 text-white font-bold p-4 uppercase border-blue-500 border-t border-b border-r">
            Search
          </button>
        </div>
      </form>
      <hr />
      {games.length > 0 ? renderGames() : <p className="text-center">No games found.</p>}
    </div>
  );
};
export default SearchGame;
