define(["require", "exports", "./Interface/IToken", "./Interface/IParseOptions", "./Context"], function (require, exports, IToken_1, IParseOptions_1, Context_1) {
    var Scanner = (function () {
        function Scanner() {
        }
        Scanner.prototype.scan = function (document, options) {
            var _this = this;
            document = document.replace(/[\r]/g, "");
            this.context = new Context_1.Context();
            this.position = {
                line: 1,
                char: 1
            };
            var lines = document.split("\n");
            this.options = options;
            this.regex = this.selectRegexes(options.standard);
            lines.forEach(function (line) {
                _this.readLine(line);
                _this.position.line++;
            });
            return this.context;
        };
        Scanner.prototype.selectRegexes = function (standard) {
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
        };
        Scanner.prototype.readLine = function (line) {
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
        };
        Scanner.prototype.indirectAModeCheck = function (category, match) {
            if (this.options.standard !== IParseOptions_1.Standard.ICWS94draft) {
                return true;
            }
            if (match !== "*") {
                return true;
            }
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
        };
        Scanner.prototype.processAccumulator = function (accumulator) {
            var _this = this;
            var result;
            var found = 0;
            var matchToken = function (category, re) {
                result = re.exec(accumulator);
                if (result !== null && result.index === 0 && _this.indirectAModeCheck(category, result[0])) {
                    accumulator = _this.processToken(category, accumulator, result[0], found !== 0);
                    _this.position.char += result[0].length;
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
        };
        Scanner.prototype.processComment = function (lexeme) {
            this.emit(IToken_1.TokenCategory.Comment, lexeme);
        };
        Scanner.prototype.isCaseInsensitive = function (category) {
            return category === IToken_1.TokenCategory.Opcode ||
                category === IToken_1.TokenCategory.Modifier ||
                category === IToken_1.TokenCategory.Preprocessor;
        };
        Scanner.prototype.processToken = function (category, accumulator, lexeme, found) {
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
        };
        Scanner.prototype.emitEndOfLine = function () {
            this.emit(IToken_1.TokenCategory.EOL, "\n");
        };
        Scanner.prototype.emit = function (category, lexeme) {
            this.previous = {
                position: {
                    line: this.position.line,
                    char: this.position.char
                },
                lexeme: lexeme,
                category: category
            };
            this.context.tokens.push(this.previous);
        };
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
        return Scanner;
    })();
    exports.Scanner = Scanner;
});
//# sourceMappingURL=Scanner.js.map