import { getQueueClient } from './getQueueClient'
import { SendableMessageInfo } from '@azure/service-bus'

export const enqueue = async (queueName: string, message: SendableMessageInfo): Promise<void> => {
    const client = getQueueClient(queueName)
    try {
        const sender = client.queueClient.createSender()
        await sender.send(message)
    } finally {
        client.queueClient.close()
        client.serviceBusClient.close()
    }
}
