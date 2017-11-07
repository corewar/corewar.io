var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./PassBase"], function (require, exports, IToken_1, PassBase_1) {
    var PreprocessEmitter = (function (_super) {
        __extends(PreprocessEmitter, _super);
        function PreprocessEmitter() {
            _super.apply(this, arguments);
        }
        PreprocessEmitter.prototype.processLine = function () {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Label &&
                next.lexeme in this.context.equs) {
                this.replaceLabel();
            }
            else {
                this.context.emit([this.stream.read()]);
            }
        };
        PreprocessEmitter.prototype.replaceLabel = function () {
            var label = this.stream.read();
            var originalExpression = this.context.equs[label.lexeme];
            var expression = _.map(originalExpression, function (token) {
                var clone = _.clone(token);
                clone.position = label.position;
                return clone;
            });
            this.context.emit(expression);
        };
        return PreprocessEmitter;
    })(PassBase_1.PassBase);
    exports.PreprocessEmitter = PreprocessEmitter;
});
//# sourceMappingURL=PreprocessEmitter.js.map