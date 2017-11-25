import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai); // Yeah, this is way better than jasmine(!)

import { IContext } from "../interface/IContext";
import { IScanner } from "../interface/IScanner";
import { IPass } from "../interface/IPass";
import { IOptions } from "../../simulator/interface/IOptions";
import { LoadParser } from "../LoadParser";
import { Context } from "../Context";
import { IMessage, MessageType } from "../interface/IMessage";
import { Parser } from "../Parser";
import { Standard } from "../interface/IParseOptions";
import * as _ from "underscore";

"use strict";

describe("LoadParser",() => {

    var context: IContext;

    var scanner: IScanner;
    var filter: IPass;
    var syntaxCheck: IPass;
    var illegalCommandCheck: IPass;
    var modPass: IPass;

    var loadParser: LoadParser;

    var calls: string[];

    var expected94Calls = [
        "scan", "filter", "syntax", "mod"
    ];

    beforeEach(() => {

        calls = [];
        context = new Context();

        scanner = fakeScanner("scan");
        filter = fakePass("filter");
        syntaxCheck = fakePass("syntax");
        illegalCommandCheck = fakePass("illegal");
        modPass = fakePass("mod");

        loadParser = new LoadParser(
            scanner,
            filter,
            syntaxCheck,
            illegalCommandCheck,
            modPass);
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

        loadParser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(4);

        expect(calls).to.deep.equal(expected94Calls);
    });

    it("Calls passes in correct order under ICWS'88",() => {

        var options = _.defaults({ standard: Standard.ICWS88 }, Parser.DefaultOptions);

        loadParser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(5);

        expect(calls[0]).to.be.equal("scan");
        expect(calls[1]).to.be.equal("filter");
        expect(calls[2]).to.be.equal("syntax");
        expect(calls[3]).to.be.equal("illegal");
        expect(calls[4]).to.be.equal("mod");
    });

    it("Calls passes in correct order under ICWS'86",() => {

        var options = _.defaults({ standard: Standard.ICWS86 }, Parser.DefaultOptions);

        loadParser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(5);

        expect(calls[0]).to.be.equal("scan");
        expect(calls[1]).to.be.equal("filter");
        expect(calls[2]).to.be.equal("syntax");
        expect(calls[3]).to.be.equal("illegal");
        expect(calls[4]).to.be.equal("mod");
    });

    it("Does not call mod pass if syntax check fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(syntaxCheck, "syntax");

        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(3);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 3));
    });

    it("Does not call syntax check if filter pass fails",() => {

        var options = Parser.DefaultOptions;

        errorIn(filter, "filter");

        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);

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
        loadParser.parse("MOV 0, 1", options);

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
        warningIn(syntaxCheck, "syntax");

        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);

        expect(calls.length).to.be.equal(4);
        expect(calls).to.deep.equal(expected94Calls.slice(0, 4));
    });

    it("Passes supplied options to each pass",() => {

        var document = "MOV 0, 1";
        var options = {};

        loadParser.parse(document, options);

        expect(scanner.scan).to.have.been.calledWith(document, options);
        expect(filter.process).to.have.been.calledWith(context, options);
        expect(syntaxCheck.process).to.have.been.calledWith(context, options);
        expect(modPass.process).to.have.been.calledWith(context, options);
    });

    it("Returns context tokens, messages and metaData in ParserResult",() => {

        var actual = loadParser.parse("MOV 0, 1", {});

        expect(actual.metaData).to.be.equal(context.metaData);
        expect(actual.tokens).to.be.equal(context.tokens);
        expect(actual.messages).to.be.equal(context.messages);
    });

    it("Defaults the standard to ICWS'94-draft if not specified",() => {

        loadParser.parse("MOV 0, 1");

        expect((<sinon.stub>scanner.scan).lastCall.args[1].standard).to.be.equal(Standard.ICWS94draft);
    });

    it("Defaults the coresize to 8192 if not specified",() => {

        loadParser.parse("MOV 0, 1");

        expect((<sinon.stub>scanner.scan).lastCall.args[1].coresize).to.be.equal(8192);
    });
});
