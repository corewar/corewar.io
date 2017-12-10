import { expect } from "chai";

import { TestHelper } from "./TestHelper";
import { Context } from "../Context";
import { AddressModPass } from "../AddressModPass";
import { Parser } from "../Parser";
import { TokenCategory } from "../interface/IToken";

describe("AddressModPass",() => {

    it("Does not modify existing instructions with address which are within range",() => {

        var tokens = TestHelper.comment(1, "; this is a comment")
            .concat(TestHelper.instruction(2, "", "MOV", ".AB", "$", "0", ",", "$", "1", "; another comment"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new AddressModPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(tokens.length);

        for (var i = 0; i < actual.tokens.length; i++) {

            expect(actual.tokens[i].category).to.be.equal(tokens[i].category);
            expect(actual.tokens[i].lexeme).to.be.equal(tokens[i].lexeme);
            expect(actual.tokens[i].position).to.deep.equal(tokens[i].position);
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
        var actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { coresize: 10 }));

        expect(actual.messages.length).to.be.equal(0);

        var addresses = actual.tokens.filter((a) => a.category === TokenCategory.Number);

        expect(addresses[0].lexeme).to.be.equal("0");
        expect(addresses[1].lexeme).to.be.equal("1");
        expect(addresses[2].lexeme).to.be.equal("5");
        expect(addresses[3].lexeme).to.be.equal("-4");
        expect(addresses[4].lexeme).to.be.equal("-4");
        expect(addresses[5].lexeme).to.be.equal("5");
        expect(addresses[6].lexeme).to.be.equal("0");
        expect(addresses[7].lexeme).to.be.equal("1");
    });
});