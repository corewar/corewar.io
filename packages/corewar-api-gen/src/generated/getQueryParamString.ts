export const getQueryParamString = (args: { [key: string]: unknown }, params: { [key: string]: string }): string => {
    const list = Object.keys(args)
        .map(arg => `$${arg}: ${params[arg]}`)
        .join(', ')
    return list.length === 0 ? '' : `(${list})`
}
