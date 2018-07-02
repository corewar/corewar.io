Developer Reference
===================

This area of the docs will provides a technical reference for the corewar npm package.

* [Corewar GitHub page](https://github.com/gareththegeek/corewar)
* [Corewar NPM package](https://www.npmjs.com/package/corewar)

## API

The API exposes the following functions and pubsub events:

### parse(redcode: string): IParseResult

Parse a redcode document and return an IParseResult which consists of the tokenised program and any associated messages.

### initialiseSimulator(options: IOptions, parseResults: IParseResult[], messageProvider: IPublishProvider)

Setup the simulator for a specific standard and parseResult (parsed redcode).
IParseResults are produced as output from the Parser module.
Additional, data can be associated with a warrior when it is loaded into core by adding a data property to the parseResults given to the initialise function.
Allows a pubsub provider to be specified to receive Events (see below).

### step(steps?: number): boolean

Step the simulator forward number of cycles specified by steps (default 1).
Returns false if the round has ended.

### run()

Run the simulator to the end of the match

### getWithInfoAt(address: number): ICoreLocation

Return the instruction at the specified core address.

### serialise(tokens: IToken[]): string

Serialises the array of tokens to a single, human readable string.

### republish(): void

Trigger a resending of all pubsub messages for the current round.
This can be used to build up a picture of the current state of the simulator from scratch.

## Events

Beyond the main API, the following messages are available to subscribe to:

### CORE_INITIALISE

Contains the initial state of the simulator core and process tree.

```
{
  state: IState
}
```

### CORE_ACCESS

Published when a warrior reads to, writes from or executes within the core

```
[{
  warriorId: number,      // Each warrior has a unique id
  warriorData?: any,      // Any data supplied with this warrior's initial parse result
  accessType: AccessType, // AccessType can be 0=read, 1=write or 2=execute
  address: number         // Absolute address within the core
}]
```

### RUN_PROGRESS

Used to monitor progress towards the end of the round

```
{ 
  runProgress: number // Indicates current cycle as a percentage of maximum cycles
}
```

### ROUND_END

Published at the end of the round to indicate the outcome

```
{
  winnerId: number,  // The unique id of the winning warrior or null
  winnerData?: any,  // Any data supplied with this warrior's initial parse result
  outcome: string    // Can be 'WIN', 'DRAW' or 'NONE'. 'NONE' indicates a single warrior battle
}
```

### TASK_COUNT

Published whenever a warrior creates or loses a task.

```
[{
  warriorId: number,  // The unique id of the warrior
  warriorData?: any,  // Any data supplied with this warrior's initial parse result
  taskCount: number   // The warrior's current task count
}]
```

### NEXT_EXECUTION

Published once per call to step and indicates the next address which will be executed

```
{
  warriorId: number,  // The unique id of the next warrior
  warriorData?: any,  // Any data supplied with this warrior's initial parse result
  address: number     // The address in core at which the next warrior will execute
}
```

## Testing

Corewar is extensively unit tested, run `npm test` to execute the tests and see the coverage.

Unit test debugging is configured to run in `VS Code`
