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
const ParseResolver_1 = __importDefault(require("@/resolvers/ParseResolver"));
const corewar_1 = require("corewar");
const ParseResult_1 = __importDefault(require("@test/mocks/ParseResult"));
chai_1.default.use(sinon_chai_1.default);
describe('ParseResolver', () => {
    let target;
    let sandbox;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
        target = new ParseResolver_1.default();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('parse', () => {
        it('should pass specified redcode to corewar library to parse', async () => {
            const expected = 'mov 0, 1';
            const parse = sandbox.stub(corewar_1.corewar, 'parse');
            await target.parse(expected);
            (0, chai_1.expect)(parse).to.have.been.calledWith(expected);
        });
        it('should return ParseResult', async () => {
            const expected = (0, ParseResult_1.default)();
            sandbox.stub(corewar_1.corewar, 'parse').returns(expected);
            const actual = await target.parse('mov 0, 1');
            (0, chai_1.expect)(actual).to.be.deep.equal(expected);
        });
    });
});
