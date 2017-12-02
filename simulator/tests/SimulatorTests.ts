import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { ILiteEvent, LiteEvent } from "../../modules/LiteEvent";
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
import DataHelper from "./DataHelper";
import * as _ from "underscore";
import { IOptionValidator } from "../interface/IOptionValidator";

"use strict";

describe("Simulator", () => {

    var simulator: Simulator;

    var core: ICore;
    var loader: ILoader;
    var fetcher: IFetcher;
    var decoder: IDecoder;
    var executive: IExecutive;
    var endCondition: IEndCondition;
    var optionValidator: IOptionValidator;

    var commandSpy: sinon.stub;

    beforeEach(() => {

        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            setAt: sinon.stub(),
            wrap: sinon.stub(),
            initialise: sinon.stub()
        };

        loader = {
            load: sinon.stub()
        };

        fetcher = {
            fetch: sinon.stub()
        };

        (<sinon.stub>fetcher.fetch).returns({});

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

        simulator = new Simulator(
            core,
            loader,
            fetcher,
            decoder,
            executive,
            endCondition,
            optionValidator);
    });

    it("first fetches then decodes and finally executes", () => {

        var fetchCalled = false;
        var decodeCalled = false;
        var executeCalled = false;

        (<sinon.stub>fetcher.fetch).callsFake(() => {
            expect(fetchCalled).not.to.be.equal(true);
            expect(decodeCalled).not.to.be.equal(true);
            expect(executeCalled).not.to.be.equal(true);

            fetchCalled = true;
        });

        (<sinon.stub>decoder.decode).callsFake(() => {
            expect(fetchCalled).to.be.equal(true);
            expect(decodeCalled).not.to.be.equal(true);
            expect(executeCalled).not.to.be.equal(true);

            decodeCalled = true;

            return {
                command: commandSpy
            };
        });

        commandSpy.callsFake(() => {
            expect(fetchCalled).to.be.equal(true);
            expect(decodeCalled).to.be.equal(true);
            expect(executeCalled).not.to.be.equal(true);

            executeCalled = true;
        });

        simulator.step();

        expect(fetchCalled).to.be.equal(true);
        expect(decodeCalled).to.be.equal(true);
        expect(executeCalled).to.be.equal(true);
    });

    it("returns true if the end condition check returns true", () => {

        (<sinon.stub>endCondition.check).returns(true);

        var actual = simulator.step();

        expect(actual).to.be.equal(true);
    });

    it("returns false if the end condition check returns false", () => {

        (<sinon.stub>endCondition.check).returns(false);

        var actual = simulator.step();

        expect(actual).to.be.equal(false);
    });

    it("increments the cycle number", () => {

        var checkSpy = <sinon.stub>endCondition.check;
        var state: IState;

        simulator.step();

        state = _(checkSpy.lastCall.args).first();
        expect(state.cycle).to.be.equal(1);

        simulator.step();

        state = _(checkSpy.lastCall.args).first();
        expect(state.cycle).to.be.equal(2);

        simulator.step();

        state = _(checkSpy.lastCall.args).first();
        expect(state.cycle).to.be.equal(3);
    });

    it("passes the context retrieved from fetch to decode", () => {

        var fetchContext = {};

        (<sinon.stub>fetcher.fetch).returns(fetchContext);

        simulator.step();

        expect(<sinon.stub>decoder.decode).to.have.been.calledWith(fetchContext);
    });

    it("passes the context retrieved from decode to execute", () => {

        var decodeContext = { command: commandSpy };

        (<sinon.stub>decoder.decode).returns(decodeContext);

        simulator.step();

        expect(commandSpy).to.have.been.calledWith(decodeContext);
    });

    it("sets state options to value passed to initialise", () => {

        var expected: IOptions = {
            coresize: 100,
            cyclesBeforeTie: 100,
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

        var actual: IState = _((<sinon.stub>endCondition.check).lastCall.args).first();

        expect(actual.options).to.deep.equal(expected);
    });

    it("uses default options if none supplied to initialise", () => {

        simulator.initialise({ coresize: 123 }, []);
        simulator.step();

        var actual: IState = _((<sinon.stub>endCondition.check).lastCall.args).first();

        expect(actual.options).to.deep.equal(_.defaults({ coresize: 123 }, Defaults));
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

        var state = _((<sinon.stub>fetcher.fetch).lastCall.args).first();

        expect(state.warriors).to.be.equal(loadedWarriors);
    });

    it("Validates options provided during initialisation and raises any errors", () => {

        const options = {};

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

        expect(optionValidator.validate).to.have.been.calledWith(options);
        expect(actualError).to.be.equal(expectedError);
    });
});