import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { updateHill } from '../updateHill'
import { IUpdateHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'

const updateHillHttp: AzureFunction = async (context: Context, req: HttpRequest, record: IHill): Promise<void> =>
    updateHill(context, req as IUpdateHillMessage, record)

export default updateHillHttp
