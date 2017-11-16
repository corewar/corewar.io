"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoadParser_1 = require("../LoadParser");
const Context_1 = require("../Context");
const IMessage_1 = require("../Interface/IMessage");
const Parser_1 = require("../Parser");
const IParseOptions_1 = require("../Interface/IParseOptions");
const _ = require("underscore");
"use strict";
describe("LoadParser", () => {
    var context;
    var scanner;
    var filter;
    var syntaxCheck;
    var illegalCommandCheck;
    var modPass;
    var loadParser;
    var calls;
    var expected94Calls = [
        "scan", "filter", "syntax", "mod"
    ];
    beforeEach(() => {
        calls = [];
        context = new Context_1.Context();
        scanner = fakeScanner("scan");
        filter = fakePass("filter");
        syntaxCheck = fakePass("syntax");
        illegalCommandCheck = fakePass("illegal");
        modPass = fakePass("mod");
        loadParser = new LoadParser_1.LoadParser(scanner, filter, syntaxCheck, illegalCommandCheck, modPass);
    });
    function fakeScanner(name) {
        return {
            scan: jasmine.createSpy("Scanner.scan")
                .and.callFake((s, options) => {
                calls.push(name);
                return context;
            })
        };
    }
    function fakePass(name) {
        return {
            process: jasmine.createSpy("Pass.process")
                .and.callFake((context, options) => {
                calls.push(name);
                return context;
            })
        };
    }
    function fakeError() {
        return {
            text: "",
            type: IMessage_1.MessageType.Error,
            position: { line: 1, char: 1 }
        };
    }
    function fakeWarning() {
        return {
            text: "",
            type: IMessage_1.MessageType.Warning,
            position: { line: 1, char: 1 }
        };
    }
    function errorIn(pass, name) {
        pass.process.and.callFake(() => {
            context.messages.push(fakeError());
            calls.push(name);
            return context;
        });
    }
    function warningIn(pass, name) {
        pass.process.and.callFake(() => {
            context.messages.push(fakeWarning());
            calls.push(name);
            return context;
        });
    }
    it("Calls passes in correct order under ICWS'94-draft", () => {
        var options = Parser_1.Parser.DefaultOptions;
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(4);
        expect(calls).toEqual(expected94Calls);
    });
    it("Calls passes in correct order under ICWS'88", () => {
        var options = _.defaults({ standard: IParseOptions_1.Standard.ICWS88 }, Parser_1.Parser.DefaultOptions);
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(5);
        expect(calls[0]).toBe("scan");
        expect(calls[1]).toBe("filter");
        expect(calls[2]).toBe("syntax");
        expect(calls[3]).toBe("illegal");
        expect(calls[4]).toBe("mod");
    });
    it("Calls passes in correct order under ICWS'86", () => {
        var options = _.defaults({ standard: IParseOptions_1.Standard.ICWS86 }, Parser_1.Parser.DefaultOptions);
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(5);
        expect(calls[0]).toBe("scan");
        expect(calls[1]).toBe("filter");
        expect(calls[2]).toBe("syntax");
        expect(calls[3]).toBe("illegal");
        expect(calls[4]).toBe("mod");
    });
    it("Does not call mod pass if syntax check fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(syntaxCheck, "syntax");
        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(3);
        expect(calls).toEqual(expected94Calls.slice(0, 3));
    });
    it("Does not call syntax check if filter pass fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(filter, "filter");
        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(2);
        expect(calls).toEqual(expected94Calls.slice(0, 2));
    });
    it("Does not call filter pass if scan fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        scanner.scan.and.callFake(() => {
            context.messages.push(fakeError());
            calls.push("scan");
            return context;
        });
        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(1);
        expect(calls).toEqual(expected94Calls.slice(0, 1));
    });
    it("Does call all passes regardless of raised warnings", () => {
        var options = Parser_1.Parser.DefaultOptions;
        scanner.scan.and.callFake(() => {
            context.messages.push(fakeWarning());
            calls.push("scan");
            return context;
        });
        warningIn(filter, "filter");
        warningIn(syntaxCheck, "syntax");
        context.messages = [];
        calls = [];
        loadParser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(4);
        expect(calls).toEqual(expected94Calls.slice(0, 4));
    });
    it("Passes supplied options to each pass", () => {
        var document = "MOV 0, 1";
        var options = {};
        loadParser.parse(document, options);
        expect(scanner.scan).toHaveBeenCalledWith(document, options);
        expect(filter.process).toHaveBeenCalledWith(context, options);
        expect(syntaxCheck.process).toHaveBeenCalledWith(context, options);
        expect(modPass.process).toHaveBeenCalledWith(context, options);
    });
    it("Returns context tokens, messages and metaData in ParserResult", () => {
        var actual = loadParser.parse("MOV 0, 1", {});
        expect(actual.metaData).toBe(context.metaData);
        expect(actual.tokens).toBe(context.tokens);
        expect(actual.messages).toBe(context.messages);
    });
    it("Defaults the standard to ICWS'94-draft if not specified", () => {
        loadParser.parse("MOV 0, 1");
        expect(scanner.scan.calls.mostRecent().args[1].standard).toBe(IParseOptions_1.Standard.ICWS94draft);
    });
    it("Defaults the coresize to 8192 if not specified", () => {
        loadParser.parse("MOV 0, 1");
        expect(scanner.scan.calls.mostRecent().args[1].coresize).toBe(8192);
    });
});
