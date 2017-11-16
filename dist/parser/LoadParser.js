"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMessage_1 = require("./interface/IMessage");
const IParseOptions_1 = require("./interface/IParseOptions");
const _ = require("underscore");
const Parser_1 = require("./Parser");
class LoadParser {
    constructor(scanner, filter, syntaxCheck, illegalCommandCheck, modPass) {
        this.scanner = scanner;
        this.filter = filter;
        this.syntaxCheck = syntaxCheck;
        this.illegalCommandCheck = illegalCommandCheck;
        this.modPass = modPass;
    }
    noErrors(context) {
        return !_(context.messages).any((message) => {
            return message.type === IMessage_1.MessageType.Error;
        });
    }
    parse(document, options) {
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
    }
}
exports.LoadParser = LoadParser;
