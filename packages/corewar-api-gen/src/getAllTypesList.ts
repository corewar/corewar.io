import { GraphQLNamedType } from 'graphql'

const BUILT_IN_TYPES = ['String', 'Boolean', 'Int', 'Float', 'MutationResultData']

export const getAllTypesList = (types: GraphQLNamedType[]): string => {
    const foo = types
        .map(x => x.name)
        .filter(x => !x.startsWith('__'))
        .filter(x => !BUILT_IN_TYPES.includes(x))
        .join(', ')
    return foo
}
