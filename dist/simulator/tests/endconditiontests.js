"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LiteEvent_1 = require("../../modules/LiteEvent");
const Defaults_1 = require("../Defaults");
const EndCondition_1 = require("../EndCondition");
const _ = require("underscore");
"use strict";
describe("EndCondition", () => {
    function buildTask(warrior) {
        return {
            instructionPointer: 0,
            warrior: warrior
        };
    }
    function buildWarrior() {
        var warrior = {
            author: "",
            name: "",
            startAddress: 0,
            strategy: "",
            taskIndex: 0,
            tasks: []
        };
        warrior.tasks.push(buildTask(warrior));
        warrior.tasks.push(buildTask(warrior));
        return warrior;
    }
    function buildState() {
        return {
            core: {
                getSize: () => { return 0; },
                coreAccess: new LiteEvent_1.LiteEvent(),
                executeAt: jasmine.createSpy("executeAt"),
                readAt: jasmine.createSpy("readAt"),
                getAt: jasmine.createSpy("getAt"),
                setAt: jasmine.createSpy("setAt"),
                wrap: jasmine.createSpy("wrap"),
                initialise: jasmine.createSpy("initialise")
            },
            cycle: 0,
            options: _.clone(Defaults_1.default),
            warriorIndex: 0,
            warriors: [
                buildWarrior(),
                buildWarrior()
            ]
        };
    }
    it("returns false if there are multiple active warriors and the maximum number of cycles has not elapsed", () => {
        var state = buildState();
        var endCondition = new EndCondition_1.EndCondition();
        var actual = endCondition.check(state);
        expect(actual).toBe(false);
    });
    it("returns true if the maximum number of cylces have elapsed", () => {
        var state = buildState();
        state.cycle = 123;
        state.options.cyclesBeforeTie = 123;
        var endCondition = new EndCondition_1.EndCondition();
        var actual = endCondition.check(state);
        expect(actual).toBe(true);
    });
    it("returns true if there are multiple warriors and only one with active tasks", () => {
        var state = buildState();
        _(state.warriors).first().tasks = [];
        var endCondition = new EndCondition_1.EndCondition();
        var actual = endCondition.check(state);
        expect(actual).toBe(true);
    });
    it("returns false if there is only one warrior and it has active tasks", () => {
        var state = buildState();
        state.warriors.pop();
        var endCondition = new EndCondition_1.EndCondition();
        var actual = endCondition.check(state);
        expect(actual).toBe(false);
    });
    it("returns true if there is only one warrior and it has no active tasks", () => {
        var state = buildState();
        state.warriors.pop();
        _(state.warriors).first().tasks = [];
        var endCondition = new EndCondition_1.EndCondition();
        var actual = endCondition.check(state);
        expect(actual).toBe(true);
    });
});
