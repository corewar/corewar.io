import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { createHill } from '../createHill'
import { ICreateHillMessage } from 'corewar-message-types'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'

const createHillHttp: AzureFunction = auth(
    [Scopes.createHill],
    async (context: Context, req: HttpRequest, token: IAuthToken): Promise<void> =>
        createHill(context, { userId: token.userId, ...req } as ICreateHillMessage)
)

export default createHillHttp
