import { GraphQLField } from 'graphql'
import { reflectTypeToJson } from './reflectTypeToJson'

export const getQuery = (field: GraphQLField<any, any, any>): string => `
            query\${getQueryParamString(args, queryParams)} {
                ${field.name}\${getQueryParamUsageString(args)} ${reflectTypeToJson(field.type)}
            }
`
