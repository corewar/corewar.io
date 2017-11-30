import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { IContext } from "../interface/IContext";
import { Context } from "../Context";
import { IScanner } from "../interface/IScanner";
import { IPass } from "../interface/IPass";
import { Parser } from "../Parser";
import { IOptions } from "../../simulator/interface/IOptions";
import { IMessage, MessageType } from "../interface/IMessage";
import { Standard } from "../interface/IParseOptions";
import * as _ from "underscore";

"use strict";

describe("Parser",() => {

    var context: IContext;

    var scanner: IScanner;
    var filter: IPass;
    var metaDataCollector: IPass;
    var forPass: IPass;
    var preprocessCollector: IPass;
    var preprocessAnalyser: IPass;
    var preprocessEmitter: IPass;
    var labelCollector: IPass;
    var labelEmitter: IPass;
    var mathsProcessor: IPass;
    var defaultPass: IPass;
    var orgPass: IPass;
    var syntaxCheck: IPass;
    var illegalCommandCheck: IPass;

    var parser: Parser;

    var calls: string[];

    var expected94Calls = [
        "scan", "filter", "metaDataCollector", "for", "equCollector",
        "equAnalyser", "equEmitter", "labelCollector", "labelEmitter",
        "maths", "org", "default", "syntax"
    ];

    beforeEach(() => {

        calls = [];
        context = new Context();

        scanner = fakeScanner("scan");
        filter = fakePass("filter");
        metaDataCollector = fakePass("metaDataCollector");
        forPass = fakePass("for");
        preprocessCollector = fakePass("equCollector");
        preprocessAnalyser = fakePass("equAnalyser");
        preprocessEmitter = fakePass("equEmitter");
        labelCollector = fakePass("labelCollector");
        labelEmitter = fakePass("labelEmitter");
        mathsProcessor = fakePass("maths");
        defaultPass = fakePass("default");
        orgPass = fakePass("org");
        syntaxCheck = fakePass("syntax");
        illegalCommandCheck = fakePass("illegal");

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
            illegalCommandCheck);
    });

    function fakeScanner(name: string): IScanner {
        return {
            scan: sinon.stub().callsFake((s: string, options: IOptions): IContext => {
                calls.push(name);
                return context;
            })
        };
    }

    function fakePass(name: string): IPass {

        return {
            process: sinon.stub().callsFake((context: IContext, options: IOptions): IContext => {
                calls.push(name);
                return context;
            })
        };
    }

    function fakeError(): IMessage {
        return {
            text: "",
            type: MessageType.Error,
            position: { line: 1, char: 1 }
        };
    }

    function fakeWarning(): IMessage {
        return {
            text: "",
            type: MessageType.Warning,
            position: { line: 1, char: 1 }
        };
    }

    function errorIn(pass: IPass, name: string): void {

        (<sinon.stub>pass.process).callsFake((): IContext => {
            context.messages.push(fakeError());
            calls.push(name);
            return context;
        });
    }

    function warningIn(pass: IPass, name: string): void {

        (<sinon.stub>pass.process).callsFake((): IContext => {
            context.messages.push(fakeWarning());
            calls.push(name);
            return context;
        });
    }

    it("Calls passes in correct order under ICWS'94-draft",() => {

        var options = Parser.DefaultOptions;

        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(13);

        expect(calls).to.deep.equal(expected94Calls);
    });

    it("Calls passes in correct order under ICWS'88",() => {

        var options = _.defaults({ standard: Standard.ICWS88 }, Parser.DefaultOptions);

        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(13);

        expect(calls[0]).to.be.equal("scan");
        expect(calls[1]).to.be.equal("filter");
        expect(calls[2]).to.be.equal("metaDataCollector");
        expect(calls[3]).to.be.equal("equCollector");
        expect(calls[4]).to.be.equal("equAnalyser");
        expect(calls[5]).to.be.equal("equEmitter");
        expect(calls[6]).to.be.equal("labelCollector");
        expect(calls[7]).to.be.equal("labelEmitter");
        expect(calls[8]).to.be.equal("maths");
        expect(calls[9]).to.be.equal("org");
        expect(calls[10]).to.be.equal("default");
        expect(calls[11]).to.be.equal("syntax");
        expect(calls[12]).to.be.equal("illegal");
    });

    it("Calls passes in correct order under ICWS'86",() => {

        var options = _.defaults({ standard: Standard.ICWS86 }, Parser.DefaultOptions);

        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(13);

        expect(calls[0]).to.be.equal("scan");
        expect(calls[1]).to.be.equal("filter");
        expect(calls[2]).to.be.equal("metaDataCollector");
        expect(calls[3]).to.be.equal("equCollector");
        expect(calls[4]).to.be.equal("equAnalyser");
        expect(calls[5]).to.be.equal("equEmitter");
        expect(calls[6]).to.be.equal("labelCollector");
        expect(calls[7]).to.be.equal("labelEmitter");
        expect(calls[8]).to.be.equal("maths");
        expect(calls[9]).to.be.equal("org");
        expect(calls[10]).to.be.equal("default");
        expect(calls[11]).to.be.equal("syntax");
        expect(calls[12]).to.be.equal("illegal");
    });

    it("Does not call syntax check if default pass fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(defaultPass, "default");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(12);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 12));
    });

    it("Does not call default pass check if org pass fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(orgPass, "org");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(11);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 11));
    });

    it("Does not call org pass if maths pass fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(mathsProcessor, "maths");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(10);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 10));
    });

    it("Does not call maths pass if label emitter fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(labelEmitter, "labelEmitter");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(9);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 9));
    });

    it("Does not call label emitter if label collector fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(labelCollector, "labelCollector");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(8);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 8));
    });

    it("Does not call label collector if equ emitter fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(preprocessEmitter, "equEmitter");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(7);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 7));
    });

    it("Does not call equ emitter if equ analyser fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(preprocessAnalyser, "equAnalyser");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(6);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 6));
    });

    it("Does not call equ analyser if equ collector fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(preprocessCollector, "equCollector");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(5);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 5));
    });

    it("Does not call equ collector if for pass fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(forPass, "for");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(4);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 4));
    });

    it("Does not call for pass if metadata collector pass fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(metaDataCollector, "metaDataCollector");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(3);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 3));
    });
    
    it("Does not call meta data collector collector if filter pass fails",() => {
        
        var options = Parser.DefaultOptions;

        errorIn(filter, "filter");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(2);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 2));
    });

    it("Does not call filter pass if scan fails",() => {

        var options = Parser.DefaultOptions;

        (<sinon.stub>scanner.scan).callsFake((): IContext => {
            context.messages.push(fakeError());
            calls.push("scan");
            return context;
        });

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(1);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 1));
    });

    it("Does call all passes regardless of raised warnings",() => {

        var options = Parser.DefaultOptions;

        (<sinon.stub>scanner.scan).callsFake((): IContext => {
            context.messages.push(fakeWarning());
            calls.push("scan");
            return context;
        });
        warningIn(filter, "filter");
        warningIn(metaDataCollector, "metaDataCollector");
        warningIn(forPass, "for");
        warningIn(preprocessCollector, "equCollector");
        warningIn(preprocessAnalyser, "equAnalyser");
        warningIn(preprocessEmitter, "equEmitter");
        warningIn(labelCollector, "labelCollector");
        warningIn(labelEmitter, "labelEmitter");
        warningIn(mathsProcessor, "maths");
        warningIn(orgPass, "org");
        warningIn(defaultPass, "default");
        warningIn(syntaxCheck, "syntax");

        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(13);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 13));
    });

    it("Passes supplied options to each pass",() => {

        var document = "MOV 0, 1";
        var options = {};

        parser.parse(document, options);

        expect(scanner.scan).to.have.been.calledWith(document, options);
        expect(filter.process).to.have.been.calledWith(context, options);
        expect(forPass.process).to.have.been.calledWith(context, options);
        expect(preprocessCollector.process).to.have.been.calledWith(context, options);
        expect(preprocessAnalyser.process).to.have.been.calledWith(context, options);
        expect(preprocessEmitter.process).to.have.been.calledWith(context, options);
        expect(labelCollector.process).to.have.been.calledWith(context, options);
        expect(labelEmitter.process).to.have.been.calledWith(context, options);
        expect(mathsProcessor.process).to.have.been.calledWith(context, options);
        expect(orgPass.process).to.have.been.calledWith(context, options);
        expect(defaultPass.process).to.have.been.calledWith(context, options);
        expect(syntaxCheck.process).to.have.been.calledWith(context, options);
    });

    it("Returns context tokens, messages and metaData in ParserResult",() => {

        var actual = parser.parse("MOV 0, 1", {});

        expect(actual.metaData).to.be.equal(context.metaData);
        expect(actual.tokens).to.be.equal(context.tokens);
        expect(actual.messages).to.be.equal(context.messages);
    });

    it("Defaults the standard to ICWS'94-draft if not specified",() => {

        parser.parse("MOV 0, 1");

        expect((<sinon.stub>scanner.scan).lastCall.args[1].standard).to.be.equal(Standard.ICWS94draft);
    });
});