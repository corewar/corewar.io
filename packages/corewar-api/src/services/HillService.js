"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHillService = void 0;
const Repository_1 = __importDefault(require("@/database/Repository"));
const UuidFactory_1 = __importDefault(require("@/services/UuidFactory"));
const constants_1 = require("@/constants");
const corewar_1 = require("corewar");
const WarriorService_1 = __importDefault(require("./WarriorService"));
class HillService {
    constructor(hillRepo, warriorService, uuid) {
        this.repo = hillRepo;
        this.warriorService = warriorService;
        this.uuid = uuid;
    }
    async getById(id) {
        return this.repo.getById(id);
    }
    async getAll() {
        return this.repo.getAll();
    }
    async createHill(rules) {
        const result = {
            id: this.uuid.get(),
            rules,
            warriors: []
        };
        await this.repo.upsert(result);
        return result;
    }
    async deleteHill(id) {
        await this.repo.delete(id);
        return id;
    }
    async challengeHill(hillId, warriorId) {
        // TODO store results in db
        // TODO increase age of warriors
        // TODO handle first run of a hill (no existing warriors)
        // TODO rename IWarrior.internalId to id and then use everywhere,....EVERYWHERE!!
        const hill = await this.repo.getById(hillId);
        if (!hill) {
            throw Error(`No hill found with id '${hillId}'`);
        }
        const challenger = await this.warriorService.getById(warriorId);
        if (!challenger) {
            throw Error(`No warrior found with id '${warriorId}'`);
        }
        const warriors = await Promise.all(hill.warriors
            .sort((a, b) => a.rank - b.rank)
            .slice(0, hill.rules.size)
            .map(async (warrior) => await this.warriorService.getById(warrior.warriorId)));
        warriors.push(challenger);
        corewar_1.corewar.runHill(hill.rules, warriors);
        return hill;
    }
}
exports.default = HillService;
const buildHillService = () => new HillService(new Repository_1.default(constants_1.HILL_COLLECTION), new WarriorService_1.default(new Repository_1.default(constants_1.WARRIOR_COLLECTION), new UuidFactory_1.default()), new UuidFactory_1.default());
exports.buildHillService = buildHillService;
