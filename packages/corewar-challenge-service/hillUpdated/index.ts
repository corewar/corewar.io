import { AzureFunction, Context } from '@azure/functions'
import { hillChanged, IHillUpdatedMessage } from '../hillChanged'

const hillUpdated: AzureFunction = async function(_: Context, message: IHillUpdatedMessage): Promise<void> {
    return hillChanged(message)
}

export default hillUpdated
