require('dotenv').config()
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

;(async () => {
    const server = new ApolloServer({ typeDefs, resolvers })

    const { url } = await server.listen()

    console.log(`\n🚀  Server ready at ${url}\n`)
})()
