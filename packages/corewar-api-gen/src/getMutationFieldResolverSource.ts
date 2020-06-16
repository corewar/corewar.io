import { GraphQLField } from 'graphql'
import { getParameterList } from './getParameterList'
import { kebabCase } from './kebabCase'
import { getVariables } from './getVariables'
import { formatType } from './formatType'

export const getMutationFieldResolverSource = (field: GraphQLField<any, any, any>): string => {
    return `
        export const ${field.name} = (${getParameterList(field.args)}): ${formatType(field.type)} => {
            broadcast('${kebabCase(field.name)}', {
                body: ${getVariables(field.args)}
            })
            return {
                success: true
            }
        }
    `
}
