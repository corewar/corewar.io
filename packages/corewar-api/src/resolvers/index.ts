import { hills } from './hills'
import { warriors } from './warriors'
import { challenges } from './challenges'

const resolvers = [hills, warriors, challenges]

const rootResolver = Object.assign({}, ...resolvers)

export default rootResolver
