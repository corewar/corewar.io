import { GraphQLField } from 'graphql'
import { getParameterList } from './getParameterList'
import { reflectTypeToJson } from './reflectTypeToJson'

export const getQuery = (field: GraphQLField<any, any, any>): string => `
                    query {
                        ${field.name}(${getParameterList(field.args)}) ${reflectTypeToJson(field.type)}
                    }
`
