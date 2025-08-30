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
require("reflect-metadata");
const chai_1 = __importStar(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const hillService = __importStar(require("@/services/HillService"));
const HillResolver_1 = __importDefault(require("@/resolvers/HillResolver"));
const HillService_1 = __importDefault(require("@test/mocks/HillService"));
const HillRules_1 = __importDefault(require("@test/mocks/HillRules"));
chai_1.default.use(sinon_chai_1.default);
describe('HillResolver', () => {
    let sandbox;
    let target;
    let service;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
        target = new HillResolver_1.default();
        service = (0, HillService_1.default)(sandbox);
        sandbox.stub(hillService, 'buildHillService').returns(service);
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('query hill', () => {
        it('should return hill with matching id from service', async () => {
            const id = '1234';
            const expected = { id, foo: 'bar' };
            const stub = service.getById;
            stub.withArgs(id).returns(expected);
            const actual = await target.hill({ id });
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
    });
    describe('query hills', () => {
        it('should return all hills from service', async () => {
            const expected = [{ foo: 'bar' }];
            const stub = service.getAll;
            stub.returns(expected);
            const actual = await target.hills();
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
    });
    describe('mutation saveHill', () => {
        it('should save hill with specified rules', async () => {
            const expected = { rules: (0, HillRules_1.default)() };
            const stub = service.createHill;
            await target.createHill(expected);
            (0, chai_1.expect)(stub).to.have.been.calledWith(expected.rules);
        });
        it('should return result of service createHill', async () => {
            const args = { rules: (0, HillRules_1.default)() };
            const result = { foo: 'bar' };
            const expected = { result, success: true };
            const stub = service.createHill;
            stub.returns(result);
            const actual = await target.createHill(args);
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to save hill');
            const stub = service.createHill;
            stub.throws(expected);
            const actual = await target.createHill({
                rules: (0, HillRules_1.default)()
            });
            (0, chai_1.expect)(actual.message).to.be.equal(expected.message);
            (0, chai_1.expect)(actual.success).to.be.false;
            (0, chai_1.expect)(actual.result).to.be.undefined;
        });
    });
    describe('mutation deleteHill', () => {
        it('should delete hill with specified id', async () => {
            const id = '1234';
            const stub = service.deleteHill;
            await target.deleteHill({ id });
            (0, chai_1.expect)(stub).to.have.been.calledWith(id);
        });
        it('should return result of service deleteHill', async () => {
            const args = { id: '1234' };
            const result = '1234';
            const expected = { result, success: true };
            const stub = service.deleteHill;
            stub.returns(result);
            const actual = await target.deleteHill(args);
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to delete hill');
            const stub = service.deleteHill;
            stub.throws(expected);
            const actual = await target.deleteHill({ id: '1234' });
            (0, chai_1.expect)(actual.message).to.be.equal(expected.message);
            (0, chai_1.expect)(actual.success).to.be.false;
            (0, chai_1.expect)(actual.result).to.be.undefined;
        });
    });
    describe('mutation challengeHill', () => {
        it('should challenge specified hill with the specified warrior', async () => {
            const hillId = '1234';
            const warriorId = '5678';
            const stub = service.challengeHill;
            await target.challengeHill({ hillId, warriorId });
            (0, chai_1.expect)(stub).to.have.been.calledWith(hillId, warriorId);
        });
        it('should return result of service challengeHill', async () => {
            const args = { hillId: '1234', warriorId: '5678' };
            const result = '1234';
            const expected = { result, success: true };
            const stub = service.challengeHill;
            stub.returns(result);
            const actual = await target.challengeHill(args);
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to challenge hill');
            const stub = service.challengeHill;
            stub.throws(expected);
            const actual = await target.challengeHill({
                hillId: '1234',
                warriorId: '5678'
            });
            (0, chai_1.expect)(actual.message).to.be.equal(expected.message);
            (0, chai_1.expect)(actual.success).to.be.false;
            (0, chai_1.expect)(actual.result).to.be.undefined;
        });
    });
});
