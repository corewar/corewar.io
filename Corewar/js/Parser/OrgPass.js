var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./Interface/IParseOptions", "./PassBase"], function (require, exports, IToken_1, IParseOptions_1, PassBase_1) {
    var OrgPass = (function (_super) {
        __extends(OrgPass, _super);
        function OrgPass() {
            _super.apply(this, arguments);
        }
        OrgPass.prototype.process = function (context, options) {
            this.firstInstruction = null;
            this.org = null;
            this.orgAddress = null;
            this.orgComment = null;
            var result = _super.prototype.process.call(this, context, options);
            this.emitOrg();
            return result;
        };
        OrgPass.prototype.processLine = function () {
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
        };
        OrgPass.prototype.processOrg = function () {
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
        };
        OrgPass.prototype.processEnd = function () {
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
        };
        OrgPass.prototype.emitOrg = function () {
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
            var args = [this.firstInstruction, 0];
            this.context.tokens.splice.apply(this.context.tokens, args.concat(instruction));
        };
        OrgPass.START_LABEL = "start";
        return OrgPass;
    })(PassBase_1.PassBase);
    exports.OrgPass = OrgPass;
});
//# sourceMappingURL=OrgPass.js.map