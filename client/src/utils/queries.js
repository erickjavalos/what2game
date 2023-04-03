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

export const GET_LIKED_GAMES = gql`
  query LikedGames {
    likedGames {
      id
      genre
      box_art_url
      name
      rating
      igdb_id
    }
  }
`


export const QUERY_ME = gql`
  query Query {
    me {
      likes {
        name
        genre
        rating
        id
        igdb_id
        box_art_url
      }
      fullName
      email
      password
      username
    }
  }
`
