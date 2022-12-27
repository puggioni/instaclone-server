const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolvers')
require('dotenv').config({ path: '.env' })
mongoose.set('strictQuery', false)
mongoose.connect(
  process.env.BBDD,
  {
    USENewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      server()
    }
  },
)

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  })
  serverApollo.listen().then(({ url }) => {
    console.log(`Server running in ${url}`)
  })
}
