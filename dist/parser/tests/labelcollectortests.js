"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("../Interface/IToken");
const Context_1 = require("../Context");
const Parser_1 = require("../Parser");
const LabelCollector_1 = require("../LabelCollector");
const IMessage_1 = require("../Interface/IMessage");
const TestHelper_1 = require("./TestHelper");
const IParseOptions_1 = require("../Interface/IParseOptions");
const _ = require("underscore");
"use strict";
describe("LabelCollector", () => {
    it("Does not modify tokens if no lines begin with a label", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label123",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Mode,
                lexeme: "#",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Modifier,
                lexeme: ".AB",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },
            {
                category: IToken_1.TokenCategory.Comment,
                lexeme: "; sdfg dfkls kfds fsd jksd",
                position: { line: 2, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },
            {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Mode,
                lexeme: "@",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Comma,
                lexeme: ",",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(11);
        for (var i = 0; i < tokens.length; i++) {
            expect(actual.tokens[i]).toEqual(tokens[i]);
        }
    });
    it("Removes label declarations from the token stream", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label123",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Mode,
                lexeme: "#",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Modifier,
                lexeme: ".AB",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },
            {
                category: IToken_1.TokenCategory.Comment,
                lexeme: "; sdfg dfkls kfds fsd jksd",
                position: { line: 2, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "thisisalabel",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Comma,
                lexeme: ",",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(10);
        expect(actual.tokens[0]).toEqual(tokens[0]);
        expect(actual.tokens[1]).toEqual(tokens[1]);
        expect(actual.tokens[2]).toEqual(tokens[2]);
        expect(actual.tokens[3]).toEqual(tokens[3]);
        expect(actual.tokens[4]).toEqual(tokens[4]);
        expect(actual.tokens[5]).toEqual(tokens[5]);
        expect(actual.tokens[6]).toEqual(tokens[6]);
        expect(actual.tokens[7]).toEqual(tokens[8]);
        expect(actual.tokens[8]).toEqual(tokens[9]);
        expect(actual.tokens[9]).toEqual(tokens[10]);
    });
    it("Records labels in context with the corresponding instruction number", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "123",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label3",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.labels["label1"]).toBe(0);
        expect(actual.labels["label2"]).toBe(2);
        expect(actual.labels["label3"]).toBe(2);
    });
    it("Does not include lines which do not begin with an opcode or label in the instruction number", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Comment,
                lexeme: "; fdskdsksdf sdfjklds f",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "Label1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Number,
                lexeme: "3",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MUL",
                position: { line: 1, char: 1 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.labels["Label1"]).toBe(1);
        expect(actual.labels["label2"]).toBe(2);
    });
    it("Raises a warning if a label is declared more than once and uses first definition", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 3 }
            },
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 2 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 2, char: 3 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Redefinition of label 'label1', original definition will be used");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });
        expect(actual.labels["label1"]).toBe(0);
    });
    it("Raises a warning if a label is declared with the same name as an EQU label and uses the EQU label", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 4, char: 5 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "DJN",
                position: { line: 4, char: 7 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 4, char: 9 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        context.equs["label2"] = [];
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Redefinition of label 'label2', original definition will be used");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 5 });
        expect("label2" in actual.labels).toBe(false);
    });
    it("Raises an error if an opcode does not directly follow a label definition", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "123",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 2 }
            },
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 2, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 2 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Expected opcode, got '123'");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 2 });
        expect(actual.labels["label2"]).toBe(1);
    });
    it("only records the first eight characters of a label in ICWS'88 standards mode", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "longlabelwhichexceedseightchars",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Label,
                lexeme: "short1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, _.defaults({ standard: IParseOptions_1.Standard.ICWS88 }, Parser_1.Parser.DefaultOptions));
        expect(actual.messages.length).toBe(0);
        expect(actual.labels["longlabe"]).toBe(0);
        expect(actual.labels["short1"]).toBe(0);
        expect(actual.labels["longlabelwhichexceedseightchars"]).toBeUndefined();
    });
    it("recognises labels on end statements", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat([{
                category: IToken_1.TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 1 }
            }]).concat(TestHelper_1.TestHelper.endStatement(2, ""));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new LabelCollector_1.LabelCollector();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(7);
        expect(actual.labels["label1"]).toBe(1);
    });
});
