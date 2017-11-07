import { IParser } from "./Interface/IParser";
import { IPass } from "./Interface/IPass";
import { IScanner } from "./Interface/IScanner";
import { IContext } from "./Interface/IContext";
import { IMessage, MessageType } from "./Interface/IMessage";
import { IParseOptions, Standard } from "./Interface/IParseOptions";
import { IParseResult } from "./Interface/IParseResult";

export class Parser implements IParser {

    private scanner: IScanner;
    private filter: IPass;
    private forPass: IPass;
    private preprocessCollector: IPass;
    private preprocessAnalyser: IPass;
    private preprocessEmitter: IPass;
    private labelCollector: IPass;
    private labelEmitter: IPass;
    private mathsProcessor: IPass;
    private defaultPass: IPass;
    private orgPass: IPass;
    private syntaxCheck: IPass;
    private illegalCommandCheck: IPass;

    public static DefaultOptions: IParseOptions = {
        standard: Standard.ICWS94draft,
        coresize: 8192
    };

    constructor(
        scanner: IScanner,
        filter: IPass,
        forPass: IPass,
        preprocessCollector: IPass,
        preprocessAnalyser: IPass,
        preprocessEmitter: IPass,
        labelCollector: IPass,
        labelEmitter: IPass,
        mathsProcessor: IPass,
        defaultPass: IPass,
        orgPass: IPass,
        syntaxCheck: IPass,
        illegalCommandCheck: IPass) {

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

    private noErrors(context: IContext): boolean {
        return !_(context.messages).any((message: IMessage) => {
            return message.type === MessageType.Error;
        });
    }

    public parse(document: string, options?: IParseOptions): IParseResult {

        options = _.defaults(options || {}, Parser.DefaultOptions);

        var context = this.scanner.scan(document, options);

        if (this.noErrors(context)) {
            context = this.filter.process(context, options);
        }
        if (options.standard === Standard.ICWS94draft) {
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
        if (options.standard < Standard.ICWS94draft) {
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