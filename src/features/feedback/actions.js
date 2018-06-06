import { action } from '../../actions/creator'

export const FEEDBACK_REQUESTED = 'feedback/FEEDBACK_REQUESTED'
export const FEEDBACK_RESPONSE = 'feedback/FEEDBACK_RESPONSE'


export const sendFeedback = payload => action(FEEDBACK_REQUESTED, payload)

