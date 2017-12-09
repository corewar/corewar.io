import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { IInstruction } from "../interface/IInstruction";
import { ITask } from "../interface/ITask";
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { ModeType } from "../interface/IOperand";
import { Core } from "../Core";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import Defaults from "../Defaults";
import * as _ from "underscore";

"use strict";

describe("Core", () => {

    function buildInstruction(): IInstruction {
        return {
            address: 1,
            modifier: ModifierType.F,
            opcode: OpcodeType.MOV,
            aOperand: {
                address: 0,
                mode: ModeType.Immediate
            },
            bOperand: {
                address: 0,
                mode: ModeType.Immediate
            }
        };
    }

    function buildTask(warriorId: number = 0): ITask {
        return {
            instructionPointer: 0,
            warrior: {
                id: warriorId,
                author: "",
                name: "",
                startAddress: 0,
                strategy: "",
                taskIndex: 0,
                tasks: []
            }
        };
    }

    it("Initialises core to the required size and provides accessor methods", () => {

        var i: number;
        var instruction: IInstruction;
        var core = new Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults.initialInstruction });

        for (i = 0; i < 4; i++) {

            instruction = core.readAt(buildTask(), i);
            instruction.aOperand.address = i;
            core.setAt(buildTask(), i, instruction);
        }

        for (i = 0; i < 4; i++) {

            instruction = core.readAt(buildTask(), i);
            expect(instruction.aOperand.address).to.be.equal(i);
        }
    });

    it("getAt/setAt wraps addresses using mod maths", () => {

        var i: number;
        var instruction: IInstruction;
        var core = new Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults.initialInstruction });

        for (i = 4; i < 8; i++) {

            instruction = core.readAt(buildTask(), i);
            instruction.aOperand.address = i;
            core.setAt(buildTask(), i, instruction);
        }

        for (i = 0; i < 4; i++) {

            instruction = core.readAt(buildTask(), i);
            expect(instruction.aOperand.address).to.be.equal(i + 4);
        }
    });

    it("getAt/setAt wraps negative addresses using mod maths", () => {

        var i: number;
        var instruction: IInstruction;
        var core = new Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults.initialInstruction });

        for (i = -4; i < 0; i++) {

            instruction = core.readAt(buildTask(), i);
            instruction.aOperand.address = i;
            core.setAt(buildTask(), i, instruction);
        }

        for (i = 0; i < 4; i++) {

            instruction = core.readAt(buildTask(), i);
            expect(instruction.aOperand.address).to.be.equal(i - 4);
        }
    });

    it(".wrap wraps addresses using mod maths", () => {

        var core = new Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults.initialInstruction });

        expect(core.wrap(0)).to.be.equal(0);
        expect(core.wrap(1)).to.be.equal(1);
        expect(core.wrap(2)).to.be.equal(2);
        expect(core.wrap(3)).to.be.equal(3);
        expect(core.wrap(4)).to.be.equal(0);
        expect(core.wrap(5)).to.be.equal(1);
        expect(core.wrap(6)).to.be.equal(2);
        expect(core.wrap(7)).to.be.equal(3);
    });

    it(".wrap wraps negative addresses using mod maths", () => {

        var core = new Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults.initialInstruction });

        expect(core.wrap(-4)).to.be.equal(0);
        expect(core.wrap(-3)).to.be.equal(1);
        expect(core.wrap(-2)).to.be.equal(2);
        expect(core.wrap(-1)).to.be.equal(3);
    });

    it("Initialises core using the specified default instruction", () => {

        var defaultInstruction = {
            address: 0,
            opcode: OpcodeType.DIV,
            modifier: ModifierType.BA,
            aOperand: {
                mode: ModeType.AIndirect,
                address: 5
            },
            bOperand: {
                mode: ModeType.BPostIncrement,
                address: -77
            }
        };

        var core = new Core();
        core.initialise({ coresize: 3, initialInstruction: defaultInstruction });

        for (var i = 0; i < 3; i++) {

            var instruction = core.readAt(buildTask(), i);

            expect(instruction.opcode).to.be.equal(OpcodeType.DIV);
            expect(instruction.modifier).to.be.equal(ModifierType.BA);
            expect(instruction.aOperand.mode).to.be.equal(ModeType.AIndirect);
            expect(instruction.aOperand.address).to.be.equal(5);
            expect(instruction.bOperand.mode).to.be.equal(ModeType.BPostIncrement);
            expect(instruction.bOperand.address).to.be.equal(-77);
        }
    });

    it("Assigns sequential address values to default core instructions", () => {

        var core = new Core();
        core.initialise({ coresize: 5, initialInstruction: Defaults.initialInstruction });

        for (var i = 0; i < 5; i++) {

            var instruction = core.readAt(buildTask(), i);

            expect(instruction.address).to.be.equal(i);
        }
    });

    it("Triggers a read core access event for the specified Task when getAt is called", () => {

        const pubsub = {
            publishSync: sinon.stub()
        }

        var task = buildTask(7);

        var core = new Core();
        core.setMessageProvider(pubsub);
        core.initialise(_.defaults({ coresize: 4 }, Defaults));

        core.readAt(task, 2);

        expect(pubsub.publishSync).to.have.been.calledWith('CORE_ACCESS', {
            warriorId: task.warrior.id,
            accessType: CoreAccessType.read,
            address: 2
        });
    });

    it("Triggers a write core access event for the specified Task when setAt is called", () => {

        const pubsub = {
            publishSync: sinon.stub()
        };

        var task = buildTask(5);

        var core = new Core();
        core.setMessageProvider(pubsub);
        core.initialise(_.defaults({ coresize: 4 }, Defaults));

        core.setAt(task, 2, buildInstruction());

        expect(pubsub.publishSync).to.have.been.calledWith('CORE_ACCESS', {
            warriorId: task.warrior.id,
            accessType: CoreAccessType.write,
            address: 2
        });
    });

    it("Triggers an execute core access event for the specified Task when executeAt is called", () => {

        const pubsub = {
            publishSync: sinon.stub()
        }

        var task = buildTask(3);

        var core = new Core();
        core.setMessageProvider(pubsub);
        core.initialise(_.defaults({ coresize: 4 }, Defaults));

        core.executeAt(task, 2);

        expect(pubsub.publishSync).to.have.been.calledWith('CORE_ACCESS', {
            warriorId: task.warrior.id,
            accessType: CoreAccessType.execute,
            address: 2
        });
    });

    it(".getSize returns the size of the core", () => {

        var core = new Core();
        core.initialise(_.defaults({ coresize: 23 }, Defaults));

        var actual = core.getSize();

        expect(actual).to.be.equal(23);
    });
});