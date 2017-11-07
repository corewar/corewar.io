define(["require", "exports", "./Interface/IToken", "./Interface/IMessage"], function (require, exports, IToken_1, IMessage_1) {
    var PreprocessAnalyser = (function () {
        function PreprocessAnalyser() {
        }
        PreprocessAnalyser.prototype.process = function (context, options) {
            this.context = context;
            this.references = {};
            this.collectReferences();
            if (this.noCircularReferences()) {
                this.replaceAllReferences();
            }
            return this.context;
        };
        PreprocessAnalyser.prototype.collectReferences = function () {
            var _this = this;
            var keys = _(this.context.equs).keys();
            _(keys).forEach(function (key) {
                var expression = _this.context.equs[key];
                var references = _(expression).filter(function (token) {
                    return token.category === IToken_1.TokenCategory.Label &&
                        _(keys).contains(token.lexeme);
                });
                _this.references[key] = _(references).map(function (token) {
                    return token.lexeme;
                });
            });
        };
        PreprocessAnalyser.prototype.raiseCircularReference = function (key, reference) {
            this.context.messages.push({
                text: "Circular reference detected in '" + key + "' EQU statement",
                type: IMessage_1.MessageType.Error,
                position: { line: 1, char: 1 }
            });
        };
        PreprocessAnalyser.prototype.noCircularReferences = function () {
            var _this = this;
            var keys = _(this.context.equs).keys();
            var result = true;
            _(keys).forEach(function (key) {
                try {
                    var seen = [];
                    _this.detectCircularReferencesRecursive(key, seen);
                }
                catch (reference) {
                    _this.raiseCircularReference(key, reference);
                    result = false;
                }
            });
            return result;
        };
        PreprocessAnalyser.prototype.detectCircularReferencesRecursive = function (token, seen) {
            var _this = this;
            if (_(seen).contains(token)) {
                throw token;
            }
            seen.push(token);
            _(this.references[token]).forEach(function (reference) {
                _this.detectCircularReferencesRecursive(reference, seen);
            });
            var i = seen.indexOf(token);
            seen.splice(i, 1);
        };
        PreprocessAnalyser.prototype.replaceAllReferences = function () {
            var _this = this;
            var keys = _(this.context.equs).keys();
            _(keys).forEach(function (key) {
                _this.replaceReferences(key);
            });
        };
        PreprocessAnalyser.prototype.replaceReferences = function (key) {
            var expression = this.context.equs[key];
            var keys = _(this.context.equs).keys();
            while (_(expression).any(function (token) {
                return token.category === IToken_1.TokenCategory.Label &&
                    _(keys).contains(token.lexeme);
            })) {
                for (var i = 0; i < expression.length; i++) {
                    if (expression[i].category === IToken_1.TokenCategory.Label) {
                        var label = expression[i].lexeme;
                        if (_(keys).contains(label)) {
                            var args = [i, 1];
                            expression.splice.apply(expression, args.concat(this.context.equs[label]));
                        }
                    }
                }
            }
        };
        return PreprocessAnalyser;
    })();
    exports.PreprocessAnalyser = PreprocessAnalyser;
});
//# sourceMappingURL=PreprocessAnalyser.js.map