import jwksClient from 'jwks-rsa'
import * as jwt from 'jsonwebtoken'
import { AzureFunction, HttpRequest, Context } from '@azure/functions'

interface IJwtToken {
    iss: string
    sub: string
    aud: string[]
    iat: number
    exp: number
    azp: string
    scope: string
    permissions: string[]
}

export interface IAuthToken {
    issuer: string // iss
    userId: string // sub
    audiences: string[] // aud
    issuedAt: number // iat
    expiresAt: number // exp
    clientId: string // azp
    scope: string
    permissions: string[]
}

let signingKey: string

const client = jwksClient({
    rateLimit: true,
    jwksRequestsPerMinute: 1,
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

const mapToken = (token: IJwtToken): IAuthToken => ({
    issuer: token.iss,
    userId: token.sub,
    audiences: token.aud,
    issuedAt: token.iat,
    expiresAt: token.exp,
    clientId: token.azp,
    scope: token.scope,
    permissions: token.permissions
})

export const auth = <T>(requiredScopes: string[], handler: AzureFunction): AzureFunction => async (
    context: Context,
    req: HttpRequest,
    ...rest: unknown[]
): Promise<T> => {
    let decodedToken: IJwtToken
    try {
        const token = req?.headers?.authorization
        decodedToken = await new Promise((resolve, reject) => {
            if (!token) {
                reject('No authentication token')
            }
            jwt.verify(token.substr(7), signingKey, (err, decoded: IJwtToken) => {
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

    const token = mapToken(decodedToken)
    return handler(context, req, token, ...rest)
}
