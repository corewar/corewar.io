import * as fs from 'fs'
import * as path from 'path'
import { AzureFunction } from '@azure/functions'
import { ApolloServer } from 'apollo-server-azure-functions'
import { resolvers } from '../src/resolvers'
import gql from 'graphql-tag'

const typeDefs = gql`
    ${fs.readFileSync(path.resolve(__dirname, '../src/schema/schema.graphql'))}
`

const server = new ApolloServer({ typeDefs, resolvers })

const graphql: AzureFunction = server.createHandler()

export default graphql
