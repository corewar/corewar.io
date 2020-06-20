import azure from 'azure-sb'

export interface ICreateQueueArgs {
    queueName: string
}

export const createQueue = async ({ queueName }: ICreateQueueArgs): Promise<void> => {
    const service = azure.createServiceBusService()
    return new Promise((resolve, reject) => {
        service.createQueueIfNotExists(queueName, error => {
            if (error) {
                reject(error)
            }
            resolve()
        })
    })
}
