import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';
import Genre from '../Genre'


function Adventure() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=adventure&page_size=10`);
      const data = await response.json();
      setGames(data.results);
    }
    fetchData();
  }, []);

  return (
    <>
      <Genre 
        games={games}
        title="Adventure Games 🗺️"
        genre="Adventure"
      />
    </>
  );
}

export default Adventure;

