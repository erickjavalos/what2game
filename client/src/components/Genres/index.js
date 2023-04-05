import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';
import Genre from '../Genre'


function Genres() {

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGenreProp, setselectedGenreProp] = useState(null);
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
        console.log(selectedGenre.charAt(0))
        const lowerCase = selectedGenre.charAt(0).toLowerCase() + selectedGenre.slice(1)
        console.log("lower case", lowerCase)
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${lowerCase}&page_size=10`);
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

    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1)
    setselectedGenreProp(upperCaseName)
  }

  return (
    <div>
      <div className="m-5 flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center">
          {genres.map(genre => (
            <button key={genre.id} onClick={() => handleClick(genre.slug)} className="m-2 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline">{genre.name}</button>
          ))}
        </div>
      </div>

      {selectedGenre && (
        <div className="m-5 flex flex-col items-center justify-center">
          <Genre 
            games={games}
            title={selectedGenreProp + " Games 😎"}
            genre={selectedGenreProp}
          />
        </div>
      )}
    </div>
  );
}
export default Genres;