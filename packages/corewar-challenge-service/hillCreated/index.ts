import { AzureFunction, Context } from '@azure/functions'
import { hillChanged } from '../hillChanged'
import { IHillCreatedMessage } from 'corewar-message-types'
import { SERVICE_NAME, Topics } from '../common/constants'
import { createSubscription } from 'corewar-infrastructure'

createSubscription({ serviceName: SERVICE_NAME, topicName: Topics.hillCreated })

const hillCreated: AzureFunction = async function(_: Context, message: IHillCreatedMessage): Promise<void> {
    return hillChanged(message)
}

export default hillCreated
