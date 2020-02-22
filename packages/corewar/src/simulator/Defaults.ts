import { IOptions } from "@simulator/interface/IOptions";
import { IInstruction, OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";

class Defaults implements IOptions {

    public coresize = 8000;
    public maximumCycles = 80000;
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
    public instructionLimit = 100;
    public maxTasks = 8000;
    public minSeparation = 100;
}

export default new Defaults();