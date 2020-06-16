import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

export const getApolloClient = (serviceName: string): ApolloClient<NormalizedCacheObject> => {
    const cache = new InMemoryCache()
    const link = createHttpLink({
        uri: `http://corewar-${serviceName}-service.azurewebsites.net/api/graphql`
    })
    return new ApolloClient({
        cache,
        link
    })
}
