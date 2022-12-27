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

  type Query {
    # Users
    getUser: User
  }
`;

module.exports = typeDefs;
