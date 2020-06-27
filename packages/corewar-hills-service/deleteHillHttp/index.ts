import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { deleteHill } from '../deleteHill'
import { IDeleteHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'

const deleteHillHttp: AzureFunction = async (context: Context, req: HttpRequest, records: IHill[]): Promise<void> =>
    deleteHill(context, req as IDeleteHillMessage, records)

export default deleteHillHttp
