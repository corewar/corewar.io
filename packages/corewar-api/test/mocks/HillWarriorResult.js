"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHillWarriorResult = void 0;
const Warrior_1 = __importDefault(require("./Warrior"));
const buildHillWarriorResult = () => ({
    won: 1,
    drawn: 1,
    lost: 1,
    matches: [],
    rank: 1,
    score: 1,
    warrior: (0, Warrior_1.default)()
});
exports.buildHillWarriorResult = buildHillWarriorResult;
exports.default = exports.buildHillWarriorResult;
