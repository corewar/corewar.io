/// <reference path="../references.ts" />
import { TestHelper } from "./TestHelper";
import { Context } from "../../Corewar/Parser/Context";
import { AddressModPass } from "../../Corewar/Parser/AddressModPass";
import { Parser } from "../../Corewar/Parser/Parser";
import { TokenCategory } from "./../../Corewar/Parser/Interface/IToken";

"use strict";

describe("AddressModPass",() => {

    it("Does not modify existing instructions with address which are within range",() => {

        var tokens = TestHelper.comment(1, "; this is a comment")
            .concat(TestHelper.instruction(2, "", "MOV", ".AB", "$", "0", ",", "$", "1", "; another comment"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new AddressModPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(tokens.length);

        for (var i = 0; i < actual.tokens.length; i++) {

            expect(actual.tokens[i].category).toBe(tokens[i].category);
            expect(actual.tokens[i].lexeme).toBe(tokens[i].lexeme);
            expect(actual.tokens[i].position).toEqual(tokens[i].position);
        }
    });

    it("Ensures addresses are in the range +/- coresize/2",() => {

        var tokens = TestHelper.instruction(1, "", "MOV", ".AB", "$", "0", ",", "$", "1", "")
            .concat(TestHelper.instruction(2, "", "MOV", ".AB", "$", "5", ",", "$", "6", ""))
            .concat(TestHelper.instruction(3, "", "MOV", ".AB", "$", "-4", ",", "$", "-5", ""))
            .concat(TestHelper.instruction(4, "", "MOV", ".AB", "$", "10", ",", "$", "11", ""));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new AddressModPass();
        var actual = pass.process(context, _.defaults({ coresize: 10 }, Parser.DefaultOptions));

        expect(actual.messages.length).toBe(0);

        var addresses = _(actual.tokens).where({ category: TokenCategory.Number });

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