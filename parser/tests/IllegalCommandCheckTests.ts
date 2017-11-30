import { expect } from "chai";

import { TestHelper } from "./TestHelper";
import { Context } from "../Context";
import { IllegalCommandCheck } from "../IllegalCommandCheck";
import { Parser } from "../Parser";
import { MessageType } from "../interface/IMessage";
import { Standard } from "../interface/IParseOptions";
import * as _ from "underscore";
"use strict";

describe("IllegalCommandCheck",() => {

    it("Does not raise errors for legal addressing modes under the ICWS'88 standard",() => {

        var tokens = TestHelper.instruction(1, "", "MOV", ".A", "#", "0", ",", "$", "0", "")
            .concat(TestHelper.instruction(2, "", "MOV", ".A", "#", "0", ",", "@", "0", ""))
            .concat(TestHelper.instruction(3, "", "SLT", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(4, "", "SLT", ".A", "$", "0", ",", "$", "0", ""))
            .concat(TestHelper.instruction(5, "", "DJN", ".A", "@", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(6, "", "DJN", ".A", "@", "0", ",", "$", "0", ""))
            .concat(TestHelper.instruction(7, "", "SPL", ".A", "<", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(8, "", "SPL", ".A", "<", "0", ",", "$", "0", ""))
            .concat(TestHelper.instruction(9, "", "ADD", ".A", "@", "0", ",", "@", "0", ""))
            .concat(TestHelper.instruction(10, "", "ADD", ".A", "<", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(11, "", "JMP", ".A", "@", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(12, "", "JMP", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(13, "", "DAT", ".A", "#", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(14, "", "DAT", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(15, "", "SUB", ".A", "#", "0", ",", "$", "0", ""))
            .concat(TestHelper.instruction(16, "", "SUB", ".A", "$", "0", ",", "@", "0", ""))
            .concat(TestHelper.instruction(17, "", "JMZ", ".A", "@", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(18, "", "JMZ", ".A", "<", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(19, "", "CMP", ".A", "@", "0", ",", "$", "0", ""))
            .concat(TestHelper.instruction(20, "", "CMP", ".A", "<", "0", ",", "@", "0", ""))
            .concat(TestHelper.instruction(21, "", "JMN", ".A", "@", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(22, "", "JMN", ".A", "<", "0", ",", "$", "0", ""));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new IllegalCommandCheck();
        var actual = pass.process(context, _.defaults({ standard: Standard.ICWS88 }, Parser.DefaultOptions));

        expect(actual.messages.length).to.be.equal(0);
    });

    it("Raises an error for each illegal addressing mode under the ICWS'88 standard",() => {

        var tokens = TestHelper.instruction(1, "", "MOV", ".A", "#", "0", ",", "#", "0", "")
            .concat(TestHelper.instruction(1, "", "SLT", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(1, "", "DJN", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(1, "", "SPL", ".A", "#", "0", ",", "@", "0", ""))
            .concat(TestHelper.instruction(1, "", "ADD", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(1, "", "JMP", ".A", "#", "0", ",", "$", "0", ""))
            .concat(TestHelper.instruction(1, "", "DAT", ".A", "@", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(1, "", "SUB", ".A", "#", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(1, "", "JMZ", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper.instruction(1, "", "CMP", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper.instruction(1, "", "JMN", ".A", "#", "0", ",", "@", "0", ""));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new IllegalCommandCheck();
        var actual = pass.process(context, _.defaults({ standard: Standard.ICWS88 }, Parser.DefaultOptions));

        expect(actual.messages.length).to.be.equal(11);

        expect(_(actual.messages).where({
            type: MessageType.Error,
            text: "Illegal addressing mode under selected Corewar standard"
        }).length).to.be.equal(11);

        for (var i = 0; i < actual.messages.length; i++) {
            expect(actual.messages[i].position).to.deep.equal(tokens[i * 8].position);
        }
    });
});