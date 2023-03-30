const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Genre {
    id: Int!
    name: String!
    slug: String!
    games_count: Int!
    image_background: String!
  }

  type GameReview {
    id: ID!
    text: String!
    rating: Int!
  }

  type Game {
    id: Int!
    name: String!
    released: String!
    background_image: String!
    website: String!
  }

  type Query {
    genres(page: Int, page_size: Int, ordering: String): [Genre!]!
    gameReviews(slug: String!): [GameReview!]!
    search(query: String!, apiKey: String!): [Game!]!
  }
`;

module.exports = typeDefs;
