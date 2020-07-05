import { AzureFunction, Context } from '@azure/functions'
import { createHill } from '../createHill'
import { ICreateHillMessage } from 'corewar-message-types'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'
import { bind } from '../auth/bind'

const createHillHttp: AzureFunction = auth(
    [Scopes.createHill],
    async (context: Context, req: ICreateHillMessage, token: IAuthToken): Promise<void> =>
        createHill(context, bind(token, req))
)

export default createHillHttp
