import React, { useState, useEffect } from "react";
import { API_KEY } from './config';


function GameDetails({ gameSlug }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameSlug}?key=${API_KEY}`
      );
      const data = await response.json();
      setGame(data);
    };
    fetchGameDetails();
  }, [gameSlug]);

  if (!game) {
    return <div>Loading game details...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <p>Release Date: {game.released}</p>
    </div>
  );
}

export default GameDetails;
