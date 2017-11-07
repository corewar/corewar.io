var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./PassBase"], function (require, exports, IToken_1, PassBase_1) {
    var MathsProcessor = (function (_super) {
        __extends(MathsProcessor, _super);
        function MathsProcessor(expression) {
            _super.call(this);
            this.expression = expression;
        }
        MathsProcessor.prototype.processLine = function () {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Number ||
                next.category === IToken_1.TokenCategory.Maths) {
                try {
                    var address = this.expression.parse(this.stream);
                    this.context.emitSingle({
                        category: IToken_1.TokenCategory.Number,
                        lexeme: address.toString(),
                        position: _.clone(next.position)
                    });
                }
                catch (err) {
                    this.stream.readToEOL();
                }
            }
            else {
                this.context.emitSingle(this.stream.read());
            }
        };
        return MathsProcessor;
    })(PassBase_1.PassBase);
    exports.MathsProcessor = MathsProcessor;
});
//# sourceMappingURL=MathsProcessor.js.map