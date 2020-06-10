import { AzureFunction, Context } from '@azure/functions'
import { hillChanged } from '../hillChanged'
import { IHillCreatedMessage } from 'corewar-message-types'

const hillCreated: AzureFunction = async function(context: Context, message: IHillCreatedMessage): Promise<void> {
    return hillChanged(message)
}

export default hillCreated
