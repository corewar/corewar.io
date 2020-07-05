import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import builder from 'azure-functions-auth0'

const jwtValidateDecorator = builder({
    clientSecret: process.env.AUTH0_SIGNING_CERTIFICATE,
    clientId: process.env.AUTH0_API_ID,
    domain: `${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
})

const getHills: AzureFunction = jwtValidateDecorator(
    async (context: Context, _req: HttpRequest, records: unknown[]): Promise<void> => {
        context.res = { body: records }
    },
    true
)

export default getHills
