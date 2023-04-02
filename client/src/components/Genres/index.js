import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';

function Genres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=20`);
      const data = await response.json();
      setGenres(data.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (selectedGenre) {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${selectedGenre}&page_size=10`);
        const data = await response.json();
        setGames(data.results);
      } else {
        setGames([]);
      }
    }
    fetchData();
  }, [selectedGenre]);

  function handleClick(name) {
    setSelectedGenre(name);
  }

  return (
    <div>
      <h1>List of Genres</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.id} onClick={() => handleClick(genre.slug)} style={{cursor: 'pointer'}}>
            {genre.name}
          </li>
        ))}
      </ul>
      {selectedGenre && (
        <div>
          <h2>Games in {selectedGenre} genre</h2>
          <ul>
            {games.map(game => (
              <li key={game.id}>
                <img src={game.background_image} alt={game.name} style={{width: '200px', height: 'auto', marginRight: '10px'}} />
                {game.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Genres;

