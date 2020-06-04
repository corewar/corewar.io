import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
;(async (): Promise<void> => {
    const schema = await buildSchema({
        validate: false,
        resolvers: []
    })

    const server = new ApolloServer({
        schema
    })

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    })
})()
