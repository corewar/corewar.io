import { ServiceBusClient, QueueClient, SendableMessageInfo, TopicClient } from '@azure/service-bus'

interface IQueueBusClient {
    serviceBusClient: ServiceBusClient
    queueClient: QueueClient
}

interface ITopicBusClient {
    serviceBusClient: ServiceBusClient
    topicClient: TopicClient
}

const getBusClient = (): ServiceBusClient => {
    /* eslint-disable-next-line */
    const connectionString = process.env.BUS_CONNECTION_STRING
    if (!connectionString) {
        throw new Error('Unable to access service bus')
    }

    return ServiceBusClient.createFromConnectionString(connectionString)
}

const getQueueClient = (queueName: string): IQueueBusClient => {
    const serviceBusClient = getBusClient()
    const queueClient = serviceBusClient.createQueueClient(queueName)
    return {
        serviceBusClient,
        queueClient
    }
}

const getTopicClient = (topicName: string): ITopicBusClient => {
    const serviceBusClient = getBusClient()
    const topicClient = serviceBusClient.createTopicClient(topicName)
    return {
        serviceBusClient,
        topicClient
    }
}

export const queueMessage = async (queueName: string, message: SendableMessageInfo): Promise<void> => {
    const client = getQueueClient(queueName)
    try {
        const sender = client.queueClient.createSender()
        sender.send(message)
    } finally {
        client.queueClient.close()
        client.serviceBusClient.close()
    }
}

export const broadcastMessage = async (topicName: string, message: SendableMessageInfo): Promise<void> => {
    const client = getTopicClient(topicName)
    try {
        const sender = client.topicClient.createSender()
        sender.send(message)
    } finally {
        client.topicClient.close()
        client.serviceBusClient.close()
    }
}
