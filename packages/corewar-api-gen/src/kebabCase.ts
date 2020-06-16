export const kebabCase = (pascalCase: string): string =>
    pascalCase
        .match(/([A-Z]{0,1}[a-z]+)/g)
        .map(x => x.toLowerCase())
        .join('-')
