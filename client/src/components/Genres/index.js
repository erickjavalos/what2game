import React, { useState, useEffect } from 'react';

function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.rawg.io/api/genres?key=df0a6dbf13504aefb411f7298892a149&ordering=-games_count&page_size=4');
      const data = await response.json();
      setGenres(data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>List of Genres</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;

