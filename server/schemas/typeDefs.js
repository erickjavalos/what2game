const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
