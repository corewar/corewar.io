import { GraphQLArgument } from 'graphql'
import { formatType } from './formatType'

export const getParameterList = (args: GraphQLArgument[]): string =>
    args.map(arg => `${arg.name}: ${formatType(arg.type)}`).join(', ')
