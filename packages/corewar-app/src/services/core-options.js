export const CoreOptions = {
  Beginner: 1,
  Nano: 2,
  Tiny: 3,
  LimitedProcess: 4,
  Fortress: 5,
  NinetyFourT: 6,
  TinyLimitedProcess: 7
}

export const getCoreOptions = id => {
  switch (id) {
    case CoreOptions.Beginner:
      return {
        coreSize: 8000,
        maximumCycles: 80000,
        maxTasks: 8000,
        minSeparation: 100,
        instructionLimit: 100
      }
    case CoreOptions.Nano:
      return {
        coreSize: 80,
        maximumCycles: 800,
        maxTasks: 80,
        minSeparation: 5,
        instructionLimit: 5
      }
    case CoreOptions.Tiny:
      return {
        coreSize: 800,
        maximumCycles: 8000,
        maxTasks: 800,
        minSeparation: 20,
        instructionLimit: 20
      }

    case CoreOptions.LimitedProcess:
      return {
        coreSize: 8000,
        maximumCycles: 80000,
        maxTasks: 8,
        minSeparation: 200,
        instructionLimit: 200
      }

    case CoreOptions.Fortress:
      return {
        coreSize: 8000,
        maximumCycles: 80000,
        maxTasks: 80,
        minSeparation: 4000,
        instructionLimit: 400
      }

    case CoreOptions.NinetyFourT:
      return {
        coreSize: 8192,
        maximumCycles: 100000,
        maxTasks: 8000,
        minSeparation: 300,
        instructionLimit: 300
      }

    case CoreOptions.TinyLimitedProcess:
      return {
        coreSize: 800,
        maximumCycles: 8000,
        maxTasks: 8,
        minSeparation: 50,
        instructionLimit: 50
      }

    default:
      return {}
  }
}
