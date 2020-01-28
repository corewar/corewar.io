import 'reflect-metadata'
import ParseResolver from './resolvers/ParseResolver'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

(async () => {
    const schema = await buildSchema({
        resolvers: [ParseResolver]
    })

    const server = new ApolloServer({
        schema
    })

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    })
})()