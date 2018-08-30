import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { Warrior } from "../Warrior";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { ITask } from "../interface/ITask";
import { IOptions } from "../interface/IOptions";
import { IState } from "../interface/IState";
import { Simulator } from "../Simulator";
import { IExecutive } from "../interface/IExecutive";
import { ILoader } from "../interface/ILoader";
import { IFetcher } from "../interface/IFetcher";
import { IDecoder } from "../interface/IDecoder";
import { IEndCondition } from "../interface/IEndCondition";
import Defaults from "../Defaults";
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { ModeType } from "../interface/IOperand";
import TestHelper from "./TestHelper";
import { IOptionValidator } from "../interface/IOptionValidator";
import { MessageType } from "../interface/IMessage";
import { IPublisher } from "../interface/IPublisher";
import * as clone from "clone";
import { lchmod } from "fs";
import { IExecutionContext } from "../interface/IExecutionContext";

describe("Simulator", () => {

    var simulator: Simulator;

    var core: ICore;
    var loader: ILoader;
    var fetcher: IFetcher;
    var decoder: IDecoder;
    var executive: IExecutive;
    var endCondition: IEndCondition;
    var optionValidator: IOptionValidator;
    var publisher: IPublisher;

    var context: IExecutionContext;

    var commandSpy: sinon.stub;

    beforeEach(() => {

        core = {
            getSize: () => { return 0; },
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

        (<sinon.stub>fetcher.fetch).returns(context);

        decoder = {
            decode: sinon.stub()
        };

        commandSpy = sinon.stub();
        (<sinon.stub>decoder.decode).returns({
            command: commandSpy
        });

        executive = {
            initialise: () => {
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

        var decodeCalled = false;
        var executeCalled = false;

        (<sinon.stub>decoder.decode).callsFake(() => {
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

        (<sinon.stub>endCondition.check).returns(expected);

        const actual = simulator.step();

        expect(actual).to.be.equal(expected);
    });

    it("step returns null if the end condition check returns null", () => {

        (<sinon.stub>endCondition.check).returns(null);

        var actual = simulator.step();

        expect(actual).to.be.equal(null);
    });

    it("step increments the cycle number", () => {

        var checkSpy = <sinon.stub>endCondition.check;
        var state: IState;

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

        expect(<sinon.stub>decoder.decode).to.have.been.calledWith(context);
    });

    it("step passes the context retrieved from decode to execute", () => {

        var decodeContext = { command: commandSpy };

        (<sinon.stub>decoder.decode).returns(decodeContext);

        simulator.step();

        expect(commandSpy).to.have.been.calledWith(decodeContext);
    });

    it("sets state options to value passed to initialise", () => {

        var expected: IOptions = {
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

        var actual: IState = (<sinon.stub>endCondition.check).lastCall.args[0];

        expect(actual.options).to.deep.equal(expected);
    });

    it("uses default options if none supplied to initialise", () => {

        simulator.initialise({ coresize: 123 }, []);
        simulator.step();

        var actual: IState = (<sinon.stub>endCondition.check).lastCall.args[0];

        expect(actual.options).to.deep.equal(Object.assign({}, Defaults, { coresize: 123 }));
    });

    it("initialises core using the supplied options", () => {

        simulator.initialise(Defaults, []);

        expect(core.initialise).to.have.been.calledWith(Defaults);
    });

    it("stores warriors returned from the loader in the state passed to the fetch method", () => {

        var warriors = [];
        var loadedWarriors = [];

        (<sinon.stub>loader.load).returns(loadedWarriors);

        simulator.initialise(Defaults, warriors);
        simulator.step();

        expect(loader.load).to.have.been.calledWith(warriors, Defaults);

        var state = (<sinon.stub>fetcher.fetch).lastCall.args[0];

        expect(state.warriors).to.be.equal(loadedWarriors);
    });

    it("Validates options provided during initialisation and raises any errors", () => {

        const options = {
            coresize: 123
        };

        const expectedOptions = Object.assign({}, Defaults, options);

        const expectedError = Error("Test");
        let actualError = null;

        (<sinon.stub>optionValidator.validate).callsFake((options: IOptions) => {
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

        (<sinon.stub>endCondition.check).returns(true);

        var actual = simulator.step();

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
            payload: sinon.any
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

        (<sinon.stub>fetcher.getNextExecution).returns(expected);

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

        const stub = <sinon.stub>endCondition.check;
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

        const stub = <sinon.stub>endCondition.check;
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

        var checkSpy = <sinon.stub>endCondition.check;
        const state = checkSpy.lastCall.args[0];

        expect(state.cycle).to.be.equal(3);
    });

    it("step should step once if a negative step number is requested", () => {

        const options = clone(Defaults);

        simulator.initialise(options, []);

        simulator.step(-5);

        var checkSpy = <sinon.stub>endCondition.check;
        const state = checkSpy.lastCall.args[0];

        expect(state.cycle).to.be.equal(1);
    });

    it("should raise the next execution message with the next task's instruction pointer value", () => {

        const expectedAddress = 56;
        const expectedId = 3;

        const options = clone(Defaults);

        simulator.initialise(options, []);

        var getNextExecutionStub = <sinon.stub>fetcher.getNextExecution;
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