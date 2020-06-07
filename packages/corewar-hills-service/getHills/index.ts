import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import Repository from 'corewar-repository'

const httpTrigger: AzureFunction = async function(context: Context, _: HttpRequest): Promise<void> {
    const repo = new Repository('hills-db', 'hills')
    const hills = repo.getAll()

    context.res = {
        body: JSON.stringify(hills)
    }
}

export default httpTrigger
