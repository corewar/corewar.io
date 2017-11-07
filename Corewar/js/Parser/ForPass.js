var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./PassBase"], function (require, exports, IToken_1, PassBase_1) {
    var ForPass = (function (_super) {
        __extends(ForPass, _super);
        function ForPass(expression) {
            _super.call(this);
            this.expression = expression;
        }
        ForPass.prototype.processLine = function () {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Label) {
                this.processLabel();
            }
            else if (this.isFor(next)) {
                var pre = this.stream.expectOnly("FOR");
                this.processFor(null, pre);
            }
            else {
                var line = this.stream.readToEOL();
                this.context.emit(line);
            }
        };
        ForPass.prototype.isFor = function (pre) {
            return pre.category === IToken_1.TokenCategory.Preprocessor &&
                pre.lexeme === "FOR";
        };
        ForPass.prototype.processLabel = function () {
            var label = this.stream.read();
            var pre = this.stream.read();
            if (this.isFor(pre)) {
                this.processFor(label, pre);
            }
            else {
                this.context.emit([label]);
                this.context.emit([pre]);
            }
        };
        ForPass.prototype.processFor = function (label, pre) {
            var count = this.expression.parse(this.stream);
            if (this.stream.peek().category === IToken_1.TokenCategory.Comment) {
                this.stream.read();
            }
            this.stream.expect(IToken_1.TokenCategory.EOL);
            var expression = this.stream.readToEOL();
            while (!this.stream.eof() && this.stream.peek().lexeme !== "ROF") {
                expression = expression.concat(this.stream.readToEOL());
            }
            this.stream.expectOnly("ROF");
            for (var i = 0; i < count; i++) {
                this.context.emit(expression);
            }
            this.stream.readToEOL();
        };
        return ForPass;
    })(PassBase_1.PassBase);
    exports.ForPass = ForPass;
});
//# sourceMappingURL=ForPass.js.map