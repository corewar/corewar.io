import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { createHill } from '../createHill'
import { ICreateHillMessage } from 'corewar-message-types'
import { auth } from 'corewar-infrastructure'

const createHillHttp: AzureFunction = auth(
    [],
    async (context: Context, req: HttpRequest, token: unknown): Promise<void> =>
        createHill(context, req as ICreateHillMessage, token)
)

export default createHillHttp
