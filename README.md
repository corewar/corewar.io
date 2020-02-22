## Scripts

### Prepare development environment

```bash
npm install --global lerna eslint-cli
lerna bootstrap
lerna run prepublish --stream
```

> Currently `lerna boostrap` command is not building the `corewar` library. [Documentation](https://github.com/lerna/lerna/tree/master/commands/bootstrap) says it should automatically execute `prepublish` on all bootstrapped libraries but doesn't. In order to successfully bootstrap this application it is necessary to manually execute `lerna run prepublish` following bootstrap. I don't know why. If anyone knows, please let me know!

