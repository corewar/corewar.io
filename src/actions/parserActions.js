export const PARSE = 'parser/PARSE'
export const SET_STANDARD = 'parser/SET_STANDARD'
export const ADD_WARRIOR = 'parser/ADD_WARRIOR'
export const REMOVE_WARRIOR = 'parser/REMOVE_WARRIOR'
export const RESET_CORE = 'parser/RESET_CORE'

export const PARSE_REQUESTED = 'parser/PARSE_REQUESTED'
export const ADD_WARRIOR_REQUESTED = 'parser/ADD_WARRIOR_REQUESTED'
export const REMOVE_WARRIOR_REQUESTED = 'parser/REMOVE_WARRIOR_REQUESTED'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const parse = redcode => action(PARSE_REQUESTED, { redcode })
export const addWarrior = () => action(ADD_WARRIOR_REQUESTED)
export const removeWarrior = () => action(REMOVE_WARRIOR_REQUESTED)