import 'reflect-metadata'
import ParseResolver from '@/resolvers/ParseResolver'
import WarriorResolver from '@/resolvers/WarriorResolver'
import HillResolver from '@/resolvers/HillResolver'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
;(async (): Promise<void> => {
    const schema = await buildSchema({
        validate: false,
        resolvers: [ParseResolver, WarriorResolver, HillResolver]
    })

    const server = new ApolloServer({
        schema
    })

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    })
})()
