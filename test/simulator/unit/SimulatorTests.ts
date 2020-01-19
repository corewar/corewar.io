import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import { Warrior } from "@simulator/Warrior";
import { ICore } from "@simulator/interface/ICore";
import { IOptions } from "@simulator/interface/IOptions";
import { IState } from "@simulator/interface/IState";
import { Simulator } from "@simulator/Simulator";
import { IExecutive } from "@simulator/interface/IExecutive";
import { ILoader } from "@simulator/interface/ILoader";
import { IFetcher } from "@simulator/interface/IFetcher";
import { IDecoder } from "@simulator/interface/IDecoder";
import { IEndCondition } from "@simulator/interface/IEndCondition";
import Defaults from "@simulator/Defaults";
import { OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";
import TestHelper from "@simulator/tests/unit/TestHelper";
import { IOptionValidator } from "@simulator/interface/IOptionValidator";
import { MessageType } from "@simulator/interface/IMessage";
import { IPublisher } from "@simulator/interface/IPublisher";
import * as clone from "clone";
import { IExecutionContext } from "@simulator/interface/IExecutionContext";

describe("Simulator", () => {

    let simulator: Simulator;

    let core: ICore;
    let loader: ILoader;
    let fetcher: IFetcher;
    let decoder: IDecoder;
    let executive: IExecutive;
    let endCondition: IEndCondition;
    let optionValidator: IOptionValidator;
    let publisher: IPublisher;

    let context: IExecutionContext;

    let commandSpy: sinon.SinonStub;

    beforeEach(() => {

        core = {
            getSize: (): number => { return 0; },
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            getWithInfoAt: sinon.stub(),
            setAt: sinon.stub(),
            wrap: sinon.stub(),
            initialise: sinon.stub()
        };

        loader = {
            load: sinon.stub()
        };

        fetcher = {
            getNextExecution: sinon.stub(),
            fetch: sinon.stub()
        };

        context = {
            warrior: new Warrior(),
            task: {
                warrior: new Warrior(),
                instructionPointer: 0
            },
            operands: []
        };

        (fetcher.fetch as sinon.SinonStub).returns(context);

        decoder = {
            decode: sinon.stub()
        };

        commandSpy = sinon.stub();
        (decoder.decode as sinon.SinonStub).returns({
            command: commandSpy
        });

        executive = {
            initialise: (): void => {
                //
            },
            commandTable: []
        };

        endCondition = {
            check: sinon.stub()
        };

        optionValidator = {
            validate: sinon.stub()
        };

        publisher = TestHelper.buildPublisher();

        simulator = new Simulator(
            core,
            loader,
            fetcher,
            decoder,
            executive,
            endCondition,
            optionValidator,
            publisher);
    });

    it("step first fetches then decodes and finally executes", () => {

        let decodeCalled = false;
        let executeCalled = false;

        (decoder.decode as sinon.SinonStub).callsFake(() => {
            expect(decodeCalled).not.to.be.equal(true);
            expect(executeCalled).not.to.be.equal(true);

            decodeCalled = true;

            return {
                command: commandSpy
            };
        });

        commandSpy.callsFake(() => {
            expect(decodeCalled).to.be.equal(true);
            expect(executeCalled).not.to.be.equal(true);

            executeCalled = true;
        });

        simulator.step();

        expect(decodeCalled).to.be.equal(true);
        expect(executeCalled).to.be.equal(true);
    });

    it("step returns round result if the end condition check returns one", () => {

        const expected = {};

        (endCondition.check as sinon.SinonStub).returns(expected);

        const actual = simulator.step();

        expect(actual).to.be.equal(expected);
    });

    it("step returns null if the end condition check returns null", () => {

        (endCondition.check as sinon.SinonStub).returns(null);

        const actual = simulator.step();

        expect(actual).to.be.equal(null);
    });

    it("step increments the cycle number", () => {

        const checkSpy = endCondition.check as sinon.SinonStub;
        let state: IState;

        simulator.step();

        state = checkSpy.lastCall.args[0];
        expect(state.cycle).to.be.equal(1);

        simulator.step();

        state = checkSpy.lastCall.args[0];
        expect(state.cycle).to.be.equal(2);

        simulator.step();

        state = checkSpy.lastCall.args[0];
        expect(state.cycle).to.be.equal(3);
    });

    it("step passes the context retrieved from fetch to decode", () => {

        simulator.step();

        expect(decoder.decode as sinon.SinonStub).to.have.been.calledWith(context);
    });

    it("step passes the context retrieved from decode to execute", () => {

        const decodeContext = { command: commandSpy };

        (decoder.decode as sinon.SinonStub).returns(decodeContext);

        simulator.step();

        expect(commandSpy).to.have.been.calledWith(decodeContext);
    });

    it("sets state options to value passed to initialise", () => {

        const expected: IOptions = {
            coresize: 100,
            maximumCycles: 100,
            initialInstruction: {
                address: 100,
                aOperand: {
                    address: 100,
                    mode: ModeType.AIndirect
                },
                bOperand: {
                    address: 100,
                    mode: ModeType.AIndirect
                },
                modifier: ModifierType.A,
                opcode: OpcodeType.ADD
            },
            instructionLimit: 100,
            maxTasks: 100,
            minSeparation: 100
        };

        simulator.initialise(expected, []);
        simulator.step();

        const actual: IState = (endCondition.check as sinon.SinonStub).lastCall.args[0];

        expect(actual.options).to.deep.equal(expected);
    });

    it("uses default options if none supplied to initialise", () => {

        simulator.initialise({ coresize: 123 }, []);
        simulator.step();

        const actual: IState = (endCondition.check as sinon.SinonStub).lastCall.args[0];

        expect(actual.options).to.deep.equal(Object.assign({}, Defaults, { coresize: 123 }));
    });

    it("initialises core using the supplied options", () => {

        simulator.initialise(Defaults, []);

        expect(core.initialise).to.have.been.calledWith(Defaults);
    });

    it("stores warriors returned from the loader in the state passed to the fetch method", () => {

        const warriors = [];
        const loadedWarriors = [];

        (loader.load as sinon.SinonStub).returns(loadedWarriors);

        simulator.initialise(Defaults, warriors);
        simulator.step();

        expect(loader.load).to.have.been.calledWith(warriors, Defaults);

        const state = (fetcher.fetch as sinon.SinonStub).lastCall.args[0];

        expect(state.warriors).to.be.equal(loadedWarriors);
    });

    it("Validates options provided during initialisation and raises any errors", () => {

        const options = {
            coresize: 123
        };

        const expectedOptions = Object.assign({}, Defaults, options);

        const expectedError = Error("Test");
        let actualError = null;

        (optionValidator.validate as sinon.SinonStub).callsFake((_: IOptions) => {
            throw expectedError;
        });

        try {
            simulator.initialise(options, []);
        } catch (e) {
            actualError = e;
        }

        expect(optionValidator.validate).to.have.been.calledWith(expectedOptions);
        expect(actualError).to.be.equal(expectedError);
    });

    it("Returns a clone of state rather than the original", () => {

        const mutated = simulator.getState();

        mutated.cycle = 123;
        mutated.warriorIndex = 876;
        mutated.warriors.push(new Warrior());
        mutated.warriors[0].tasks.push({
            warrior: mutated.warriors[0],
            instructionPointer: 666
        });

        const actual = simulator.getState();

        expect(actual.cycle).not.to.be.equal(mutated.cycle);
        expect(actual.warriorIndex).not.to.be.equal(mutated.warriorIndex);
        expect(actual.warriors.length).to.be.equal(0);
    });

    it("Should not execute step if end condition met", () => {

        (endCondition.check as sinon.SinonStub).returns(true);

        simulator.step();

        expect(fetcher.fetch).not.to.be.called;
    });

    it("step should publish round start message if cycle is zero", () => {

        simulator.step();

        expect(publisher.queue).to.be.calledWith({
            type: MessageType.RoundStart,
            payload: {}
        });
    });

    it("step should not publish round start message if cycle is not zero", () => {

        simulator.step();

        publisher.queue = sinon.stub();

        simulator.step();

        expect(publisher.queue).not.to.be.calledWith({
            type: MessageType.CoreInitialise,
            payload: sinon.match(() => true)
        });
    });

    it("should publish initialise message when initialised", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.CoreInitialise,
            payload: {
                state: simulator.getState()
            }
        });
    });

    it("should publish next execution message when initialised", () => {

        const options = clone(Defaults);

        const expected = {};

        (fetcher.getNextExecution as sinon.SinonStub).returns(expected);

        simulator.initialise(options, []);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.NextExecution,
            payload: expected
        });
    });

    it("should repeatedly call step until end condition met when run called", () => {

        const preCheck = 1;

        const options = clone(Defaults);

        simulator.initialise(options, []);

        const stub = endCondition.check as sinon.SinonStub;
        stub.onCall(0).returns(false);
        stub.onCall(1).returns(false);
        stub.onCall(2).returns(false);
        stub.onCall(3).returns(true);

        simulator.run();

        expect(fetcher.fetch).to.have.callCount(4 - preCheck);
    });

    it("should trigger publisher publish after run completes", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        publisher.publish = sinon.stub();

        const stub = endCondition.check as sinon.SinonStub;
        stub.onCall(2).returns(true);

        simulator.run();

        expect(publisher.publish).to.have.been.called;
    });

    it("should trigger publisher publish when initialisation completes", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        expect(publisher.publish).to.have.been.called;
    });

    it("should trigger publisher publish when step completes", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        publisher.publish = sinon.stub();

        simulator.step();

        expect(publisher.publish).to.have.been.called;
    });

    it("step should step the specified number of times", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        simulator.step(3);

        const checkSpy = endCondition.check as sinon.SinonStub;
        const state = checkSpy.lastCall.args[0];

        expect(state.cycle).to.be.equal(3);
    });

    it("step should step once if a negative step number is requested", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        simulator.step(-5);

        const checkSpy = endCondition.check as sinon.SinonStub;
        const state = checkSpy.lastCall.args[0];

        expect(state.cycle).to.be.equal(1);
    });

    it("should raise the next execution message with the next task's instruction pointer value", () => {

        const expectedAddress = 56;
        const expectedId = 3;

        const options = clone(Defaults);

        simulator.initialise(options, []);

        const getNextExecutionStub = fetcher.getNextExecution as sinon.SinonStub;
        getNextExecutionStub.returns({
            warriorId: expectedId,
            address: expectedAddress
        });

        simulator.step();

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.NextExecution,
            payload: {
                warriorId: expectedId,
                address: expectedAddress
            }
        });
    });

    it("clears Publisher on initialise", () => {

        simulator.initialise(clone(Defaults), []);

        expect(publisher.clear).to.have.been.called;
    })
});