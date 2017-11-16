"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../references.ts" />
const TestHelper_1 = require("./TestHelper");
const IParseOptions_1 = require("../../interface/IParseOptions");
"use strict";
describe("ICWS'88", () => {
    it("aisr, cancer, cleaner, cowboy, death", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "aisr",
            "cancer",
            "cleaner",
            "cowboy",
            "death",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("dracula, drdeath, drfrog, dude, dwomp", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "dracula",
            "drdeath",
            "drfrog",
            "dude",
            "dwomp",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("fairy1, ferret, fydgitr, hithard2, immobilizer", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "fairy1",
            "ferret",
            "fydgitr",
            "hithard2",
            "immobilizer",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("imp, imps, jumper, kirin, kwc72c", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "imp",
            "imps",
            "jumper",
            "kirin",
            "kwc72c",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("lincogs, minidpls, minidspr, mousetrap, muledna2", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "lincogs",
            "minidpls",
            "minidspr",
            "mousetrap",
            "muledna2",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("nfluenza, ogre, parasite6, phage, phage2", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "nfluenza",
            "ogre",
            "parasite6",
            "phage",
            "phage2",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("pinup, piper, plague, pmjump, roller", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "pinup",
            "piper",
            "plague",
            "pmjump",
            "roller",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("schindler, sieve, slaver, splat, sud", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "schindler",
            "sieve",
            "slaver",
            "splat",
            "sud",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("trapper, ultima, vampsprd, virusold, w2", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "trapper",
            "ultima",
            "vampsprd",
            "virusold",
            "w2",
        ], IParseOptions_1.Standard.ICWS88);
    });
    it("wally, waspnest, wipe5, zamzow", () => {
        TestHelper_1.TestHelper.testWarriorList("parser/integration/warriors/ICWS-88/", [
            "wally",
            "waspnest",
            "wipe5",
            "zamzow",
        ], IParseOptions_1.Standard.ICWS88);
    });
});
