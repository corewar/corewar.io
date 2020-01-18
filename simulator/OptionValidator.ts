import { IOptionValidator } from "@simulator/interface/IOptionValidator";
import { IOptions } from "@simulator/interface/IOptions";
import { OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";

export class OptionValidator implements IOptionValidator {

    public static CoresizeNegativeMessage = "Coresize must be a positive integer";
    public static MinSeparationNegativeMessage = "MinSeparation must be a positive integer";
    public static InstructionLimitNegativeMessage = "InstructionLimit must be a positive integer";
    public static CoreTooSmallForWarriorsMessage = "The coresize is too small for all warriors to be placed. Coresize must be greater than minSeparation plus instructionLimit multiplied by number of warriors";
    public static MaximumCyclesNegativeMessage = "maximumCycles must be an integer greater than zero";
    public static MaxTasksNegativeMessage = "maxTasks must be an integer greater than zero";
    public static NoInitialInstructionMessage = "No initial instruction specified";
    public static InitialInstructionOpcodeMessage = "Initial instruction must have a valid opcode";
    public static InitialInstructionModifierMessage = "Initial instruction must have a valid modifier";
    public static InitialInstructionAOperandModeMessage = "Initial instruction must have a valid a operand address mode";
    public static InitialInstructionAOperandMessage = "Initial instruction must have a valid a operand";
    public static InitialInstructionBOperandModeMessage = "Initial instruction must have a valid b operand address mode";
    public static InitialInstructionBOperandMessage = "Initial instruction must have a valid b operand";

    public validate(state: IOptions, warriorCount: number): void {

        if (state.coresize < 0) {
            throw Error(OptionValidator.CoresizeNegativeMessage);
        }

        if (state.minSeparation < 0) {
            throw Error(OptionValidator.MinSeparationNegativeMessage);
        }

        if (state.instructionLimit < 0) {
            throw Error(OptionValidator.InstructionLimitNegativeMessage);
        }

        const requiredSize = warriorCount * (state.minSeparation + state.instructionLimit);

        if (state.coresize < requiredSize) {
            throw Error(OptionValidator.CoreTooSmallForWarriorsMessage);
        }

        if (state.maximumCycles < 1) {
            throw Error(OptionValidator.MaximumCyclesNegativeMessage);
        }

        if (state.maxTasks < 1) {
            throw Error(OptionValidator.MaxTasksNegativeMessage);
        }

        if (!state.initialInstruction) {
            throw Error(OptionValidator.NoInitialInstructionMessage);
        }

        if (state.initialInstruction.opcode < OpcodeType.DAT || state.initialInstruction.opcode >= OpcodeType.Count) {
            throw Error(OptionValidator.InitialInstructionOpcodeMessage);
        }

        if (state.initialInstruction.modifier < ModifierType.A || state.initialInstruction.modifier >= ModifierType.Count) {
            throw Error(OptionValidator.InitialInstructionModifierMessage);
        }

        if (!state.initialInstruction.aOperand) {
            throw Error(OptionValidator.InitialInstructionAOperandMessage);
        }

        if (!state.initialInstruction.bOperand) {
            throw Error(OptionValidator.InitialInstructionBOperandMessage);
        }

        if (state.initialInstruction.aOperand.mode < ModeType.Immediate || state.initialInstruction.aOperand.mode >= ModeType.Count) {
            throw Error(OptionValidator.InitialInstructionAOperandModeMessage);
        }

        if (state.initialInstruction.bOperand.mode < ModeType.Immediate || state.initialInstruction.bOperand.mode >= ModeType.Count) {
            throw Error(OptionValidator.InitialInstructionBOperandModeMessage);
        }
    }
}
