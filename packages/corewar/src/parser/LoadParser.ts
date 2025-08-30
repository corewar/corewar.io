﻿import { IParser } from './interface/IParser'
import { IPass } from './interface/IPass'
import { IScanner } from './interface/IScanner'
import { IContext } from './interface/IContext'
import { IMessage, MessageType } from './interface/IMessage'
import { IParseOptions, Standard } from './interface/IParseOptions'
import { IParseResult } from './interface/IParseResult'

import { Parser } from './Parser'

export class LoadParser implements IParser {
    private scanner: IScanner
    private filter: IPass
    private syntaxCheck: IPass
    private illegalCommandCheck: IPass
    private modPass: IPass

    constructor(scanner: IScanner, filter: IPass, syntaxCheck: IPass, illegalCommandCheck: IPass, modPass: IPass) {
        this.scanner = scanner
        this.filter = filter
        this.syntaxCheck = syntaxCheck
        this.illegalCommandCheck = illegalCommandCheck
        this.modPass = modPass
    }

    private noErrors(context: IContext): boolean {
        return !context.messages.some((message: IMessage) => {
            return message.type === MessageType.Error
        })
    }

    parse(document: string, options?: IParseOptions): IParseResult {
        options = Object.assign({}, Parser.DefaultOptions, options || {})

        let context = this.scanner.scan(document, options)

        if (this.noErrors(context)) {
            context = this.filter.process(context, options)
        }
        if (this.noErrors(context)) {
            context = this.syntaxCheck.process(context, options)
        }
        if (options.standard < Standard.ICWS94draft) {
            if (this.noErrors(context)) {
                context = this.illegalCommandCheck.process(context, options)
            }
        }
        if (this.noErrors(context)) {
            context = this.modPass.process(context, options)
        }

        return {
            metaData: context.metaData,
            tokens: context.tokens,
            messages: context.messages,
            success: !context.messages.some(message => message.type === MessageType.Error)
        }
    }
}
