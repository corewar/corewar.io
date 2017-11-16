"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const TestHelper_1 = require("./TestHelper");
const Context_1 = require("../Context");
const AddressModPass_1 = require("../AddressModPass");
const Parser_1 = require("../Parser");
const IToken_1 = require("../Interface/IToken");
const _ = require("underscore");
"use strict";
describe("AddressModPass", () => {
    it("Does not modify existing instructions with address which are within range", () => {
        var tokens = TestHelper_1.TestHelper.comment(1, "; this is a comment")
            .concat(TestHelper_1.TestHelper.instruction(2, "", "MOV", ".AB", "$", "0", ",", "$", "1", "; another comment"));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new AddressModPass_1.AddressModPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(tokens.length);
        for (var i = 0; i < actual.tokens.length; i++) {
            expect(actual.tokens[i].category).toBe(tokens[i].category);
            expect(actual.tokens[i].lexeme).toBe(tokens[i].lexeme);
            expect(actual.tokens[i].position).toEqual(tokens[i].position);
        }
    });
    it("Ensures addresses are in the range +/- coresize/2", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", ".AB", "$", "0", ",", "$", "1", "")
            .concat(TestHelper_1.TestHelper.instruction(2, "", "MOV", ".AB", "$", "5", ",", "$", "6", ""))
            .concat(TestHelper_1.TestHelper.instruction(3, "", "MOV", ".AB", "$", "-4", ",", "$", "-5", ""))
            .concat(TestHelper_1.TestHelper.instruction(4, "", "MOV", ".AB", "$", "10", ",", "$", "11", ""));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new AddressModPass_1.AddressModPass();
        var actual = pass.process(context, _.defaults({ coresize: 10 }, Parser_1.Parser.DefaultOptions));
        expect(actual.messages.length).toBe(0);
        var addresses = _(actual.tokens).where({ category: IToken_1.TokenCategory.Number });
        expect(addresses[0].lexeme).toBe("0");
        expect(addresses[1].lexeme).toBe("1");
        expect(addresses[2].lexeme).toBe("5");
        expect(addresses[3].lexeme).toBe("-4");
        expect(addresses[4].lexeme).toBe("-4");
        expect(addresses[5].lexeme).toBe("5");
        expect(addresses[6].lexeme).toBe("0");
        expect(addresses[7].lexeme).toBe("1");
    });
});
