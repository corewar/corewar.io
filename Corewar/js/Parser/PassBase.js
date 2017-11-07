define(["require", "exports", "./TokenStream"], function (require, exports, TokenStream_1) {
    var PassBase = (function () {
        function PassBase() {
        }
        PassBase.prototype.process = function (context, options) {
            this.context = context;
            this.stream = new TokenStream_1.TokenStream(context.tokens, context.messages);
            this.context.tokens = [];
            this.options = options;
            this.processLines();
            return this.context;
        };
        PassBase.prototype.processLines = function () {
            while (!this.stream.eof()) {
                try {
                    this.processLine();
                }
                catch (err) {
                    this.stream.readToEOL();
                }
            }
        };
        PassBase.prototype.processLine = function () {
            throw new Error("PassBase.processLine is an Abstract Method");
        };
        return PassBase;
    })();
    exports.PassBase = PassBase;
});
//# sourceMappingURL=PassBase.js.map