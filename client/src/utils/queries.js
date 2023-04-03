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

export const QUERY_ME = gql`
  query Query {
    me {
      fullName
      likes
      email
      password
      username
      _id
    }
  }
`
