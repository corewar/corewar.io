import { ServiceBusClient, QueueClient } from '@azure/service-bus'

export interface IServiceBusQueueClient {
    serviceBusClient: ServiceBusClient
    queueClient: QueueClient
}

export const getQueueClient = (queueName: string): IServiceBusQueueClient => {
    /* eslint-disable-next-line */
    const serviceBusClient = ServiceBusClient.createFromConnectionString(process.env.AZURE_SERVICEBUS_CONNECTION_STRING)
    const queueClient = serviceBusClient.createQueueClient(queueName)

    return {
        serviceBusClient,
        queueClient
    }
}
