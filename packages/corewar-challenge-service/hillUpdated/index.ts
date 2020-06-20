import { AzureFunction, Context } from '@azure/functions'
import { hillChanged } from '../hillChanged'
import { IHillUpdatedMessage } from 'corewar-message-types'
import { createSubscription } from 'corewar-infrastructure'
import { SERVICE_NAME, Topics } from '../common/constants'

createSubscription({ serviceName: SERVICE_NAME, topicName: Topics.hillUpdated })

const hillUpdated: AzureFunction = async function(_: Context, message: IHillUpdatedMessage): Promise<void> {
    return hillChanged(message)
}

export default hillUpdated
