import { ServiceBusClient, TopicClient, Sender } from '@azure/service-bus'

export interface IServiceBusTopicClient {
    serviceBusClient: ServiceBusClient
    topicClient: TopicClient
    sender: Sender
}

export const getTopicClient = (topicName: string): IServiceBusTopicClient => {
    /* eslint-disable-next-line */
    const serviceBusClient = ServiceBusClient.createFromConnectionString(process.env.BUS_CONNECTION_STRING)
    const topicClient = serviceBusClient.createTopicClient(topicName)
    const sender = topicClient.createSender()

    return {
        serviceBusClient,
        topicClient,
        sender
    }
}
