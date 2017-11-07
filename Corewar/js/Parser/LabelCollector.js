var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./Interface/IParseOptions", "./PassBase"], function (require, exports, IToken_1, IParseOptions_1, PassBase_1) {
    var LabelCollector = (function (_super) {
        __extends(LabelCollector, _super);
        function LabelCollector() {
            _super.apply(this, arguments);
        }
        LabelCollector.prototype.process = function (context, options) {
            this.line = -1;
            return _super.prototype.process.call(this, context, options);
        };
        LabelCollector.prototype.labelName = function (token) {
            switch (this.options.standard) {
                case IParseOptions_1.Standard.ICWS86:
                case IParseOptions_1.Standard.ICWS88:
                    return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
                default:
                    return token.lexeme;
            }
        };
        LabelCollector.prototype.processLine = function () {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Label ||
                next.category === IToken_1.TokenCategory.Opcode) {
                this.line++;
            }
            if (this.stream.peek().category === IToken_1.TokenCategory.Label) {
                this.processLabel();
            }
            var tokens = this.stream.readToEOL();
            this.context.emit(tokens);
        };
        LabelCollector.prototype.processLabel = function () {
            while (!this.stream.eof() && this.stream.peek().category === IToken_1.TokenCategory.Label) {
                var label = this.stream.expect(IToken_1.TokenCategory.Label);
                var name = this.labelName(label);
                if (name in this.context.labels ||
                    name in this.context.equs) {
                    this.stream.warn(label, "Redefinition of label '" + this.labelName(label) + "', original definition will be used");
                }
                else {
                    this.context.labels[name] = this.line;
                }
            }
            var next = this.stream.peek();
            if (next.lexeme === "END") {
                return;
            }
            var opcode = this.stream.expect(IToken_1.TokenCategory.Opcode);
            this.context.emitSingle(opcode);
        };
        return LabelCollector;
    })(PassBase_1.PassBase);
    exports.LabelCollector = LabelCollector;
});
//# sourceMappingURL=LabelCollector.js.map