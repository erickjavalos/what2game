import React, { useState, useEffect } from 'react';
import { API_KEY } from './config';

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=5`);
      const data = await response.json();
      setGenres(data.results);
    };

    fetchData();
  }, []);

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Genres</h4>
          <div className="card-body">
            {genres.map((genre) => (
              <div key={genre.id}>
                <h5>{genre.name}</h5>
                <p>Games count: {genre.games_count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Genres;
