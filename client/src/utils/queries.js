import { gql } from '@apollo/client';
//single game call
export const GET_GAMES = gql`
  query GetGames {
    games {
      name
      released
      rating
      background_image
    }
  }
`;

export async function fetchGames() {
  const response = await fetch(`https://api.rawg.io/api/games/?key=${API_KEY}`);
  const { results } = await response.json();
  return results;
}
// get all genres
export const GET_GENRES = gql`
  query GetGenres {
    genres {
      name
      slug
    }
  }
`;

export async function fetchGenres() {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=5`);
  const { results } = await response.json();
  return results;
}
//get platforms
export const GET_PLATFORMS = gql`
  query GetPlatforms {
    platforms {
      name
      slug
    }
  }
`;

export async function fetchPlatforms() {
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
  const { results } = await response.json();
  return results;
}


// Get game reviews
export const GET_GAME_REVIEWS = gql`
  query GetGameReviews($id: ID!) {
    game(id: $id) {
      name
      reviews {
        id
        text
        rating
      }
    }
  }
`;
export async function fetchRreviews() {
  const response = await fetch(`https://api.rawg.io/api/games/{gameslug}/reviews?key=${API_KEY}`);
  const { results } = await response.json();
  return results;
}
