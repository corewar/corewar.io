"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildRepositoryMock = (sandbox) => ({
    getAll: sandbox.stub(),
    getById: sandbox.stub(),
    getOneBy: sandbox.stub(),
    getManyBy: sandbox.stub(),
    upsert: sandbox.stub(),
    delete: sandbox.stub()
});
exports.default = buildRepositoryMock;
