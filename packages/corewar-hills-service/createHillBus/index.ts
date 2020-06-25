import { AzureFunction, Context } from '@azure/functions'
import { createHill } from '../createHill'
import { ICreateHillMessage } from 'corewar-message-types'

const createHillBus: AzureFunction = async (context: Context, trigger: ICreateHillMessage): Promise<void> =>
    createHill(context, trigger)

export default createHillBus
