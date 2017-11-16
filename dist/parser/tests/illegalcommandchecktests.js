"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const TestHelper_1 = require("./TestHelper");
const Context_1 = require("../Context");
const IllegalCommandCheck_1 = require("../IllegalCommandCheck");
const Parser_1 = require("../Parser");
const IMessage_1 = require("../Interface/IMessage");
const IParseOptions_1 = require("../Interface/IParseOptions");
const _ = require("underscore");
"use strict";
describe("IllegalCommandCheck", () => {
    it("Does not raise errors for legal addressing modes under the ICWS'88 standard", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", ".A", "#", "0", ",", "$", "0", "")
            .concat(TestHelper_1.TestHelper.instruction(2, "", "MOV", ".A", "#", "0", ",", "@", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(3, "", "SLT", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(4, "", "SLT", ".A", "$", "0", ",", "$", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(5, "", "DJN", ".A", "@", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(6, "", "DJN", ".A", "@", "0", ",", "$", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(7, "", "SPL", ".A", "<", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(8, "", "SPL", ".A", "<", "0", ",", "$", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(9, "", "ADD", ".A", "@", "0", ",", "@", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(10, "", "ADD", ".A", "<", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(11, "", "JMP", ".A", "@", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(12, "", "JMP", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(13, "", "DAT", ".A", "#", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(14, "", "DAT", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(15, "", "SUB", ".A", "#", "0", ",", "$", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(16, "", "SUB", ".A", "$", "0", ",", "@", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(17, "", "JMZ", ".A", "@", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(18, "", "JMZ", ".A", "<", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(19, "", "CMP", ".A", "@", "0", ",", "$", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(20, "", "CMP", ".A", "<", "0", ",", "@", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(21, "", "JMN", ".A", "@", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(22, "", "JMN", ".A", "<", "0", ",", "$", "0", ""));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new IllegalCommandCheck_1.IllegalCommandCheck();
        var actual = pass.process(context, _.defaults({ standard: IParseOptions_1.Standard.ICWS88 }, Parser_1.Parser.DefaultOptions));
        expect(actual.messages.length).toBe(0);
    });
    it("Raises an error for each illegal addressing mode under the ICWS'88 standard", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", ".A", "#", "0", ",", "#", "0", "")
            .concat(TestHelper_1.TestHelper.instruction(1, "", "SLT", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "DJN", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "SPL", ".A", "#", "0", ",", "@", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "ADD", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "JMP", ".A", "#", "0", ",", "$", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "DAT", ".A", "@", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "SUB", ".A", "#", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "JMZ", ".A", "#", "0", ",", "<", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "CMP", ".A", "$", "0", ",", "#", "0", ""))
            .concat(TestHelper_1.TestHelper.instruction(1, "", "JMN", ".A", "#", "0", ",", "@", "0", ""));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new IllegalCommandCheck_1.IllegalCommandCheck();
        var actual = pass.process(context, _.defaults({ standard: IParseOptions_1.Standard.ICWS88 }, Parser_1.Parser.DefaultOptions));
        expect(actual.messages.length).toBe(11);
        expect(_(actual.messages).where({
            type: IMessage_1.MessageType.Error,
            text: "Illegal addressing mode under selected Corewar standard"
        }).length).toBe(11);
        for (var i = 0; i < actual.messages.length; i++) {
            expect(actual.messages[i].position).toEqual(tokens[i * 8].position);
        }
    });
});
