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
exports.RulesInput = exports.OptionsInput = exports.InstructionInput = exports.OperandInput = void 0;
const MutationResult_1 = __importDefault(require("@/resolvers/MutationResult"));
const Hill_1 = __importDefault(require("@/schema/Hill"));
const HillService_1 = require("@/services/HillService");
const corewar_1 = require("corewar");
const type_graphql_1 = require("type-graphql");
let OperandInput = class OperandInput {
};
exports.OperandInput = OperandInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OperandInput.prototype, "mode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OperandInput.prototype, "address", void 0);
exports.OperandInput = OperandInput = __decorate([
    (0, type_graphql_1.InputType)()
], OperandInput);
let InstructionInput = class InstructionInput {
};
exports.InstructionInput = InstructionInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], InstructionInput.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InstructionInput.prototype, "opcode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InstructionInput.prototype, "modifier", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", OperandInput)
], InstructionInput.prototype, "aOperand", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", OperandInput)
], InstructionInput.prototype, "bOperand", void 0);
exports.InstructionInput = InstructionInput = __decorate([
    (0, type_graphql_1.InputType)()
], InstructionInput);
let OptionsInput = class OptionsInput {
};
exports.OptionsInput = OptionsInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OptionsInput.prototype, "coresize", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OptionsInput.prototype, "maximumCycles", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", InstructionInput)
], OptionsInput.prototype, "initialInstruction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OptionsInput.prototype, "instructionLimit", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OptionsInput.prototype, "maxTasks", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OptionsInput.prototype, "minSeparation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OptionsInput.prototype, "standard", void 0);
exports.OptionsInput = OptionsInput = __decorate([
    (0, type_graphql_1.InputType)()
], OptionsInput);
let RulesInput = class RulesInput {
};
exports.RulesInput = RulesInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], RulesInput.prototype, "rounds", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], RulesInput.prototype, "size", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", OptionsInput)
], RulesInput.prototype, "options", void 0);
exports.RulesInput = RulesInput = __decorate([
    (0, type_graphql_1.InputType)()
], RulesInput);
let HillArgs = class HillArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], HillArgs.prototype, "id", void 0);
HillArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], HillArgs);
let CreateHillArgs = class CreateHillArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", RulesInput)
], CreateHillArgs.prototype, "rules", void 0);
CreateHillArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateHillArgs);
let CreateHillResult = class CreateHillResult extends MutationResult_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Hill_1.default)
], CreateHillResult.prototype, "result", void 0);
CreateHillResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], CreateHillResult);
let DeleteHillResult = class DeleteHillResult extends MutationResult_1.default {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DeleteHillResult.prototype, "result", void 0);
DeleteHillResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteHillResult);
let ChallengeHillArgs = class ChallengeHillArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ChallengeHillArgs.prototype, "warriorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ChallengeHillArgs.prototype, "hillId", void 0);
ChallengeHillArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], ChallengeHillArgs);
let ChallengeHillResult = class ChallengeHillResult extends MutationResult_1.default {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Hill_1.default)
], ChallengeHillResult.prototype, "result", void 0);
ChallengeHillResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], ChallengeHillResult);
let HillResolver = class HillResolver {
    getService() {
        return (0, HillService_1.buildHillService)();
    }
    async hill({ id }) {
        return this.getService().getById(id);
    }
    async hills() {
        return this.getService().getAll();
    }
    async createHill({ rules }) {
        try {
            return {
                success: true,
                result: await this.getService().createHill(rules)
            };
        }
        catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            };
        }
    }
    async deleteHill({ id }) {
        try {
            return {
                success: true,
                result: await this.getService().deleteHill(id)
            };
        }
        catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            };
        }
    }
    async challengeHill({ hillId, warriorId }) {
        try {
            return {
                success: true,
                result: await this.getService().challengeHill(hillId, warriorId)
            };
        }
        catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Hill_1.default),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HillArgs]),
    __metadata("design:returntype", Promise)
], HillResolver.prototype, "hill", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Hill_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HillResolver.prototype, "hills", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CreateHillResult),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateHillArgs]),
    __metadata("design:returntype", Promise)
], HillResolver.prototype, "createHill", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DeleteHillResult),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HillArgs]),
    __metadata("design:returntype", Promise)
], HillResolver.prototype, "deleteHill", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ChallengeHillResult),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChallengeHillArgs]),
    __metadata("design:returntype", Promise)
], HillResolver.prototype, "challengeHill", null);
HillResolver = __decorate([
    (0, type_graphql_1.Resolver)(Hill_1.default)
], HillResolver);
exports.default = HillResolver;
