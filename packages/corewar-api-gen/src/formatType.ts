import { GraphQLType } from 'graphql'

const TYPE_ALIASES = {
    String: 'string',
    Boolean: 'boolean',
    Int: 'number',
    Float: 'number'
}

export const formatType = (type: GraphQLType): string => {
    const isArray = type.toString().startsWith('[')
    const replaced = type.toString().replace(/!|\[|\]/g, '')
    const alias = TYPE_ALIASES[replaced]

    const result = alias ?? replaced

    return `${result}${isArray ? '[]' : ''}`
}
