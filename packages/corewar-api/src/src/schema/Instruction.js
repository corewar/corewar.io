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
const corewar_1 = require("corewar");
const Operand_1 = __importDefault(require("@/schema/Operand"));
let Instruction = class Instruction {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Instruction.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Instruction.prototype, "opcode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Instruction.prototype, "modifier", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Operand_1.default)
], Instruction.prototype, "aOperand", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Operand_1.default)
], Instruction.prototype, "bOperand", void 0);
Instruction = __decorate([
    (0, type_graphql_1.ObjectType)()
], Instruction);
exports.default = Instruction;
