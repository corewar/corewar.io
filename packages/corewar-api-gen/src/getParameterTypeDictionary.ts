import { GraphQLArgument } from 'graphql'

export const getParameterTypeDictionary = (args: GraphQLArgument[]): string => `{
    ${args.map(arg => `'${arg.name}': '${arg.type.toString()}'`)}
}`
