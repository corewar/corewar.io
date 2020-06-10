import { AzureFunction, Context } from '@azure/functions'
import { hillChanged, IHillCreatedMessage } from '../hillChanged'

const hillCreated: AzureFunction = async function(context: Context, message: IHillCreatedMessage): Promise<void> {
    return hillChanged(message)
}

export default hillCreated
