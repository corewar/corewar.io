define(["require", "exports"], function (require, exports) {
    var Context = (function () {
        function Context() {
            this.metaData = {
                name: "",
                author: "",
                strategy: ""
            };
            this.equs = {};
            this.tokens = [];
            this.labels = {};
            this.messages = [];
        }
        Context.prototype.emitSingle = function (token) {
            this.tokens.push(token);
        };
        Context.prototype.emit = function (tokens) {
            this.tokens = this.tokens.concat(tokens);
        };
        Context.prototype.hasValue = function (something) {
            return (!(_.isUndefined(something) || _.isNull(something)));
        };
        Context.prototype.emitInstruction = function (instruction) {
            if (this.hasValue(instruction.opcode)) {
                this.tokens.push(instruction.opcode);
            }
            if (this.hasValue(instruction.modifier)) {
                this.tokens.push(instruction.modifier);
            }
            if (this.hasValue(instruction.aOperand)) {
                if (this.hasValue(instruction.aOperand.mode)) {
                    this.tokens.push(instruction.aOperand.mode);
                }
                if (this.hasValue(instruction.aOperand.address)) {
                    this.tokens.push(instruction.aOperand.address);
                }
            }
            if (this.hasValue(instruction.comma)) {
                this.tokens.push(instruction.comma);
            }
            if (this.hasValue(instruction.bOperand)) {
                if (this.hasValue(instruction.bOperand.mode)) {
                    this.tokens.push(instruction.bOperand.mode);
                }
                if (this.hasValue(instruction.bOperand.address)) {
                    this.tokens.push(instruction.bOperand.address);
                }
            }
            if (this.hasValue(instruction.comment)) {
                this.tokens.push(instruction.comment);
            }
            if (this.hasValue(instruction.eol)) {
                this.tokens.push(instruction.eol);
            }
        };
        return Context;
    })();
    exports.Context = Context;
});
//# sourceMappingURL=Context.js.map