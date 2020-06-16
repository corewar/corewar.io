import { GraphQLArgument } from 'graphql'

export const getVariables = (args: GraphQLArgument[]): string => `{
    ${args.map(arg => arg.name).join(',\n')}
}`
