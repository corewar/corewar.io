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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Token_1 = __importDefault(require("@/schema/Token"));
const MetaData_1 = __importDefault(require("@/schema/MetaData"));
const Message_1 = __importDefault(require("@/schema/Message"));
const DataScalar_1 = __importDefault(require("@/schema/DataScalar"));
let ParseResult = class ParseResult {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", MetaData_1.default)
], ParseResult.prototype, "metaData", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Token_1.default]),
    __metadata("design:type", Array)
], ParseResult.prototype, "tokens", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ParseResult.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Message_1.default]),
    __metadata("design:type", Array)
], ParseResult.prototype, "messages", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => DataScalar_1.default, { nullable: true })
    /* eslint-disable-next-line */
    ,
    __metadata("design:type", Object)
], ParseResult.prototype, "data", void 0);
ParseResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], ParseResult);
exports.default = ParseResult;
