"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Random {
    get(max) {
        return Math.floor(Math.random() * max);
    }
}
exports.Random = Random;
