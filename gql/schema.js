const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    avatar: String
    sitioWeb: String
    description: String
    psasword: String
    createAt: String
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    # Users
    getUser: User
  }
  type Mutation {
    # Users
    register(input: UserInput): User
  }
`;

module.exports = typeDefs;
