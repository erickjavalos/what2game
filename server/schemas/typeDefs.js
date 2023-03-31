const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Game {
    id: ID
    name: String
    description: String
    releaseDate: String
    publisher: String
    developer: String
    genres: [Genre!]
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

  type User {
    id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought!]
    friends: [User!]
    friendCount: Int
  }

  type Thought {
    id: ID
    thoughtText: String
    createdAt: String
    username: String
    game: Game
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    games: [Game!]
    game(id: ID!): GameDetails
    gameReviews(gameId: ID!): [GameReview!]
    genres: [Genre!]
    search(query: String!): [Game!]
    streams(gameId: ID!): [Stream!]
    me: User
    users: [User!]
    user(username: String!): User
    thoughts(username: String): [Thought!]
    thought(id: ID!): Thought
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, gameId: ID!): Thought
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    addGameReview(title: String!, body: String!, rating: Float!, gameId: ID!): GameReview
    deleteGameReview(reviewId: ID!): GameReview
  }
`;

module.exports = typeDefs;
