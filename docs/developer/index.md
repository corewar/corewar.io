# Corewar Developer Reference

This area of the docs will provides a technical reference for the corewar npm package.

* [Corewar GitHub page](https://github.com/gareththegeek/corewar)
* [Corewar NPM package](https://www.npmjs.com/package/corewar)

The Corewar library provides a redcode parser, corewar simulator and hill and benchmark functionality and is used by [corewar.io](https://corewar.io).

The Corewar library provides an API to access the libraries functionality. The library uses a pubsub mechanism to publish messages in resopnse to events within the simulator.

## API

The Corewar API is divded into the following sections:

* [Parser](./parser.md)
* [Simulator](./simulator.md)
* [Matches](./matches.md)

## Building

Corewar is written in [Typescript](https://www.typescriptlang.org/) packaged using [webpack](https://webpack.js.org/) and built by running:

```
npm build
```

## Testing

Corewar is extensively unit tested using [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/), [Sinon](https://sinonjs.org/) and [sinon-chai](https://github.com/domenic/sinon-chai).  Code coverage is supplied using [Istanbul](https://github.com/istanbuljs/nyc).

Corewar contains unit tests for the Parser, Simulator and Matches APIs along with integration tests for the Parser.

To execute the tests and see code coverage run:

```
npm test
```

Unit test debugging is configured to run in [VS Code](https://code.visualstudio.com/)
