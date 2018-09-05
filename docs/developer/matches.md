# Matches API

The Matches API allows hills, benchmarks and multiround matches to be executed using the [Simulator](./simulator).

**The Matches API is currently under development with limited functionality available**

## Functions



## Messages

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
