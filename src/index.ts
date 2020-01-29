import 'reflect-metadata'
import ParseResolver from '@/parse/ParseResolver'
import WarriorResolver from '@/warriors/WarriorResolver'
import HillResolver from '@/hills/HillResolver'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

(async () => {
    const schema = await buildSchema({
        resolvers: [ParseResolver, WarriorResolver, HillResolver]
    })

    const server = new ApolloServer({
        schema
    })

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    })
})()