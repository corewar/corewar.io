export const ADD_FILE_REQUESTED = 'files/ADD_REQUESTED'
export const REMOVE_FILE_REQUESTED = 'file/REMOVE_REQUESTED'

export const addFile = () => action(ADD_FILE_REQUESTED)
export const removeFile = id => action(REMOVE_FILE_REQUESTED, { id })
