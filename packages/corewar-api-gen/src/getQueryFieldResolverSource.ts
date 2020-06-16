import { GraphQLField } from 'graphql'
import { getParameterList } from './getParameterList'
import { getQuery } from './getQuery'
import { getVariables } from './getVariables'
import { formatType } from './formatType'

export const getQueryFieldResolverSource = (field: GraphQLField<any, any, any>): string => {
    return `
        export const ${field.name} = async (${getParameterList(field.args)}): Promise<${formatType(field.type)}> => {
            const client = getApolloClient('${field.name}')
            const result = await client.query({
                query: gql\`${getQuery(field)}\`,
                variables: ${getVariables(field.args)}
            })
            return result.data
        }
    `
}
