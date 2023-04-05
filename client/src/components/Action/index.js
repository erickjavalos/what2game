import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config/config';
import Genre from '../Genre'



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
    <>
    <div className="m-5 flex flex-col items-center justify-center">
      <Genre 
        games={games}
        title="Action Games 🔫"
        genre="Action"
      />
    </div>
    
    </>
  );
}

export default Action;
