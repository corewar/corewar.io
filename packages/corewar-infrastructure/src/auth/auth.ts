import jwksClient from 'jwks-rsa'
import * as jwt from 'jsonwebtoken'
import { AzureFunction, HttpRequest, Context } from '@azure/functions'

let signingKey: string

const client = jwksClient({
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: process.env.JWKS_URI
})

const kid = process.env.PUBLIC_KEY_ID
client.getSigningKey(kid, (err, key) => {
    if (err) {
        console.log(err)
        return
    }
    signingKey = key.getPublicKey()
    console.log(signingKey)
})

export const auth = <T>(requiredScopes: string[], handler: AzureFunction): AzureFunction => async (
    context: Context,
    req: HttpRequest
): Promise<T> => {
    let decodedToken
    try {
        const token = req?.headers?.authorization
        decodedToken = await new Promise((resolve, reject) => {
            if (!token) {
                reject('No authentication token')
            }
            jwt.verify(token.substr(7), signingKey, (err, decoded) => {
                if (err) {
                    reject(err)
                }

                const { permissions } = decoded
                if (!requiredScopes.every(x => permissions.includes(x))) {
                    reject('Missing required scope')
                }

                resolve(decoded)
            })
        })
    } catch {
        context.res = {
            status: 401,
            body: JSON.stringify({ message: 'Unauthorized' })
        }
        return null
    }

    return handler(context, req, decodedToken)
}
