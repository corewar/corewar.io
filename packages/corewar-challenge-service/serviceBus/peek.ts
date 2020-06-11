import { getQueueClient } from './getQueueClient'
import { ReceiveMode, ServiceBusMessage } from '@azure/service-bus'

export const peek = async <T extends ServiceBusMessage>(queueName: string): Promise<T | null> => {
    const client = getQueueClient(queueName)
    const receiver = client.queueClient.createReceiver(ReceiveMode.peekLock)
    const message = await receiver.receiveMessages(
        1,
        0 /*TODO can this be zero as in don't wait but still get top item from queue?*/
    )
    if (message.length === 0) {
        return null
    }
    return message[0] as T
}
