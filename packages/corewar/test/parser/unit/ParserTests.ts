import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import { IContext } from '@parser/interface/IContext'
import { Context } from '@parser/Context'
import { IScanner } from '@parser/interface/IScanner'
import { IPass } from '@parser/interface/IPass'
import { Parser } from '@parser/Parser'
import { IOptions } from '@simulator/interface/IOptions'
import { IMessage, MessageType } from '@parser/interface/IMessage'
import { Standard } from '@parser/interface/IParseOptions'

describe('Parser', () => {
    let context: IContext

    let scanner: IScanner
    let filter: IPass
    let metaDataCollector: IPass
    let forPass: IPass
    let preprocessCollector: IPass
    let preprocessAnalyser: IPass
    let preprocessEmitter: IPass
    let labelCollector: IPass
    let labelEmitter: IPass
    let mathsProcessor: IPass
    let defaultPass: IPass
    let orgPass: IPass
    let syntaxCheck: IPass
    let illegalCommandCheck: IPass
    let metaDataEmitter: IPass

    let parser: Parser

    let calls: string[]

    const expected94Calls = [
        'scan',
        'metaDataCollector',
        'filter',
        'for',
        'equCollector',
        'equAnalyser',
        'equEmitter',
        'labelCollector',
        'labelEmitter',
        'maths',
        'org',
        'default',
        'syntax',
        'metaDataEmitter'
    ]

    function fakeScanner(name: string): IScanner {
        return {
            scan: sinon.stub().callsFake(
                (_: string, __: IOptions): IContext => {
                    calls.push(name)
                    return context
                }
            )
        }
    }

    function fakePass(name: string): IPass {
        return {
            process: sinon.stub().callsFake(
                (context: IContext, _: IOptions): IContext => {
                    calls.push(name)
                    return context
                }
            )
        }
    }

    function fakeError(): IMessage {
        return {
            text: '',
            type: MessageType.Error,
            position: { line: 1, char: 1 }
        }
    }

    function fakeWarning(): IMessage {
        return {
            text: '',
            type: MessageType.Warning,
            position: { line: 1, char: 1 }
        }
    }

    function errorIn(pass: IPass, name: string): void {
        ;(pass.process as sinon.SinonStub).callsFake(
            (): IContext => {
                context.messages.push(fakeError())
                calls.push(name)
                return context
            }
        )
    }

    function warningIn(pass: IPass, name: string): void {
        ;(pass.process as sinon.SinonStub).callsFake(
            (): IContext => {
                context.messages.push(fakeWarning())
                calls.push(name)
                return context
            }
        )
    }

    beforeEach(() => {
        calls = []
        context = new Context()

        scanner = fakeScanner('scan')
        filter = fakePass('filter')
        metaDataCollector = fakePass('metaDataCollector')
        forPass = fakePass('for')
        preprocessCollector = fakePass('equCollector')
        preprocessAnalyser = fakePass('equAnalyser')
        preprocessEmitter = fakePass('equEmitter')
        labelCollector = fakePass('labelCollector')
        labelEmitter = fakePass('labelEmitter')
        mathsProcessor = fakePass('maths')
        defaultPass = fakePass('default')
        orgPass = fakePass('org')
        syntaxCheck = fakePass('syntax')
        illegalCommandCheck = fakePass('illegal')
        metaDataEmitter = fakePass('metaDataEmitter')

        parser = new Parser(
            scanner,
            filter,
            metaDataCollector,
            forPass,
            preprocessCollector,
            preprocessAnalyser,
            preprocessEmitter,
            labelCollector,
            labelEmitter,
            mathsProcessor,
            defaultPass,
            orgPass,
            syntaxCheck,
            illegalCommandCheck,
            metaDataEmitter
        )
    })

    it("Calls passes in correct order under ICWS'94-draft", () => {
        const options = Parser.DefaultOptions

        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(14)

        expect(calls).to.deep.equal(expected94Calls)
    })

    it("Calls passes in correct order under ICWS'88", () => {
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 })

        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(14)

        expect(calls[0]).to.be.equal('scan')
        expect(calls[1]).to.be.equal('metaDataCollector')
        expect(calls[2]).to.be.equal('filter')
        expect(calls[3]).to.be.equal('equCollector')
        expect(calls[4]).to.be.equal('equAnalyser')
        expect(calls[5]).to.be.equal('equEmitter')
        expect(calls[6]).to.be.equal('labelCollector')
        expect(calls[7]).to.be.equal('labelEmitter')
        expect(calls[8]).to.be.equal('maths')
        expect(calls[9]).to.be.equal('org')
        expect(calls[10]).to.be.equal('default')
        expect(calls[11]).to.be.equal('syntax')
        expect(calls[12]).to.be.equal('illegal')
        expect(calls[13]).to.be.equal('metaDataEmitter')
    })

    it("Calls passes in correct order under ICWS'86", () => {
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 })

        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(14)

        expect(calls[0]).to.be.equal('scan')
        expect(calls[1]).to.be.equal('metaDataCollector')
        expect(calls[2]).to.be.equal('filter')
        expect(calls[3]).to.be.equal('equCollector')
        expect(calls[4]).to.be.equal('equAnalyser')
        expect(calls[5]).to.be.equal('equEmitter')
        expect(calls[6]).to.be.equal('labelCollector')
        expect(calls[7]).to.be.equal('labelEmitter')
        expect(calls[8]).to.be.equal('maths')
        expect(calls[9]).to.be.equal('org')
        expect(calls[10]).to.be.equal('default')
        expect(calls[11]).to.be.equal('syntax')
        expect(calls[12]).to.be.equal('illegal')
        expect(calls[13]).to.be.equal('metaDataEmitter')
    })

    it('Does not call syntax check if default pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(defaultPass, 'default')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(13)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 12).concat('metaDataEmitter'))
    })

    it('Does not call default pass check if org pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(orgPass, 'org')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(12)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 11).concat('metaDataEmitter'))
    })

    it('Does not call org pass if maths pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(mathsProcessor, 'maths')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(11)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 10).concat('metaDataEmitter'))
    })

    it('Does not call maths pass if label emitter fails', () => {
        const options = Parser.DefaultOptions

        errorIn(labelEmitter, 'labelEmitter')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(10)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 9).concat('metaDataEmitter'))
    })

    it('Does not call label emitter if label collector fails', () => {
        const options = Parser.DefaultOptions

        errorIn(labelCollector, 'labelCollector')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(9)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 8).concat('metaDataEmitter'))
    })

    it('Does not call label collector if equ emitter fails', () => {
        const options = Parser.DefaultOptions

        errorIn(preprocessEmitter, 'equEmitter')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(8)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 7).concat('metaDataEmitter'))
    })

    it('Does not call equ emitter if equ analyser fails', () => {
        const options = Parser.DefaultOptions

        errorIn(preprocessAnalyser, 'equAnalyser')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(7)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 6).concat('metaDataEmitter'))
    })

    it('Does not call equ analyser if equ collector fails', () => {
        const options = Parser.DefaultOptions

        errorIn(preprocessCollector, 'equCollector')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(6)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 5).concat('metaDataEmitter'))
    })

    it('Does not call equ collector if for pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(forPass, 'for')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(5)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 4).concat('metaDataEmitter'))
    })

    it('Does not call for pass if filter pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(filter, 'filter')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(4)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 3).concat('metaDataEmitter'))
    })

    it('Does not call filter pass if metadata collector pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(metaDataCollector, 'metaDataCollector')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(3)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 2).concat('metaDataEmitter'))
    })

    it('Does not call filter pass if scan fails', () => {
        const options = Parser.DefaultOptions
        ;(scanner.scan as sinon.SinonStub).callsFake(
            (): IContext => {
                context.messages.push(fakeError())
                calls.push('scan')
                return context
            }
        )

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(2)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 1).concat('metaDataEmitter'))
    })

    it('Does call all passes regardless of raised warnings', () => {
        const options = Parser.DefaultOptions
        ;(scanner.scan as sinon.SinonStub).callsFake(
            (): IContext => {
                context.messages.push(fakeWarning())
                calls.push('scan')
                return context
            }
        )
        warningIn(filter, 'filter')
        warningIn(metaDataCollector, 'metaDataCollector')
        warningIn(forPass, 'for')
        warningIn(preprocessCollector, 'equCollector')
        warningIn(preprocessAnalyser, 'equAnalyser')
        warningIn(preprocessEmitter, 'equEmitter')
        warningIn(labelCollector, 'labelCollector')
        warningIn(labelEmitter, 'labelEmitter')
        warningIn(mathsProcessor, 'maths')
        warningIn(orgPass, 'org')
        warningIn(defaultPass, 'default')
        warningIn(syntaxCheck, 'syntax')
        warningIn(metaDataEmitter, 'metaDataEmitter')

        context.messages = []
        calls = []
        parser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(14)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 14))
    })

    it('Passes supplied options to each pass', () => {
        const document = 'MOV 0, 1'
        const options = {
            coresize: 82
        }

        const expected = {
            standard: Standard.ICWS94draft,
            coresize: 82
        }

        parser.parse(document, options)

        expect(scanner.scan).to.have.been.calledWith(document, expected)
        expect(filter.process).to.have.been.calledWith(context, expected)
        expect(forPass.process).to.have.been.calledWith(context, expected)
        expect(preprocessCollector.process).to.have.been.calledWith(context, expected)
        expect(preprocessAnalyser.process).to.have.been.calledWith(context, expected)
        expect(preprocessEmitter.process).to.have.been.calledWith(context, expected)
        expect(labelCollector.process).to.have.been.calledWith(context, expected)
        expect(labelEmitter.process).to.have.been.calledWith(context, expected)
        expect(mathsProcessor.process).to.have.been.calledWith(context, expected)
        expect(orgPass.process).to.have.been.calledWith(context, expected)
        expect(defaultPass.process).to.have.been.calledWith(context, expected)
        expect(syntaxCheck.process).to.have.been.calledWith(context, expected)
        expect(metaDataEmitter.process).to.have.been.calledWith(context, expected)
    })

    it('Returns context tokens, messages and metaData in ParserResult', () => {
        const actual = parser.parse('MOV 0, 1', {})

        expect(actual.metaData).to.be.equal(context.metaData)
        expect(actual.tokens).to.be.equal(context.tokens)
        expect(actual.messages).to.be.equal(context.messages)
    })

    it("Defaults the standard to ICWS'94-draft if not specified", () => {
        parser.parse('MOV 0, 1')

        expect((scanner.scan as sinon.SinonStub).lastCall.args[1].standard).to.be.equal(Standard.ICWS94draft)
    })

    it('Returns successful ParseResult if only info and warning messages exist', () => {
        ;(syntaxCheck.process as sinon.SinonStub).returns({
            ...context,
            messages: [
                { type: MessageType.Warning, position: { line: 1, char: 1 }, text: 'Warning Message' },
                { type: MessageType.Info, position: { line: 1, char: 1 }, text: 'Info Message' }
            ]
        })

        const actual = parser.parse('MOV 0, 1')

        expect(actual.success).to.be.true
    })

    it('Returns unsuccessful ParseResult if error message exists', () => {
        ;(syntaxCheck.process as sinon.SinonStub).returns({
            ...context,
            messages: [
                { type: MessageType.Warning, position: { line: 1, char: 1 }, text: 'Warning Message' },
                { type: MessageType.Error, position: { line: 1, char: 1 }, text: 'Error Message' },
                { type: MessageType.Info, position: { line: 1, char: 1 }, text: 'Info Message' }
            ]
        })

        const actual = parser.parse('MOV 0, 1')

        expect(actual.success).to.be.false
    })
})
