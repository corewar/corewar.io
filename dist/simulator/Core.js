"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LiteEvent_1 = require("../modules/LiteEvent");
const ICore_1 = require("./interface/ICore");
const _ = require("underscore");
class Core {
    constructor() {
        this.instructions = null;
        this._coreAccess = new LiteEvent_1.LiteEvent();
    }
    get coreAccess() {
        return this._coreAccess;
    }
    initialise(options) {
        this.options = options;
        this.cs = this.options.coresize;
        this.allocateMemory();
    }
    getSize() {
        return this.cs;
    }
    wrap(address) {
        address = address % this.cs;
        address = address >= 0 ? address : address + this.cs;
        return address;
    }
    triggerEvent(task, address, accessType) {
        this._coreAccess.trigger({
            task: task,
            accessType: accessType,
            address: address
        });
    }
    executeAt(task, address) {
        address = this.wrap(address);
        this.triggerEvent(task, address, ICore_1.CoreAccessType.execute);
        return this.instructions[address];
    }
    readAt(task, address) {
        address = this.wrap(address);
        this.triggerEvent(task, address, ICore_1.CoreAccessType.read);
        return this.instructions[address];
    }
    getAt(address) {
        address = this.wrap(address);
        return this.instructions[address];
    }
    setAt(task, address, instruction) {
        address = this.wrap(address);
        this.triggerEvent(task, address, ICore_1.CoreAccessType.write);
        this.instructions[address] = instruction;
    }
    allocateMemory() {
        this.instructions = [];
        for (var i = 0; i < this.cs; i++) {
            this.instructions.push(this.buildDefaultInstruction(i));
        }
    }
    buildDefaultInstruction(index) {
        var instruction = _.clone(this.options.initialInstruction);
        instruction.aOperand = _.clone(instruction.aOperand);
        instruction.bOperand = _.clone(instruction.bOperand);
        instruction.address = index;
        return instruction;
    }
}
exports.Core = Core;
