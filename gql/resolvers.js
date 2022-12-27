const User = require("../models/User");
const bcrypt = require("bcrypt");
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
    register: async (_, { input }, ctx) => {
      const newUser = input;
      newUser.email = newUser.email.toLowerCase();
      newUser.username = newUser.username.toLowerCase();
      //Check if user exists
      const userFound = await User.findOne({
        $or: [{ email: newUser.email }, { username: newUser.username }],
      });
      if (userFound) throw new Error("User already exists");
      //encrypt password
      const salt = bcrypt.genSaltSync(10);
      newUser.password = bcrypt.hashSync(newUser.password, salt);
      //save user
      try {
        const user = new User(newUser);
        user.save();
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
