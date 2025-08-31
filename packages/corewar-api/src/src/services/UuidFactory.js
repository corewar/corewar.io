"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UuidFactory {
    get() {
        return (0, uuid_1.v1)();
    }
}
exports.default = UuidFactory;
