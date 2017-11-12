/// <reference path="../references.ts" />
import { TestHelper } from  "./TestHelper";
import { Standard } from "../../interface/IParseOptions";
"use strict";

describe("ICWS'94-draft",() => {

    it("alien22, B-PanamaX, Bunker t3, dbldwarf",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-94/", [
            //TODO "aeka", this requires nested for and stringification
                "alien22",
                "B-PanamaX",
                "Bunkert3",
                "dbldwarf"
            ], Standard.ICWS94draft);
    });

    it("DynamicImp-gate, Gate-Daemon, HomemadeIceCream, Pinchers",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-94/", [
                "DynamicImp-gate",
                "Gate-Daemon",
                "HomemadeIceCream",
                "Pinchers",
                //TODO "Pyramidv5.5", this requires for variable usage and label by its self
            ], Standard.ICWS94draft);
    });

    it("Rave, reverse dwarf", () => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-94/", [
                "Rave",
                "reversedwarf",
            ], Standard.ICWS94draft);
    });

    it("Insight v1.0, Quick-Scan94Prototype, RotLD TNG, Ryooki 1.4, Scimitar",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-94/", [
                "Insightv1.0",
                "Quick-Scan94Prototype",
                "rotldtng",
                "ryooki1.4",
                "scimitar",
            ], Standard.ICWS94draft, true);
    });

    it("Single Vector, Suicial Alien 22, Sweeper v5, Vector",() => {

        TestHelper.testWarriorList(
            "Warriors/ICWS-94/", [
                //TODO requires label on a line by itself "SilkWarrior1.3",
                "SingleVector",
                "SuicidalAlien22",
                "sweeperv5",
                "Vector",
            ], Standard.ICWS94draft, true);
    });
});