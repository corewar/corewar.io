import azure from 'azure-sb'
import { ICreateTopicArgs, createTopic } from './createTopic'

export interface ICreateSubscriptionArgs extends ICreateTopicArgs {
    serviceName: string
}

export const createSubscription = async ({ serviceName, topicName }: ICreateSubscriptionArgs): Promise<void> => {
    await createTopic({ topicName })

    const service = azure.createServiceBusService()
    const subscriptionName = `${serviceName}-${topicName}`
    return new Promise((resolve, reject) => {
        service.listSubscriptions(topicName, (error, result) => {
            if (error) {
                reject(error)
            }
            if (result.find(sub => sub.SubscriptionName === subscriptionName)) {
                resolve()
                return
            }
            service.createSubscription(topicName, subscriptionName, error => {
                if (error) {
                    reject(error)
                }
                resolve()
            })
        })
    })
}
