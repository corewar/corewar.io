import { expect } from "chai";

import { IToken, TokenCategory } from "@parser/interface/IToken";
import { Parser } from "@parser/Parser";
import { Scanner } from "@parser/Scanner";
import { Standard } from "@parser/interface/IParseOptions";

describe("Scanner",() => {

    it("creates newline tokens for each line ending",() => {

        var document = "label\nlabel\n label\nlabel \nlabel label\nlabel label label\n";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions).tokens;

        var newlines = actual.filter(a => 
            a.category === TokenCategory.EOL && 
            a.lexeme === "\n");

        expect(newlines.length).to.be.equal(7);
    });

    it("always creates a newline token for the final line",() => {

        var document = "line with ending\nline with no ending";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions).tokens;

        var newlines = actual.filter(a =>
            a.category === TokenCategory.EOL &&
            a.lexeme === "\n");

        expect(newlines.length).to.be.equal(2);
    });

    it("tokenises opcodes to ICWS'94-draft standard",() => {

        var document = "DAT MOV ADD SUB MUL DIV MOD JMP JMZ JMN DJN CMP SLT SPL SEQ SNE NOP";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(actual.length).to.be.equal(18);

        for (var i = 0; i <= 16; i++) {
            expect(actual[i].category).to.be.equal(TokenCategory.Opcode);
        }

        expect(actual[0].lexeme).to.be.equal("DAT");
        expect(actual[1].lexeme).to.be.equal("MOV");
        expect(actual[2].lexeme).to.be.equal("ADD");
        expect(actual[3].lexeme).to.be.equal("SUB");
        expect(actual[4].lexeme).to.be.equal("MUL");
        expect(actual[5].lexeme).to.be.equal("DIV");
        expect(actual[6].lexeme).to.be.equal("MOD");
        expect(actual[7].lexeme).to.be.equal("JMP");
        expect(actual[8].lexeme).to.be.equal("JMZ");
        expect(actual[9].lexeme).to.be.equal("JMN");
        expect(actual[10].lexeme).to.be.equal("DJN");
        expect(actual[11].lexeme).to.be.equal("CMP");
        expect(actual[12].lexeme).to.be.equal("SLT");
        expect(actual[13].lexeme).to.be.equal("SPL");
        expect(actual[14].lexeme).to.be.equal("SEQ");
        expect(actual[15].lexeme).to.be.equal("SNE");
        expect(actual[16].lexeme).to.be.equal("NOP");
        // The 18th element will be a newline character
    });

    it("tokenises opcodes to ICWS'88 standard",() => {

        var document = "DAT MOV ADD SUB MUL DIV MOD JMP JMZ JMN DJN CMP SLT SPL";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var actual = scanner.scan(document, options).tokens;

        var opcodes = actual.filter(a => a.category === TokenCategory.Opcode);
        var labels = actual.filter(a => a.category === TokenCategory.Label);

        expect(opcodes.length).to.be.equal(11);
        expect(labels.length).to.be.equal(3);

        expect(opcodes[0].lexeme).to.be.equal("DAT");
        expect(opcodes[1].lexeme).to.be.equal("MOV");
        expect(opcodes[2].lexeme).to.be.equal("ADD");
        expect(opcodes[3].lexeme).to.be.equal("SUB");
        expect(opcodes[4].lexeme).to.be.equal("JMP");
        expect(opcodes[5].lexeme).to.be.equal("JMZ");
        expect(opcodes[6].lexeme).to.be.equal("JMN");
        expect(opcodes[7].lexeme).to.be.equal("DJN");
        expect(opcodes[8].lexeme).to.be.equal("CMP");
        expect(opcodes[9].lexeme).to.be.equal("SLT");
        expect(opcodes[10].lexeme).to.be.equal("SPL");

        expect(labels[0].lexeme).to.be.equal("MUL");
        expect(labels[1].lexeme).to.be.equal("DIV");
        expect(labels[2].lexeme).to.be.equal("MOD");
    });

    it("tokenises opcodes to ICWS'86 standard",() => {

        var document = "DAT MOV ADD SUB MUL DIV MOD JMP JMZ JMN DJN CMP SLT SPL";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var actual = scanner.scan(document, options).tokens;

        var opcodes = actual.filter(a => a.category === TokenCategory.Opcode);
        var labels = actual.filter(a => a.category === TokenCategory.Label);

        expect(opcodes.length).to.be.equal(10);
        expect(labels.length).to.be.equal(4);

        expect(opcodes[0].lexeme).to.be.equal("DAT");
        expect(opcodes[1].lexeme).to.be.equal("MOV");
        expect(opcodes[2].lexeme).to.be.equal("ADD");
        expect(opcodes[3].lexeme).to.be.equal("SUB");
        expect(opcodes[4].lexeme).to.be.equal("JMP");
        expect(opcodes[5].lexeme).to.be.equal("JMZ");
        expect(opcodes[6].lexeme).to.be.equal("JMN");
        expect(opcodes[7].lexeme).to.be.equal("DJN");
        expect(opcodes[8].lexeme).to.be.equal("CMP");
        expect(opcodes[9].lexeme).to.be.equal("SPL");

        expect(labels[0].lexeme).to.be.equal("MUL");
        expect(labels[1].lexeme).to.be.equal("DIV");
        expect(labels[2].lexeme).to.be.equal("MOD");
        expect(labels[3].lexeme).to.be.equal("SLT");
    });

    it("tokenises preprocessor commands to ICWS'94-draft standard",() => {

        var document = "EQU END ORG";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(actual.length).to.be.equal(4);

        for (var i = 0; i <= 2; i++) {
            expect(actual[i].category).to.be.equal(TokenCategory.Preprocessor);
        }

        expect(actual[0].lexeme).to.be.equal("EQU");
        expect(actual[1].lexeme).to.be.equal("END");
        expect(actual[2].lexeme).to.be.equal("ORG");
    });

    it("tokenises preprocessor commands to ICWS'88 standard",() => {

        var document = "EQU END ORG";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var actual = scanner.scan(document, options).tokens;

        var preprocessor = actual.filter(a => a.category === TokenCategory.Preprocessor);
        var labels = actual.filter(a => a.category === TokenCategory.Label);

        expect(preprocessor.length).to.be.equal(2);
        expect(labels.length).to.be.equal(1);

        expect(preprocessor[0].lexeme).to.be.equal("EQU");
        expect(preprocessor[1].lexeme).to.be.equal("END");
        expect(labels[0].lexeme).to.be.equal("ORG");
    });

    it("tokenises preprocessor commands to ICWS'86 standard",() => {

        var document = "EQU END ORG";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var actual = scanner.scan(document, options).tokens;

        var preprocessor = actual.filter(a => a.category === TokenCategory.Preprocessor);
        var labels = actual.filter(a => a.category === TokenCategory.Label);

        expect(preprocessor.length).to.be.equal(1);
        expect(labels.length).to.be.equal(2);

        expect(preprocessor[0].lexeme).to.be.equal("END");
        expect(labels[0].lexeme).to.be.equal("EQU");
        expect(labels[1].lexeme).to.be.equal("ORG");
    });

    it("correctly identifies a label which looks like a preprocessor instruction",() => {

        var document = "ORG2 MOV 0, 1\n";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(actual.length).to.be.equal(7);

        expect(actual[0].category).to.be.equal(TokenCategory.Label);
        expect(actual[0].lexeme).to.be.equal("ORG2");

        expect(actual[1].category).to.be.equal(TokenCategory.Opcode);
        expect(actual[1].lexeme).to.be.equal("MOV");
    });

    it("tokenises modes to ICWS'94-draft standard",() => {

        var document = "MOV.AB #25, $26\nDAT @1, <6\nJMP >7\nMOV {1, }2\nDAT *1";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Mode);

        expect(actual.length).to.be.equal(8);

        expect(actual[0].lexeme).to.be.equal("#");
        expect(actual[1].lexeme).to.be.equal("$");
        expect(actual[2].lexeme).to.be.equal("@");
        expect(actual[3].lexeme).to.be.equal("<");
        expect(actual[4].lexeme).to.be.equal(">");
        expect(actual[5].lexeme).to.be.equal("{");
        expect(actual[6].lexeme).to.be.equal("}");
        expect(actual[7].lexeme).to.be.equal("*");
    });

    it("tokenises modes to ICWS'88 standard",() => {

        var document = "MOV.AB #25, $26\nDAT @1, <6\nJMP >7";

        var scanner = new Scanner();
        const options =  Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var tokens = scanner.scan(document, options).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Mode);

        expect(actual.length).to.be.equal(4);

        expect(actual[0].lexeme).to.be.equal("#");
        expect(actual[1].lexeme).to.be.equal("$");
        expect(actual[2].lexeme).to.be.equal("@");
        expect(actual[3].lexeme).to.be.equal("<");
    });

    it("tokenises modes to ICWS'86 standard",() => {

        var document = "MOV.AB #25, $26\nDAT @1, <6\nJMP >7";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var tokens = scanner.scan(document, options).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Mode);

        expect(actual.length).to.be.equal(4);

        expect(actual[0].lexeme).to.be.equal("#");
        expect(actual[1].lexeme).to.be.equal("$");
        expect(actual[2].lexeme).to.be.equal("@");
        expect(actual[3].lexeme).to.be.equal("<");
    });

    it("tokenises commas",() => {

        var document = "MOV #25 , 26\nadd , ,, 21, 26";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => 
            a.category === TokenCategory.Comma && 
            a.lexeme === ",");

        expect(actual.length).to.be.equal(5);
    });

    it("tokenises numbers",() => {

        var document = "mov 25, #26\nadd -27, @28\na123";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(tokens[7].lexeme).to.be.equal("-");
        expect(tokens[7].category).to.be.equal(TokenCategory.Maths);

        var actual = tokens.filter(a => a.category === TokenCategory.Number);

        expect(actual.length).to.be.equal(4);

        expect(actual[0].lexeme).to.be.equal("25");
        expect(actual[1].lexeme).to.be.equal("26");
        expect(actual[2].lexeme).to.be.equal("27");
        expect(actual[3].lexeme).to.be.equal("28");
    });

    it("tokenises modifiers to ICWS'94-draft standard",() => {

        var document = "MOV.A 0, 0\nADD.B 0, 0\n.AB 0, 0\nJMZ .BA 0, 0\nMOV 0,.F 0\nMOV 0, 0 .I\nMOV.X 0, 0\n. AB. BA. A . B. I";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Modifier);

        expect(actual.length).to.be.equal(7);

        expect(actual[0].lexeme).to.be.equal(".A");
        expect(actual[1].lexeme).to.be.equal(".B");
        expect(actual[2].lexeme).to.be.equal(".AB");
        expect(actual[3].lexeme).to.be.equal(".BA");
        expect(actual[4].lexeme).to.be.equal(".F");
        expect(actual[5].lexeme).to.be.equal(".I");
        expect(actual[6].lexeme).to.be.equal(".X");
    });

    it("considers modifiers as unknown in ICWS'88 standard",() => {

        var document = "MOV.A 0, 0\nADD.B 0, 0\n.AB 0, 0\nJMZ .BA 0, 0\nMOV 0,.F 0\nMOV 0, 0 .I\nMOV.X 0, 0\n. AB. BA. A . B. I";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var tokens = scanner.scan(document, options).tokens;

        var modifiers = tokens.filter(a => a.category === TokenCategory.Modifier);

        expect(modifiers.length).to.be.equal(0);

        var unknown = tokens.filter(a => a.category === TokenCategory.Unknown);

        expect(unknown.length).to.be.equal(12);

        expect(unknown[0].lexeme).to.be.equal(".A");
        expect(unknown[1].lexeme).to.be.equal(".B");
        expect(unknown[2].lexeme).to.be.equal(".AB");
        expect(unknown[3].lexeme).to.be.equal(".BA");
        expect(unknown[4].lexeme).to.be.equal(".F");
        expect(unknown[5].lexeme).to.be.equal(".I");
        expect(unknown[6].lexeme).to.be.equal(".X");
        expect(unknown[7].lexeme).to.be.equal(".");
        expect(unknown[8].lexeme).to.be.equal(".");
        expect(unknown[9].lexeme).to.be.equal(".");
        expect(unknown[10].lexeme).to.be.equal(".");
        expect(unknown[11].lexeme).to.be.equal(".");

        var labels = tokens.filter(a => a.category === TokenCategory.Label);

        expect(labels.length).to.be.equal(5);

        expect(labels[0].lexeme).to.be.equal("AB");
        expect(labels[1].lexeme).to.be.equal("BA");
        expect(labels[2].lexeme).to.be.equal("A");
        expect(labels[3].lexeme).to.be.equal("B");
        expect(labels[4].lexeme).to.be.equal("I");
    });

    it("considers modifiers as unknown in ICWS'86 standard",() => {

        var document = "MOV.A 0, 0\nADD.B 0, 0\n.AB 0, 0\nJMZ .BA 0, 0\nMOV 0,.F 0\nMOV 0, 0 .I\nMOV.X 0, 0\n. AB. BA. A . B. I";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var tokens = scanner.scan(document, options).tokens;

        var modifiers = tokens.filter(a => a.category === TokenCategory.Modifier);

        expect(modifiers.length).to.be.equal(0);

        var unknown = tokens.filter(a => a.category === TokenCategory.Unknown);

        expect(unknown.length).to.be.equal(12);

        expect(unknown[0].lexeme).to.be.equal(".A");
        expect(unknown[1].lexeme).to.be.equal(".B");
        expect(unknown[2].lexeme).to.be.equal(".AB");
        expect(unknown[3].lexeme).to.be.equal(".BA");
        expect(unknown[4].lexeme).to.be.equal(".F");
        expect(unknown[5].lexeme).to.be.equal(".I");
        expect(unknown[6].lexeme).to.be.equal(".X");
        expect(unknown[7].lexeme).to.be.equal(".");
        expect(unknown[8].lexeme).to.be.equal(".");
        expect(unknown[9].lexeme).to.be.equal(".");
        expect(unknown[10].lexeme).to.be.equal(".");
        expect(unknown[11].lexeme).to.be.equal(".");

        var labels = tokens.filter(a => a.category === TokenCategory.Label);

        expect(labels.length).to.be.equal(5);

        expect(labels[0].lexeme).to.be.equal("AB");
        expect(labels[1].lexeme).to.be.equal("BA");
        expect(labels[2].lexeme).to.be.equal("A");
        expect(labels[3].lexeme).to.be.equal("B");
        expect(labels[4].lexeme).to.be.equal("I");
    });

    it("tokenises maths to ICWS'94-draft standard",() => {

        var document = "MOV 5 + 4\nADD.F 3 - 2\nabc EQU 3 / 2\nxyz EQU 4 * 3\ndef EQU 5 % 6";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Maths);

        expect(actual.length).to.be.equal(5);

        expect(actual[0].lexeme).to.be.equal("+");
        expect(actual[1].lexeme).to.be.equal("-");
        expect(actual[2].lexeme).to.be.equal("/");
        expect(actual[3].lexeme).to.be.equal("*");
        expect(actual[4].lexeme).to.be.equal("%");
    });

    it("tokenises maths to ICWS'88 standard",() => {

        var document = "MOV 5+4\nADD.F 3-2\nabc EQU 3/2\nxyz EQU 4*3\ndef EQU 5%6";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var tokens = scanner.scan(document, options).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Maths);

        expect(actual.length).to.be.equal(4);

        expect(actual[0].lexeme).to.be.equal("+");
        expect(actual[1].lexeme).to.be.equal("-");
        expect(actual[2].lexeme).to.be.equal("/");
        expect(actual[3].lexeme).to.be.equal("*");

        expect(
            tokens.filter(a =>
                a.category === TokenCategory.Unknown &&
                a.lexeme === "%6"
            ).length)
            .to.be.equal(1);
    });

    it("tokenises maths to ICWS'86 standard",() => {

        var document = "MOV 5 + 4\nADD.F 3 - 2\nabc EQU 3 / 2\nxyz EQU 4 * 3\ndef EQU 5 % 6";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var tokens = scanner.scan(document, options).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Maths);

        expect(actual.length).to.be.equal(2);

        expect(actual[0].lexeme).to.be.equal("+");
        expect(actual[1].lexeme).to.be.equal("-");

        expect(
            tokens.filter((token: IToken) => {
                return token.category === TokenCategory.Unknown &&
                    (token.lexeme === "*" || token.lexeme === "/" || token.lexeme === "%");
            }).length)
            .to.be.equal(3);
    });

    it("tokenises brackets as maths category in ICWS'94-draft standard",() => {

        var document = "MOV (5 + 4)*3\nlabel EQU (4 % ((3 + 2) - 1))";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Maths);

        expect(actual.length).to.be.equal(13);

        expect(actual[0].lexeme).to.be.equal("(");
        expect(actual[1].lexeme).to.be.equal("+");
        expect(actual[2].lexeme).to.be.equal(")");
        expect(actual[3].lexeme).to.be.equal("*");
        expect(actual[4].lexeme).to.be.equal("(");
        expect(actual[5].lexeme).to.be.equal("%");
        expect(actual[6].lexeme).to.be.equal("(");
        expect(actual[7].lexeme).to.be.equal("(");
        expect(actual[8].lexeme).to.be.equal("+");
        expect(actual[9].lexeme).to.be.equal(")");
        expect(actual[10].lexeme).to.be.equal("-");
        expect(actual[11].lexeme).to.be.equal(")");
        expect(actual[12].lexeme).to.be.equal(")");
    });

    it("considers brackets as unknown category in ICWS'88 standard",() => {

        var document = "MOV (5 + 4)*3\nlabel EQU (4 % ((3 + 2) - 1))";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var tokens = scanner.scan(document, options).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Maths);

        expect(actual.length).to.be.equal(3);

        expect(actual[0].lexeme).to.be.equal("+");
        expect(actual[1].lexeme).to.be.equal("+");
        expect(actual[2].lexeme).to.be.equal("-");

        var unknown = tokens.filter(a => a.category === TokenCategory.Unknown);

        expect(unknown.length).to.be.equal(7);
        expect(unknown[0].lexeme).to.be.equal("(5");
        expect(unknown[1].lexeme).to.be.equal(")*3");
        expect(unknown[2].lexeme).to.be.equal("(4");
        expect(unknown[3].lexeme).to.be.equal("%");
        expect(unknown[4].lexeme).to.be.equal("((3");
        expect(unknown[5].lexeme).to.be.equal(")");
        expect(unknown[6].lexeme).to.be.equal("))");
    });

    it("considers brackets as unknown category in ICWS'86 standard",() => {

        var document = "MOV (5 + 4)*3\nlabel EQU (4 % ((3 + 2) - 1))";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var tokens = scanner.scan(document, options).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Maths);

        expect(actual.length).to.be.equal(3);

        expect(actual[0].lexeme).to.be.equal("+");
        expect(actual[1].lexeme).to.be.equal("+");
        expect(actual[2].lexeme).to.be.equal("-");

        var unknown = tokens.filter(a => a.category === TokenCategory.Unknown);

        expect(unknown.length).to.be.equal(7);
        expect(unknown[0].lexeme).to.be.equal("(5");
        expect(unknown[1].lexeme).to.be.equal(")*3");
        expect(unknown[2].lexeme).to.be.equal("(4");
        expect(unknown[3].lexeme).to.be.equal("%");
        expect(unknown[4].lexeme).to.be.equal("((3");
        expect(unknown[5].lexeme).to.be.equal(")");
        expect(unknown[6].lexeme).to.be.equal("))");
    });

    it("tokenises comments",() => {

        var document = "mov ; abc ; ;; mov\nmov; abc";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Comment);

        expect(actual.length).to.be.equal(2);

        expect(actual[0].lexeme).to.be.equal("; abc ; ;; mov");
        expect(actual[1].lexeme).to.be.equal("; abc");
    });

    it("tokenises labels",() => {

        var document = "MOV #4, @label\nabc EQU 3\nc123 MOV.X 5, c123\nab_2_ca_123\n2xyz _y_z";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var actual = tokens.filter(a => a.category === TokenCategory.Label);

        expect(actual.length).to.be.equal(7);

        expect(actual[0].lexeme).to.be.equal("label");
        expect(actual[1].lexeme).to.be.equal("abc");
        expect(actual[2].lexeme).to.be.equal("c123");
        expect(actual[3].lexeme).to.be.equal("c123");
        expect(actual[4].lexeme).to.be.equal("ab_2_ca_123");
        expect(actual[5].lexeme).to.be.equal("xyz");
        expect(actual[6].lexeme).to.be.equal("_y_z");
    });

    it("is case insensitive when tokenising opcodes, modifiers and preprocessor commands",() => {

        var document =
            "DAT MOV ADD SUB MUL DIV MOD JMP JMZ JMN DJN CMP SLT SPL ORG EQU END " +
            "dat mov add sub mul div mod jmp jmz jmn djn cmp slt spl org equ end " +
            ".AB .BA .A .B .F .X .I " +
            ".ab .ba .a .b .f .x .i";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(tokens.filter(a => a.category === TokenCategory.Opcode).length).to.be.equal(28);
        expect(tokens.filter(a => a.category === TokenCategory.Preprocessor).length).to.be.equal(6);
        expect(tokens.filter(a => a.category === TokenCategory.Modifier).length).to.be.equal(14);

        expect(tokens[0].lexeme).to.be.equal("DAT");
        expect(tokens[1].lexeme).to.be.equal("MOV");
        expect(tokens[2].lexeme).to.be.equal("ADD");
        expect(tokens[3].lexeme).to.be.equal("SUB");
        expect(tokens[4].lexeme).to.be.equal("MUL");
        expect(tokens[5].lexeme).to.be.equal("DIV");
        expect(tokens[6].lexeme).to.be.equal("MOD");
        expect(tokens[7].lexeme).to.be.equal("JMP");
        expect(tokens[8].lexeme).to.be.equal("JMZ");
        expect(tokens[9].lexeme).to.be.equal("JMN");
        expect(tokens[10].lexeme).to.be.equal("DJN");
        expect(tokens[11].lexeme).to.be.equal("CMP");
        expect(tokens[12].lexeme).to.be.equal("SLT");
        expect(tokens[13].lexeme).to.be.equal("SPL");
        expect(tokens[14].lexeme).to.be.equal("ORG");
        expect(tokens[15].lexeme).to.be.equal("EQU");
        expect(tokens[16].lexeme).to.be.equal("END");

        expect(tokens[17].lexeme).to.be.equal("DAT");
        expect(tokens[18].lexeme).to.be.equal("MOV");
        expect(tokens[19].lexeme).to.be.equal("ADD");
        expect(tokens[20].lexeme).to.be.equal("SUB");
        expect(tokens[21].lexeme).to.be.equal("MUL");
        expect(tokens[22].lexeme).to.be.equal("DIV");
        expect(tokens[23].lexeme).to.be.equal("MOD");
        expect(tokens[24].lexeme).to.be.equal("JMP");
        expect(tokens[25].lexeme).to.be.equal("JMZ");
        expect(tokens[26].lexeme).to.be.equal("JMN");
        expect(tokens[27].lexeme).to.be.equal("DJN");
        expect(tokens[28].lexeme).to.be.equal("CMP");
        expect(tokens[29].lexeme).to.be.equal("SLT");
        expect(tokens[30].lexeme).to.be.equal("SPL");
        expect(tokens[31].lexeme).to.be.equal("ORG");
        expect(tokens[32].lexeme).to.be.equal("EQU");
        expect(tokens[33].lexeme).to.be.equal("END");

        expect(tokens[34].lexeme).to.be.equal(".AB");
        expect(tokens[35].lexeme).to.be.equal(".BA");
        expect(tokens[36].lexeme).to.be.equal(".A");
        expect(tokens[37].lexeme).to.be.equal(".B");
        expect(tokens[38].lexeme).to.be.equal(".F");
        expect(tokens[39].lexeme).to.be.equal(".X");
        expect(tokens[40].lexeme).to.be.equal(".I");

        expect(tokens[41].lexeme).to.be.equal(".AB");
        expect(tokens[42].lexeme).to.be.equal(".BA");
        expect(tokens[43].lexeme).to.be.equal(".A");
        expect(tokens[44].lexeme).to.be.equal(".B");
        expect(tokens[45].lexeme).to.be.equal(".F");
        expect(tokens[46].lexeme).to.be.equal(".X");
        expect(tokens[47].lexeme).to.be.equal(".I");
    });

    it("is case sensitive when tokenising labels",() => {

        var document = "lowercase UPPERCASE mIx_34_Ed";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(tokens.length).to.be.equal(4);
        expect(tokens[0].lexeme).to.be.equal("lowercase");
        expect(tokens[1].lexeme).to.be.equal("UPPERCASE");
        expect(tokens[2].lexeme).to.be.equal("mIx_34_Ed");
    });

    it("stores the line and character number against each token",() => {

        var document =
            "mov.ab #4, #5\n" +
            "add @lbl, >0\n" +
            "\n" +
            " \t\n" +
            "\tlbl EQU #0";

        var scanner = new Scanner();
        var tokens = scanner.scan(document, Parser.DefaultOptions).tokens;

        var line1 = tokens.filter((item: IToken) => { return item.position.line === 1; });
        var line2 = tokens.filter((item: IToken) => { return item.position.line === 2; });
        var line3 = tokens.filter((item: IToken) => { return item.position.line === 3; });
        var line4 = tokens.filter((item: IToken) => { return item.position.line === 4; });
        var line5 = tokens.filter((item: IToken) => { return item.position.line === 5; });

        expect(line1.length).to.be.equal(8);
        expect(line1[0].position.char).to.be.equal(1);
        expect(line1[1].position.char).to.be.equal(4);
        expect(line1[2].position.char).to.be.equal(8);
        expect(line1[3].position.char).to.be.equal(9);
        expect(line1[4].position.char).to.be.equal(10);
        expect(line1[5].position.char).to.be.equal(12);
        expect(line1[6].position.char).to.be.equal(13);
        expect(line1[7].position.char).to.be.equal(14);

        expect(line2.length).to.be.equal(7);
        expect(line2[0].position.char).to.be.equal(1);
        expect(line2[1].position.char).to.be.equal(5);
        expect(line2[2].position.char).to.be.equal(6);
        expect(line2[3].position.char).to.be.equal(9);
        expect(line2[4].position.char).to.be.equal(11);
        expect(line2[5].position.char).to.be.equal(12);
        expect(line2[6].position.char).to.be.equal(13);

        expect(line3.length).to.be.equal(1);
        expect(line3[0].position.char).to.be.equal(1);

        expect(line4.length).to.be.equal(1);
        expect(line4[0].position.char).to.be.equal(3);

        expect(line5.length).to.be.equal(5);
        expect(line5[0].position.char).to.be.equal(2);
        expect(line5[1].position.char).to.be.equal(6);
        expect(line5[2].position.char).to.be.equal(10);
        expect(line5[3].position.char).to.be.equal(11);
        expect(line5[4].position.char).to.be.equal(12);
    });

    it("can handle an empty document",() => {

        var document = "";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions).tokens;

        expect(actual.length).to.be.equal(1);
        expect(actual[0].category).to.be.equal(TokenCategory.EOL);
    });

    it("does not allow maths operators to be followed by whitespace under ICWS'88 standard",() => {

        var document = "MOV\t#label- 1";

        var pass = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var actual = pass.scan(document, options);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(6);

        expect(actual.tokens[0].lexeme).to.be.equal("MOV");
        expect(actual.tokens[1].lexeme).to.be.equal("#");
        expect(actual.tokens[2].lexeme).to.be.equal("label");
        expect(actual.tokens[3].lexeme).to.be.equal("-");
        expect(actual.tokens[4].lexeme).to.be.equal("1");
        expect(actual.tokens[5].lexeme).to.be.equal("\n");

        expect(actual.tokens[3].category).to.be.equal(TokenCategory.Unknown);
    });

    it("inserts a zero before maths operators if the operator is preceded by whitespace under the ICWS'88 standard",() => {

        var document = "MOV\t#0\t-1";

        var pass = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var actual = pass.scan(document, options);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(7);

        expect(actual.tokens[0].lexeme).to.be.equal("MOV");
        expect(actual.tokens[1].lexeme).to.be.equal("#");
        expect(actual.tokens[2].lexeme).to.be.equal("0");
        expect(actual.tokens[3].lexeme).to.be.equal("0");
        expect(actual.tokens[4].lexeme).to.be.equal("-");
        expect(actual.tokens[5].lexeme).to.be.equal("1");
        expect(actual.tokens[6].lexeme).to.be.equal("\n");

        expect(actual.tokens[3].category).to.be.equal(TokenCategory.Number);
    });

    it("only recognises labels which are eight or fewer characters in length under ICWS'86 standard",() => {

        var document = "eightlet mov 0, 1\nfour mov 0, 1\ntwelveletter mov 0, 1";

        var pass = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 });
        var actual = pass.scan(document, options);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(18);

        expect(actual.tokens[0].lexeme).to.be.equal("eightlet");
        expect(actual.tokens[6].lexeme).to.be.equal("four");
        expect(actual.tokens[12].lexeme).to.be.equal("twelveletter");

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Label);
        expect(actual.tokens[6].category).to.be.equal(TokenCategory.Label);
        expect(actual.tokens[12].category).to.be.equal(TokenCategory.Unknown);
    });

    it("recognises comments which are not preceeded by whitespace",() => {

        var document = "MOV $0, #0;comment";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(8);
        expect(actual.tokens[6].lexeme).to.be.equal(";comment");
        expect(actual.tokens[6].category).to.be.equal(TokenCategory.Comment);
    });

    it("correctly tokenises a indirect a field mode",() => {

        var document = "dat.A * 1, #1";

        var scanner = new Scanner();
        var actual = scanner.scan(document, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens.length).to.be.equal(8);
        expect(actual.tokens[0].lexeme).to.be.equal("DAT");
        expect(actual.tokens[1].lexeme).to.be.equal(".A");
        expect(actual.tokens[2].lexeme).to.be.equal("*");
        expect(actual.tokens[3].lexeme).to.be.equal("1");
        expect(actual.tokens[4].lexeme).to.be.equal(",");
        expect(actual.tokens[5].lexeme).to.be.equal("#");
        expect(actual.tokens[6].lexeme).to.be.equal("1");
        expect(actual.tokens[7].lexeme).to.be.equal("\n");

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode);
    });

    it("Allows labels to be folowed by a colon", () => {

        var document = "label1: label2 label3";

        var scanner = new Scanner();
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 });
        var actual = scanner.scan(document, options).tokens;
     
        expect(actual.length).to.be.equal(4);
        
        expect(actual[0].category).to.be.equal(TokenCategory.Label);
        expect(actual[0].lexeme).to.be.equal("label1");

        expect(actual[1].category).to.be.equal(TokenCategory.Label);
        expect(actual[1].lexeme).to.be.equal("label2");

        expect(actual[2].category).to.be.equal(TokenCategory.Label);
        expect(actual[2].lexeme).to.be.equal("label3");

        expect(actual[3].category).to.be.equal(TokenCategory.EOL);
        expect(actual[3].lexeme).to.be.equal("\n");
    });
});