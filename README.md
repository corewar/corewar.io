

![Corewar](https://github.com/corewar/corewar.io/blob/master/packages/corewar/logo.png)

![Node.js CI](https://github.com/corewar/corewar.io/workflows/Node.js%20CI/badge.svg)
![Documentation Status](http://readthedocs.org/projects/corewar-docs/badge/?version=latest)

# Corewar

Typescript / Javascript implementation of the classic game [corewar](https://en.wikipedia.org/wiki/Core_War)

Currently this project contains a corewar IDE, redcode parser and core simulator.

In future we hope to include local and remote hills and benchmarks and possibly to begin extending corewar itself.

This is the monorepo for the corewar.io project and contains the following packages:
* [corewar](https://github.com/corewar/corewar.io/tree/master/packages/corewar) - npm package providing parser and simulator
* [corewar-ui](https://github.com/corewar/corewar.io/tree/master/packages/corewar-ui) - corewar.io user interface implemented as a spa
* [corewar-api](https://github.com/corewar/corewar.io/tree/master/packages/corewar-api) - corewar.io api implemented in graphql

Documentation for the project along with guidance on corewar and the redcode language can be found on [Read the Docs](https://corewar-docs.readthedocs.io/en/latest/)

## Scripts

This project uses **Turborepo** and **pnpm** workspaces to manage the monorepo.
Node 18+ is required (Node 22+ requires `NODE_OPTIONS="--openssl-legacy-provider"` for builds).

### Prepare development environment

```bash
npm install --global pnpm
pnpm install
```

### Development Commands

Start all packages in development mode:
```bash
pnpm dev
```

Build all packages:
```bash
pnpm build
```

Start all packages (after building):
```bash
pnpm start
```

### Testing and Quality

Run tests across all packages:
```bash
pnpm test
```

Run linting across all packages:
```bash
pnpm lint
```

Generate coverage reports:
```bash
pnpm coverage
```

Clean all packages:
```bash
pnpm clean
```

### Package-Specific Commands

Run commands for specific packages:
```bash
pnpm --filter corewar build
pnpm --filter corewar-app dev
pnpm --filter corewar-api start
```

