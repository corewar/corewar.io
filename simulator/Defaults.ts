import { IOptions } from "./interface/IOptions";
import { IInstruction, OpcodeType, ModifierType } from "./interface/IInstruction";
import { ModeType } from "./interface/IOperand";

class Defaults implements IOptions {

    public coresize: number = 8000;
    public maximumCycles: number = 80000;
    public initialInstruction: IInstruction = {
        address: 0,
        opcode: OpcodeType.DAT,
        modifier: ModifierType.F,
        aOperand: {
            mode: ModeType.Direct,
            address: 0
        },
        bOperand: {
            mode: ModeType.Direct,
            address: 0
        }
    };
    public instructionLimit: number = 100;
    public maxTasks: number = 8000;
    public minSeparation: number = 100;
}

export default new Defaults();