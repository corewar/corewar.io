"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCollectionMock = void 0;
const buildCollectionMock = (sandbox) => ({
    find: sandbox.stub().returns({ toArray: sandbox.stub().returns([]) }),
    findOne: sandbox.stub().returns({}),
    insertOne: sandbox.stub(),
    updateOne: sandbox.stub(),
    deleteOne: sandbox.stub()
});
exports.buildCollectionMock = buildCollectionMock;
exports.default = exports.buildCollectionMock;
