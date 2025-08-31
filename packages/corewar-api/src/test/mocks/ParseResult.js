"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildParseResult = void 0;
const MetaData_1 = __importDefault(require("@/schema/MetaData"));
const ParseResult_1 = __importDefault(require("@/schema/ParseResult"));
const buildParseResult = () => {
    const parseResult = new ParseResult_1.default();
    parseResult.messages = [];
    const metaData = new MetaData_1.default();
    metaData.author = '';
    metaData.name = '';
    metaData.strategy = '';
    parseResult.metaData = metaData;
    parseResult.success = true;
    parseResult.tokens = [];
    return parseResult;
};
exports.buildParseResult = buildParseResult;
exports.default = exports.buildParseResult;
