import { gql } from '@apollo/client';

import {API_KEY} from '../components/config/config'

// get top trending games 
export const GET_TOP_TEN = gql`
  query TopTen {
    topTen {
      id
      genre
      box_art_url
      name
      rating
      igdb_id
    }
  }
`
//single game call
// export const GET_GAMES = gql`
//   query GetGames {
//     games {
//       name
//       released
//       rating
//       background_image
//     }
//   }
// `;

// // TODO: do we still need this?
// export async function fetchGames() {
//   const response = await fetch(`https://api.rawg.io/api/games/?key=${API_KEY}`);
//   const { results } = await response.json();
//   return results;
// }

// // get all genres
// export const GET_GENRES = gql`
//   query GetGenres {
//     genres {
//       name
//       slug
//     }
//   }
// `;

// // Get genres
// export async function fetchGenres() {
//   const response = await fetch(
//     `https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=5`
//   );
//   const { results } = await response.json();
//   return results;
// }
//get platforms
// export const GET_PLATFORMS = gql`
//   query GetPlatforms {
//     platforms {
//       name
//       slug
//     }
//   }
// `;

// export async function fetchPlatforms() {
//   const response = await fetch(
//     `https://api.rawg.io/api/platforms?key=${API_KEY}`
//   );
//   const { results } = await response.json();
//   return results;
// }

// // Get game reviews
// export const GET_GAME_REVIEWS = gql`
//   query GetGameReviews($id: ID!) {
//     game(id: $id) {
//       name
//       reviews {
//         id
//         text
//         rating
//       }
//     }
//   }
// `;

// thoughts for now 

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;

// export const QUERY_THOUGHTS = gql`
//   query getThoughts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_SINGLE_THOUGHT = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         thoughtAuthor
//         createdAt
//       }
//     }
//   }
// `;
// export async function fetchRreviews() {
//   const response = await fetch(`https://api.rawg.io/api/games/reviews?key=${API_KEY}`);
//   const { results } = await response.json();
//   return results;
// }

