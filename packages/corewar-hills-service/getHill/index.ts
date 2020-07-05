import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'
import { IHill } from '../schema/hill'

const getHill: AzureFunction = auth(
    [Scopes.getHill],
    async (context: Context, _req: HttpRequest, _token: IAuthToken, record: IHill): Promise<void> => {
        context.res = { body: record }
    }
)

export default getHill
