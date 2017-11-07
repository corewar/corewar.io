define(["require", "exports", "./Interface/IMessage", "./Interface/IParseOptions", "Parser"], function (require, exports, IMessage_1, IParseOptions_1, Parser_1) {
    var LoadParser = (function () {
        function LoadParser(scanner, filter, syntaxCheck, illegalCommandCheck, modPass) {
            this.scanner = scanner;
            this.filter = filter;
            this.syntaxCheck = syntaxCheck;
            this.illegalCommandCheck = illegalCommandCheck;
            this.modPass = modPass;
        }
        LoadParser.prototype.noErrors = function (context) {
            return !_(context.messages).any(function (message) {
                return message.type === IMessage_1.MessageType.Error;
            });
        };
        LoadParser.prototype.parse = function (document, options) {
            options = _.defaults(options || {}, Parser_1.Parser.DefaultOptions);
            var context = this.scanner.scan(document, options);
            if (this.noErrors(context)) {
                context = this.filter.process(context, options);
            }
            if (this.noErrors(context)) {
                context = this.syntaxCheck.process(context, options);
            }
            if (options.standard < IParseOptions_1.Standard.ICWS94draft) {
                if (this.noErrors(context)) {
                    context = this.illegalCommandCheck.process(context, options);
                }
            }
            if (this.noErrors(context)) {
                context = this.modPass.process(context, options);
            }
            return {
                metaData: context.metaData,
                tokens: context.tokens,
                messages: context.messages
            };
        };
        return LoadParser;
    })();
    exports.LoadParser = LoadParser;
});
//# sourceMappingURL=LoadParser.js.map