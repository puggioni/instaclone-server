const User = require("../models/User");
const bcrypt = require("bcrypt");
const userController = require("../controllers/user");

const resolvers = {
  Query: {
    //User
    getUser: () => {
      console.log("getting users");
      return null;
    },
  },
  Mutation: {
    //User
    register: (_, { input }, ctx) => userController.register(input),
    login: (_, { input }, ctx) => userController.login(input),
  },
};

module.exports = resolvers;
