/// <reference path="../references.ts" />

"use strict";

describe("ICWS'86",() => {

    it("bigraidar, chang1, commando, dwarf, dwarfgun",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-86/", [
                "bigraidar",
                "chang1",
                "commando",
                "dwarf",
                "dwarfgun"
            ], Standard.ICWS86);
    });

    it("gemini, hoser, imp, impgun, impstomp",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-86/", [
                "gemini",
                "hoser",
                "imp",
                "impgun", 
                "impstomp"
            ], Standard.ICWS86);
    });

    it("juggernaut, mice, mortar, raidar, superstomp, target",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-86/", [
                "juggernaut",
                "mice",
                "mortar",
                "raidar",
                "superstomp",
                "target"
            ], Standard.ICWS86);
    });
});