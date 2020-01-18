import { expect } from "chai";
import * as sinon from "sinon";
import { Simulator } from "../Simulator";
import { Core } from "../Core";
import { Fetcher } from "../Fetcher";
import { Decoder } from "../Decoder";
import { Executive } from "../Executive";
import { ILoader } from "../interface/ILoader";
import { IEndCondition } from "../interface/IEndCondition";
import { IOptionValidator } from "../interface/IOptionValidator";
import { ICore } from "../interface/ICore";
import { IFetcher } from "../interface/IFetcher";
import { IExecutive } from "../interface/IExecutive";
import { IDecoder } from "../interface/IDecoder";
import { ISimulator } from "../interface/ISimulator";
import { IPublisher } from "../interface/IPublisher";
import TestHelper from "../tests/TestHelper";
import { IWarrior } from "../interface/IWarrior";
import { IInstruction, OpcodeType, ModifierType } from "../interface/IInstruction";
import { ModeType } from "../interface/IOperand";
import { ITask } from "../interface/ITask";

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

    let warrior: IWarrior;
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

        warrior = TestHelper.buildWarrior();
        task = TestHelper.buildTask();
        task.warrior = warrior;
        warrior.tasks.push(task);
        (<sinon.SinonStub>loader.load).returns([warrior]);

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