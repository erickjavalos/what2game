import React from 'react';

const GameDetails = ({ game }) => {
  return (
    <div className="hidden md:block">
      <ul>
        <li>{game.name}</li>
        <li>{game.released}</li>
        <li>{game.rating}</li>
      </ul>
    </div>
  );
};

export default GameDetails;
