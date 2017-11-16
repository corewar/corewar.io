"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../references.ts" />
const TestHelper_1 = require("./TestHelper");
const IParseOptions_1 = require("./../../interface/IParseOptions");
"use strict";
describe("ICWS'86", () => {
    it("bigraidar, chang1, commando, dwarf, dwarfgun", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-86/", [
            "bigraidar",
            "chang1",
            "commando",
            "dwarf",
            "dwarfgun"
        ], IParseOptions_1.Standard.ICWS86);
    });
    it("gemini, hoser, imp, impgun, impstomp", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-86/", [
            "gemini",
            "hoser",
            "imp",
            "impgun",
            "impstomp"
        ], IParseOptions_1.Standard.ICWS86);
    });
    it("juggernaut, mice, mortar, raidar, superstomp, target", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-86/", [
            "juggernaut",
            "mice",
            "mortar",
            "raidar",
            "superstomp",
            "target"
        ], IParseOptions_1.Standard.ICWS86);
    });
});
