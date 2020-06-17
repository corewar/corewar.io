import { GraphQLSchema } from 'graphql'
import { getAllTypesList } from './getAllTypesList'
import { getUsedTypes } from './getUsedTypes'
import { getParameterList } from './getParameterList'
import { formatType } from './formatType'
import { getQuery } from './getQuery'
import { getVariables } from './getVariables'
import { kebabCase } from './kebabCase'

export const buildSource = (schema: GraphQLSchema): string => {
    const queryFields = Object.values(schema.getQueryType().getFields())
    const mutationFields = Object.values(schema.getMutationType().getFields())

    return `
import * as path from 'path'
import * as fs from 'fs'
import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'
import { ${getAllTypesList(getUsedTypes(schema))} } from './schema-typings'
import { getApolloClient } from './getApolloClient'
import { broadcast } from './broadcast'

${queryFields
    .map(
        field => `
export const ${field.name} = async (${getParameterList(field.args)}): Promise<${formatType(field.type)}> => {
    const client = getApolloClient('${field.name}')
    const result = await client.query({
        query: gql\`${getQuery(field)}\`,
        variables: ${getVariables(field.args)}
    })
    return result.data
}

`
    )
    .join('\n')}

${mutationFields
    .map(
        field => `
export const ${field.name} = (${getParameterList(field.args)}): ${formatType(field.type)} => {
    broadcast('${kebabCase(field.name)}', {
        body: ${getVariables(field.args)}
    })
    return {
        success: true
    }
}

`
    )
    .join('\n')}
    
const typeDefs = gql\`\${fs.readFileSync(path.resolve(__dirname, '../schema/schema.graphql'))}\`
const resolvers = {
    Query: {
        ${queryFields.map(x => x.name).join('\n, ')}
    },
    Mutation: {
        ${mutationFields.map(x => x.name).join(', ')}
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
    console.log(\`🚀  Server ready at \${url}\`)
})
`
}
