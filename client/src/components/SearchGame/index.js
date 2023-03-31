import React, { useState } from 'react';
import { API_KEY } from './config';

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

  return (
    <div className="container">
      <h1>Search for a Game</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter game title"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <hr />
      <div className="row">
        {games.length > 0 ? (
          games.map((game) => (
            <div className="col-md-4 mb-3" key={game.id}>
              <div className="card">
                <img
                  src={game.background_image}
                  className="card-img-top"
                  alt={game.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{game.name}</h5>
                  <p className="card-text">{game.released}</p>
                  <a
                    href={game.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchGame;
