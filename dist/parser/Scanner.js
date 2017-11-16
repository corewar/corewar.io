"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const IParseOptions_1 = require("./interface/IParseOptions");
const Context_1 = require("./Context");
class Scanner {
    scan(document, options) {
        document = document.replace(/[\r]/g, "");
        this.context = new Context_1.Context();
        this.position = {
            line: 1,
            char: 1
        };
        var lines = document.split("\n");
        this.options = options;
        this.regex = this.selectRegexes(options.standard);
        lines.forEach((line) => {
            this.readLine(line);
            this.position.line++;
        });
        return this.context;
    }
    selectRegexes(standard) {
        switch (standard) {
            case IParseOptions_1.Standard.ICWS94draft:
                return Scanner.ICWS94draftRegex;
            case IParseOptions_1.Standard.ICWS88:
                return Scanner.ICWS88Regex;
            case IParseOptions_1.Standard.ICWS86:
                return Scanner.ICWS86Regex;
            default:
                throw "Unsupported Corewar Standard";
        }
    }
    readLine(line) {
        var accumulator = "";
        this.position.char = 1;
        for (var charNumber = 0; charNumber < line.length; charNumber++) {
            var c = line[charNumber];
            if (c === "\n") {
                break;
            }
            else if (c === ";") {
                if (accumulator !== "") {
                    this.processAccumulator(accumulator);
                    accumulator = "";
                }
                this.position.char = charNumber + 2;
                this.processComment(line.substr(charNumber));
                break;
            }
            var result = this.regex.Whitespace.exec(c);
            if (result === null) {
                accumulator += c;
            }
            else {
                if (accumulator !== "") {
                    this.processAccumulator(accumulator);
                    accumulator = "";
                }
                this.position.char = charNumber + 2;
            }
        }
        if (accumulator !== "") {
            this.processAccumulator(accumulator);
            accumulator = "";
        }
        this.emitEndOfLine();
    }
    indirectAModeCheck(category, match) {
        if (this.options.standard !== IParseOptions_1.Standard.ICWS94draft) {
            return true;
        }
        if (match !== "*") {
            return true;
        }
        // HACK ICWS'94 uses * for both multiply and a field indirect addressing mode
        // If the previous token was an opcode or comma, treat this as an addressing mode
        // otherwise treat it as a multiply
        var previousOpcodeOrComma = this.previous.category === IToken_1.TokenCategory.Opcode ||
            this.previous.category === IToken_1.TokenCategory.Modifier ||
            this.previous.category === IToken_1.TokenCategory.Comma;
        if (category === IToken_1.TokenCategory.Mode) {
            return previousOpcodeOrComma;
        }
        else if (category === IToken_1.TokenCategory.Maths) {
            return !previousOpcodeOrComma;
        }
        else {
            return true;
        }
    }
    processAccumulator(accumulator) {
        var result;
        var found = 0;
        var matchToken = (category, re) => {
            result = re.exec(accumulator);
            if (result !== null && result.index === 0 && this.indirectAModeCheck(category, result[0])) {
                accumulator = this.processToken(category, accumulator, result[0], found !== 0);
                this.position.char += result[0].length;
                found++;
                return true;
            }
            return false;
        };
        while (accumulator !== "") {
            if (accumulator[0] === ";") {
                return;
            }
            if (matchToken(IToken_1.TokenCategory.Comma, this.regex.CommaRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Modifier, this.regex.ModifierRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Mode, this.regex.ModeRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Number, this.regex.NumberRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Maths, this.regex.MathsRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Opcode, this.regex.OpcodeRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Preprocessor, this.regex.PreprocessorRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Label, this.regex.LabelRE)) {
                continue;
            }
            if (matchToken(IToken_1.TokenCategory.Comment, this.regex.CommentRE)) {
                continue;
            }
            accumulator = this.processToken(IToken_1.TokenCategory.Unknown, accumulator, accumulator, found !== 0);
        }
    }
    processComment(lexeme) {
        this.emit(IToken_1.TokenCategory.Comment, lexeme);
    }
    isCaseInsensitive(category) {
        return category === IToken_1.TokenCategory.Opcode ||
            category === IToken_1.TokenCategory.Modifier ||
            category === IToken_1.TokenCategory.Preprocessor;
    }
    processToken(category, accumulator, lexeme, found) {
        // HACK ICWS'88/86 has optional commas and delimits operands using whitespace but this parser does not tokenise whitespace.
        // This workaround will allow a plus/minus to begin an operand and disallows whitespace after a maths operator.
        // This means that the following operands are not interpretted as a single expression: MOV 0 -1 bcomes MOV 0, -1 not MOV -1
        if (this.options.standard <= IParseOptions_1.Standard.ICWS88) {
            if (!found && category === IToken_1.TokenCategory.Maths &&
                (lexeme === "-" || lexeme === "+")) {
                this.emit(IToken_1.TokenCategory.Number, "0");
            }
            else if (category === IToken_1.TokenCategory.Maths && accumulator.length === 1) {
                category = IToken_1.TokenCategory.Unknown;
            }
        }
        if (this.isCaseInsensitive(category)) {
            lexeme = lexeme.toUpperCase();
        }
        this.emit(category, lexeme);
        return accumulator.substr(lexeme.length);
    }
    emitEndOfLine() {
        this.emit(IToken_1.TokenCategory.EOL, "\n");
    }
    emit(category, lexeme) {
        this.previous = {
            position: {
                line: this.position.line,
                char: this.position.char
            },
            lexeme: lexeme,
            category: category
        };
        this.context.tokens.push(this.previous);
    }
}
Scanner.ICWS94draftRegex = {
    LabelRE: /^[A-Z_][A-Z_0-9]*/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|MUL|DIV|MOD|JMP|JMZ|JMN|DJN|CMP|SLT|SPL|SEQ|SNE|NOP)(?!\w)/i,
    PreprocessorRE: /^(EQU|END|ORG|FOR|ROF)(?!\w)/i,
    ModifierRE: /^\.(AB|BA|A|B|F|X|I)/i,
    ModeRE: /^(#|\$|@|<|>|{|}|\*)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-|\*|\/|%|\(|\))/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
Scanner.ICWS88Regex = {
    LabelRE: /^[A-Z][A-Z0-9]*/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|SLT|DJN|SPL)(?!\w)/i,
    PreprocessorRE: /^(END|EQU)(?!\w)/i,
    ModifierRE: /$a/i,
    ModeRE: /^(#|\$|@|<)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-|\*|\/)/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
Scanner.ICWS86Regex = {
    LabelRE: /^[A-Z][A-Z0-9]{0,7}(?![A-Z0-9])/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|DJN|SPL)(?!\w)/i,
    PreprocessorRE: /^(END)(?!\w)/i,
    ModifierRE: /$a/i,
    ModeRE: /^(#|\$|@|<)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-)/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
exports.Scanner = Scanner;
