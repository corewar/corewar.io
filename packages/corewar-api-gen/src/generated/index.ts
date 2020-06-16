import { getApolloClient } from './getApolloClient'
import gql from 'graphql-tag'
import { RulesInput, WarriorInput, Hill } from './schema-typings'
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

export const createHill = async (rules: RulesInput): Promise<void> => {
    broadcast('create-hill', {
        body: {
            rules
        }
    })
}

export const updateHill = async (id: string, rules: RulesInput, warriors: WarriorInput[]): Promise<void> => {
    broadcast('update-hill', {
        body: {
            id,
            rules,
            warriors
        }
    })
}

export const deleteHill = async (id: string): Promise<void> => {
    broadcast('delete-hill', {
        body: {
            id
        }
    })
}

export const challengeHill = async (id: string, redcode: string): Promise<void> => {
    broadcast('challenge-hill', {
        body: {
            id,
            redcode
        }
    })
}
