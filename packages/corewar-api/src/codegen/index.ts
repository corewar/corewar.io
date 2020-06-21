import { buildSchema } from 'graphql'
import * as fs from 'fs'
import * as path from 'path'
import { buildSource } from './buildSource'

try {
    const schemaFilename = path.resolve(__dirname, '../schema/schema.graphql')
    const graphQLSource = fs.readFileSync(schemaFilename, 'utf-8')

    const schema = buildSchema(graphQLSource)

    const typescriptSource = buildSource(schema)

    const outputFilename = path.resolve(__dirname, '../resolvers.ts')
    fs.writeFileSync(outputFilename, typescriptSource)

    console.log('\x1b[32m%s\x1b[0m%s', '  √', ' Generate api gateway')
} catch (e) {
    console.log('\x1b[31m%s\x1b[0m%s', '  X', ' Generate api gateway')
    throw e
}
