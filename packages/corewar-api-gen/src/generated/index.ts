import { getApolloClient } from './getApolloClient'
import gql from 'graphql-tag'
import { Hill, MutationResult, RulesInput, WarriorInput } from './schema-typings'
import { broadcast } from './broadcast'

export const hills = async (id: string): Promise<Hill[]> => {
    const client = getApolloClient('hills')
    const result = await client.query({
        query: gql`
            query {
                hills(id: string) {
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
    return result.data
}

export const createHill = (rules: RulesInput): MutationResult => {
    broadcast('create-hill', {
        body: {
            rules
        }
    })
    return {
        success: true
    }
}

export const updateHill = (id: string, rules: RulesInput, warriors: WarriorInput[]): MutationResult => {
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

export const deleteHill = (id: string): MutationResult => {
    broadcast('delete-hill', {
        body: {
            id
        }
    })
    return {
        success: true
    }
}

export const challengeHill = (id: string, redcode: string): MutationResult => {
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
