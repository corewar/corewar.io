import { GraphQLScalarType } from 'graphql'

export const DataScalar = new GraphQLScalarType({
    name: 'Data',
    description: 'Any data',
    parseValue(value: any) {
        return value
    },
    serialize(value: any) {
        return value
    },
    parseLiteral(ast) {
        return ast
    }
})
