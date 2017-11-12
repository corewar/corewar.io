import { IOptions } from "./interface/IOptions";
import { IInstruction, OpcodeType, ModifierType } from "./interface/IInstruction";
import { ModeType } from "./interface/IOperand";

export default class Defaults implements IOptions {

    public static coresize: number = 8000;
    public static cyclesBeforeTie: number = 80000;
    public static initialInstruction: IInstruction = {
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
    public static instructionLimit: number = 100;
    public static maxTasks: number = 8000;
    public static minSeparation: number = 100;
}