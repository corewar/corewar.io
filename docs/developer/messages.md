# Messages

Beyond the main API, the following messages are available to subscribe to:

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

## MATCH_END

Published at the end of a multi-round match to indicate the outcome

```
{
  rounds: number;   // The number of rounds in the match
  warriors: [
    source: IParseResult;   // The parsed output of the warrior
    won: number;            // The number of rounds won by the warrior
    drawn: number;          // The number of rounds drawn by the warrior
    lost: number;           // The number of rounds lost by the warrior
    given: number;          // The number of points awarded to the warrior given by win percentage multiplied by three plus draw percentage
    taken: number;          // The number of points awarded to the warrior's opponent given by loss percentage multiplied by three plus draw percentage
  ];
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
