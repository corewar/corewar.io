"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LiteEvent_1 = require("../../modules/LiteEvent");
const Warrior_1 = require("../Warrior");
const Loader_1 = require("../Loader");
const Defaults_1 = require("../Defaults");
const DataHelper_1 = require("./DataHelper");
const _ = require("underscore");
"use strict";
describe("Loader", () => {
    var random;
    var randomIndex;
    var randoms;
    var warriorLoader;
    var core;
    beforeEach(() => {
        randomIndex = 0;
        randoms = [1000, 2000, 3000, 4000, 5000, 6000, 7000];
        random = {
            get: (max) => {
                return randoms[randomIndex++];
            }
        };
        warriorLoader = {
            load: (address, result) => {
                var warrior = new Warrior_1.Warrior();
                warrior.startAddress = address;
                return warrior;
            }
        };
        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent_1.LiteEvent(),
            executeAt: jasmine.createSpy("ICore.executeAt"),
            readAt: jasmine.createSpy("ICore.readAt"),
            getAt: jasmine.createSpy("ICore.getAt"),
            setAt: jasmine.createSpy("ICore.setAt"),
            initialise: jasmine.createSpy("ICore.initialise"),
            wrap: jasmine.createSpy("ICore.wrap")
        };
    });
    it("Loads each warrior specified into core", () => {
        var warriors = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        var loadSpy = jasmine.createSpy("IWarriorLoader.load");
        loadSpy.and.returnValue(new Warrior_1.Warrior());
        warriorLoader = {
            load: loadSpy
        };
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        loader.load(warriors, Defaults_1.default);
        expect(warriorLoader.load).toHaveBeenCalledWith(jasmine.any(Number), warriors[0]);
        expect(warriorLoader.load).toHaveBeenCalledWith(jasmine.any(Number), warriors[1]);
        expect(warriorLoader.load).toHaveBeenCalledWith(jasmine.any(Number), warriors[2]);
    });
    it("Returns the warriors which have been loaded into core", () => {
        var warriorsIn = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        var warriorsOut = [
            new Warrior_1.Warrior(),
            new Warrior_1.Warrior(),
            new Warrior_1.Warrior()
        ];
        warriorLoader.load = (address, result) => {
            return warriorsOut[warriorsIn.indexOf(result)];
        };
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        var actual = loader.load(warriorsIn, Defaults_1.default);
        expect(actual[0]).toBe(warriorsOut[0]);
        expect(actual[1]).toBe(warriorsOut[1]);
        expect(actual[2]).toBe(warriorsOut[2]);
    });
    function wrapTo(max) {
        return (address) => {
            address = address % max;
            address = address >= 0 ? address : address + max;
            return address;
        };
    }
    it("Does not place warriors at the same address", () => {
        randoms = [10, 10, 10, 20];
        var options = _.defaults({
            coresize: 30,
            instructionLimit: 1,
            minSeparation: 1
        }, Defaults_1.default);
        var warriors = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        core.wrap = wrapTo(30);
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        var actual = loader.load(warriors, options);
        expect(actual[0].startAddress).toBe(10);
        expect(actual[1].startAddress).toBe(20);
    });
    it("Does not place warriors so they overlap", () => {
        randoms = [10, 8, 12, 15, 6, 5];
        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 1
        }, Defaults_1.default);
        var warriors = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        core.wrap = wrapTo(30);
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        var actual = loader.load(warriors, options);
        expect(actual[0].startAddress).toBe(10);
        expect(actual[1].startAddress).toBe(15);
        expect(actual[2].startAddress).toBe(5);
    });
    it("Does not place warriors so they are within the minimum separation distance", () => {
        randoms = [10, 12, 18, 19, 4, 1];
        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 5
        }, Defaults_1.default);
        var warriors = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        core.wrap = wrapTo(30);
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        var actual = loader.load(warriors, options);
        expect(actual[0].startAddress).toBe(10);
        expect(actual[1].startAddress).toBe(19);
        expect(actual[2].startAddress).toBe(1);
    });
    it("Correctly accounts for edge case where first warrior wraps round from high address to low address", () => {
        randoms = [28, 20, 19, 6, 7];
        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 5
        }, Defaults_1.default);
        var warriors = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        core.wrap = wrapTo(30);
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        var actual = loader.load(warriors, options);
        expect(actual[0].startAddress).toBe(28);
        expect(actual[1].startAddress).toBe(19);
        expect(actual[2].startAddress).toBe(7);
    });
    it("Correctly accounts for edge case where second warrior wraps round from high address to low address", () => {
        randoms = [19, 27, 28, 6, 7];
        var options = _.defaults({
            coresize: 30,
            instructionLimit: 5,
            minSeparation: 5
        }, Defaults_1.default);
        var warriors = [
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([]),
            DataHelper_1.default.buildParseResult([])
        ];
        core.wrap = wrapTo(30);
        var loader = new Loader_1.Loader(random, core, warriorLoader);
        var actual = loader.load(warriors, options);
        expect(actual[0].startAddress).toBe(19);
        expect(actual[1].startAddress).toBe(28);
        expect(actual[2].startAddress).toBe(7);
    });
});
