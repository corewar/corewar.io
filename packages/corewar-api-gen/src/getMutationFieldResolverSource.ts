import { GraphQLField } from 'graphql'
import { getParameterList } from './getParameterList'
import { kebabCase } from './kebabCase'
import { getVariables } from './getVariables'

export const getMutationFieldResolverSource = (field: GraphQLField<any, any, any>): string => {
    return `
        export const ${field.name} = async (${getParameterList(field.args)}): Promise<void> => {
            broadcast('${kebabCase(field.name)}', {
                body: ${getVariables(field.args)}
            })
        }
    `
}
