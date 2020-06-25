import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { createHill } from '../createHill'
import { ICreateHillMessage } from 'corewar-message-types'

const createHillHttp: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> =>
    createHill(context, req as ICreateHillMessage)

export default createHillHttp
