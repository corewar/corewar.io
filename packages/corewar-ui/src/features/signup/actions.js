import { action } from '../../actions/creator'

export const SUBSCRIBE_REQUESTED = 'signup/SUBSCRIBE_REQUESTED'
export const SUBSCRIPTION_RESPONSE = 'signup/SUBSCRIPTION_RESPONSE'

export const subscribe = email => action(SUBSCRIBE_REQUESTED, { email })
