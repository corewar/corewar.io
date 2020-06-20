require('dotenv').config()
import * as path from 'path'
import * as fs from 'fs'
import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'
import { Hill, MutationResult, RulesInput, WarriorInput } from './schema-typings'
import { getApolloClient, broadcast } from 'corewar-infrastructure'
import { getQueryParamString } from './getQueryParamString'
import { getQueryParamUsageString } from './getQueryParamUsageString'

const hills = async (_: unknown, args: { id: string }): Promise<Hill[]> => {
    const { id } = args
    const queryParams = {
        id: 'String'
    }
    const client = getApolloClient('hills')
    const result = await client.query({
        query: gql`
            query${getQueryParamString(args, queryParams)} {
                hills${getQueryParamUsageString(args)} {
                    id
                    rules {
                        rounds
                        size
                        options {
                            coresize
                            maximumCycles
                            initialInstruction {
                                address
                                opcode
                                modifier
                                aOperand {
                                    mode
                                    address
                                }
                                bOperand {
                                    mode
                                    address
                                }
                            }
                            instructionLimit
                            maxTasks
                            minSeparation
                            standard
                        }
                    }
                    warriors {
                        redcode
                    }
                }
            }
`,
        variables: {
            id
        }
    })
    return result.data.hills
}

const createHill = (rules: RulesInput): MutationResult => {
    broadcast('create-hill', {
        body: {
            rules
        }
    })
    return {
        success: true
    }
}

const updateHill = (id: string, rules: RulesInput, warriors: WarriorInput[]): MutationResult => {
    broadcast('update-hill', {
        body: {
            id,
            rules,
            warriors
        }
    })
    return {
        success: true
    }
}

const deleteHill = (id: string): MutationResult => {
    broadcast('delete-hill', {
        body: {
            id
        }
    })
    return {
        success: true
    }
}

const challengeHill = (id: string, redcode: string): MutationResult => {
    broadcast('challenge-hill', {
        body: {
            id,
            redcode
        }
    })
    return {
        success: true
    }
}

const typeDefs = gql`
    ${fs.readFileSync(path.resolve(__dirname, '../schema/schema.graphql'))}
`
const resolvers = {
    Query: {
        hills
    },
    Mutation: {
        createHill,
        updateHill,
        deleteHill,
        challengeHill
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
