[![wercker status](https://app.wercker.com/status/d6b4d4035c2ccc4e92f9ed40ae3f727d/s/master "wercker status")](https://app.wercker.com/project/byKey/d6b4d4035c2ccc4e92f9ed40ae3f727d)

![Corewar](https://github.com/gareththegeek/corewar/blob/master/logo.png)

# Corewar

Typescript / Javascript implementation of the classic game [corewar](https://en.wikipedia.org/wiki/Core_War)

Currently this project contains a redcode parser and core simulator.

In future we hope to include a corewar IDE with debugger, an interactive core simulation and a number of hills. The UI will be provided from this project https://github.com/gareththegeek/corewar-ui

## Getting Started

This project is published to NPM where it is intended to be used as a dependency for UI based projects who wish to use the corewar parser and simulator functionality.

To add it to your UI project, `npm install corewar` and then consume it via an import / require:

`import { corewar } from 'corewar';`

The corewar variable will initialise a new instance of the Api class ready for use.

## Docs

The docs for this project are hosted on [Read the Docs](http://corewar-docs.readthedocs.org)

## API

API documentation is include in the docs: [Read the Docs](http://corewar-docs.readthedocs.io/en/latest/developer/)

## Getting involved

We'd love your feedback, input and PR's. We're a friendly bunch, please contact us through GitHub with questions, suggestions and issues.
