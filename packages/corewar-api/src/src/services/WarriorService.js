"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWarriorService = void 0;
const Repository_1 = __importDefault(require("@/database/Repository"));
const corewar_1 = require("corewar");
const UuidFactory_1 = __importDefault(require("./UuidFactory"));
const constants_1 = require("@/constants");
class WarriorService {
    constructor(repo, uuid) {
        this.repo = repo;
        this.uuid = uuid;
    }
    async getById(id) {
        return this.repo.getById(id);
    }
    async getAll() {
        return this.repo.getAll();
    }
    async saveWarrior(redcode, id) {
        const result = {
            id,
            redcode,
            source: corewar_1.corewar.parse(redcode)
        };
        if (!result.source.success) {
            return result;
        }
        if (!result.id) {
            result.id = this.uuid.get();
        }
        await this.repo.upsert(result);
        return result;
    }
    async deleteWarrior(id) {
        await this.repo.delete(id);
        return id;
    }
}
exports.default = WarriorService;
const buildWarriorService = () => new WarriorService(new Repository_1.default(constants_1.WARRIOR_COLLECTION), new UuidFactory_1.default());
exports.buildWarriorService = buildWarriorService;
