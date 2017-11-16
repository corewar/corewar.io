"use strict";
/// <reference path="references.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const LiteEvent_1 = require("../../modules/LiteEvent");
const Simulator_1 = require("../Simulator");
const Defaults_1 = require("../Defaults");
const IInstruction_1 = require("../interface/IInstruction");
const IOperand_1 = require("../interface/IOperand");
const _ = require("underscore");
"use strict";
describe("Simulator", () => {
    var simulator;
    var core;
    var loader;
    var fetcher;
    var decoder;
    var executive;
    var endCondition;
    var commandSpy;
    beforeEach(() => {
        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent_1.LiteEvent(),
            executeAt: jasmine.createSpy("ICore.executeAt() Spy"),
            readAt: jasmine.createSpy("ICore.readAt() Spy"),
            getAt: jasmine.createSpy("ICore.getAt() Spy"),
            setAt: jasmine.createSpy("ICore.setAt() Spy"),
            wrap: jasmine.createSpy("ICore.wrap() Spy"),
            initialise: jasmine.createSpy("ICore.initialise() Spy")
        };
        loader = {
            load: jasmine.createSpy("ILoader.load() Spy")
        };
        fetcher = {
            fetch: jasmine.createSpy("IFetcher.fetch() Spy")
        };
        fetcher.fetch.and.returnValue({});
        decoder = {
            decode: jasmine.createSpy("IDecoder.decode() Spy")
        };
        commandSpy = jasmine.createSpy("Command Spy");
        decoder.decode.and.returnValue({
            command: commandSpy
        });
        executive = {
            initialise: () => {
                //
            },
            commandTable: []
        };
        endCondition = {
            check: jasmine.createSpy("IEndCondition.check() Spy")
        };
        simulator = new Simulator_1.Simulator(core, loader, fetcher, decoder, executive, endCondition);
    });
    it("first fetches then decodes and finally executes", () => {
        var fetchCalled = false;
        var decodeCalled = false;
        var executeCalled = false;
        fetcher.fetch.and.callFake(() => {
            expect(fetchCalled).not.toBe(true);
            expect(decodeCalled).not.toBe(true);
            expect(executeCalled).not.toBe(true);
            fetchCalled = true;
        });
        decoder.decode.and.callFake(() => {
            expect(fetchCalled).toBe(true);
            expect(decodeCalled).not.toBe(true);
            expect(executeCalled).not.toBe(true);
            decodeCalled = true;
            return {
                command: commandSpy
            };
        });
        commandSpy.and.callFake(() => {
            expect(fetchCalled).toBe(true);
            expect(decodeCalled).toBe(true);
            expect(executeCalled).not.toBe(true);
            executeCalled = true;
        });
        simulator.step();
        expect(fetchCalled).toBe(true);
        expect(decodeCalled).toBe(true);
        expect(executeCalled).toBe(true);
    });
    it("returns true if the end condition check returns true", () => {
        endCondition.check.and.returnValue(true);
        var actual = simulator.step();
        expect(actual).toBe(true);
    });
    it("returns false if the end condition check returns false", () => {
        endCondition.check.and.returnValue(false);
        var actual = simulator.step();
        expect(actual).toBe(false);
    });
    it("increments the cycle number", () => {
        var checkSpy = endCondition.check;
        var state;
        simulator.step();
        state = _(checkSpy.calls.mostRecent().args).first();
        expect(state.cycle).toBe(1);
        simulator.step();
        state = _(checkSpy.calls.mostRecent().args).first();
        expect(state.cycle).toBe(2);
        simulator.step();
        state = _(checkSpy.calls.mostRecent().args).first();
        expect(state.cycle).toBe(3);
    });
    it("passes the context retrieved from fetch to decode", () => {
        var fetchContext = {};
        fetcher.fetch.and.returnValue(fetchContext);
        simulator.step();
        expect(decoder.decode).toHaveBeenCalledWith(fetchContext);
    });
    it("passes the context retrieved from decode to execute", () => {
        var decodeContext = { command: commandSpy };
        decoder.decode.and.returnValue(decodeContext);
        simulator.step();
        expect(commandSpy).toHaveBeenCalledWith(decodeContext);
    });
    it("sets state options to value passed to initialise", () => {
        var expected = {
            coresize: 100,
            cyclesBeforeTie: 100,
            initialInstruction: {
                address: 100,
                aOperand: {
                    address: 100,
                    mode: IOperand_1.ModeType.AIndirect
                },
                bOperand: {
                    address: 100,
                    mode: IOperand_1.ModeType.AIndirect
                },
                modifier: IInstruction_1.ModifierType.A,
                opcode: IInstruction_1.OpcodeType.ADD
            },
            instructionLimit: 100,
            maxTasks: 100,
            minSeparation: 100
        };
        simulator.initialise(expected, []);
        simulator.step();
        var actual = _(endCondition.check.calls.mostRecent().args).first();
        expect(actual.options).toEqual(expected);
    });
    it("uses default options if none supplied to initialise", () => {
        simulator.initialise({ coresize: 123 }, []);
        simulator.step();
        var actual = _(endCondition.check.calls.mostRecent().args).first();
        expect(actual.options).toEqual(_.defaults({ coresize: 123 }, Defaults_1.default));
    });
    it("initialises core using the supplied options", () => {
        simulator.initialise(Defaults_1.default, []);
        expect(core.initialise).toHaveBeenCalledWith(Defaults_1.default);
    });
    it("stores warriors returned from the loader in the state passed to the fetch method", () => {
        var warriors = [];
        var loadedWarriors = [];
        loader.load.and.returnValue(loadedWarriors);
        simulator.initialise(Defaults_1.default, warriors);
        simulator.step();
        expect(loader.load).toHaveBeenCalledWith(warriors, Defaults_1.default);
        var state = _(fetcher.fetch.calls.mostRecent().args).first();
        expect(state.warriors).toBe(loadedWarriors);
    });
});
