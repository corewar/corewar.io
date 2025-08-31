"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHillServiceMock = void 0;
const buildHillServiceMock = (sandbox) => ({
    createHill: sandbox.stub(),
    deleteHill: sandbox.stub(),
    getAll: sandbox.stub(),
    getById: sandbox.stub(),
    challengeHill: sandbox.stub()
});
exports.buildHillServiceMock = buildHillServiceMock;
exports.default = exports.buildHillServiceMock;
