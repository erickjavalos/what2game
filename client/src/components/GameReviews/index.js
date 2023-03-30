import React, { useState, useEffect } from "react";

function GameReviews({ gameSlug }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameSlug}/reviews?key=<your API key>`
      );
      const data = await response.json();
      setReviews(data.results);
    };

    fetchData();
  }, [gameSlug]);

  return (
    <div>
      <h2>Reviews for {gameSlug}</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.text}</p>
            <p>Rating: {review.rating}</p>
            <p>Author: {review.user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameReviews;
