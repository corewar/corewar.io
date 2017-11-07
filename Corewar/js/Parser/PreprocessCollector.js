var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IParseOptions", "./Interface/IToken", "./Interface/IMessage", "./PassBase"], function (require, exports, IParseOptions_1, IToken_1, IMessage_1, PassBase_1) {
    var PreprocessCollector = (function (_super) {
        __extends(PreprocessCollector, _super);
        function PreprocessCollector() {
            _super.apply(this, arguments);
        }
        PreprocessCollector.prototype.process = function (context, options) {
            this.previous = [];
            return _super.prototype.process.call(this, context, options);
        };
        PreprocessCollector.prototype.processLine = function () {
            while (!this.stream.eof()) {
                var next = this.stream.peek();
                if (next.category === IToken_1.TokenCategory.Label) {
                    this.previous = [];
                    this.processLabels();
                }
                else if (this.isMultilineEqu(next)) {
                    this.processMultilineEqu();
                }
                else {
                    var line = this.stream.readToEOL();
                    this.context.emit(line);
                }
            }
        };
        PreprocessCollector.prototype.isMultilineEqu = function (next) {
            return next.category === IToken_1.TokenCategory.Preprocessor &&
                next.lexeme === "EQU" &&
                this.previous.length > 0 &&
                this.options.standard === IParseOptions_1.Standard.ICWS94draft;
        };
        PreprocessCollector.prototype.isEqu = function (pre) {
            return pre.category === IToken_1.TokenCategory.Preprocessor &&
                pre.lexeme === "EQU";
        };
        PreprocessCollector.prototype.processLabels = function () {
            var labels = [];
            while (this.stream.peek().category === IToken_1.TokenCategory.Label) {
                var token = this.stream.expect(IToken_1.TokenCategory.Label);
                this.previous.push(token.lexeme);
                labels.push(token);
            }
            var pre = this.stream.read();
            if (this.isEqu(pre)) {
                this.processEqu(labels);
            }
            else {
                this.previous = [];
                this.context.emit(labels);
                this.context.emit([pre]);
            }
        };
        PreprocessCollector.prototype.warnDuplicateLabel = function (label) {
            this.context.messages.push({
                type: IMessage_1.MessageType.Warning,
                position: label.position,
                text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
            });
        };
        PreprocessCollector.prototype.processEqu = function (labels) {
            var _this = this;
            var expression = this.stream.readToEOL();
            expression.pop();
            expression = _.filter(expression, function (token) {
                return token.category !== IToken_1.TokenCategory.Comment;
            });
            _.forEach(labels, function (label) {
                if (label.lexeme in _this.context.equs) {
                    _this.warnDuplicateLabel(label);
                }
                else {
                    _this.context.equs[label.lexeme] = expression;
                }
            });
        };
        PreprocessCollector.prototype.processMultilineEqu = function () {
            var _this = this;
            this.stream.expectOnly("EQU");
            var expression = [{
                    category: IToken_1.TokenCategory.EOL,
                    lexeme: "\n",
                    position: _.clone(this.stream.peek().position)
                }];
            expression = expression.concat(this.stream.readToEOL());
            expression.pop();
            _(this.previous).forEach(function (label) {
                var existing = _this.context.equs[label];
                _this.context.equs[label] = existing.concat(expression);
            });
        };
        return PreprocessCollector;
    })(PassBase_1.PassBase);
    exports.PreprocessCollector = PreprocessCollector;
});
//# sourceMappingURL=PreprocessCollector.js.map