import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import HillResolver from './resolvers'
;(async (): Promise<void> => {
    const schema = await buildSchema({
        validate: false,
        resolvers: [HillResolver]
    })

    const server = new ApolloServer({
        schema
    })

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    })
})()
