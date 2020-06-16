import { GraphQLType } from 'graphql'

export const getRootTypeRecursive = (type: GraphQLType): GraphQLType => {
    if (!('ofType' in type)) {
        return type
    }
    return getRootTypeRecursive(type.ofType)
}
