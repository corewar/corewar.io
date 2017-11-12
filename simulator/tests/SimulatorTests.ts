/// <reference path="references.ts" />

import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../Interface/ICore";
import { ILiteEvent, LiteEvent } from "../../modules/LiteEvent";
import { ITask } from "../Interface/ITask";
import { IOptions } from "../Interface/IOptions";
import { IState } from "../Interface/IState";
import { Simulator } from "../Simulator";
import { IExecutive } from "../Interface/IExecutive";
import { ILoader } from "../Interface/ILoader";
import { IFetcher } from "../Interface/IFetcher";
import { IDecoder } from "../Interface/IDecoder";
import { IEndCondition } from "../Interface/IEndCondition";
import Defaults from "../Defaults";
import { OpcodeType, ModifierType } from "../Interface/IInstruction";
import { ModeType } from "../Interface/IOperand";
import DataHelper from "./DataHelper";
import * as _ from "underscore";

"use strict";

describe("Simulator",() => {

    var simulator: Simulator;

    var core: ICore;
    var loader: ILoader;
    var fetcher: IFetcher;
    var decoder: IDecoder;
    var executive: IExecutive;
    var endCondition: IEndCondition;

    var commandSpy: jasmine.Spy;

    beforeEach(() => {

        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
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

        (<jasmine.Spy>fetcher.fetch).and.returnValue({});

        decoder = {
            decode: jasmine.createSpy("IDecoder.decode() Spy")
        };

        commandSpy = jasmine.createSpy("Command Spy");
        (<jasmine.Spy>decoder.decode).and.returnValue({
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

        simulator = new Simulator(
            core,
            loader,
            fetcher,
            decoder,
            executive,
            endCondition);
    });

    it("first fetches then decodes and finally executes",() => {

        var fetchCalled = false;
        var decodeCalled = false;
        var executeCalled = false;

        (<jasmine.Spy>fetcher.fetch).and.callFake(() => {
            expect(fetchCalled).not.toBe(true);
            expect(decodeCalled).not.toBe(true);
            expect(executeCalled).not.toBe(true);

            fetchCalled = true;
        });

        (<jasmine.Spy>decoder.decode).and.callFake(() => {
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

    it("returns true if the end condition check returns true",() => {

        (<jasmine.Spy>endCondition.check).and.returnValue(true);

        var actual = simulator.step();

        expect(actual).toBe(true);
    });

    it("returns false if the end condition check returns false",() => {

        (<jasmine.Spy>endCondition.check).and.returnValue(false);

        var actual = simulator.step();

        expect(actual).toBe(false);
    });

    it("increments the cycle number",() => {

        var checkSpy = <jasmine.Spy>endCondition.check;
        var state: IState;

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

    it("passes the context retrieved from fetch to decode",() => {

        var fetchContext = {};

        (<jasmine.Spy>fetcher.fetch).and.returnValue(fetchContext);

        simulator.step();

        expect(<jasmine.Spy>decoder.decode).toHaveBeenCalledWith(fetchContext);
    });

    it("passes the context retrieved from decode to execute",() => {

        var decodeContext = { command: commandSpy };

        (<jasmine.Spy>decoder.decode).and.returnValue(decodeContext);

        simulator.step();

        expect(commandSpy).toHaveBeenCalledWith(decodeContext);
    });

    it("sets state options to value passed to initialise",() => {

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

        var actual: IState = _((<jasmine.Spy>endCondition.check).calls.mostRecent().args).first();

        expect(actual.options).toEqual(expected);
    });

    it("uses default options if none supplied to initialise",() => {

        simulator.initialise({ coresize: 123 }, []);
        simulator.step();

        var actual: IState = _((<jasmine.Spy>endCondition.check).calls.mostRecent().args).first();

        expect(actual.options).toEqual(_.defaults({ coresize: 123 }, Defaults));
    });

    it("initialises core using the supplied options",() => {

        simulator.initialise(Defaults, []);

        expect(core.initialise).toHaveBeenCalledWith(Defaults);
    });

    it("stores warriors returned from the loader in the state passed to the fetch method",() => {

        var warriors = [];
        var loadedWarriors = [];

        (<jasmine.Spy>loader.load).and.returnValue(loadedWarriors);

        simulator.initialise(Defaults, warriors);
        simulator.step();

        expect(loader.load).toHaveBeenCalledWith(warriors, Defaults);

        var state = _((<jasmine.Spy>fetcher.fetch).calls.mostRecent().args).first();

        expect(state.warriors).toBe(loadedWarriors);
    });
});