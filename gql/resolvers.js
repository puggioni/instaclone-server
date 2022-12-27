const resolvers = {
  Query: {
    //User
    getUser: () => {
      console.log('getting users')
      return null
    },
  },
}

module.exports = resolvers
