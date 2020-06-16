import { buildSchema } from 'graphql'
import * as fs from 'fs'
import * as path from 'path'
import { getQueryFieldResolverSource } from './getQueryFieldResolverSource'
import { getMutationFieldResolverSource } from './getMutationFieldResolverSource'
import { getImports } from './getImports'
import { getUsedTypes } from './getUsedTypes'

const schemaFilename = path.resolve(__dirname, './schema/schema.graphql')
console.log(`Generating API Gateway for schema file: '${schemaFilename}'`)
const graphQLSource = fs.readFileSync(schemaFilename, 'utf-8')

const schema = buildSchema(graphQLSource)

const queryFields = Object.values(schema.getQueryType().getFields())
const mutationFields = Object.values(schema.getMutationType().getFields())

const querySource = queryFields.map(field => getQueryFieldResolverSource(field))
const mutationSource = mutationFields.map(field => getMutationFieldResolverSource(field))

const resolvers = [...querySource, ...mutationSource]

const types = getUsedTypes(schema)
const typescriptSource = `${getImports(types)}\n\n${resolvers.join('\n')}`

const outputFilename = path.resolve(__dirname, './generated/index.ts')
fs.writeFileSync(outputFilename, typescriptSource)
console.log(`Wrote file ${outputFilename}`)
console.log('Done')
