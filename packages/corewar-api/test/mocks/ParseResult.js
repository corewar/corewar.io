"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildParseResult = void 0;
const buildParseResult = () => ({
    messages: [],
    metaData: {
        author: '',
        name: '',
        strategy: ''
    },
    success: true,
    tokens: []
});
exports.buildParseResult = buildParseResult;
exports.default = exports.buildParseResult;
