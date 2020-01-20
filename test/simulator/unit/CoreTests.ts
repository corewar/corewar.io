import * as chai from "chai";
import * as sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import { IInstruction } from "@simulator/interface/IInstruction";
import { ITask } from "@simulator/interface/ITask";
import { OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";
import { Core } from "@simulator/Core";
import { CoreAccessType } from "@simulator/interface/ICore";
import Defaults from "@simulator/Defaults";
import { MessageType } from "@simulator/interface/IMessage";
import { IPublisher } from "@simulator/interface/IPublisher";
import TestHelper from "@simulator/tests/unit/TestHelper";

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

    /* eslint-disable-next-line */
    function buildTask(warriorId = 0, data: any = null): ITask {
        return {
            instructionPointer: 0,
            warrior: {
                id: warriorId,
                data: data,
                author: "",
                name: "",
                startAddress: 0,
                strategy: "",
                taskIndex: 0,
                tasks: []
            }
        };
    }

    let publisher: IPublisher;

    beforeEach(() => {

        publisher = TestHelper.buildPublisher();
    });

    it("Initialises core to the required size and provides accessor methods", () => {

        let i: number;
        let instruction: IInstruction;
        const core = new Core(publisher);
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

        let i: number;
        let instruction: IInstruction;
        const core = new Core(publisher);
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

        let i: number;
        let instruction: IInstruction;
        const core = new Core(publisher);
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

        const core = new Core(publisher);
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

        const core = new Core(publisher);
        core.initialise({ coresize: 4, initialInstruction: Defaults.initialInstruction });

        expect(core.wrap(-4)).to.be.equal(0);
        expect(core.wrap(-3)).to.be.equal(1);
        expect(core.wrap(-2)).to.be.equal(2);
        expect(core.wrap(-1)).to.be.equal(3);
    });

    it("Initialises core using the specified default instruction", () => {

        const defaultInstruction = {
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

        const core = new Core(publisher);
        core.initialise({ coresize: 3, initialInstruction: defaultInstruction });

        for (let i = 0; i < 3; i++) {

            const instruction = core.readAt(buildTask(), i);

            expect(instruction.opcode).to.be.equal(OpcodeType.DIV);
            expect(instruction.modifier).to.be.equal(ModifierType.BA);
            expect(instruction.aOperand.mode).to.be.equal(ModeType.AIndirect);
            expect(instruction.aOperand.address).to.be.equal(5);
            expect(instruction.bOperand.mode).to.be.equal(ModeType.BPostIncrement);
            expect(instruction.bOperand.address).to.be.equal(-77);
        }
    });

    it("Assigns sequential address values to default core instructions", () => {

        const core = new Core(publisher);
        core.initialise({ coresize: 5, initialInstruction: Defaults.initialInstruction });

        for (let i = 0; i < 5; i++) {

            const instruction = core.readAt(buildTask(), i);

            expect(instruction.address).to.be.equal(i);
        }
    });

    it("Triggers a read core access event for the specified Task when getAt is called", () => {

        const task = buildTask(7);

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 4 }));

        core.readAt(task, 2);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.CoreAccess,
            payload: {
                warriorId: task.warrior.id,
                accessType: CoreAccessType.read,
                address: 2
            }
        });
    });

    it("Triggers a write core access event for the specified Task when setAt is called", () => {

        const task = buildTask(5);

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 4 }));

        core.setAt(task, 2, buildInstruction());

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.CoreAccess,
            payload: {
                warriorId: task.warrior.id,
                accessType: CoreAccessType.write,
                address: 2
            }
        });
    });

    it("Triggers an execute core access event for the specified Task when executeAt is called", () => {

        const task = buildTask(3);

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 4 }));
        
        const addInstruction = Object.assign({}, Defaults.initialInstruction, {
            address: 2,
            opcode: OpcodeType.ADD 
        });
        core.setAt(task, 2, addInstruction);

        core.executeAt(task, 2);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.CoreAccess,
            payload: {
                warriorId: task.warrior.id,
                accessType: CoreAccessType.execute,
                address: 2
            }
        });
    });

    it("does not trigger an execute core access event for a dat instruction", () => {

        const task = buildTask(3);

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 4 }));

        core.executeAt(task, 2);

        expect(publisher.queue).not.to.have.been.called;
    });

    it("includes warrior data if provided when triggering a core access event", () => {

        const expected = {
            foo: "foo",
            bar: (x: number): number => {
                x = x + 1;
                return x;
            }
        };

        const task = buildTask(5, expected);

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 4 }));

        core.setAt(task, 2, buildInstruction());

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.CoreAccess,
            payload: {
                warriorId: task.warrior.id,
                warriorData: expected,
                accessType: CoreAccessType.write,
                address: 2
            }
        });
    });

    it(".getSize returns the size of the core", () => {

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 23 }));

        const actual = core.getSize();

        expect(actual).to.be.equal(23);
    });

    it(".getWithInfoAt returns instruction at specified address", () => {

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 5 }));

        const expected = buildInstruction();

        core.setAt(buildTask(), 0, expected);

        const actual = core.getWithInfoAt(0);

        expect(actual.instruction).to.be.deep.equal(expected);
    });

    it(".getWithInfoAt returns most recent core access event args", () => {

        const core = new Core(publisher);
        core.initialise(Object.assign({}, Defaults, { coresize: 5 }));

        const task = buildTask(7);

        const expected = {

            warriorId: task.warrior.id,
            accessType: CoreAccessType.write,
            address: 2
        };

        core.setAt(task, 2, buildInstruction());

        const actual = core.getWithInfoAt(2);

        expect(actual.access).to.be.deep.equal(expected);
    });
});