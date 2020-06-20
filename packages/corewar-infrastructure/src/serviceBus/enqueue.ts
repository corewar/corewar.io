import { getQueueClient } from './getQueueClient'
import { SendableMessageInfo } from '@azure/service-bus'

export const enqueue = (queueName: string, message: SendableMessageInfo): void => {
    const client = getQueueClient(queueName)
    try {
        const sender = client.queueClient.createSender()
        sender.send(message)
    } finally {
        client.queueClient.close()
        client.serviceBusClient.close()
    }
}
