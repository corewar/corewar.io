import { getTopicClient } from './getTopicClient'
import { SendableMessageInfo } from '@azure/service-bus'

export const broadcast = async <T extends SendableMessageInfo>(topicName: string, message: T): Promise<void> => {
    const client = getTopicClient(topicName)
    try {
        await client.sender.send(message)
    } finally {
        client.topicClient.close()
        client.serviceBusClient.close()
    }
}
