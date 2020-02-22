
import { TestHelper } from  "@parser/tests/integration/TestHelper";
import { Standard } from "@parser/interface/IParseOptions";
"use strict";

describe("ICWS'94-draft",() => {

    it("alien22, B-PanamaX, Bunker t3, dbldwarf",() => {

        return TestHelper.testWarriorList(
            "test/parser/integration/warriors/ICWS-94/", [
            //TODO "aeka", this requires nested for and stringification
                "alien22",
                "b-panamax",
                "bunkert3",
                "dbldwarf"
            ], Standard.ICWS94draft);
    });

    it("DynamicImp-gate, Gate-Daemon, HomemadeIceCream, Pinchers",() => {

        return TestHelper.testWarriorList(
            "test/parser/integration/warriors/ICWS-94/", [
                "dynamicimp-gate",
                "gate-daemon",
                "homemadeicecream",
                "pinchers",
                //TODO "pyramidv5.5" requires for loop variable
            ], Standard.ICWS94draft);
    });

    it("Rave, reverse dwarf", () => {

        return TestHelper.testWarriorList(
            "test/parser/integration/warriors/ICWS-94/", [
                "rave",
                "reversedwarf",
            ], Standard.ICWS94draft);
    });

    it("Insight v1.0, Quick-Scan94Prototype, RotLD TNG, Ryooki 1.4, Scimitar",() => {

        return TestHelper.testWarriorList(
            "test/parser/integration/warriors/ICWS-94/", [
                "insightv1.0",
                "quick-scan94prototype",
                "rotldtng",
                "ryooki1.4",
                "scimitar",
            ], Standard.ICWS94draft, true);
    });

    it("Silk Warrior 1.3, Single Vector, Suicial Alien 22, Sweeper v5, Vector",() => {

        return TestHelper.testWarriorList(
            "test/parser/integration/warriors/ICWS-94/", [
                "silkwarrior1.3",
                "singlevector",
                "suicidalalien22",
                "sweeperv5",
                "vector",
            ], Standard.ICWS94draft, true);
    });
});