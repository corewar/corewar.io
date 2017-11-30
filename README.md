[![wercker status](https://app.wercker.com/status/d6b4d4035c2ccc4e92f9ed40ae3f727d/s/master "wercker status")](https://app.wercker.com/project/byKey/d6b4d4035c2ccc4e92f9ed40ae3f727d)

![Corewar](https://github.com/gareththegeek/corewar/blob/master/corewarg.png)

# Corewar

Typescript / Javascript implementation of the classic game [corewar](https://en.wikipedia.org/wiki/Core_War)

Currently this project contains a redcode parser and core simulator.

In future we hope to include a corewar IDE with debugger, an interactive core simulation and a number of hills. The UI will be provided from this project https://github.com/gareththegeek/corewar-ui

## Getting Started

This project is published to NPM where it is intended to be used as a dependency for UI based projects who wish to use the corewar parser and simulator functionality.

To add it to your UI project, `npm install corewar` and then consume it via an import / require:

`import { corewar } from 'corewar';`

The corewar variable will initialise a new instance of the Api class ready for use.

## API

At the moment, the API exposed is still in flux, we anticipate the following endpoints.

### parse(document: string, options?: IParseOptions): IParseResult

Parse a redcode document and return an IParse result which consists of the tokenised program and any associated messages.

### initialiseSimulator(standardId: number, parseResult: IParseResult)

Setup the simulator for a specific standard and parseResult (parsed redcode)

### step()

Step the simulator forward one cycle

### run()

Run the simulator to the end of the match

## Events

Beyond the main API, we envisage access to the Core object being provided via event subscription. These events have not yet been decided upon or setup.

## Testing

[![wercker status](https://app.wercker.com/status/d6b4d4035c2ccc4e92f9ed40ae3f727d/m/master "wercker status")](https://app.wercker.com/project/byKey/d6b4d4035c2ccc4e92f9ed40ae3f727d)

Corewar is extensively unit tested, run `npm test` to execute the tests and see the coverage.

The tests run via `ts-mocha` which uses `ts-node` under the hood, so as a result aren't easy to debug (by easy, read 'possible') :(

## Getting involved

We'd love your feedback, input and PR's. We're a friendly bunch, please contact us through GitHub with questions, suggestions and issues.

