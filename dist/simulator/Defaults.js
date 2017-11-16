"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IInstruction_1 = require("./interface/IInstruction");
const IOperand_1 = require("./interface/IOperand");
class Defaults {
}
Defaults.coresize = 8000;
Defaults.cyclesBeforeTie = 80000;
Defaults.initialInstruction = {
    address: 0,
    opcode: IInstruction_1.OpcodeType.DAT,
    modifier: IInstruction_1.ModifierType.F,
    aOperand: {
        mode: IOperand_1.ModeType.Direct,
        address: 0
    },
    bOperand: {
        mode: IOperand_1.ModeType.Direct,
        address: 0
    }
};
Defaults.instructionLimit = 100;
Defaults.maxTasks = 8000;
Defaults.minSeparation = 100;
exports.default = Defaults;
