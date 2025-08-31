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
const MutationResult_1 = __importDefault(require("@/resolvers/MutationResult"));
const Warrior_1 = __importDefault(require("@/schema/Warrior"));
const WarriorService_1 = require("@/services/WarriorService");
const type_graphql_1 = require("type-graphql");
let WarriorInput = class WarriorInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], WarriorInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WarriorInput.prototype, "redcode", void 0);
WarriorInput = __decorate([
    (0, type_graphql_1.InputType)()
], WarriorInput);
let WarriorArgs = class WarriorArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WarriorArgs.prototype, "id", void 0);
WarriorArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], WarriorArgs);
let SaveWarriorArgs = class SaveWarriorArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", WarriorInput)
], SaveWarriorArgs.prototype, "warrior", void 0);
SaveWarriorArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], SaveWarriorArgs);
let SaveWarriorResult = class SaveWarriorResult extends MutationResult_1.default {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Warrior_1.default)
], SaveWarriorResult.prototype, "result", void 0);
SaveWarriorResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], SaveWarriorResult);
let DeleteWarriorResult = class DeleteWarriorResult extends MutationResult_1.default {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DeleteWarriorResult.prototype, "result", void 0);
DeleteWarriorResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteWarriorResult);
let WarriorResolver = class WarriorResolver {
    getService() {
        return (0, WarriorService_1.buildWarriorService)();
    }
    async warrior({ id }) {
        return this.getService().getById(id);
    }
    async warriors() {
        return this.getService().getAll();
    }
    async saveWarrior({ warrior }) {
        try {
            return {
                success: true,
                result: await this.getService().saveWarrior(warrior.redcode, warrior.id)
            };
        }
        catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            };
        }
    }
    async deleteWarrior({ id }) {
        try {
            return {
                success: true,
                result: await this.getService().deleteWarrior(id)
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
    (0, type_graphql_1.Query)(() => Warrior_1.default),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WarriorArgs]),
    __metadata("design:returntype", Promise)
], WarriorResolver.prototype, "warrior", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Warrior_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarriorResolver.prototype, "warriors", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SaveWarriorResult),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SaveWarriorArgs]),
    __metadata("design:returntype", Promise)
], WarriorResolver.prototype, "saveWarrior", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DeleteWarriorResult),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WarriorArgs]),
    __metadata("design:returntype", Promise)
], WarriorResolver.prototype, "deleteWarrior", null);
WarriorResolver = __decorate([
    (0, type_graphql_1.Resolver)(Warrior_1.default)
], WarriorResolver);
exports.default = WarriorResolver;
