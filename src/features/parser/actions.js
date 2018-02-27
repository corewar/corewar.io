import { action } from '../../actions/creator'

export const PARSE = 'parser/PARSE'
export const TOGGLE_CONSOLE = 'parser/TOGGLE_CONSOLE'
export const HIDE_CONSOLE = 'parser/HIDE_CONSOLE'
export const SHOW_CONSOLE = 'parser/SHOW_CONSOLE'
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
export const toggleConsole = () => action(TOGGLE_CONSOLE)
export const showConsole = () => action(SHOW_CONSOLE)
export const hideConsole = () => action(HIDE_CONSOLE)
export const toggleFileManager = () => action(TOGGLE_FILE_MANAGER)
export const loadWarrior = guid => action(LOAD_WARRIOR_REQUESTED, { guid })