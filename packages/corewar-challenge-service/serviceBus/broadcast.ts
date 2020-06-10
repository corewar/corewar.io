import { getTopicClient } from './getTopicClient'
import { SendableMessageInfo } from '@azure/service-bus'

export const broadcast = (topicName: string, message: SendableMessageInfo): void => {
    const client = getTopicClient(topicName)
    try {
        client.sender.send(message)
    } finally {
        client.topicClient.close()
        client.serviceBusClient.close()
    }
}
