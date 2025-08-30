"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const ParseResult_1 = __importDefault(require("@/schema/ParseResult"));
const corewar_1 = require("corewar");
let ParseResolver = class ParseResolver {
    async parse(redcode) {
        return corewar_1.corewar.parse(redcode);
    }
};
__decorate([
    (0, type_graphql_1.Query)(_ => ParseResult_1.default),
    __param(0, (0, type_graphql_1.Arg)('redcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParseResolver.prototype, "parse", null);
ParseResolver = __decorate([
    (0, type_graphql_1.Resolver)(ParseResult_1.default)
], ParseResolver);
exports.default = ParseResolver;
