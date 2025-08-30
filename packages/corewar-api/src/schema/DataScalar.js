"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/* eslint-disable */
const DataScalar = new graphql_1.GraphQLScalarType({
    name: 'Data',
    description: 'Any data',
    parseValue(value) {
        return value;
    },
    serialize(value) {
        return value;
    },
    parseLiteral(ast) {
        return ast;
    }
});
exports.default = DataScalar;
