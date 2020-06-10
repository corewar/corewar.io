import { AzureFunction, Context } from '@azure/functions'
import { hillChanged } from '../hillChanged'
import { IHillUpdatedMessage } from 'corewar-message-types'

const hillUpdated: AzureFunction = async function(_: Context, message: IHillUpdatedMessage): Promise<void> {
    return hillChanged(message)
}

export default hillUpdated
