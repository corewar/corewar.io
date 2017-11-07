var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./PassBase", "./Interface/IToken"], function (require, exports, PassBase_1, IToken_1) {
    var SyntaxCheck = (function (_super) {
        __extends(SyntaxCheck, _super);
        function SyntaxCheck() {
            _super.apply(this, arguments);
        }
        SyntaxCheck.prototype.processLine = function () {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Opcode) {
                this.parseInstruction();
            }
            else if (next.category === IToken_1.TokenCategory.Comment) {
                this.parseComment();
            }
            else if (next.category === IToken_1.TokenCategory.Preprocessor &&
                (next.lexeme === "END" || next.lexeme === "ORG")) {
                this.context.emit(this.stream.readToEOL());
            }
            else {
                this.stream.expected("instruction or comment", next);
            }
        };
        SyntaxCheck.prototype.mustEmit = function (category) {
            var token = this.stream.expect(category);
            this.context.emitSingle(token);
        };
        SyntaxCheck.prototype.mayEmit = function (category) {
            if (this.stream.peek().category === category) {
                this.context.emitSingle(this.stream.read());
            }
        };
        SyntaxCheck.prototype.parseComment = function () {
            this.mustEmit(IToken_1.TokenCategory.Comment);
            this.mustEmit(IToken_1.TokenCategory.EOL);
        };
        SyntaxCheck.prototype.parseInstruction = function () {
            this.mustEmit(IToken_1.TokenCategory.Opcode);
            this.mustEmit(IToken_1.TokenCategory.Modifier);
            this.mustEmit(IToken_1.TokenCategory.Mode);
            this.mustEmit(IToken_1.TokenCategory.Number);
            this.mustEmit(IToken_1.TokenCategory.Comma);
            this.mustEmit(IToken_1.TokenCategory.Mode);
            this.mustEmit(IToken_1.TokenCategory.Number);
            this.mayEmit(IToken_1.TokenCategory.Comment);
            this.mustEmit(IToken_1.TokenCategory.EOL);
        };
        return SyntaxCheck;
    })(PassBase_1.PassBase);
    exports.SyntaxCheck = SyntaxCheck;
});
//# sourceMappingURL=SyntaxCheck.js.map