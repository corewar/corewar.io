// import { Received } from 'corewar-message-types'
// import { ReceivedMessageInfo, ReceiveMode } from '@azure/service-bus'
// import { getQueueClient } from './getQueueClient'

// export const dequeue = async <T extends ReceivedMessageInfo>(queueName: string): T => {
//     const client = getQueueClient(queueName)
//     const message = await client.queueClient.createReceiver(ReceiveMode.).peek(1)
//     return message && ((message[0] as unknown) as T)
// }