import { GraphQLSchema } from 'graphql'
import { getAllTypesList } from './getAllTypesList'
import { getUsedTypes } from './getUsedTypes'
import { getParameterList } from './getParameterList'
import { formatType } from './formatType'
import { getQuery } from './getQuery'
import { getVariables } from './getVariables'
import { kebabCase } from './kebabCase'
import { getParameterTypeDictionary } from './getParameterTypeDictionary'

export const buildSource = (schema: GraphQLSchema): string => {
    const queryFields = Object.values(schema.getQueryType().getFields())
    const mutationFields = Object.values(schema.getMutationType().getFields())

    return `
require('dotenv').config()
import * as path from 'path'
import * as fs from 'fs'
import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'
import { ${getAllTypesList(getUsedTypes(schema))} } from './schema-typings'
import { getApolloClient, broadcast } from 'corewar-infrastructure'
import { getQueryParamString } from './getQueryParamString'
import { getQueryParamUsageString } from './getQueryParamUsageString'

${queryFields
    .map(
        /* eslint-disable-next-line */ field => `
const ${field.name} = async (_: unknown, args: { ${getParameterList(field.args)} }): Promise<${formatType(field.type)}> => {
    const ${getVariables(field.args)} = args
    const queryParams = ${getParameterTypeDictionary(field.args)}
    const client = getApolloClient('${field.name}')
    const result = await client.query({
        query: gql\`${getQuery(field)}\`,
        variables: ${getVariables(field.args)}
    })
    return result.data.${field.name}
}

`
    )
    .join('\n')}

${mutationFields
    .map(
        field => `
const ${field.name} = (${getParameterList(field.args)}): ${formatType(field.type)} => {
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
