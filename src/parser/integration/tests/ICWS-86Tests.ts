
import { TestHelper } from  "@parser/integration/tests/TestHelper";
import { Standard } from "@parser/interface/IParseOptions";
"use strict";

describe("ICWS'86",() => {

    it("bigraidar, chang1, commando, dwarf, dwarfgun",() => {

        return TestHelper.testWarriorList(
            "./src/parser/integration/warriors/ICWS-86/", [
                "bigraidar",
                "chang1",
                "commando",
                "dwarf",
                "dwarfgun"
            ], Standard.ICWS86);
    });

    it("gemini, hoser, imp, impgun, impstomp",() => {

        return TestHelper.testWarriorList(
            "src/parser/integration/warriors/ICWS-86/", [
                "gemini",
                "hoser",
                "imp",
                "impgun",
                "impstomp"
            ], Standard.ICWS86);
    });

    it("juggernaut, mice, mortar, raidar, superstomp, target",() => {

        return TestHelper.testWarriorList(
            "src/parser/integration/warriors/ICWS-86/", [
                "juggernaut",
                "mice",
                "mortar",
                "raidar",
                "superstomp",
                "target"
            ], Standard.ICWS86);
    });
});