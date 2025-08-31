"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHillWarrior = void 0;
const HillWarriorResult_1 = __importDefault(require("./HillWarriorResult"));
const buildHillWarrior = (warriorId) => ({
    age: 1,
    rank: 1,
    result: (0, HillWarriorResult_1.default)(),
    warriorId: warriorId || '1'
});
exports.buildHillWarrior = buildHillWarrior;
exports.default = exports.buildHillWarrior;
