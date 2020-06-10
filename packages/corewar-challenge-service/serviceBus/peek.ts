import { getQueueClient } from './getQueueClient'

export const peek = async <T>(queueName: string): Promise<T> => {
    const client = getQueueClient(queueName)
    const message = await client.queueClient.peek(1)
    return message && ((message[0] as unknown) as T)
}
