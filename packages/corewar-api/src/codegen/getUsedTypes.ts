import { GraphQLSchema, GraphQLNamedType } from 'graphql'
import { getRootTypeRecursive } from './getRootTypeRecursive'

export const getUsedTypes = (schema: GraphQLSchema): GraphQLNamedType[] => {
    const rootTypes = [
        ...Object.values(schema.getQueryType().getFields()),
        ...Object.values(schema.getMutationType().getFields())
    ]
    const allTypes = [
        ...rootTypes.map(x => getRootTypeRecursive(x.type)),
        ...rootTypes.flatMap(x => x.args.map(y => getRootTypeRecursive(y.type)))
    ] as GraphQLNamedType[]
    return [...new Set(allTypes)]
}
