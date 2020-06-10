import { ServiceBusClient, QueueClient, Sender } from '@azure/service-bus'

export interface IServiceBusQueueClient {
    serviceBusClient: ServiceBusClient
    queueClient: QueueClient
    sender: Sender
}

export const getQueueClient = (queueName: string): IServiceBusQueueClient => {
    /* eslint-disable-next-line */
    const serviceBusClient = ServiceBusClient.createFromConnectionString(process.env.BUS_CONNECTION_STRING)
    const queueClient = serviceBusClient.createQueueClient(queueName)
    const sender = queueClient.createSender()

    return {
        serviceBusClient,
        queueClient,
        sender
    }
}
