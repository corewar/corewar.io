"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const Context_1 = require("../Context");
const MetaDataCollector_1 = require("../MetaDataCollector");
const Parser_1 = require("../Parser");
const TestHelper_1 = require("./TestHelper");
const IMessage_1 = require("../Interface/IMessage");
"use strict";
describe("MetaDataCollector", () => {
    it("Defaults the warrior name to 'Nameless'", () => {
        var context = new Context_1.Context();
        var pass = new MetaDataCollector_1.MetaDataCollector();
        pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(context.metaData.name).toBe("Nameless");
    });
    it("Defaults the author name to 'Blameless'", () => {
        var context = new Context_1.Context();
        var pass = new MetaDataCollector_1.MetaDataCollector();
        pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(context.metaData.author).toBe("Blameless");
    });
    it("Can handle non-relevant comments", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";")
            .concat(TestHelper_1.TestHelper.comment(2, ";    "))
            .concat(TestHelper_1.TestHelper.comment(3, ";not relevant comment"))
            .concat(TestHelper_1.TestHelper.comment(4, ";strategx"));
        var pass = new MetaDataCollector_1.MetaDataCollector();
        pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(context.messages.length).toBe(0);
    });
    it("Reads the warrior name from the ;name comment", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";name  this is the name\t ");
        var pass = new MetaDataCollector_1.MetaDataCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.metaData.name).toBe("this is the name");
    });
    it("Reads the author name from the ;author comment", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";author\t\tgareththegeek");
        var pass = new MetaDataCollector_1.MetaDataCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.metaData.author).toBe("gareththegeek");
    });
    it("Reads the strategy from the ;strategy comment", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";strategy   this is a description of the strategy  ");
        var pass = new MetaDataCollector_1.MetaDataCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.metaData.strategy).toBe("  this is a description of the strategy  \n");
    });
    it("Reads multiline strategies from successive ;strategy comments", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";strategy this is line 1 of the strategy")
            .concat(TestHelper_1.TestHelper.comment(2, ";strategy this is line 2 of the strategy"))
            .concat(TestHelper_1.TestHelper.comment(3, ";strategy this is line 3 of the strategy"));
        var pass = new MetaDataCollector_1.MetaDataCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.metaData.strategy).toBe("this is line 1 of the strategy\nthis is line 2 of the strategy\nthis is line 3 of the strategy\n");
    });
    it("Raises a warning if name is defined more than once and uses latest definition", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";name dwarf")
            .concat(TestHelper_1.TestHelper.comment(2, ";name imp"));
        var pass = new MetaDataCollector_1.MetaDataCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.metaData.name).toBe("imp");
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Redefinition of name, latest definition will be used ('imp')");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });
    });
    it("Raises a warning if author is defined more than once and uses latest definition", () => {
        var context = new Context_1.Context();
        context.tokens = TestHelper_1.TestHelper.comment(1, ";author turbo_king")
            .concat(TestHelper_1.TestHelper.comment(2, ";author gareththegeek"));
        var pass = new MetaDataCollector_1.MetaDataCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.metaData.author).toBe("gareththegeek");
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Redefinition of author, latest definition will be used ('gareththegeek')");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });
    });
});
