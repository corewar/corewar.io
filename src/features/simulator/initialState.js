const initialState = {
  isInitialised: false,
  isRunning: false,
  runProgress: 0,
  focus: null,
  roundResult: {},

  coreSize: 8000,
  maximumCycles: 80000,
  minSeparation: 100,
  instructionLimit: 100,
  maxTasks: 8000,

  instructions: [],
  displaySettings: false,
  processRate: 1,
  processRates: [1, 2, 5, 12, 30, 75, 200, 500, 2000],
  currentCoreOption: 1,
  coreOptions: [
    { id: 1, name: 'Beginner'},
    { id: 2, name: 'Nano' },
    { id: 3, name: 'Tiny' },
    { id: 4, name: 'Limited Process' },
    { id: 5, name: 'Fortress' },
    { id: 6, name: '94t' },
    { id: 7, name: 'Tiny Limited Process' }
  ]
}

export default initialState