import { IDecoder } from "./Interface/IDecoder";
import { IExecutive } from "./Interface/IExecutive";
import { IOperand } from "./Interface/IOperand";
import { ITask } from "./Interface/ITask";
import { ICore } from "./Interface/ICore";
import { IExecutionContext } from "./Interface/IExecutionContext";
import { ModifierType } from "./Interface/IInstruction";

export class Decoder implements IDecoder {

    private executive: IExecutive;

    private modeTable: ((task: ITask, ip: number, operand: IOperand, core: ICore) => number)[] = [
        this.immediate,         // #
        this.direct,            // $
        this.aIndirect,         // *
        this.bIndirect,         // @
        this.aPreDecrement,     // {
        this.bPreDecrement,     // <
        this.aPostIncrement,    // }
        this.bPostIncrement     // >
    ];

    constructor(executive: IExecutive) {

        this.executive = executive;
    }

    public decode(context: IExecutionContext): IExecutionContext {

        var aAccessor = this.modeTable[context.instruction.aOperand.mode];
        var bAccessor = this.modeTable[context.instruction.bOperand.mode];

        context.aPointer = aAccessor(
            context.task,
            context.instructionPointer,
            context.instruction.aOperand,
            context.core);

        context.bPointer = bAccessor(
            context.task,
            context.instructionPointer,
            context.instruction.bOperand,
            context.core);

        context.command = this.executive.commandTable[
            context.instruction.opcode * ModifierType.Count + context.instruction.modifier
        ];

        return context;
    }

    private immediate(task: ITask, ip: number, operand: IOperand, core: ICore) {
        return ip;
    }

    private direct(task: ITask, ip: number, operand: IOperand, core: ICore) {
        return ip + operand.address;
    }

    private aIndirect(task: ITask, ip: number, operand: IOperand, core: ICore) {

        var ipa = ip + operand.address;

        return ipa + core.readAt(task, ipa).aOperand.address;
    }

    private bIndirect(task: ITask, ip: number, operand: IOperand, core: ICore) {

        var ipa = ip + operand.address;

        return ipa + core.readAt(task, ipa).bOperand.address;
    }

    private aPreDecrement(task: ITask, ip: number, operand: IOperand, core: ICore) {

        var ipa = ip + operand.address;

        var instruction = core.readAt(task, ipa);

        var value = instruction.aOperand.address;

        var result = ipa + --value;

        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);

        return result;
    }

    private bPreDecrement(task: ITask, ip: number, operand: IOperand, core: ICore) {

        var ipa = ip + operand.address;

        var instruction = core.readAt(task, ipa);

        var value = instruction.bOperand.address;

        var result = ipa + --value;

        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);

        return result;
    }

    private aPostIncrement(task: ITask, ip: number, operand: IOperand, core: ICore) {

        var ipa = ip + operand.address;

        var instruction = core.readAt(task, ipa);

        var value = instruction.aOperand.address;

        var result = ipa + value++;

        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);

        return result;
    }

    private bPostIncrement(task: ITask, ip: number, operand: IOperand, core: ICore) {

        var ipa = ip + operand.address;

        var instruction = core.readAt(task, ipa);

        var value = instruction.bOperand.address;

        var result = ipa + value++;

        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);

        return result;
    }
}