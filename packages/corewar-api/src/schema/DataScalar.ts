import { GraphQLScalarType } from 'graphql'

/* eslint-disable */
const DataScalar = new GraphQLScalarType({
    name: 'Data',
    description: 'Any data',
    parseValue(value: any): any {
        return value
    },
    serialize(value: any): any {
        return value
    },
    parseLiteral(ast: any): any {
        return ast
    }
})

export default DataScalar
