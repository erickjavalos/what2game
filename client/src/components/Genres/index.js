import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';
import 'tailwindcss/tailwind.css';

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
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${selectedGenre}&page_size=16`);
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
    <div className="flex flex-col items-center">
      <h1 className="font-bold " style={{ fontSize: "84px", color: "#FFD400", textDecoration: "underline" }}>List of Genres</h1>
      <ul className="grid grid-cols-4 gap-4">
        {genres.map(genre => (
          <li key={genre.id} onClick={() => handleClick(genre.slug)} style={{cursor: 'pointer', fontSize: "32px", color: "#FFD400"}} className="font-bold col-span-1 row-span-1 hover:bg-purple-700">
            {genre.name}
          </li>
        ))}
      </ul>
      {selectedGenre && (
        <div className="flex flex-col text-center mr-8 p-12">
          <h2 className="font-bold" style={{ fontSize: "54px", color: "#FFD400",textDecoration: "underline"}}> {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Games Genres</h2>
          <ul className="grid grid-cols-4 gap-4 justify-center text-center">
            {games.map(game => (
              <li key={game.id} className="col-span-1 row-span-1 items-center my-1">
                <img src={game.background_image} alt={game.name} style={{width: '435px', height: '275px'}} />
                <span className="font-bold  hover:bg-purple-700"style={{cursor: 'pointer', fontSize: "20px", color: "#FFD400",textDecoration: "underline"}}>{game.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Genres;

