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
const warriorService = __importStar(require("@/services/WarriorService"));
const WarriorResolver_1 = __importDefault(require("@/resolvers/WarriorResolver"));
const WarriorService_1 = __importDefault(require("@test/mocks/WarriorService"));
chai_1.default.use(sinon_chai_1.default);
describe('WarriorResolver', () => {
    let sandbox;
    let target;
    let service;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
        target = new WarriorResolver_1.default();
        service = (0, WarriorService_1.default)(sandbox);
        sandbox.stub(warriorService, 'buildWarriorService').returns(service);
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('query warrior', () => {
        it('should return warrior with matching id from service', async () => {
            const id = '1234';
            const expected = { id, foo: 'bar' };
            const stub = service.getById;
            stub.withArgs(id).returns(expected);
            const actual = await target.warrior({ id });
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
    });
    describe('query warriors', () => {
        it('should return all warriors from service', async () => {
            const expected = [{ foo: 'bar' }];
            const stub = service.getAll;
            stub.returns(expected);
            const actual = await target.warriors();
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
    });
    describe('mutation saveWarrior', () => {
        it('should save warrior with specified redcode and id', async () => {
            const expected = { warrior: { id: '1234', redcode: 'mov 0, 1' } };
            const stub = service.saveWarrior;
            await target.saveWarrior(expected);
            (0, chai_1.expect)(stub).to.have.been.calledWith(expected.warrior.redcode, expected.warrior.id);
        });
        it('should return result of service saveWarrior', async () => {
            const args = { warrior: { id: '1234', redcode: 'mov 0, 1' } };
            const result = { foo: 'bar' };
            const expected = { result, success: true };
            const stub = service.saveWarrior;
            stub.returns(result);
            const actual = await target.saveWarrior(args);
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to save warrior');
            const stub = service.saveWarrior;
            stub.throws(expected);
            const actual = await target.saveWarrior({
                warrior: { id: '1234', redcode: 'mov 0, 1' }
            });
            (0, chai_1.expect)(actual.message).to.be.equal(expected.message);
            (0, chai_1.expect)(actual.success).to.be.false;
            (0, chai_1.expect)(actual.result).to.be.undefined;
        });
    });
    describe('mutation deleteWarrior', () => {
        it('should delete warrior with specified id', async () => {
            const id = '1234';
            const stub = service.deleteWarrior;
            await target.deleteWarrior({ id });
            (0, chai_1.expect)(stub).to.have.been.calledWith(id);
        });
        it('should return result of service deleteWarrior', async () => {
            const args = { id: '1234' };
            const result = { id: '1234' };
            const expected = { result, success: true };
            const stub = service.deleteWarrior;
            stub.returns(result);
            const actual = await target.deleteWarrior(args);
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to delete warrior');
            const stub = service.deleteWarrior;
            stub.throws(expected);
            const actual = await target.deleteWarrior({ id: '1234' });
            (0, chai_1.expect)(actual.message).to.be.equal(expected.message);
            (0, chai_1.expect)(actual.success).to.be.false;
            (0, chai_1.expect)(actual.result).to.be.undefined;
        });
    });
});
