import { hills } from './hills'
import { warriors } from './warriors'
import { challenges } from './challenges'

const resolvers = [hills, warriors, challenges]

const rootResolver = {
    Query: Object.assign({}, ...resolvers.map(x => x.Query)),
    Mutation: Object.assign({}, ...resolvers.map(x => x.Mutation)),
    Subscription: Object.assign({}, ...resolvers.map(x => x.Subscription))
}

export default rootResolver
