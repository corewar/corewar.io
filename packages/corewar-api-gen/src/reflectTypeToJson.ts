import { GraphQLOutputType, GraphQLObjectType, GraphQLType, GraphQLField } from 'graphql'

const getObjectOrScalarRecursive = (type: GraphQLType): GraphQLType => {
    if (!('ofType' in type)) {
        return type
    }
    return getObjectOrScalarRecursive(type.ofType)
}

const emitField = (indent: number, field: GraphQLField<any, any, any>): string => {
    const rootType = getObjectOrScalarRecursive(field.type)
    if (!('getFields' in rootType)) {
        return `${field.name}`
    }
    /* eslint-disable-next-line */
    return `${field.name} ${emitObject(indent + 1, rootType as GraphQLObjectType)}`
}

const emitObject = (indent: number, object: GraphQLObjectType): string => {
    const tab = '    '
    const tabSpace = tab.repeat(indent)
    const lessTabSpace = tab.repeat(indent - 1)
    return `{\n${Object.values(object.getFields())
        .map(field => `${tabSpace}${emitField(indent, field)}`)
        .join('\n')}\n${lessTabSpace}}`
}

export const reflectTypeToJson = (outputType: GraphQLOutputType): string => {
    //TODO handle a scalar outputType - for now assume object type
    const rootType = getObjectOrScalarRecursive(outputType)
    const result = emitObject(1, rootType as GraphQLObjectType)
    return result
}
