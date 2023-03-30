import React from "react";
import GameReviews from "./GameReviews";

function GameDetails({ gameSlug }) {
  return (
    <div>
      <h1>{gameSlug} Details</h1>
      <GameReviews gameSlug={gameSlug} />
    </div>
  );
}

export default GameDetails;
