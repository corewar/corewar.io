"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../references.ts" />
const TestHelper_1 = require("./TestHelper");
const IParseOptions_1 = require("../../interface/IParseOptions");
"use strict";
describe("ICWS'94-draft", () => {
    it("alien22, B-PanamaX, Bunker t3, dbldwarf", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-94/", [
            //TODO "aeka", this requires nested for and stringification
            "alien22",
            "B-PanamaX",
            "Bunkert3",
            "dbldwarf"
        ], IParseOptions_1.Standard.ICWS94draft);
    });
    it("DynamicImp-gate, Gate-Daemon, HomemadeIceCream, Pinchers", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-94/", [
            "DynamicImp-gate",
            "Gate-Daemon",
            "HomemadeIceCream",
            "Pinchers",
        ], IParseOptions_1.Standard.ICWS94draft);
    });
    it("Rave, reverse dwarf", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-94/", [
            "Rave",
            "reversedwarf",
        ], IParseOptions_1.Standard.ICWS94draft);
    });
    it("Insight v1.0, Quick-Scan94Prototype, RotLD TNG, Ryooki 1.4, Scimitar", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-94/", [
            "Insightv1.0",
            "Quick-Scan94Prototype",
            "rotldtng",
            "ryooki1.4",
            "scimitar",
        ], IParseOptions_1.Standard.ICWS94draft, true);
    });
    it("Single Vector, Suicial Alien 22, Sweeper v5, Vector", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-94/", [
            //TODO requires label on a line by itself "SilkWarrior1.3",
            "SingleVector",
            "SuicidalAlien22",
            "sweeperv5",
            "Vector",
        ], IParseOptions_1.Standard.ICWS94draft, true);
    });
});
