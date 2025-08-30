"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ParseResolver_1 = __importDefault(require("@/resolvers/ParseResolver"));
const WarriorResolver_1 = __importDefault(require("@/resolvers/WarriorResolver"));
const HillResolver_1 = __importDefault(require("@/resolvers/HillResolver"));
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
(async () => {
    const schema = await (0, type_graphql_1.buildSchema)({
        validate: false,
        resolvers: [ParseResolver_1.default, WarriorResolver_1.default, HillResolver_1.default]
    });
    const server = new apollo_server_1.ApolloServer({
        schema
    });
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})();
