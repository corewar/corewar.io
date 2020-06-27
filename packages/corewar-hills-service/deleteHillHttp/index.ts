import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { deleteHill } from '../deleteHill'
import { IDeleteHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'

const deleteHillHttp: AzureFunction = async (context: Context, req: HttpRequest, record: IHill): Promise<void> =>
    deleteHill(context, req as IDeleteHillMessage, record)

export default deleteHillHttp
