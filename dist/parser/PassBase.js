"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenStream_1 = require("./TokenStream");
class PassBase {
    process(context, options) {
        // TODO CONSTANTS - need to define core settings at compile time
        // TODO P-Space
        // TODO ;redcode tags
        // TODO stringify and FOR variables
        // TODO loader should check against run options e.g. no P-space etc.
        this.context = context;
        this.stream = new TokenStream_1.TokenStream(context.tokens, context.messages);
        this.context.tokens = [];
        this.options = options;
        this.processLines();
        return this.context;
    }
    processLines() {
        while (!this.stream.eof()) {
            try {
                this.processLine();
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
    }
    processLine() {
        throw new Error("PassBase.processLine is an Abstract Method");
    }
}
exports.PassBase = PassBase;
