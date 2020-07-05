import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { deleteHill } from '../deleteHill'
import { IDeleteHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'

const deleteHillHttp: AzureFunction = auth(
    [Scopes.deleteHill],
    async (context: Context, req: HttpRequest, token: IAuthToken, records: IHill[]): Promise<void> =>
        deleteHill(context, { userId: token.userId, ...req } as IDeleteHillMessage, records)
)

export default deleteHillHttp
