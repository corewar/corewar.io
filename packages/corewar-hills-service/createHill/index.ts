import { v4 as uuidv4 } from 'uuid'
import { ICreateHillMessage } from 'corewar-message-types'
import { Context } from '@azure/functions'

interface IValidationResult {
    success: boolean
    messages?: string[]
}

//TODO validation:
// https://www.npmjs.com/package/swagger-model-validator
// https://www.npmjs.com/package/swagger-object-validator
const validate = (_input: ICreateHillMessage): IValidationResult => ({
    success: true
})

export const createHill = async (context: Context, input: ICreateHillMessage): Promise<void> => {
    const validation = validate(input)
    if (!validation.success) {
        context.res = {
            status: 400,
            body: validation.messages
        }
        return
    }

    const id = uuidv4()
    const { rules } = input.body

    const message = {
        id,
        rules
    }

    context.res = { body: message }

    context.bindings.document = {
        ...message,
        warriors: []
    }

    context.bindings.bus = {
        body: message
    }

    context.bindings.signalr = [
        {
            target: 'hillCreated',
            arguments: [message]
        }
    ]
}
