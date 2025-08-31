"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HillService_1 = __importDefault(require("@/services/HillService"));
const Hill_1 = __importDefault(require("@test/mocks/Hill"));
const HillRules_1 = __importDefault(require("@test/mocks/HillRules"));
const HillWarrior_1 = __importDefault(require("@test/mocks/HillWarrior"));
const ParseResult_1 = __importDefault(require("@test/mocks/ParseResult"));
const Repository_1 = __importDefault(require("@test/mocks/Repository"));
const UuidFactory_1 = __importDefault(require("@test/mocks/UuidFactory"));
const Warrior_1 = __importDefault(require("@test/mocks/Warrior"));
const WarriorService_1 = __importDefault(require("@test/mocks/WarriorService"));
const chai_1 = __importStar(require("chai"));
const corewar_1 = require("corewar");
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
chai_1.default.use(sinon_chai_1.default);
describe('HillService', () => {
    let sandbox;
    let target;
    let repo;
    let warriorService;
    let uuid;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
        repo = (0, Repository_1.default)(sandbox);
        uuid = (0, UuidFactory_1.default)(sandbox);
        warriorService = (0, WarriorService_1.default)(sandbox);
        target = new HillService_1.default(repo, warriorService, uuid);
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('getById', () => {
        it('should return requested result from repository', async () => {
            const id = '7';
            const expected = {};
            const stub = repo.getById;
            stub.withArgs(id).returns(Promise.resolve(expected));
            const actual = await target.getById(id);
            (0, chai_1.expect)(actual).to.deep.equal(expected);
        });
    });
    describe('getAll', () => {
        it('should return all results from repository', async () => {
            const expected = [];
            const stub = repo.getAll;
            stub.returns(expected);
            const actual = await target.getAll();
            (0, chai_1.expect)(actual).to.deep.equal(expected);
        });
    });
    describe('createHill', () => {
        it('should upsert hill with repository', async () => {
            const rules = (0, HillRules_1.default)();
            const stub = repo.upsert;
            await target.createHill(rules);
            (0, chai_1.expect)(stub).to.have.been.calledWith(sinon_1.default.match((x) => x.rules === rules));
        });
        it('should generate a uuid for the new hill', async () => {
            const expected = '11111111-2222-3333-4444-555555555555';
            const stub = uuid.get;
            stub.returns(expected);
            const rules = (0, HillRules_1.default)();
            const actual = await target.createHill(rules);
            (0, chai_1.expect)(actual.id).to.be.equal(expected);
        });
    });
    describe('deleteHill', () => {
        it('should delete the specified hill from the repository', async () => {
            const expected = '123';
            const stub = repo.delete;
            await target.deleteHill(expected);
            (0, chai_1.expect)(stub).to.have.been.calledWith(expected);
        });
    });
    describe('challengeHill', () => {
        let runHill;
        beforeEach(() => {
            runHill = sandbox.stub(corewar_1.corewar, 'runHill');
            const warriorServiceGetById = warriorService.getById;
            warriorServiceGetById.returns({ parseResult: (0, ParseResult_1.default)() });
            const repoGetbyId = repo.getById;
            repoGetbyId.returns((0, Hill_1.default)());
        });
        afterEach(() => {
            sandbox.restore();
        });
        const warriorWithId = (id) => (warriors) => 
        // TODO are we using .data.id or .id or what!?
        !!warriors.find((warrior) => warrior.id === id);
        it('should run hill with specified warrior', async () => {
            const expected = '2';
            const stub = warriorService.getById;
            const challenger = { id: expected, redcode: '', source: (0, ParseResult_1.default)() };
            stub.withArgs(expected).returns(challenger);
            await target.challengeHill('1', expected);
            (0, chai_1.expect)(runHill).to.have.been.calledWith(sinon_1.default.match(() => true), sinon_1.default.match(warriorWithId(expected)));
        });
        it('should use the rules for the hill with the specified id', async () => {
            const hillId = '1';
            const hill = (0, Hill_1.default)();
            const expected = (0, HillRules_1.default)();
            hill.rules = expected;
            const stub = repo.getById;
            stub.withArgs(hillId).returns(hill);
            await target.challengeHill(hillId, '2');
            (0, chai_1.expect)(runHill).to.have.been.calledWith(sinon_1.default.match((rules) => rules === expected));
        });
        it("should run hill with hill's existing warriors", async () => {
            const existing = [(0, Warrior_1.default)('1'), (0, Warrior_1.default)('2')];
            const challenger = (0, Warrior_1.default)('3');
            const hill = (0, Hill_1.default)('4');
            hill.warriors = existing.map(warrior => (0, HillWarrior_1.default)(warrior.id));
            const getWarriorById = warriorService.getById;
            getWarriorById.withArgs(challenger.id).returns(challenger);
            existing.forEach(warrior => getWarriorById.withArgs(warrior.id).returns(warrior));
            const getHillById = repo.getById;
            getHillById.returns(hill);
            await target.challengeHill(hill.id, challenger.id);
            existing.forEach(warrior => (0, chai_1.expect)(runHill).to.have.been.calledWith(sinon_1.default.match(() => true), sinon_1.default.match(warriorWithId(warrior.id))));
        });
        it('should exclude warriors whose rank exceeds the hill size', async () => {
            const expected = (0, HillWarrior_1.default)('1');
            expected.rank = 1;
            const unexpected = (0, HillWarrior_1.default)('2');
            unexpected.rank = 2;
            const existing = [expected, unexpected];
            const challenger = (0, Warrior_1.default)('3');
            const hill = (0, Hill_1.default)('4');
            hill.warriors = existing;
            hill.rules.size = 1;
            const getWarriorById = warriorService.getById;
            getWarriorById.withArgs(challenger.id).returns(challenger);
            existing.forEach(hillWarrior => getWarriorById.withArgs(hillWarrior.warriorId).returns((0, Warrior_1.default)(hillWarrior.warriorId)));
            const getHillById = repo.getById;
            getHillById.returns(hill);
            await target.challengeHill(hill.id, challenger.id);
            (0, chai_1.expect)(runHill).to.have.been.calledWith(sinon_1.default.match(() => true), sinon_1.default.match(warriorWithId(expected.warriorId)));
            (0, chai_1.expect)(runHill).not.to.have.been.calledWith(sinon_1.default.match(() => true), sinon_1.default.match(warriorWithId(unexpected.warriorId)));
        });
        it('should throw if hill does not exist', async () => {
            const hillId = '1';
            const stub = repo.getById;
            stub.withArgs(hillId).returns(null);
            try {
                await target.challengeHill(hillId, '1');
                chai_1.assert.fail('Expected promise to fail but succeeded');
            }
            catch (e) {
                (0, chai_1.expect)(e instanceof Error ? e.message : String(e)).to.be.equal(`No hill found with id '${hillId}'`);
            }
        });
        it('should throw if challenger does not exist', async () => {
            const challengerId = '2';
            const stub = warriorService.getById;
            stub.withArgs(challengerId).returns(null);
            try {
                await target.challengeHill('1', challengerId);
                chai_1.assert.fail('Expected promise to fail but succeeded');
            }
            catch (e) {
                (0, chai_1.expect)(e instanceof Error ? e.message : String(e)).to.be.equal(`No warrior found with id '${challengerId}'`);
            }
        });
    });
});
