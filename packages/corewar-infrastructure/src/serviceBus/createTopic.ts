import azure from 'azure-sb'

export interface ICreateTopicArgs {
    topicName: string
    serviceName: string
}

export const createTopic = async ({ serviceName, topicName }: ICreateTopicArgs): Promise<void> => {
    const service = azure.createServiceBusService()
    return new Promise((resolve, reject) => {
        service.createTopicIfNotExists(topicName, error => {
            if (error) {
                reject(error)
            }
            const subscriptionName = `${serviceName}-${topicName}`
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
    })
}
