import { CreateMutationResult, Warrior } from '@/generated/graphql'
import { Database } from 'mongo-repo'
import { corewar, IMessage } from 'corewar'
import uuid = require('uuid')

const formatParseMessage = ({ position, type, text }: IMessage): string =>
    `[${position.line}, ${position.char}] ${type}: ${text}`

export const createWarrior = async (database: Database, redcode: string): Promise<CreateMutationResult> => {
    // I think we can parse with latest standard for validation even if the warrior will ultimately
    // be loaded into a hill with older rules (it will need to be reparsed each time it's loaded to a hill)
    const result = corewar.parse(redcode)
    if (!result.success) {
        return {
            success: false,
            message: result.messages.map(formatParseMessage).join('\n')
        }
    }

    const {
        name,
        author,
        strategy
    } = result.metaData

    // TODO I think the corewar library inserts default name and author nameless, blameless so this won't work atm
    if (!name) {
        return {
            success: false,
            message: 'You must specify a name for the warrior by including a name comment e.g. ;name my Amazing warrior!'
        }
    }

    if (!author) {
        return {
            success: false,
            message: 'You must specify an author of the warrior by including an author comment e.g. ;author John Smith'
        }
    }
    
    const repo = database.repo<Warrior>('warriors')
    const id = uuid()
    await repo.add({
        id,
        name,
        author,
        strategy,
        redcode
    })

    return {
        success: true,
        id
    }
}
