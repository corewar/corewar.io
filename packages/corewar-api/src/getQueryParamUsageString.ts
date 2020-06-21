export const getQueryParamUsageString = (args: { [key: string]: unknown }): string => {
    const list = Object.keys(args)
        .map(arg => `${arg}: $${arg}`)
        .join(', ')
    return list.length === 0 ? '' : `(${list})`
}
