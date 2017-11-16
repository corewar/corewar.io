"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const IParseOptions_1 = require("./interface/IParseOptions");
const _ = require("underscore");
const PassBase_1 = require("./PassBase");
class OrgPass extends PassBase_1.PassBase {
    process(context, options) {
        // Replace END ### with ORG ###
        // Emit ORG as first instruction
        // Raise warning for duplicate ORGs / END ###
        // Under ICWS'86 - if no END ### found, if start label defined, emit ORG start
        this.firstInstruction = null;
        this.org = null;
        this.orgAddress = null;
        this.orgComment = null;
        var result = super.process(context, options);
        this.emitOrg();
        return result;
    }
    processLine() {
        var next = this.stream.peek();
        if (this.firstInstruction === null &&
            next.category !== IToken_1.TokenCategory.Comment) {
            this.firstInstruction = this.stream.position;
        }
        if (next.category === IToken_1.TokenCategory.Preprocessor) {
            if (next.lexeme === "ORG") {
                this.processOrg();
            }
            else if (next.lexeme === "END") {
                this.processEnd();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    processOrg() {
        var org = this.stream.expectOnly("ORG");
        this.org = org;
        if (this.orgAddress !== null) {
            this.stream.warn(org, "Redefinition of ORG encountered, this later definition will take effect");
        }
        var address = this.stream.expect(IToken_1.TokenCategory.Number);
        this.orgAddress = parseInt(address.lexeme, 10);
        if (this.stream.peek().category === IToken_1.TokenCategory.Comment) {
            this.orgComment = this.stream.read();
        }
        this.stream.expect(IToken_1.TokenCategory.EOL);
    }
    processEnd() {
        var end = this.stream.expectOnly("END");
        var address = null;
        var comment = null;
        if (this.stream.peek().category === IToken_1.TokenCategory.Number) {
            address = this.stream.read();
        }
        if (this.stream.peek().category === IToken_1.TokenCategory.Comment) {
            comment = this.stream.read();
        }
        this.stream.expect(IToken_1.TokenCategory.EOL);
        if (address !== null) {
            if (this.orgAddress !== null) {
                this.stream.warn(end, "Encountered both ORG and END address, the ORG definition will take effect");
            }
            else {
                this.org = end;
                this.orgAddress = parseInt(address.lexeme, 10);
            }
        }
    }
    emitOrg() {
        if (this.orgAddress === null) {
            if (this.options.standard === IParseOptions_1.Standard.ICWS86 &&
                _(_(this.context.labels).keys()).contains(OrgPass.START_LABEL)) {
                this.orgAddress = this.context.labels[OrgPass.START_LABEL];
            }
            else {
                this.orgAddress = 0;
            }
            this.org = {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            };
        }
        var org = {
            category: IToken_1.TokenCategory.Preprocessor,
            lexeme: "ORG",
            position: _.clone(this.org.position)
        };
        var address = {
            category: IToken_1.TokenCategory.Number,
            lexeme: this.orgAddress.toString(),
            position: _.clone(this.org.position)
        };
        var instruction = [org, address];
        if (this.orgComment !== null) {
            instruction.push(this.orgComment);
        }
        instruction.push({
            category: IToken_1.TokenCategory.EOL,
            lexeme: "\n",
            position: _.clone(this.org.position)
        });
        // HACK this is the only way I could find to insert an array into an array!
        var args = [this.firstInstruction, 0];
        this.context.tokens.splice.apply(this.context.tokens, args.concat(instruction));
    }
}
OrgPass.START_LABEL = "start";
exports.OrgPass = OrgPass;
