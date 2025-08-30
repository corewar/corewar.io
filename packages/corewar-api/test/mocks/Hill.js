"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHill = void 0;
const HillRules_1 = __importDefault(require("./HillRules"));
const buildHill = (id) => ({
    id: id || '1',
    rules: (0, HillRules_1.default)(),
    warriors: []
});
exports.buildHill = buildHill;
exports.default = exports.buildHill;
