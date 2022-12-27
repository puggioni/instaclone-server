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
      console.log(input);
      return input;
    },
  },
};

module.exports = resolvers;
