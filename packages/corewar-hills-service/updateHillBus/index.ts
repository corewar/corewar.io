import { AzureFunction, Context } from '@azure/functions'
import { updateHill } from '../updateHill'
import { IUpdateHillMessage } from 'corewar-message-types'
import { IHill } from '../schema/hill'

const updateHillBus: AzureFunction = async (
    context: Context,
    trigger: IUpdateHillMessage,
    records: IHill[]
): Promise<void> => updateHill(context, trigger, records)

export default updateHillBus
