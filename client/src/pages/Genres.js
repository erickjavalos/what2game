import React, { useState, useEffect } from 'react';
import { API_KEY } from './config';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [gamesByGenre, setGamesByGenre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=5`);
      const data = await response.json();
      setGenres(data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchGamesByGenres = async () => {
      const games = await Promise.all(selectedGenres.map(async (genre) => {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${genre}&ordering=-rating&page_size=10`);
        const data = await response.json();
        return { genre, games: data.results };
      }));
      setGamesByGenre(games);
    };

    fetchGamesByGenres();
  }, [selectedGenres]);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Genres</h4>
          <div className="card-body">
            {genres.map((genre) => (
              <div key={genre.id}>
                <h5 onClick={() => handleGenreClick(genre.id)} style={{ cursor: 'pointer' }}>{genre.name}</h5>
                <p>Games count: {genre.games_count}</p>
                {selectedGenres.includes(genre.id) && (
                  <ul>
                    {gamesByGenre.find((g) => g.genre === genre.id)?.games.map((game) => (
                      <li key={game.id}>{game.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Genres;
