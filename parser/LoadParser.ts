import { IParser } from "./Interface/IParser";
import { IPass } from "./Interface/IPass";
import { IScanner } from "./Interface/IScanner";
import { IContext } from "./Interface/IContext";
import { IMessage, MessageType } from "./Interface/IMessage";
import { IParseOptions, Standard } from "./Interface/IParseOptions";
import { IParseResult } from "./Interface/IParseResult";
import * as _ from "underscore";

import { Parser } from "./Parser";

export class LoadParser implements IParser {

    private scanner: IScanner;
    private filter: IPass;
    private syntaxCheck: IPass;
    private illegalCommandCheck: IPass;
    private modPass: IPass;

    constructor(
        scanner: IScanner,
        filter: IPass,
        syntaxCheck: IPass,
        illegalCommandCheck: IPass,
        modPass: IPass) {

        this.scanner = scanner;
        this.filter = filter;
        this.syntaxCheck = syntaxCheck;
        this.illegalCommandCheck = illegalCommandCheck;
        this.modPass = modPass;
    }

    private noErrors(context: IContext): boolean {
        return !_(context.messages).any((message: IMessage) => {
            return message.type === MessageType.Error;
        });
    }

    parse(document: string, options?: IParseOptions): IParseResult {

        options = _.defaults(options || {}, Parser.DefaultOptions);

        var context = this.scanner.scan(document, options);

        if (this.noErrors(context)) {
            context = this.filter.process(context, options);
        }
        if (this.noErrors(context)) {
            context = this.syntaxCheck.process(context, options);
        }
        if (options.standard < Standard.ICWS94draft) {
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