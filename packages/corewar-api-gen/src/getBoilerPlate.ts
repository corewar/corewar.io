import { GraphQLSchema } from 'graphql'
import { getAllTypesList } from './getAllTypesList'

export const getBoilerPlate = (schema: GraphQLSchema): string => `
import { getApolloClient } from './getApolloClient'
import gql from 'graphql-tag'
import { ${getAllTypesList(schema)} } from './schema-typings'
import { broadcast } from './broadcast'
`
