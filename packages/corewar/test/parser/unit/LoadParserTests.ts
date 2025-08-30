import * as chai from 'chai'
import * as sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import { IContext } from '@parser/interface/IContext'
import { IScanner } from '@parser/interface/IScanner'
import { IPass } from '@parser/interface/IPass'
import { IOptions } from '@simulator/interface/IOptions'
import { LoadParser } from '@parser/LoadParser'
import { Context } from '@parser/Context'
import { IMessage, MessageType } from '@parser/interface/IMessage'
import { Parser } from '@parser/Parser'
import { Standard } from '@parser/interface/IParseOptions'

describe('LoadParser', () => {
    let context: IContext

    let scanner: IScanner
    let filter: IPass
    let syntaxCheck: IPass
    let illegalCommandCheck: IPass
    let modPass: IPass

    let loadParser: LoadParser

    let calls: string[]

    const expected94Calls = ['scan', 'filter', 'syntax', 'mod']

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
        syntaxCheck = fakePass('syntax')
        illegalCommandCheck = fakePass('illegal')
        modPass = fakePass('mod')

        loadParser = new LoadParser(scanner, filter, syntaxCheck, illegalCommandCheck, modPass)
    })

    it("Calls passes in correct order under ICWS'94-draft", () => {
        const options = Parser.DefaultOptions

        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(4)

        expect(calls).to.deep.equal(expected94Calls)
    })

    it("Calls passes in correct order under ICWS'88", () => {
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 })

        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(5)

        expect(calls[0]).to.be.equal('scan')
        expect(calls[1]).to.be.equal('filter')
        expect(calls[2]).to.be.equal('syntax')
        expect(calls[3]).to.be.equal('illegal')
        expect(calls[4]).to.be.equal('mod')
    })

    it("Calls passes in correct order under ICWS'86", () => {
        const options = Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 })

        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(5)

        expect(calls[0]).to.be.equal('scan')
        expect(calls[1]).to.be.equal('filter')
        expect(calls[2]).to.be.equal('syntax')
        expect(calls[3]).to.be.equal('illegal')
        expect(calls[4]).to.be.equal('mod')
    })

    it('Does not call mod pass if syntax check fails', () => {
        const options = Parser.DefaultOptions

        errorIn(syntaxCheck, 'syntax')

        context.messages = []
        calls = []
        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(3)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 3))
    })

    it('Does not call syntax check if filter pass fails', () => {
        const options = Parser.DefaultOptions

        errorIn(filter, 'filter')

        context.messages = []
        calls = []
        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(2)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 2))
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
        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(1)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 1))
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
        warningIn(syntaxCheck, 'syntax')

        context.messages = []
        calls = []
        loadParser.parse('MOV 0, 1', options)

        expect(calls.length).to.be.equal(4)
        expect(calls).to.deep.equal(expected94Calls.slice(0, 4))
    })

    it('Passes supplied options to each pass', () => {
        const document = 'MOV 0, 1'
        const options = {
            coresize: 7
        }

        const expeceted = {
            standard: Standard.ICWS94draft,
            coresize: 7
        }

        loadParser.parse(document, options)

        expect(scanner.scan).to.have.been.calledWith(document, expeceted)
        expect(filter.process).to.have.been.calledWith(context, expeceted)
        expect(syntaxCheck.process).to.have.been.calledWith(context, expeceted)
        expect(modPass.process).to.have.been.calledWith(context, expeceted)
    })

    it('Returns context tokens, messages and metaData in ParserResult', () => {
        const actual = loadParser.parse('MOV 0, 1', {})

        expect(actual.metaData).to.be.equal(context.metaData)
        expect(actual.tokens).to.be.equal(context.tokens)
        expect(actual.messages).to.be.equal(context.messages)
    })

    it("Defaults the standard to ICWS'94-draft if not specified", () => {
        loadParser.parse('MOV 0, 1')

        expect((scanner.scan as sinon.SinonStub).lastCall.args[1].standard).to.be.equal(Standard.ICWS94draft)
    })

    it('Defaults the coresize to 8192 if not specified', () => {
        loadParser.parse('MOV 0, 1')

        expect((scanner.scan as sinon.SinonStub).lastCall.args[1].coresize).to.be.equal(8192)
    })

    it('Returns successful ParseResult if only info and warning messages exist', () => {
        ;(modPass.process as sinon.SinonStub).returns({
            ...context,
            messages: [
                { type: MessageType.Warning, position: { line: 1, char: 1 }, text: 'Warning Message' },
                { type: MessageType.Info, position: { line: 1, char: 1 }, text: 'Info Message' }
            ]
        })

        const actual = loadParser.parse('MOV 0, 1')

        expect(actual.success).to.be.true
    })

    it('Returns unsuccessful ParseResult if error message exists', () => {
        ;(modPass.process as sinon.SinonStub).returns({
            ...context,
            messages: [
                { type: MessageType.Warning, position: { line: 1, char: 1 }, text: 'Warning Message' },
                { type: MessageType.Error, position: { line: 1, char: 1 }, text: 'Error Message' },
                { type: MessageType.Info, position: { line: 1, char: 1 }, text: 'Info Message' }
            ]
        })

        const actual = loadParser.parse('MOV 0, 1')

        expect(actual.success).to.be.false
    })
})
