import { GraphQLSchema } from 'graphql'

const BUILT_IN_TYPES = ['String', 'Boolean', 'Int', 'Float', 'MutationResultData']

export const getAllTypesList = (schema: GraphQLSchema): string =>
    Object.keys(schema.getTypeMap())
        .filter(x => !x.startsWith('__'))
        .filter(x => !BUILT_IN_TYPES.includes(x))
        .join(', ')
