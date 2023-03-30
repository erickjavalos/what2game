const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }
  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

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

    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought

  }
`;

module.exports = typeDefs;
