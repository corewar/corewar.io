import { action } from '../../actions/creator'

export const PARSE = 'parser/PARSE'
export const SHOW_MESSAGES = 'parser/SHOW_MESSAGES'
export const HIDE_MESSAGES = 'parser/HIDE_MESSAGES'
export const TOGGLE_FILE_MANAGER = 'parser/TOGGLE_FILE_MANAGER'
export const SET_WARRIORS = 'parser/SET_WARRIORS'
export const LOAD_WARRIOR = 'parser/LOAD_WARRIOR'

export const PARSE_REQUESTED = 'parser/PARSE_REQUESTED'
export const ADD_WARRIOR_REQUESTED = 'parser/ADD_WARRIOR_REQUESTED'
export const REMOVE_WARRIOR_REQUESTED = 'parser/REMOVE_WARRIOR_REQUESTED'
export const LOAD_WARRIOR_REQUESTED = 'parser/LOAD_WARRIOR_REQUESTED'

export const parse = source => action(PARSE_REQUESTED, { source })
export const addWarrior = () => action(ADD_WARRIOR_REQUESTED)
export const removeWarrior = index => action(REMOVE_WARRIOR_REQUESTED, { index })
export const showMessages = () => action(SHOW_MESSAGES)
export const hideMessages = () => action(HIDE_MESSAGES)
export const toggleFileManager = () => action(TOGGLE_FILE_MANAGER)
export const loadWarrior = guid => action(LOAD_WARRIOR_REQUESTED, { guid })