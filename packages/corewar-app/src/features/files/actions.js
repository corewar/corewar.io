import { action } from '../../redux/actions/action-creator'

export const SET_CURRENT_FILE = 'file/SET_CURRENT_FILE'
export const SET_FILES = 'file/SET_FILES'
export const SET_COLOURS = 'file/SET_COLOURS'
export const LOAD_FILE = 'file/LOAD_FILE'
export const TOGGLE_FILE = 'file/TOGGLE_FILE'

export const PARSE_REQUESTED = 'file/PARSE_REQUESTED'
export const NEW_FILE_REQUESTED = 'file/NEW_FILE_REQUESTED'
export const DELETE_FILE_REQUESTED = 'file/REMOVE_FILE_REQUESTED'
export const LOAD_FILE_REQUESTED = 'file/LOAD_FILE_REQUESTED'
export const OPEN_FILE_REQUESTED = 'file/OPEN_FILE_REQUESTED'
export const TOGGLE_FILE_REQUESTED = 'file/TOGGLE_FILE_REQUESTED'

export const parse = source => action(PARSE_REQUESTED, { source })
export const openFile = source => action(OPEN_FILE_REQUESTED, { source })
export const newFile = () => action(NEW_FILE_REQUESTED)
export const deleteFile = id => action(DELETE_FILE_REQUESTED, { id })
export const loadFile = id => action(LOAD_FILE_REQUESTED, { id })
export const toggleFile = id => action(TOGGLE_FILE_REQUESTED, { id })
