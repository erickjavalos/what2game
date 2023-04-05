import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';

function Action() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=action&page_size=10`);
      const data = await response.json();
      setGames(data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Games in Action Genre</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <img src={game.background_image} alt={game.name} style={{width: '200px', height: 'auto', marginRight: '10px'}} />
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Action;
