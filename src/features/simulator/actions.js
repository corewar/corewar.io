
import { action } from '../../actions/creator'

export const INIT = 'simulator/INIT'
export const STEP = 'simulator/STEP'
export const RUN = 'simulator/RUN'
export const PAUSE = 'simulator/PAUSE'
export const FINISH = 'simulator/FINISH'
export const REPUBLISH = 'simulator/REPUBLISH'
export const GET_CORE_INSTRUCTIONS = 'simulator/GET_CORE_INSTRUCTIONS'
export const SET_PROCESS_RATE = 'simulator/SET_PROCESS_RATE'
export const SET_CORE_OPTIONS = 'simulator/SET_CORE_OPTIONS'

export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'
export const START_REQUESTED = 'simulator/START_REQUESTED'
export const STEP_REQUESTED = 'simulator/STEP_REQUESTED'
export const RUN_REQUESTED = 'simulator/RUN_REQUESTED'
export const PAUSE_REQUESTED = 'simulator/PAUSE_REQUESTED'
export const FINISH_REQUESTED = 'simulator/FINISH_REQUESTED'
export const REPUBLISH_REQUESTED = 'simulator/REPUBLISH_REQUESTED'
export const GET_CORE_INSTRUCTIONS_REQUESTED = 'simulator/GET_CORE_INSTRUCTIONS_REQUESTED'
export const SET_PROCESS_RATE_REQUESTED = 'simulator/SET_PROCESS_RATE_REQUESTED'
export const SET_CORE_OPTIONS_REQUESTED = 'simulator/SET_CORE_OPTIONS_REQUESTED'

export const RUN_ENDED = 'simulator/RUN_ENDED'
export const RUN_PROGRESS = 'simulator/RUN_PROGRESS'
export const SET_CORE_FOCUS = 'simulator/SET_CORE_FOCUS'

export const init = () => action(INIT_REQUESTED)
export const step = () => action(STEP_REQUESTED)
export const run = () => action(RUN_REQUESTED)
export const pause = () => action(PAUSE_REQUESTED)
export const finish = () => action(FINISH_REQUESTED)
export const republish = () => action(REPUBLISH_REQUESTED)
export const getCoreInstructions = address => action(GET_CORE_INSTRUCTIONS_REQUESTED, { address })
export const setProcessRate = rate => action(SET_PROCESS_RATE_REQUESTED, { rate })
export const setCoreOptions = id => action(SET_CORE_OPTIONS_REQUESTED, { id })