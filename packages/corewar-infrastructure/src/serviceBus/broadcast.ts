import { getTopicClient } from './getTopicClient'
import { SendableMessageInfo } from '@azure/service-bus'

export const broadcast = <T extends SendableMessageInfo>(topicName: string, message: T): void => {
    const client = getTopicClient(topicName)
    try {
        client.sender.send(message)
    } finally {
        client.topicClient.close()
        client.serviceBusClient.close()
    }
}
