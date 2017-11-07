var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./PassBase"], function (require, exports, IToken_1, PassBase_1) {
    var Filter = (function (_super) {
        __extends(Filter, _super);
        function Filter() {
            _super.apply(this, arguments);
        }
        Filter.prototype.processLine = function () {
            var line;
            var next = this.stream.peek();
            switch (next.category) {
                case IToken_1.TokenCategory.EOL:
                    this.processEmptyLine();
                    break;
                case IToken_1.TokenCategory.Preprocessor:
                    if (next.lexeme === "END") {
                        this.processEnd();
                    }
                    else {
                        line = this.stream.readToEOL();
                        this.context.emit(line);
                    }
                    break;
                default:
                    line = this.stream.readToEOL();
                    this.context.emit(line);
                    break;
            }
        };
        Filter.prototype.processEmptyLine = function () {
            this.stream.readToEOL();
        };
        Filter.prototype.processEnd = function () {
            var line = this.stream.readToEOL();
            this.context.emit(line);
            this.stream.position = this.stream.tokens.length;
        };
        return Filter;
    })(PassBase_1.PassBase);
    exports.Filter = Filter;
});
//# sourceMappingURL=Filter.js.map