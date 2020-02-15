import { expect } from "chai";
import * as sinon from "sinon";
import { Simulator } from "@simulator/Simulator";
import { Core } from "@simulator/Core";
import { Fetcher } from "@simulator/Fetcher";
import { Decoder } from "@simulator/Decoder";
import { Executive } from "@simulator/Executive";
import { ILoader } from "@simulator/interface/ILoader";
import { IEndCondition } from "@simulator/interface/IEndCondition";
import { IOptionValidator } from "@simulator/interface/IOptionValidator";
import { ICore } from "@simulator/interface/ICore";
import { IFetcher } from "@simulator/interface/IFetcher";
import { IExecutive } from "@simulator/interface/IExecutive";
import { IDecoder } from "@simulator/interface/IDecoder";
import { ISimulator } from "@simulator/interface/ISimulator";
import { IPublisher } from "@simulator/interface/IPublisher";
import TestHelper from "@simulator/tests/unit/TestHelper";
import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";
import { OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";
import { ITask } from "@simulator/interface/ITask";

describe("Simulator Regression Tests", () => {

    let publisher: IPublisher;
    let loader: ILoader;
    let endCondition: IEndCondition;
    let optionValidator: IOptionValidator;

    let core: ICore;
    let fetcher: IFetcher;
    let executive: IExecutive;
    let decoder: IDecoder;
    let simulator: ISimulator;

    let warrior: IWarriorInstance;
    let task: ITask;

    beforeEach(() => {

        publisher = TestHelper.getPublisher();
        loader = TestHelper.getLoader();
        endCondition = TestHelper.getEndCondition();
        optionValidator = TestHelper.getOptionValidator();

        core = new Core(publisher);
        fetcher = new Fetcher();
        executive = new Executive(publisher);
        decoder = new Decoder(executive);
        simulator = new Simulator(core, loader, fetcher, decoder, executive, endCondition, optionValidator, publisher);

        warrior = TestHelper.buildWarriorInstance();
        task = TestHelper.buildTask();
        task.instance = warrior;
        warrior.tasks.push(task);
        (loader.load as sinon.SinonStub).returns([warrior]);

        simulator.initialise({}, []);
    });

    it("correctly processes add.a with a field predecrement indirect addressing", () => {

        task.instructionPointer = 1;

        //DAT.F $5, $0
        //ADD.A {0, $0
        const instructions = [
            TestHelper.buildInstruction(0, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 5, ModeType.Direct, 0),
            TestHelper.buildInstruction(1, OpcodeType.ADD, ModifierType.A, ModeType.APreDecrement, 0, ModeType.Immediate, 0)
        ];

        instructions.forEach((instruction, index) => {
            core.setAt(warrior.tasks[0], index, instruction);
        });

        simulator.step();

        const actual = core.getAt(1);

        expect(actual.aOperand.address).to.be.equal(5);        
    });
});