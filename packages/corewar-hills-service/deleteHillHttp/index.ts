import { AzureFunction, Context } from '@azure/functions'
import { deleteHill } from '../deleteHill'
import { IDeleteHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'
import { bind } from '../auth/bind'

const deleteHillHttp: AzureFunction = auth(
    [Scopes.deleteHill],
    async (context: Context, req: IDeleteHillMessage, token: IAuthToken, records: IHill[]): Promise<void> =>
        deleteHill(context, bind(token, req), records)
)

export default deleteHillHttp
