import azure from 'azure-sb'

export interface ICreateTopicArgs {
    topicName: string
}

export const createTopic = async ({ topicName }: ICreateTopicArgs): Promise<void> => {
    const service = azure.createServiceBusService()
    return new Promise((resolve, reject) => {
        service.createTopicIfNotExists(topicName, error => {
            if (error) {
                reject(error)
            }
            resolve()
        })
    })
}
