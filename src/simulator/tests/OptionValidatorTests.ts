import * as chai from "chai";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import Defaults from "@simulator/Defaults";
import { IOptions } from "@simulator/interface/IOptions";
import { OptionValidator } from "@simulator/OptionValidator";
import * as clone from "clone";

describe("OptionValidator", () => {

    var optionValidator;
    var options;

    beforeEach(() => {

        optionValidator = new OptionValidator();
        options = clone(Defaults);
    });

    const validateAndExpect = (options: IOptions, warriorCount: number, expectedError: string) => {

        let actual = null;

        try {
            optionValidator.validate(options, warriorCount);
        } catch (e) {
            actual = e;
        }

        expect(actual).not.to.be.null;
        expect(actual.message).to.be.equal(expectedError);
    }

    it("Throws if coresize is less than zero", () => {

        options.coresize = -1;

        validateAndExpect(options, 1, OptionValidator.CoresizeNegativeMessage);
    });

    it("Throws if minSeparation is less than zero", () => {

        options.minSeparation = -1;

        validateAndExpect(options, 1, OptionValidator.MinSeparationNegativeMessage);
    });

    it("Throws if instructionLimit is less than zero", () => {

        options.instructionLimit = -1;

        validateAndExpect(options, 1, OptionValidator.InstructionLimitNegativeMessage);
    });

    it("Does not throw for valid coresize, instructionLimit and minSeparation", () => {

        options.coresize = 6;
        options.minSeparation = 1;
        options.instructionLimit = 2;

        optionValidator.validate(options, 2);
    });

    it("Throws if coresize is too small to contain all warriors", () => {

        options.coresize = 5;
        options.minSeparation = 1;
        options.instructionLimit = 2;

        validateAndExpect(options, 2, OptionValidator.CoreTooSmallForWarriorsMessage)
    });

    it("Throws if maximumCycles is less than one", () => {

        options.maximumCycles = 0;

        validateAndExpect(options, 1, OptionValidator.MaximumCyclesNegativeMessage);
    });

    it("Throws if maxTasks is less than one", () => {

        options.maxTasks = 0;

        validateAndExpect(options, 1, OptionValidator.MaxTasksNegativeMessage);
    });

    it("Throws if initial instruction is missing", () => {

        options.initialInstruction = null;

        validateAndExpect(options, 1, OptionValidator.NoInitialInstructionMessage);
    });

    it("Throws if initial instruction opcode is invalid", () => {

        options.initialInstruction.opcode = -1;

        validateAndExpect(options, 1, OptionValidator.InitialInstructionOpcodeMessage);
    });

    it("Throws if initial instruction modifier is invalid", () => {

        options.initialInstruction.modifier = -1;

        validateAndExpect(options, 1, OptionValidator.InitialInstructionModifierMessage);
    });

    it("Throws if initial instruction a operand is missing", () => {

        options.initialInstruction.aOperand = null;

        validateAndExpect(options, 1, OptionValidator.InitialInstructionAOperandMessage);
    });

    it("Throws if initial instruction a operand mode is invalid", () => {

        options.initialInstruction.aOperand.mode = -1;

        validateAndExpect(options, 1, OptionValidator.InitialInstructionAOperandModeMessage);
    });

    it("Throws if initial instruction b operand is missing", () => {

        options.initialInstruction.bOperand = null;

        validateAndExpect(options, 1, OptionValidator.InitialInstructionBOperandMessage);
    });

    it("Throws if initial instruction b operand mode is invalid", () => {

        options.initialInstruction.bOperand.mode = -1;

        validateAndExpect(options, 1, OptionValidator.InitialInstructionBOperandModeMessage);
    });
});