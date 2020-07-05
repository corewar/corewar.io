import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { auth, IAuthToken } from 'corewar-infrastructure'
import Scopes from '../auth/scopes'

const getHills: AzureFunction = auth(
    [Scopes.getHill],
    async (context: Context, _req: HttpRequest, _token: IAuthToken, records: unknown[]): Promise<void> => {
        context.res = { body: records }
    }
)

export default getHills
