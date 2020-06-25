import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const getHills: AzureFunction = async (context: Context, _req: HttpRequest, records: unknown[]): Promise<void> => {
    context.res = { body: records }
}

export default getHills
