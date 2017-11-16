"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const PassBase_1 = require("./PassBase");
class ForPass extends PassBase_1.PassBase {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    processLine() {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
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
    }
    isFor(pre) {
        return pre.category === IToken_1.TokenCategory.Preprocessor &&
            pre.lexeme === "FOR";
    }
    processLabel() {
        var label = this.stream.read();
        var pre = this.stream.read();
        if (this.isFor(pre)) {
            this.processFor(label, pre);
        }
        else {
            this.context.emit([label]);
            this.context.emit([pre]);
        }
    }
    // private warnDuplicateLabel(label: IToken) {
    //    this.context.messages.push({
    //        type: MessageType.Warning,
    //        position: label.position,
    //        text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
    //    });
    // }
    processFor(label, pre) {
        // TODO use label (and reinstate warnDuplicateLabel)
        // TODO stringinisation
        // TODO loop counter variable subs
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
    }
}
exports.ForPass = ForPass;
