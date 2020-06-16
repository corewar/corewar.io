import { GraphQLNamedType } from 'graphql'
import { getAllTypesList } from './getAllTypesList'

export const getImports = (types: GraphQLNamedType[]): string => `
import { getApolloClient } from './getApolloClient'
import gql from 'graphql-tag'
import { ${getAllTypesList(types)} } from './schema-typings'
import { broadcast } from './broadcast'
`
