# Simulator API

The Simulator API allows warriors parsed using the [Parser](./parser) to be loaded into a Corewar simulator and run against each other.

## Functions

### initialiseSimulator(options: IOptions, parseResults: IParseResult[], messageProvider: IPublishProvider)

Setup the simulator for specific [options](#options) and [parseResult](./parser#parseredcode-string-iparseresult) (parsed redcode).
`IParseResults` are produced as output from the [Parser](./parser) module.
Additional, data can be associated with a warrior when it is loaded into core by adding a data property to the parseResults given to the initialise function.
A pubsub provider can be specified to receive [Messages](#messages).

#### Options

The following options object can be provided to `initialiseSimulator`. See [Match Settings](../corewar/match_settings) for more info.

All attributes are optional and will be defaulted as described.

```
{

    coresize?: number,                  // default 8000
    maximumCycles?: number,             // default 80000
    initialInstruction?: {              // default DAT.F $0, $0
        address: number,
        opcode: number,
        modifier: number,
        aOperand: {
            mode: ModeType,
            address: number
        },
        bOperand: {
            mode: ModeType,
            address: number
        }
    },
    instructionLimit?: number,          // default 100
    maxTasks?: number,                  // default 8000
    minSeparation?: number,             // default 100
    standard?: number,                  // default ICWS94draft
    readDistance?: number,
    writeDistance?: number
}
```

[Standard](./enumerations#standard), [Opcode](./enumerations#opcode) and [Modifier](./enumerations#modifier) are [enumerations](./enumerations)

**`readDistance` and `writeDistance` are not implemented within the current version of corewar.io **

### step(steps?: number): boolean

Step the simulator forward number of cycles specified by steps (default 1).
Returns false if the round has ended.

### run()

Run the simulator to the end of the match

### getWithInfoAt(address: number): ICoreLocation

Return the instruction at the specified core address.

### republish(): void

Trigger a resending of all pubsub messages for the current round.
This can be used to build up a picture of the current state of the simulator from scratch.

## Messages

The following messages are published by the simulator:

## CORE_INITIALISE

Contains the initial state of the simulator core and process tree.

```
{
  state: IState
}
```

## CORE_ACCESS

Published when a warrior reads to, writes from or executes within the core

```
[{
  warriorId: number,      // Each warrior has a unique id
  warriorData?: any,      // Any data supplied with this warrior's initial parse result
  accessType: AccessType, // AccessType can be 0=read, 1=write or 2=execute
  address: number         // Absolute address within the core
}]
```

## RUN_PROGRESS

Used to monitor progress towards the end of the round

```
{ 
  runProgress: number   // Indicates current cycle as a percentage of maximum cycles
  cycle: number         // The current cycle
  maximumCycles: number // The maximum number of cycles, after which the round will end in a draw
}
```

## ROUND_END

Published at the end of the round to indicate the outcome

```
{
  winnerId: number,  // The unique id of the winning warrior or null
  winnerData?: any,  // Any data supplied with this warrior's initial parse result
  outcome: string    // Can be 'WIN', 'DRAW' or 'NONE'. 'NONE' indicates a single warrior battle
}
```

## TASK_COUNT

Published whenever a warrior creates or loses a task.

```
[{
  warriorId: number,  // The unique id of the warrior
  warriorData?: any,  // Any data supplied with this warrior's initial parse result
  taskCount: number   // The warrior's current task count
}]
```

## NEXT_EXECUTION

Published once per call to step and indicates the next address which will be executed

```
{
  warriorId: number,  // The unique id of the next warrior
  warriorData?: any,  // Any data supplied with this warrior's initial parse result
  address: number     // The address in core at which the next warrior will execute
}
```
