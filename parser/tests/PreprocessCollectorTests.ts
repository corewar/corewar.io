/// <reference path="references.ts" />
import { Context } from "../Context";
import { IToken, TokenCategory } from "../Interface/IToken";
import { Parser } from "../Parser";
import { PreprocessCollector } from "../PreprocessCollector";
import { MessageType } from "../Interface/IMessage";
import { TestHelper } from "./TestHelper";
import { Standard } from "../Interface/IParseOptions";
import * as _ from "underscore";
"use strict";

describe("PreprocessCollector", () => {

    it("Does not modify tokens if no EQU found", () => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ","
            }, {
                category: TokenCategory.Comment,
                position: { line: 1, char: 1 },
                lexeme: "; thsifdsakl dsj sdkljf s"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: "\n"
            }, {
                category: TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: "label123"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "7"
            }, {
                category: TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: "MOV"
            }, {
                category: TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: "."
            }
        ];

        context.tokens = tokens;

        var pass = new PreprocessCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(10);
        expect(actual.messages.length).toBe(0);

        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });

    it("Removes EQU statements from the output", () => {

        var line1 = TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "");
        var line2 = TestHelper.equ(2, "label1", [
            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "7",
                position: { line: 2, char: 1 }
           }
        ]);

        var line3 = TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");

        var expected = line1.concat(line3);

        var context = new Context();
        context.tokens = line1.concat(line2).concat(line3);

        var pass = new PreprocessCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(expected.length);
        expect(actual.messages.length).toBe(0);

        for (var i = 0; i < expected.length; i++) {

            expect(actual.tokens[i]).toEqual(expected[i]);
        }
    });

    it("Records EQU label definitions in output", () => {

        var line1 = TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "");

        var equDefinition = [
            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label3",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Preprocessor,
                lexeme: "EQU",
                position: { line: 2, char: 1 }
            }
        ];

        var equReplacement  = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Modifier,
                lexeme: ".X",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Mode,
                lexeme: "#",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "-1",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Comma,
                lexeme: ",",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Mode,
                lexeme: "$",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "thisisalabel",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 2, char: 1 }
            }
         ];

        var line2 = equDefinition.concat(equReplacement);

        var line3 = TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");

        var context = new Context();
        context.tokens = line1.concat(line2).concat(line3);

        var pass = new PreprocessCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(0);

        var label1Tokens = actual.equs["label1"];
        var label2Tokens = actual.equs["label2"];
        var label3Tokens = actual.equs["label3"];

        expect(label1Tokens.length).toBe(equReplacement.length - 1);
        expect(label2Tokens.length).toBe(equReplacement.length - 1);
        expect(label3Tokens.length).toBe(equReplacement.length - 1);

        for (var i = 0; i < equReplacement.length - 1; i++) {
            expect(label1Tokens[i]).toEqual(equReplacement[i]);
            expect(label2Tokens[i]).toEqual(equReplacement[i]);
            expect(label3Tokens[i]).toEqual(equReplacement[i]);
        }
    });

    it("Raises a warning if a label is redefined", () => {

        var line1 = TestHelper.equ(1, "label1", [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 3 }
            }
        ]);

        var line2 = TestHelper.equ(2, "label2", [
            {
                category: TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 2, char: 3 }
            }
        ]);

        var line3 = TestHelper.equ(3, "label1", [
            {
                category: TokenCategory.Opcode,
                lexeme: "SUB",
                position: { line: 3, char: 3 }
            }
        ]);

        var context = new Context();
        context.tokens = line1.concat(line2).concat(line3);

        var pass = new PreprocessCollector();
        pass.process(context, Parser.DefaultOptions);

        expect(context.messages.length).toBe(1);

        expect(context.messages[0].position).toEqual({ line: 3, char: 1 });
        expect(context.messages[0].text).toBe("Redefinition of label 'label1', original definition will be used");
        expect(context.messages[0].type).toBe(MessageType.Warning);
    });

    it("Takes the original EQU definition if a duplicate is found", () => {

        var movOpcode = {
            category: TokenCategory.Opcode,
            lexeme: "MOV",
            position: { line: 1, char: 3 }
        };

        var addOpcode = {
            category: TokenCategory.Opcode,
            lexeme: "ADD",
            position: { line: 1, char: 3 }
        };

        var line1 = TestHelper.equ(1, "label1", [movOpcode]);
        var line2 = TestHelper.equ(2, "label1", [addOpcode]);

        var context = new Context();
        context.tokens = line1.concat(line2);

        var pass = new PreprocessCollector();
        pass.process(context, Parser.DefaultOptions);

        var expression = context.equs["label1"];

        expect(expression.length).toBe(1);
        expect(expression[0]).toEqual(movOpcode);
    });

    it("Does not register labels in output", () => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ","
            }, {
                category: TokenCategory.Comment,
                position: { line: 1, char: 1 },
                lexeme: "; thsifdsakl dsj sdkljf s"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: "\n"
            }, {
                category: TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: "label123"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "7"
            }, {
                category: TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: "MOV"
            }, {
                category: TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: "."
            }
        ];

        context.tokens = tokens;

        var pass = new PreprocessCollector();
        pass.process(context, Parser.DefaultOptions);

        expect(context.labels).toEqual({});
    });

    it("Does not include comments in EQU substitution",() => {

        var tokens = TestHelper.equ(1, "label1",
            TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "; this is a comment")
        );

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new PreprocessCollector();
        var result = pass.process(context, Parser.DefaultOptions);

        var actual = result.equs["label1"];

        expect(actual.length).toBe(4);
        expect(actual[0].lexeme).toBe("MOV");
        expect(actual[1].lexeme).toBe("0");
        expect(actual[2].lexeme).toBe(",");
        expect(actual[3].lexeme).toBe("1");
    });

    it("Collects multi-line EQU statements in ICWS-94draft",() => {

        var instruction1 = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "");
        var instruction2 = TestHelper.instruction(2, "", "ADD", "", "", "1", ",", "", "2", "");

        // Remove terminating newlines
        instruction1.pop();
        instruction2.pop();

        var tokens = TestHelper.equ(1, "label2", instruction1)
            .concat(TestHelper.equ(2, "", instruction2));

        tokens.unshift({
            category: TokenCategory.Label,
            lexeme: "label1",
            position: { line: 1, char: 1 }
        });

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new PreprocessCollector();
        var result = pass.process(context, Parser.DefaultOptions);

        var label1 = result.equs["label1"];
        var label2 = result.equs["label2"];

        expect(label1.length).toBe(9);
        expect(label2.length).toBe(label1.length);

        for (var i = 0; i < label1.length; i++) {
            expect(label1[i].category).toBe(label2[i].category);
            expect(label1[i].lexeme).toBe(label2[i].lexeme);
            expect(label1[i].position).toEqual(label2[i].position);
        }

        expect(label1[0].lexeme).toBe("MOV");
        expect(label1[1].lexeme).toBe("0");
        expect(label1[2].lexeme).toBe(",");
        expect(label1[3].lexeme).toBe("1");
        expect(label1[4].lexeme).toBe("\n");
        expect(label1[5].lexeme).toBe("ADD");
        expect(label1[6].lexeme).toBe("1");
        expect(label1[7].lexeme).toBe(",");
        expect(label1[8].lexeme).toBe("2");
    });

    it("Doesn't collect multi-line EQU statements in ICWS-88",() => {

        var instruction1 = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "");
        var instruction2 = TestHelper.instruction(2, "", "ADD", "", "", "1", ",", "", "2", "");

        // Remove terminating newlines
        instruction1.pop();
        instruction2.pop();

        var tokens = TestHelper.equ(1, "label2", instruction1)
            .concat(TestHelper.equ(2, "", instruction2));

        tokens.unshift({
            category: TokenCategory.Label,
            lexeme: "label1",
            position: { line: 1, char: 1 }
        });

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new PreprocessCollector();
        var result = pass.process(context, _.defaults({ standard: Standard.ICWS88 }, Parser.DefaultOptions));

        var label1 = result.equs["label1"];
        var label2 = result.equs["label2"];

        expect(label1.length).toBe(4);
        expect(label2.length).toBe(label1.length);

        for (var i = 0; i < label1.length; i++) {
            expect(label1[i].category).toBe(label2[i].category);
            expect(label1[i].lexeme).toBe(label2[i].lexeme);
            expect(label1[i].position).toEqual(label2[i].position);
        }

        expect(label1[0].lexeme).toBe("MOV");
        expect(label1[1].lexeme).toBe("0");
        expect(label1[2].lexeme).toBe(",");
        expect(label1[3].lexeme).toBe("1");
    });
});
