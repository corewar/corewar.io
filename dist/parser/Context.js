"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
class Context {
    constructor() {
        this.metaData = {
            name: "",
            author: "",
            strategy: ""
        };
        this.equs = {};
        this.tokens = [];
        this.labels = {};
        this.messages = [];
    }
    emitSingle(token) {
        this.tokens.push(token);
    }
    emit(tokens) {
        this.tokens = this.tokens.concat(tokens);
    }
    hasValue(something) {
        return (!(_.isUndefined(something) || _.isNull(something)));
    }
    emitInstruction(instruction) {
        if (this.hasValue(instruction.opcode)) {
            this.tokens.push(instruction.opcode);
        }
        if (this.hasValue(instruction.modifier)) {
            this.tokens.push(instruction.modifier);
        }
        if (this.hasValue(instruction.aOperand)) {
            if (this.hasValue(instruction.aOperand.mode)) {
                this.tokens.push(instruction.aOperand.mode);
            }
            if (this.hasValue(instruction.aOperand.address)) {
                this.tokens.push(instruction.aOperand.address);
            }
        }
        if (this.hasValue(instruction.comma)) {
            this.tokens.push(instruction.comma);
        }
        if (this.hasValue(instruction.bOperand)) {
            if (this.hasValue(instruction.bOperand.mode)) {
                this.tokens.push(instruction.bOperand.mode);
            }
            if (this.hasValue(instruction.bOperand.address)) {
                this.tokens.push(instruction.bOperand.address);
            }
        }
        if (this.hasValue(instruction.comment)) {
            this.tokens.push(instruction.comment);
        }
        if (this.hasValue(instruction.eol)) {
            this.tokens.push(instruction.eol);
        }
    }
}
exports.Context = Context;
