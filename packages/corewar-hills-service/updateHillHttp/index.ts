import { AzureFunction, Context } from '@azure/functions'
import { updateHill } from '../updateHill'
import { IUpdateHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'
import { bind } from '../auth/bind'

const updateHillHttp: AzureFunction = auth(
    [Scopes.updateHill],
    async (context: Context, req: IUpdateHillMessage, token: IAuthToken, records: IHill[]): Promise<void> =>
        updateHill(context, bind(token, req), records)
)

export default updateHillHttp
