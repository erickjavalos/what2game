import React, { useState, useEffect, useContext } from "react";
import APIKeyContext from "../APIKeyContext";
import { API_KEY } from '../config/config';


function GameReviews({ gameSlug }) {
  const [reviews, setReviews] = useState([]);
  const API_KEY = useContext(APIKeyContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.rawg.io/api/games/${gameSlug}/reviews?key=${API_KEY}`);
      const data = await response.json();
      setReviews(data.results);
    };

    fetchData();
  }, [gameSlug, API_KEY]);

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
