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
const chai_1 = __importStar(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const Repository_1 = __importDefault(require("@test/mocks/Repository"));
const UuidFactory_1 = __importDefault(require("@test/mocks/UuidFactory"));
const WarriorService_1 = __importDefault(require("@/services/WarriorService"));
const corewar_1 = require("corewar");
const ParseResult_1 = __importDefault(require("@test/mocks/ParseResult"));
chai_1.default.use(sinon_chai_1.default);
describe('WarriorService', () => {
    let sandbox;
    let target;
    let repo;
    let uuid;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
        repo = (0, Repository_1.default)(sandbox);
        uuid = (0, UuidFactory_1.default)(sandbox);
        target = new WarriorService_1.default(repo, uuid);
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
    describe('saveWarrior', () => {
        let parse;
        beforeEach(() => {
            parse = sandbox.stub(corewar_1.corewar, 'parse').returns((0, ParseResult_1.default)());
        });
        afterEach(() => {
            sandbox.restore();
        });
        it('should upsert warrior with repository', async () => {
            const redcode = 'mov 0, 1';
            const id = '12345';
            const stub = repo.upsert;
            await target.saveWarrior(redcode, id);
            (0, chai_1.expect)(stub).to.have.been.calledWith(sinon_1.default.match((x) => x.redcode === redcode && x.id === id));
        });
        it('should generate a uuid if no id specified', async () => {
            const expected = '11111111-2222-3333-4444-555555555555';
            const stub = uuid.get;
            stub.returns(expected);
            const actual = await target.saveWarrior('');
            (0, chai_1.expect)(actual.id).to.be.equal(expected);
        });
        it('should not assign an id or persist if redcode cannot be parsed', async () => {
            const parseResult = (0, ParseResult_1.default)();
            parseResult.success = false;
            parse.returns(parseResult);
            const stub = sandbox.stub();
            repo.upsert = stub;
            const actual = await target.saveWarrior('');
            (0, chai_1.expect)(actual.id).to.be.undefined;
            (0, chai_1.expect)(actual.source).to.be.deep.equal(parseResult);
            (0, chai_1.expect)(stub).not.to.have.been.called;
        });
        describe('deleteWarrior', () => {
            it('should delete the specified warrior from the repository', async () => {
                const expected = '123';
                const stub = repo.delete;
                await target.deleteWarrior(expected);
                (0, chai_1.expect)(stub).to.have.been.calledWith(expected);
            });
        });
    });
});
