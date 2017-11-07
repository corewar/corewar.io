var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IMessage", "./Interface/IToken", "./Interface/IParseOptions", "./PassBase"], function (require, exports, IMessage_1, IToken_1, IParseOptions_1, PassBase_1) {
    var LabelEmitter = (function (_super) {
        __extends(LabelEmitter, _super);
        function LabelEmitter() {
            _super.apply(this, arguments);
        }
        LabelEmitter.prototype.process = function (context, options) {
            this.line = 0;
            return _super.prototype.process.call(this, context, options);
        };
        LabelEmitter.prototype.labelName = function (token) {
            switch (this.options.standard) {
                case IParseOptions_1.Standard.ICWS86:
                case IParseOptions_1.Standard.ICWS88:
                    return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
                default:
                    return token.lexeme;
            }
        };
        LabelEmitter.prototype.processLine = function () {
            if (this.stream.peek().category === IToken_1.TokenCategory.Opcode) {
                this.processLineTokens(true);
                this.line++;
            }
            else if (this.stream.peek().category === IToken_1.TokenCategory.Preprocessor) {
                this.processLineTokens(false);
            }
            else {
                var tokens = this.stream.readToEOL();
                this.context.emit(tokens);
            }
        };
        LabelEmitter.prototype.processLineTokens = function (isOpcode) {
            var _this = this;
            var tokens = this.stream.readToEOL();
            _.forEach(tokens, function (token) {
                if (token.category === IToken_1.TokenCategory.Label) {
                    _this.processLabel(token, isOpcode);
                }
                else {
                    _this.context.emitSingle(token);
                }
            });
        };
        LabelEmitter.prototype.raiseUndeclaredLabel = function (label) {
            this.context.messages.push({
                type: IMessage_1.MessageType.Error,
                position: label.position,
                text: "Unrecognised label '" + this.labelName(label) + "'"
            });
        };
        LabelEmitter.prototype.processLabel = function (label, isOpcode) {
            var name = this.labelName(label);
            if (name in this.context.labels) {
                var labelLine = this.context.labels[name];
                var diff = labelLine;
                if (isOpcode) {
                    diff -= this.line;
                }
                var token = {
                    category: IToken_1.TokenCategory.Number,
                    lexeme: diff.toString(),
                    position: _.clone(label.position)
                };
                this.context.emitSingle(token);
            }
            else {
                this.raiseUndeclaredLabel(label);
            }
        };
        return LabelEmitter;
    })(PassBase_1.PassBase);
    exports.LabelEmitter = LabelEmitter;
});
//# sourceMappingURL=LabelEmitter.js.map