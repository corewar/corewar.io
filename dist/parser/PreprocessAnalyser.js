"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const IMessage_1 = require("./interface/IMessage");
const _ = require("underscore");
class PreprocessAnalyser {
    process(context, options) {
        // Detect dependencies between EQU expressions
        // Raise circular reference errors
        // Replace references to EQU labels in other EQU label definitions
        this.context = context;
        this.references = {};
        this.collectReferences();
        if (this.noCircularReferences()) {
            this.replaceAllReferences();
        }
        return this.context;
    }
    collectReferences() {
        var keys = _(this.context.equs).keys();
        _(keys).forEach((key) => {
            var expression = this.context.equs[key];
            var references = _(expression).filter((token) => {
                return token.category === IToken_1.TokenCategory.Label &&
                    _(keys).contains(token.lexeme);
            });
            this.references[key] = _(references).map((token) => {
                return token.lexeme;
            });
        });
    }
    raiseCircularReference(key, reference) {
        this.context.messages.push({
            text: "Circular reference detected in '" + key + "' EQU statement",
            type: IMessage_1.MessageType.Error,
            // TODO proper position
            position: { line: 1, char: 1 }
        });
    }
    noCircularReferences() {
        var keys = _(this.context.equs).keys();
        var result = true;
        _(keys).forEach((key) => {
            try {
                var seen = [];
                this.detectCircularReferencesRecursive(key, seen);
            }
            catch (reference) {
                this.raiseCircularReference(key, reference);
                result = false;
            }
        });
        return result;
    }
    detectCircularReferencesRecursive(token, seen) {
        if (_(seen).contains(token)) {
            throw token;
        }
        seen.push(token);
        _(this.references[token]).forEach((reference) => {
            this.detectCircularReferencesRecursive(reference, seen);
        });
        var i = seen.indexOf(token);
        seen.splice(i, 1);
    }
    replaceAllReferences() {
        var keys = _(this.context.equs).keys();
        _(keys).forEach((key) => {
            this.replaceReferences(key);
        });
    }
    replaceReferences(key) {
        var expression = this.context.equs[key];
        var keys = _(this.context.equs).keys();
        while (_(expression).any((token) => {
            return token.category === IToken_1.TokenCategory.Label &&
                _(keys).contains(token.lexeme);
        })) {
            for (var i = 0; i < expression.length; i++) {
                if (expression[i].category === IToken_1.TokenCategory.Label) {
                    var label = expression[i].lexeme;
                    if (_(keys).contains(label)) {
                        // HACK this is the only way I could find to insert an array into an array!
                        var args = [i, 1];
                        expression.splice.apply(expression, args.concat(this.context.equs[label]));
                    }
                }
            }
        }
    }
}
exports.PreprocessAnalyser = PreprocessAnalyser;
