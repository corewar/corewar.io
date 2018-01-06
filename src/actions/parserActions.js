import { action } from './creator'

export const PARSE = 'parser/PARSE'
export const ADD_WARRIOR = 'parser/ADD_WARRIOR'
export const REMOVE_WARRIOR = 'parser/REMOVE_WARRIOR'

export const PARSE_REQUESTED = 'parser/PARSE_REQUESTED'
export const ADD_WARRIOR_REQUESTED = 'parser/ADD_WARRIOR_REQUESTED'
export const REMOVE_WARRIOR_REQUESTED = 'parser/REMOVE_WARRIOR_REQUESTED'

export const parse = redcode => action(PARSE_REQUESTED, { redcode })
export const addWarrior = () => action(ADD_WARRIOR_REQUESTED)
export const removeWarrior = index => action(REMOVE_WARRIOR_REQUESTED, { index })