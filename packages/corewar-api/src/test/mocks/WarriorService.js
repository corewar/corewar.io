"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWarriorServiceMock = void 0;
const buildWarriorServiceMock = (sandbox) => ({
    deleteWarrior: sandbox.stub(),
    getAll: sandbox.stub(),
    getById: sandbox.stub(),
    saveWarrior: sandbox.stub()
});
exports.buildWarriorServiceMock = buildWarriorServiceMock;
exports.default = exports.buildWarriorServiceMock;
