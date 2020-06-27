import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const getHill: AzureFunction = async (context: Context, _req: HttpRequest, record: unknown): Promise<void> => {
    context.res = { body: record }
}

export default getHill
