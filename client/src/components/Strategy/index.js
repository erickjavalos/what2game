import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';
import Genre from '../Genre'

function Strategy() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=strategy&page_size=10`);
      const data = await response.json();
      setGames(data.results);
    }
    fetchData();
  }, []);

  return (
    <>
      <Genre 
        games={games}
        title="Strategy Games ♖"
        genre="Strategy"
      />
    </>
  );
}

export default Strategy;
