# Simulator API

## initialiseSimulator(options: IOptions, parseResults: IParseResult[], messageProvider: IPublishProvider)

Setup the simulator for a specific standard and parseResult (parsed redcode).
IParseResults are produced as output from the Parser module.
Additional, data can be associated with a warrior when it is loaded into core by adding a data property to the parseResults given to the initialise function.
Allows a pubsub provider to be specified to receive Events (see below).

## step(steps?: number): boolean

Step the simulator forward number of cycles specified by steps (default 1).
Returns false if the round has ended.

## run()

Run the simulator to the end of the match

## getWithInfoAt(address: number): ICoreLocation

Return the instruction at the specified core address.

## republish(): void

Trigger a resending of all pubsub messages for the current round.
This can be used to build up a picture of the current state of the simulator from scratch.
