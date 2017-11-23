
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { ILiteEvent, LiteEvent } from "../../modules/LiteEvent";
import { IRandom } from "../interface/IRandom";
import { IWarriorLoader } from "../interface/IWarriorLoader";
import { IParseResult } from "../../parser/interface/IParseResult";
import { Warrior } from "../Warrior";
import { Loader } from "../Loader";
import Defaults from "../Defaults";
import DataHelper from "./DataHelper";
import * as _ from "underscore";

"use strict";

describe("Loader",() => {

    var random: IRandom;
    var randomIndex: number;
    var randoms: number[];

    var warriorLoader: IWarriorLoader;
    var core: ICore;

    beforeEach(() => {

        randomIndex = 0;
        randoms = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

        random = {
            get: (max: number) => {
                return randoms[randomIndex++];
            }
        };

        warriorLoader = {
            load: (address: number, result: IParseResult) => {
                var warrior = new Warrior();
                warrior.startAddress = address;
                return warrior;
            }
        };

        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
            executeAt: jasmine.createSpy("ICore.executeAt"),
            readAt: jasmine.createSpy("ICore.readAt"),
            getAt: jasmine.createSpy("ICore.getAt"),
            setAt: jasmine.createSpy("ICore.setAt"),
            initialise: jasmine.createSpy("ICore.initialise"),
            wrap: jasmine.createSpy("ICore.wrap")
        };
    });

    it("Loads each warrior specified into core",() => {

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        var loadSpy = jasmine.createSpy("IWarriorLoader.load");
        loadSpy.and.returnValue(new Warrior());

        warriorLoader = {
            load: loadSpy
        };

        var loader = new Loader(random, core, warriorLoader);

        loader.load(warriors, Defaults);

        expect(warriorLoader.load).toHaveBeenCalledWith(jasmine.any(Number), warriors[0]);
        expect(warriorLoader.load).toHaveBeenCalledWith(jasmine.any(Number), warriors[1]);
        expect(warriorLoader.load).toHaveBeenCalledWith(jasmine.any(Number), warriors[2]);
    });

    it("Returns the warriors which have been loaded into core",() => {

        var warriorsIn = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        var warriorsOut = [
            new Warrior(),
            new Warrior(),
            new Warrior()
        ];

        warriorLoader.load = (address: number, result: IParseResult) => {
            return warriorsOut[warriorsIn.indexOf(result)];
        };

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriorsIn, Defaults);

        expect(actual[0]).toBe(warriorsOut[0]);
        expect(actual[1]).toBe(warriorsOut[1]);
        expect(actual[2]).toBe(warriorsOut[2]);
    });

    function wrapTo(max: number): (address: number) => number {

        return (address: number) => {
            address = address % max;
            address = address >= 0 ? address : address + max;

            return address;
        };
    }

    it("Does not place warriors at the same address",() => {

        randoms = [10, 10, 10, 20];

        var options = _.defaults({
            coresize: 30,
            instructionLimit: 1,
            minSeparation: 1
        }, Defaults);

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).toBe(10);
        expect(actual[1].startAddress).toBe(20);
    });

    it("Does not place warriors so they overlap",() => {

        randoms = [10, 8, 12, 15, 6, 5];

        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 1
        }, Defaults);

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).toBe(10);
        expect(actual[1].startAddress).toBe(15);
        expect(actual[2].startAddress).toBe(5);
    });

    it("Does not place warriors so they are within the minimum separation distance",() => {

        randoms = [10, 12, 18, 19, 4, 1];

        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 5
        }, Defaults);

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).toBe(10);
        expect(actual[1].startAddress).toBe(19);
        expect(actual[2].startAddress).toBe(1);
    });

    it("Correctly accounts for edge case where first warrior wraps round from high address to low address",() => {

        randoms = [28, 20, 19, 6, 7];

        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 5
        }, Defaults);

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).toBe(28);
        expect(actual[1].startAddress).toBe(19);
        expect(actual[2].startAddress).toBe(7);
    });

    it("Correctly accounts for edge case where second warrior wraps round from high address to low address",() => {

        randoms = [19, 27, 28, 6, 7];

        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 5
        }, Defaults);

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).toBe(19);
        expect(actual[1].startAddress).toBe(28);
        expect(actual[2].startAddress).toBe(7);
    });
});