"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUidFactoryMock = void 0;
const buildUidFactoryMock = (sandbox) => ({
    get: sandbox.stub()
});
exports.buildUidFactoryMock = buildUidFactoryMock;
exports.default = exports.buildUidFactoryMock;
