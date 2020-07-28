import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import { readSchemas } from './readSchema'

const schemaFiles = [
    './schema/warriors.graphql',
    './schema/challenges.graphql',
    './schema/results.graphql',
    './schema/hills.graphql',
    './schema/index.graphql'
]
;(async () => {
    const typeDefs = await readSchemas(schemaFiles)

    const server = new ApolloServer({ typeDefs, resolvers })

    const { url } = await server.listen()

    console.log(`\n🚀  Server ready at ${url}\n`)
})()
