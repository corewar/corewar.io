import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { updateHill } from '../updateHill'
import { IUpdateHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'

const updateHillHttp: AzureFunction = auth(
    [Scopes.updateHill],
    async (context: Context, req: HttpRequest, token: IAuthToken, records: IHill[]): Promise<void> =>
        updateHill(context, { userId: token.userId, ...req } as IUpdateHillMessage, records)
)

export default updateHillHttp
