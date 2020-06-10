import { getQueueClient } from './getQueueClient'
import { ReceivedMessageInfo } from '@azure/service-bus'

export const peek = async <T extends ReceivedMessageInfo>(queueName: string): Promise<T> => {
    const client = getQueueClient(queueName)
    const message = await client.queueClient.peek(1)
    return message && ((message[0] as unknown) as T)
}
