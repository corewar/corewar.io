# Corewar Developer Reference

This area of the docs will provides a technical reference for the corewar npm package.

* [Corewar GitHub page](https://github.com/gareththegeek/corewar)
* [Corewar NPM package](https://www.npmjs.com/package/corewar)

The Corewar library provides a redcode parser, corewar simulator and hill and benchmark functionality and is used by [corewar.io](https://corewar.io).

The Corewar library provides an API to access the libraries functionality. The library uses a pubsub mechanism to publish messages in resopnse to events within the simulator.

The developer reference contains the following sections:

* [Parser](./parser)
* [Simulator](./simulator)
* [Matches](./matches)
* [Messages](./messages)

## Testing

Corewar is extensively unit tested, run `npm test` to execute the tests and see the coverage.

Unit test debugging is configured to run in `VS Code`
