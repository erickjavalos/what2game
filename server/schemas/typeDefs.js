const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Game {
    id: ID
    name: String
    description: String
    releaseDate: String
    publisher: String
    developer: String
    background_image: String!
    genres: [Genre!]
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    fullName: String
    likes: [TwitchGame]
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type GameDetails {
    id: ID
    name: String
    description: String
    releaseDate: String
    publisher: String
    developer: String
    genres: [Genre!]
    platforms: [String!]
    screenshots: [String!]
    trailers: [String!]
    website: String
    rating: Float!
  }

  type GameReview {
    id: ID
    title: String
    body: String
    rating: Float
    user: User
    game: Game
    createdAt: String
  }

  type Genre {
    id: ID
    name: String
    games: [Game!]
  }

  type Stream {
    id: ID
    title: String
    description: String
    url: String
    user: User
    game: Game
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }
  type TwitchGame {
    id: String
    name: String
    box_art_url: String
    genre: String
    rating: String
    igdb_id: String
  }


  type Query {
    games: [Game!]
    topTen: [TwitchGame!]!
    game(id: ID!): GameDetails
    gameReviews(gameId: ID!): [GameReview!]
    genres: [Genre!]
    search(query: String!): [Game!]
    streams(gameId: ID!): [Stream!]
    me: User
    likedGames: [TwitchGame]
    users: [User!]
    user(username: String!): User
    recommendedGames(genres: String, platforms: String, esrb_rating: String): [Game]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, fullName: String!): Auth
    addLike(name: String!, box_art_url: String!, genre: String!, rating: String!) : User
    deleteLike(name: String!): User
    login(email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    addGameReview(title: String!, body: String!, rating: Float!, gameId: ID!): GameReview
    deleteGameReview(reviewId: ID!): GameReview

  }
`;

module.exports = typeDefs;
