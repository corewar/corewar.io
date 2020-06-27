import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { updateHill } from '../updateHill'
import { IUpdateHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'

const updateHillHttp: AzureFunction = async (context: Context, req: HttpRequest, records: IHill[]): Promise<void> =>
    updateHill(context, req as IUpdateHillMessage, records)

export default updateHillHttp
