import { SendableMessageInfo } from '@azure/service-bus'
import { IAuthToken } from 'corewar-infrastructure'

export const bind = <T extends SendableMessageInfo>(token: IAuthToken, message: T): T => ({
    ...message,
    body: {
        ...message.body,
        userId: token.userId
    }
})
