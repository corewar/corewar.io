"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWarrior = void 0;
const ParseResult_1 = __importDefault(require("./ParseResult"));
const buildWarrior = (id) => ({
    id: id || '1',
    source: (0, ParseResult_1.default)(),
    redcode: 'mov 0, 1'
});
exports.buildWarrior = buildWarrior;
exports.default = exports.buildWarrior;
