import { AzureFunction } from '@azure/functions'
import { ApolloServer } from 'apollo-server-azure-functions'

import { resolvers } from '../schema/resolvers'
import typeDefs from '../schema/typeDefs'

const server = new ApolloServer({ typeDefs, resolvers })

const hills: AzureFunction = server.createHandler()

export default hills
