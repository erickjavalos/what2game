const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    id: Int!
    name: String!
    released: String
    background_image: String
  }

  type Query {
    searchGames(query: String!): [Game]
  }
  type Genre {
    id: Int!
    name: String!
    slug: String!
    games_count: Int!
    image_background: String!
  }

  type Query {
    genres(page: Int, page_size: Int, ordering: String): [Genre!]!
  }
`;

module.exports = typeDefs;
