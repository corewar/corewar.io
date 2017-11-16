"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMessage_1 = require("./interface/IMessage");
const IParseOptions_1 = require("./interface/IParseOptions");
const _ = require("underscore");
class Parser {
    constructor(scanner, filter, forPass, preprocessCollector, preprocessAnalyser, preprocessEmitter, labelCollector, labelEmitter, mathsProcessor, defaultPass, orgPass, syntaxCheck, illegalCommandCheck) {
        this.scanner = scanner;
        this.filter = filter;
        this.forPass = forPass;
        this.preprocessCollector = preprocessCollector;
        this.preprocessAnalyser = preprocessAnalyser;
        this.preprocessEmitter = preprocessEmitter;
        this.labelCollector = labelCollector;
        this.labelEmitter = labelEmitter;
        this.mathsProcessor = mathsProcessor;
        this.defaultPass = defaultPass;
        this.orgPass = orgPass;
        this.syntaxCheck = syntaxCheck;
        this.illegalCommandCheck = illegalCommandCheck;
    }
    noErrors(context) {
        return !_(context.messages).any((message) => {
            return message.type === IMessage_1.MessageType.Error;
        });
    }
    parse(document, options) {
        options = _.defaults(options || {}, Parser.DefaultOptions);
        var context = this.scanner.scan(document, options);
        if (this.noErrors(context)) {
            context = this.filter.process(context, options);
        }
        if (options.standard === IParseOptions_1.Standard.ICWS94draft) {
            if (this.noErrors(context)) {
                context = this.forPass.process(context, options);
            }
        }
        if (this.noErrors(context)) {
            context = this.preprocessCollector.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.preprocessAnalyser.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.preprocessEmitter.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.labelCollector.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.labelEmitter.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.mathsProcessor.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.orgPass.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.defaultPass.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.syntaxCheck.process(context, options);
        }
        if (options.standard < IParseOptions_1.Standard.ICWS94draft) {
            if (this.noErrors(context)) {
                context = this.illegalCommandCheck.process(context, options);
            }
        }
        return {
            metaData: context.metaData,
            tokens: context.tokens,
            messages: context.messages
        };
    }
}
Parser.DefaultOptions = {
    standard: IParseOptions_1.Standard.ICWS94draft,
    coresize: 8192
};
exports.Parser = Parser;
