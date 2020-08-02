import { hills } from './hills'
import { warriors } from './warriors'
import { challenges } from './challenges'
import { mergeResolvers } from '@graphql-tools/merge'

const resolvers = [hills, warriors, challenges]

export default mergeResolvers(resolvers)
