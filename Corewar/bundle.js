/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenCategory; });
var TokenCategory;
(function (TokenCategory) {
    TokenCategory[TokenCategory["Label"] = 0] = "Label";
    TokenCategory[TokenCategory["Opcode"] = 1] = "Opcode";
    TokenCategory[TokenCategory["Preprocessor"] = 2] = "Preprocessor";
    TokenCategory[TokenCategory["Modifier"] = 3] = "Modifier";
    TokenCategory[TokenCategory["Mode"] = 4] = "Mode";
    TokenCategory[TokenCategory["Number"] = 5] = "Number";
    TokenCategory[TokenCategory["Comma"] = 6] = "Comma";
    TokenCategory[TokenCategory["Maths"] = 7] = "Maths";
    TokenCategory[TokenCategory["EOL"] = 8] = "EOL";
    TokenCategory[TokenCategory["Comment"] = 9] = "Comment";
    TokenCategory[TokenCategory["Unknown"] = 10] = "Unknown";
})(TokenCategory || (TokenCategory = {}));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TokenStream__ = __webpack_require__(6);

class PassBase {
    process(context, options) {
        // TODO CONSTANTS - need to define core settings at compile time
        // TODO P-Space
        // TODO ;redcode tags
        // TODO stringify and FOR variables
        // TODO loader should check against run options e.g. no P-space etc.
        this.context = context;
        this.stream = new __WEBPACK_IMPORTED_MODULE_0__TokenStream__["a" /* TokenStream */](context.tokens, context.messages);
        this.context.tokens = [];
        this.options = options;
        this.processLines();
        return this.context;
    }
    processLines() {
        while (!this.stream.eof()) {
            try {
                this.processLine();
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
    }
    processLine() {
        throw new Error("PassBase.processLine is an Abstract Method");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PassBase;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Standard; });
var Standard;
(function (Standard) {
    Standard[Standard["ICWS86"] = 0] = "ICWS86";
    Standard[Standard["ICWS88"] = 1] = "ICWS88";
    Standard[Standard["ICWS94draft"] = 2] = "ICWS94draft";
})(Standard || (Standard = {}));


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageType; });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Error"] = 0] = "Error";
    MessageType[MessageType["Warning"] = 1] = "Warning";
    MessageType[MessageType["Info"] = 2] = "Info";
})(MessageType || (MessageType = {}));


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OpcodeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModifierType; });
var OpcodeType;
(function (OpcodeType) {
    OpcodeType[OpcodeType["DAT"] = 0] = "DAT";
    OpcodeType[OpcodeType["MOV"] = 1] = "MOV";
    OpcodeType[OpcodeType["ADD"] = 2] = "ADD";
    OpcodeType[OpcodeType["SUB"] = 3] = "SUB";
    OpcodeType[OpcodeType["MUL"] = 4] = "MUL";
    OpcodeType[OpcodeType["DIV"] = 5] = "DIV";
    OpcodeType[OpcodeType["MOD"] = 6] = "MOD";
    OpcodeType[OpcodeType["JMP"] = 7] = "JMP";
    OpcodeType[OpcodeType["JMZ"] = 8] = "JMZ";
    OpcodeType[OpcodeType["JMN"] = 9] = "JMN";
    OpcodeType[OpcodeType["DJN"] = 10] = "DJN";
    OpcodeType[OpcodeType["CMP"] = 11] = "CMP";
    OpcodeType[OpcodeType["SEQ"] = 12] = "SEQ";
    OpcodeType[OpcodeType["SNE"] = 13] = "SNE";
    OpcodeType[OpcodeType["SLT"] = 14] = "SLT";
    OpcodeType[OpcodeType["SPL"] = 15] = "SPL";
    OpcodeType[OpcodeType["NOP"] = 16] = "NOP";
    OpcodeType[OpcodeType["Count"] = 17] = "Count";
})(OpcodeType || (OpcodeType = {}));
var ModifierType;
(function (ModifierType) {
    ModifierType[ModifierType["A"] = 0] = "A";
    ModifierType[ModifierType["B"] = 1] = "B";
    ModifierType[ModifierType["AB"] = 2] = "AB";
    ModifierType[ModifierType["BA"] = 3] = "BA";
    ModifierType[ModifierType["F"] = 4] = "F";
    ModifierType[ModifierType["X"] = 5] = "X";
    ModifierType[ModifierType["I"] = 6] = "I";
    ModifierType[ModifierType["Count"] = 7] = "Count";
})(ModifierType || (ModifierType = {}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModeType; });
var ModeType;
(function (ModeType) {
    ModeType[ModeType["Immediate"] = 0] = "Immediate";
    ModeType[ModeType["Direct"] = 1] = "Direct";
    ModeType[ModeType["AIndirect"] = 2] = "AIndirect";
    ModeType[ModeType["BIndirect"] = 3] = "BIndirect";
    ModeType[ModeType["APreDecrement"] = 4] = "APreDecrement";
    ModeType[ModeType["BPreDecrement"] = 5] = "BPreDecrement";
    ModeType[ModeType["APostIncrement"] = 6] = "APostIncrement";
    ModeType[ModeType["BPostIncrement"] = 7] = "BPostIncrement"; // >
})(ModeType || (ModeType = {}));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IMessage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TokenHelper__ = __webpack_require__(14);



class TokenStream {
    constructor(tokens, messages) {
        this.position = 0;
        this.tokens = tokens;
        this.messages = messages;
    }
    eof() {
        return this.position >= this.tokens.length;
    }
    peek() {
        return this.tokens[this.position];
    }
    read() {
        return this.tokens[this.position++];
    }
    readToEOL() {
        var result = [];
        while (!this.eof()) {
            var token = this.read();
            result.push(token);
            if (token.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL) {
                break;
            }
        }
        return result;
    }
    warn(token, message) {
        this.messages.push({
            position: token.position,
            text: message,
            type: __WEBPACK_IMPORTED_MODULE_1__Interface_IMessage__["a" /* MessageType */].Warning
        });
    }
    expectOnly(lexeme) {
        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + lexeme + "', got end of file");
        }
        var token = this.read();
        if (token.lexeme !== lexeme) {
            this.expected("'" + lexeme + "'", token);
        }
        return token;
    }
    expect(category) {
        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + __WEBPACK_IMPORTED_MODULE_2__TokenHelper__["a" /* TokenHelper */].categoryToString(category) + "', got end of file");
        }
        var token = this.read();
        if (token.category !== category) {
            this.expected(__WEBPACK_IMPORTED_MODULE_2__TokenHelper__["a" /* TokenHelper */].categoryToString(category), token);
        }
        return token;
    }
    expected(expected, got) {
        this.messages.push({
            type: __WEBPACK_IMPORTED_MODULE_1__Interface_IMessage__["a" /* MessageType */].Error,
            position: got.position,
            text: "Expected " + expected + ", got " + __WEBPACK_IMPORTED_MODULE_2__TokenHelper__["a" /* TokenHelper */].tokenToString(got)
        });
        throw "";
    }
    error(token, message) {
        this.messages.push({
            position: token.position,
            text: message,
            type: __WEBPACK_IMPORTED_MODULE_1__Interface_IMessage__["a" /* MessageType */].Error
        });
        throw "";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TokenStream;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreAccessType; });
var CoreAccessType;
(function (CoreAccessType) {
    CoreAccessType[CoreAccessType["read"] = 0] = "read";
    CoreAccessType[CoreAccessType["write"] = 1] = "write";
    CoreAccessType[CoreAccessType["execute"] = 2] = "execute";
})(CoreAccessType || (CoreAccessType = {}));


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__ = __webpack_require__(5);


class Defaults {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Defaults;

Defaults.coresize = 8000;
Defaults.cyclesBeforeTie = 80000;
Defaults.initialInstruction = {
    address: 0,
    opcode: __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].DAT,
    modifier: __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].F,
    aOperand: {
        mode: __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].Direct,
        address: 0
    },
    bOperand: {
        mode: __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].Direct,
        address: 0
    }
};
Defaults.instructionLimit = 100;
Defaults.maxTasks = 8000;
Defaults.minSeparation = 100;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parser_Parser__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_Scanner__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parser_ForPass__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Parser_PreprocessCollector__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Parser_PreprocessAnalyser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Parser_PreprocessEmitter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Parser_LabelCollector__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Parser_LabelEmitter__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Parser_MathsProcessor__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Parser_Expression__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Parser_Filter__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Parser_DefaultPass__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Parser_OrgPass__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Parser_SyntaxCheck__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Parser_LoadFileSerialiser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Parser_IllegalCommandCheck__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Simulator_Random__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Simulator_Executive__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Simulator_Decoder__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Simulator_Core__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Simulator_Loader__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Simulator_WarriorLoader__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Simulator_Fetcher__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__Simulator_Simulator__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Simulator_EndCondition__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__Presentation_InstructionSerialiser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__Presentation_CoreRenderer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__Presentation_Presenter__ = __webpack_require__(41);




























var redcode = document.getElementById("redcode");
var loadfile = document.getElementById("loadfile");
var console = document.getElementById("console");
var standard = document.getElementById("standard");
var parseButton = document.getElementById("parseButton");
var runButton = document.getElementById("runButton");
var stepButton = document.getElementById("stepButton");
var canvas = document.getElementById("canvas");
var instructionLabel = document.getElementById("instructionLabel");
var expression = new __WEBPACK_IMPORTED_MODULE_9__Parser_Expression__["a" /* Expression */]();
var parser = new __WEBPACK_IMPORTED_MODULE_0__Parser_Parser__["a" /* Parser */](new __WEBPACK_IMPORTED_MODULE_1__Parser_Scanner__["a" /* Scanner */](), new __WEBPACK_IMPORTED_MODULE_10__Parser_Filter__["a" /* Filter */](), new __WEBPACK_IMPORTED_MODULE_2__Parser_ForPass__["a" /* ForPass */](expression), new __WEBPACK_IMPORTED_MODULE_3__Parser_PreprocessCollector__["a" /* PreprocessCollector */](), new __WEBPACK_IMPORTED_MODULE_4__Parser_PreprocessAnalyser__["a" /* PreprocessAnalyser */](), new __WEBPACK_IMPORTED_MODULE_5__Parser_PreprocessEmitter__["a" /* PreprocessEmitter */](), new __WEBPACK_IMPORTED_MODULE_6__Parser_LabelCollector__["a" /* LabelCollector */](), new __WEBPACK_IMPORTED_MODULE_7__Parser_LabelEmitter__["a" /* LabelEmitter */](), new __WEBPACK_IMPORTED_MODULE_8__Parser_MathsProcessor__["a" /* MathsProcessor */](expression), new __WEBPACK_IMPORTED_MODULE_11__Parser_DefaultPass__["a" /* DefaultPass */](), new __WEBPACK_IMPORTED_MODULE_12__Parser_OrgPass__["a" /* OrgPass */](), new __WEBPACK_IMPORTED_MODULE_13__Parser_SyntaxCheck__["a" /* SyntaxCheck */](), new __WEBPACK_IMPORTED_MODULE_15__Parser_IllegalCommandCheck__["a" /* IllegalCommandCheck */]());
var core = new __WEBPACK_IMPORTED_MODULE_19__Simulator_Core__["a" /* Core */]();
var loader = new __WEBPACK_IMPORTED_MODULE_20__Simulator_Loader__["a" /* Loader */](new __WEBPACK_IMPORTED_MODULE_16__Simulator_Random__["a" /* Random */](), core, new __WEBPACK_IMPORTED_MODULE_21__Simulator_WarriorLoader__["a" /* WarriorLoader */](core));
var fetcher = new __WEBPACK_IMPORTED_MODULE_22__Simulator_Fetcher__["a" /* Fetcher */]();
var executive = new __WEBPACK_IMPORTED_MODULE_17__Simulator_Executive__["a" /* Executive */]();
var decoder = new __WEBPACK_IMPORTED_MODULE_18__Simulator_Decoder__["a" /* Decoder */](executive);
var simulator = new __WEBPACK_IMPORTED_MODULE_23__Simulator_Simulator__["a" /* Simulator */](core, loader, fetcher, decoder, executive, new __WEBPACK_IMPORTED_MODULE_24__Simulator_EndCondition__["a" /* EndCondition */]());
var prez = new __WEBPACK_IMPORTED_MODULE_27__Presentation_Presenter__["a" /* Presenter */](redcode, loadfile, console, standard, parser, new __WEBPACK_IMPORTED_MODULE_14__Parser_LoadFileSerialiser__["a" /* LoadFileSerialiser */](), simulator, core, executive);
var coreRenderer;
parseButton.addEventListener("click", () => {
    prez.parse();
});
runButton.addEventListener("click", () => {
    coreRenderer = new __WEBPACK_IMPORTED_MODULE_26__Presentation_CoreRenderer__["a" /* CoreRenderer */](canvas, instructionLabel, core, new __WEBPACK_IMPORTED_MODULE_25__Presentation_InstructionSerialiser__["a" /* InstructionSerialiser */]());
    prez.run();
    coreRenderer.initialise();
});
stepButton.addEventListener("click", () => {
    prez.step();
    coreRenderer.render();
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IMessage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__ = __webpack_require__(2);


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
            return message.type === __WEBPACK_IMPORTED_MODULE_0__Interface_IMessage__["a" /* MessageType */].Error;
        });
    }
    parse(document, options) {
        options = _.defaults(options || {}, Parser.DefaultOptions);
        var context = this.scanner.scan(document, options);
        if (this.noErrors(context)) {
            context = this.filter.process(context, options);
        }
        if (options.standard === __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS94draft) {
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
        if (options.standard < __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS94draft) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Parser;

Parser.DefaultOptions = {
    standard: __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS94draft,
    coresize: 8192
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Context__ = __webpack_require__(12);



class Scanner {
    scan(document, options) {
        document = document.replace(/[\r]/g, "");
        this.context = new __WEBPACK_IMPORTED_MODULE_2__Context__["a" /* Context */]();
        this.position = {
            line: 1,
            char: 1
        };
        var lines = document.split("\n");
        this.options = options;
        this.regex = this.selectRegexes(options.standard);
        lines.forEach((line) => {
            this.readLine(line);
            this.position.line++;
        });
        return this.context;
    }
    selectRegexes(standard) {
        switch (standard) {
            case __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS94draft:
                return Scanner.ICWS94draftRegex;
            case __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS88:
                return Scanner.ICWS88Regex;
            case __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS86:
                return Scanner.ICWS86Regex;
            default:
                throw "Unsupported Corewar Standard";
        }
    }
    readLine(line) {
        var accumulator = "";
        this.position.char = 1;
        for (var charNumber = 0; charNumber < line.length; charNumber++) {
            var c = line[charNumber];
            if (c === "\n") {
                break;
            }
            else if (c === ";") {
                if (accumulator !== "") {
                    this.processAccumulator(accumulator);
                    accumulator = "";
                }
                this.position.char = charNumber + 2;
                this.processComment(line.substr(charNumber));
                break;
            }
            var result = this.regex.Whitespace.exec(c);
            if (result === null) {
                accumulator += c;
            }
            else {
                if (accumulator !== "") {
                    this.processAccumulator(accumulator);
                    accumulator = "";
                }
                this.position.char = charNumber + 2;
            }
        }
        if (accumulator !== "") {
            this.processAccumulator(accumulator);
            accumulator = "";
        }
        this.emitEndOfLine();
    }
    indirectAModeCheck(category, match) {
        if (this.options.standard !== __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS94draft) {
            return true;
        }
        if (match !== "*") {
            return true;
        }
        // HACK ICWS'94 uses * for both multiply and a field indirect addressing mode
        // If the previous token was an opcode or comma, treat this as an addressing mode
        // otherwise treat it as a multiply
        var previousOpcodeOrComma = this.previous.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode ||
            this.previous.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Modifier ||
            this.previous.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comma;
        if (category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Mode) {
            return previousOpcodeOrComma;
        }
        else if (category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Maths) {
            return !previousOpcodeOrComma;
        }
        else {
            return true;
        }
    }
    processAccumulator(accumulator) {
        var result;
        var found = 0;
        var matchToken = (category, re) => {
            result = re.exec(accumulator);
            if (result !== null && result.index === 0 && this.indirectAModeCheck(category, result[0])) {
                accumulator = this.processToken(category, accumulator, result[0], found !== 0);
                this.position.char += result[0].length;
                found++;
                return true;
            }
            return false;
        };
        while (accumulator !== "") {
            if (accumulator[0] === ";") {
                return;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comma, this.regex.CommaRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Modifier, this.regex.ModifierRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Mode, this.regex.ModeRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number, this.regex.NumberRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Maths, this.regex.MathsRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode, this.regex.OpcodeRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor, this.regex.PreprocessorRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label, this.regex.LabelRE)) {
                continue;
            }
            if (matchToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment, this.regex.CommentRE)) {
                continue;
            }
            accumulator = this.processToken(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Unknown, accumulator, accumulator, found !== 0);
        }
    }
    processComment(lexeme) {
        this.emit(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment, lexeme);
    }
    isCaseInsensitive(category) {
        return category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode ||
            category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Modifier ||
            category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor;
    }
    processToken(category, accumulator, lexeme, found) {
        // HACK ICWS'88/86 has optional commas and delimits operands using whitespace but this parser does not tokenise whitespace.
        // This workaround will allow a plus/minus to begin an operand and disallows whitespace after a maths operator.
        // This means that the following operands are not interpretted as a single expression: MOV 0 -1 bcomes MOV 0, -1 not MOV -1
        if (this.options.standard <= __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS88) {
            if (!found && category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Maths &&
                (lexeme === "-" || lexeme === "+")) {
                this.emit(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number, "0");
            }
            else if (category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Maths && accumulator.length === 1) {
                category = __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Unknown;
            }
        }
        if (this.isCaseInsensitive(category)) {
            lexeme = lexeme.toUpperCase();
        }
        this.emit(category, lexeme);
        return accumulator.substr(lexeme.length);
    }
    emitEndOfLine() {
        this.emit(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL, "\n");
    }
    emit(category, lexeme) {
        this.previous = {
            position: {
                line: this.position.line,
                char: this.position.char
            },
            lexeme: lexeme,
            category: category
        };
        this.context.tokens.push(this.previous);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scanner;

Scanner.ICWS94draftRegex = {
    LabelRE: /^[A-Z_][A-Z_0-9]*/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|MUL|DIV|MOD|JMP|JMZ|JMN|DJN|CMP|SLT|SPL|SEQ|SNE|NOP)(?!\w)/i,
    PreprocessorRE: /^(EQU|END|ORG|FOR|ROF)(?!\w)/i,
    ModifierRE: /^\.(AB|BA|A|B|F|X|I)/i,
    ModeRE: /^(#|\$|@|<|>|{|}|\*)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-|\*|\/|%|\(|\))/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
Scanner.ICWS88Regex = {
    LabelRE: /^[A-Z][A-Z0-9]*/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|SLT|DJN|SPL)(?!\w)/i,
    PreprocessorRE: /^(END|EQU)(?!\w)/i,
    ModifierRE: /$a/i,
    ModeRE: /^(#|\$|@|<)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-|\*|\/)/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};
Scanner.ICWS86Regex = {
    LabelRE: /^[A-Z][A-Z0-9]{0,7}(?![A-Z0-9])/i,
    OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|DJN|SPL)(?!\w)/i,
    PreprocessorRE: /^(END)(?!\w)/i,
    ModifierRE: /$a/i,
    ModeRE: /^(#|\$|@|<)/,
    NumberRE: /^[0-9]+/,
    CommaRE: /^,/,
    MathsRE: /^(\+|\-)/,
    CommentRE: /^;.*/,
    Whitespace: /^[ \t]/
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Context {
    constructor() {
        this.metaData = {
            name: "",
            author: "",
            strategy: ""
        };
        this.equs = {};
        this.tokens = [];
        this.labels = {};
        this.messages = [];
    }
    emitSingle(token) {
        this.tokens.push(token);
    }
    emit(tokens) {
        this.tokens = this.tokens.concat(tokens);
    }
    hasValue(something) {
        return (!(_.isUndefined(something) || _.isNull(something)));
    }
    emitInstruction(instruction) {
        if (this.hasValue(instruction.opcode)) {
            this.tokens.push(instruction.opcode);
        }
        if (this.hasValue(instruction.modifier)) {
            this.tokens.push(instruction.modifier);
        }
        if (this.hasValue(instruction.aOperand)) {
            if (this.hasValue(instruction.aOperand.mode)) {
                this.tokens.push(instruction.aOperand.mode);
            }
            if (this.hasValue(instruction.aOperand.address)) {
                this.tokens.push(instruction.aOperand.address);
            }
        }
        if (this.hasValue(instruction.comma)) {
            this.tokens.push(instruction.comma);
        }
        if (this.hasValue(instruction.bOperand)) {
            if (this.hasValue(instruction.bOperand.mode)) {
                this.tokens.push(instruction.bOperand.mode);
            }
            if (this.hasValue(instruction.bOperand.address)) {
                this.tokens.push(instruction.bOperand.address);
            }
        }
        if (this.hasValue(instruction.comment)) {
            this.tokens.push(instruction.comment);
        }
        if (this.hasValue(instruction.eol)) {
            this.tokens.push(instruction.eol);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Context;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(1);


class ForPass extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    processLine() {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label) {
            this.processLabel();
        }
        else if (this.isFor(next)) {
            var pre = this.stream.expectOnly("FOR");
            this.processFor(null, pre);
        }
        else {
            var line = this.stream.readToEOL();
            this.context.emit(line);
        }
    }
    isFor(pre) {
        return pre.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            pre.lexeme === "FOR";
    }
    processLabel() {
        var label = this.stream.read();
        var pre = this.stream.read();
        if (this.isFor(pre)) {
            this.processFor(label, pre);
        }
        else {
            this.context.emit([label]);
            this.context.emit([pre]);
        }
    }
    // private warnDuplicateLabel(label: IToken) {
    //    this.context.messages.push({
    //        type: MessageType.Warning,
    //        position: label.position,
    //        text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
    //    });
    // }
    processFor(label, pre) {
        // TODO use label (and reinstate warnDuplicateLabel)
        // TODO stringinisation
        // TODO loop counter variable subs
        var count = this.expression.parse(this.stream);
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment) {
            this.stream.read();
        }
        this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL);
        var expression = this.stream.readToEOL();
        while (!this.stream.eof() && this.stream.peek().lexeme !== "ROF") {
            expression = expression.concat(this.stream.readToEOL());
        }
        this.stream.expectOnly("ROF");
        for (var i = 0; i < count; i++) {
            this.context.emit(expression);
        }
        this.stream.readToEOL();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ForPass;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);

class TokenHelper {
    static categoryToString(category) {
        switch (category) {
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comma:
                return "','";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment:
                return "';'";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL:
                return "end of line";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label:
                return "label";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Mode:
                return "mode";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Modifier:
                return "modifier";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number:
                return "number";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode:
                return "opcode";
        }
        return "";
    }
    static tokenToString(token) {
        switch (token.category) {
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment:
                return "';'";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL:
                return "end of line";
            default:
                return "'" + token.lexeme + "'";
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TokenHelper;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IParseOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Interface_IMessage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PassBase__ = __webpack_require__(1);




class PreprocessCollector extends __WEBPACK_IMPORTED_MODULE_3__PassBase__["a" /* PassBase */] {
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    process(context, options) {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
        this.previous = [];
        return super.process(context, options);
    }
    processLine() {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Label) {
                this.previous = [];
                this.processLabels();
            }
            else if (this.isMultilineEqu(next)) {
                this.processMultilineEqu();
            }
            else {
                var line = this.stream.readToEOL();
                this.context.emit(line);
            }
        }
    }
    isMultilineEqu(next) {
        return next.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            next.lexeme === "EQU" &&
            this.previous.length > 0 &&
            this.options.standard === __WEBPACK_IMPORTED_MODULE_0__Interface_IParseOptions__["a" /* Standard */].ICWS94draft;
    }
    isEqu(pre) {
        return pre.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            pre.lexeme === "EQU";
    }
    processLabels() {
        var labels = [];
        while (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Label) {
            var token = this.stream.expect(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Label);
            this.previous.push(token.lexeme);
            labels.push(token);
        }
        var pre = this.stream.read();
        if (this.isEqu(pre)) {
            this.processEqu(labels);
        }
        else {
            this.previous = [];
            this.context.emit(labels);
            this.context.emit([pre]);
        }
    }
    warnDuplicateLabel(label) {
        this.context.messages.push({
            type: __WEBPACK_IMPORTED_MODULE_2__Interface_IMessage__["a" /* MessageType */].Warning,
            position: label.position,
            text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
        });
    }
    processEqu(labels) {
        var expression = this.stream.readToEOL();
        // Do not include terminating EOL in replacement expression
        expression.pop();
        // Remove comments
        expression = _.filter(expression, (token) => {
            return token.category !== __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comment;
        });
        _.forEach(labels, (label) => {
            if (label.lexeme in this.context.equs) {
                this.warnDuplicateLabel(label);
            }
            else {
                this.context.equs[label.lexeme] = expression;
            }
        });
    }
    processMultilineEqu() {
        this.stream.expectOnly("EQU");
        var expression = [{
                category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].EOL,
                lexeme: "\n",
                position: _.clone(this.stream.peek().position)
            }];
        expression = expression.concat(this.stream.readToEOL());
        // Remove terminating newline
        expression.pop();
        _(this.previous).forEach((label) => {
            var existing = this.context.equs[label];
            this.context.equs[label] = existing.concat(expression);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreprocessCollector;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IMessage__ = __webpack_require__(3);


class PreprocessAnalyser {
    process(context, options) {
        // Detect dependencies between EQU expressions
        // Raise circular reference errors
        // Replace references to EQU labels in other EQU label definitions
        this.context = context;
        this.references = {};
        this.collectReferences();
        if (this.noCircularReferences()) {
            this.replaceAllReferences();
        }
        return this.context;
    }
    collectReferences() {
        var keys = _(this.context.equs).keys();
        _(keys).forEach((key) => {
            var expression = this.context.equs[key];
            var references = _(expression).filter((token) => {
                return token.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label &&
                    _(keys).contains(token.lexeme);
            });
            this.references[key] = _(references).map((token) => {
                return token.lexeme;
            });
        });
    }
    raiseCircularReference(key, reference) {
        this.context.messages.push({
            text: "Circular reference detected in '" + key + "' EQU statement",
            type: __WEBPACK_IMPORTED_MODULE_1__Interface_IMessage__["a" /* MessageType */].Error,
            // TODO proper position
            position: { line: 1, char: 1 }
        });
    }
    noCircularReferences() {
        var keys = _(this.context.equs).keys();
        var result = true;
        _(keys).forEach((key) => {
            try {
                var seen = [];
                this.detectCircularReferencesRecursive(key, seen);
            }
            catch (reference) {
                this.raiseCircularReference(key, reference);
                result = false;
            }
        });
        return result;
    }
    detectCircularReferencesRecursive(token, seen) {
        if (_(seen).contains(token)) {
            throw token;
        }
        seen.push(token);
        _(this.references[token]).forEach((reference) => {
            this.detectCircularReferencesRecursive(reference, seen);
        });
        var i = seen.indexOf(token);
        seen.splice(i, 1);
    }
    replaceAllReferences() {
        var keys = _(this.context.equs).keys();
        _(keys).forEach((key) => {
            this.replaceReferences(key);
        });
    }
    replaceReferences(key) {
        var expression = this.context.equs[key];
        var keys = _(this.context.equs).keys();
        while (_(expression).any((token) => {
            return token.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label &&
                _(keys).contains(token.lexeme);
        })) {
            for (var i = 0; i < expression.length; i++) {
                if (expression[i].category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label) {
                    var label = expression[i].lexeme;
                    if (_(keys).contains(label)) {
                        // HACK this is the only way I could find to insert an array into an array!
                        var args = [i, 1];
                        expression.splice.apply(expression, args.concat(this.context.equs[label]));
                    }
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreprocessAnalyser;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(1);


class PreprocessEmitter extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    /// <summary>
    /// Perform preprocessor substitutions.
    /// Replace EQU defined labels with corresponding expression
    /// </summary>
    processLine() {
        // Perform preprocessor substitution
        // Insert EQU expressions
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label &&
            next.lexeme in this.context.equs) {
            this.replaceLabel();
        }
        else {
            this.context.emit([this.stream.read()]);
        }
    }
    replaceLabel() {
        var label = this.stream.read();
        var originalExpression = this.context.equs[label.lexeme];
        var expression = _.map(originalExpression, (token) => {
            var clone = _.clone(token);
            clone.position = label.position;
            return clone;
        });
        this.context.emit(expression);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreprocessEmitter;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(1);



class LabelCollector extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    // Pass 2
    // Record label positions
    // Remove label declarations from the token stream
    // Duplicate label check
    // Syntax error if label declaration not followed by an opcode
    process(context, options) {
        this.line = -1;
        return super.process(context, options);
    }
    labelName(token) {
        switch (this.options.standard) {
            case __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS86:
            case __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS88:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    }
    processLine() {
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label ||
            next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.line++;
        }
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label) {
            this.processLabel();
        }
        var tokens = this.stream.readToEOL();
        this.context.emit(tokens);
    }
    processLabel() {
        while (!this.stream.eof() && this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label) {
            var label = this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Label);
            var name = this.labelName(label);
            if (name in this.context.labels ||
                name in this.context.equs) {
                this.stream.warn(label, "Redefinition of label '" + this.labelName(label) + "', original definition will be used");
            }
            else {
                this.context.labels[name] = this.line;
            }
        }
        var next = this.stream.peek();
        if (next.lexeme === "END") {
            return;
        }
        var opcode = this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode);
        this.context.emitSingle(opcode);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LabelCollector;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IMessage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Interface_IParseOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PassBase__ = __webpack_require__(1);




class LabelEmitter extends __WEBPACK_IMPORTED_MODULE_3__PassBase__["a" /* PassBase */] {
    process(context, options) {
        this.line = 0;
        return super.process(context, options);
    }
    labelName(token) {
        switch (this.options.standard) {
            case __WEBPACK_IMPORTED_MODULE_2__Interface_IParseOptions__["a" /* Standard */].ICWS86:
            case __WEBPACK_IMPORTED_MODULE_2__Interface_IParseOptions__["a" /* Standard */].ICWS88:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    }
    processLine() {
        // Pass 3
        // Replace labels with numbers
        // Raise syntax error for undeclared labels
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.processLineTokens(true);
            this.line++;
        }
        else if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Preprocessor) {
            this.processLineTokens(false);
        }
        else {
            var tokens = this.stream.readToEOL();
            this.context.emit(tokens);
        }
    }
    processLineTokens(isOpcode) {
        var tokens = this.stream.readToEOL();
        _.forEach(tokens, (token) => {
            if (token.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Label) {
                this.processLabel(token, isOpcode);
            }
            else {
                this.context.emitSingle(token);
            }
        });
    }
    raiseUndeclaredLabel(label) {
        this.context.messages.push({
            type: __WEBPACK_IMPORTED_MODULE_0__Interface_IMessage__["a" /* MessageType */].Error,
            position: label.position,
            text: "Unrecognised label '" + this.labelName(label) + "'"
        });
    }
    processLabel(label, isOpcode) {
        var name = this.labelName(label);
        if (name in this.context.labels) {
            var labelLine = this.context.labels[name];
            var diff = labelLine;
            if (isOpcode) {
                diff -= this.line;
            }
            var token = {
                category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Number,
                lexeme: diff.toString(),
                position: _.clone(label.position)
            };
            this.context.emitSingle(token);
        }
        else {
            this.raiseUndeclaredLabel(label);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LabelEmitter;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(1);


class MathsProcessor extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    processLine() {
        // Maths Processor
        // Locate and resolve mathematical expressions to resulting address
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number ||
            next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Maths) {
            try {
                var address = this.expression.parse(this.stream);
                this.context.emitSingle({
                    category: __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number,
                    lexeme: address.toString(),
                    position: _.clone(next.position)
                });
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
        else {
            this.context.emitSingle(this.stream.read());
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MathsProcessor;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);

class Expression {
    parse(stream) {
        this.stream = stream;
        this.stream.peek();
        return this.expression();
    }
    expression() {
        var result = this.term();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "+") {
                this.stream.read();
                result += this.term();
            }
            else if (next.lexeme === "-") {
                this.stream.read();
                result -= this.term();
            }
            else {
                break;
            }
        }
        return result;
    }
    term() {
        var result = this.factor();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "*") {
                this.stream.read();
                result *= this.factor();
            }
            else if (next.lexeme === "/") {
                this.stream.read();
                var divisor = this.factor();
                result = this.division(next, result, divisor);
            }
            else if (next.lexeme === "%") {
                this.stream.read();
                result %= this.factor();
            }
            else {
                break;
            }
        }
        return result;
    }
    division(token, numerator, denominator) {
        if (denominator === 0) {
            this.stream.error(token, "Divide by zero is not permitted");
        }
        var quotient = numerator / denominator;
        var rounded = this.integerRound(quotient);
        if (rounded !== quotient) {
            this.stream.warn(token, "Rounded non-integer division truncated to integer value");
        }
        return rounded;
    }
    // http://stackoverflow.com/questions/4228356/integer-division-in-javascript
    integerRound(value) {
        /* tslint:disable */
        return value >> 0;
        /* tslint:enable */
    }
    factor() {
        var next = this.stream.peek();
        if (next.lexeme === "+" ||
            next.lexeme === "-") {
            // Place a zero in front of a - or + to allow e.g. -7 to be entered
            return 0;
        }
        else if (next.lexeme === "(") {
            this.stream.expectOnly("(");
            var result = this.expression();
            this.stream.expectOnly(")");
            return result;
        }
        else {
            this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number);
            return parseInt(next.lexeme, 10);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Expression;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(1);


class Filter extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    /// <summary>
    /// Filters superfluous tokens from the token stream.
    /// Removes any empty lines and anything after the END preprocessor command
    /// </summary>
    processLine() {
        // Remove empty lines from stream
        // Remove anything after END from stream
        var line;
        var next = this.stream.peek();
        switch (next.category) {
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL:
                this.processEmptyLine();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor:
                if (next.lexeme === "END") {
                    this.processEnd();
                }
                else {
                    line = this.stream.readToEOL();
                    this.context.emit(line);
                }
                break;
            default:
                line = this.stream.readToEOL();
                this.context.emit(line);
                break;
        }
    }
    processEmptyLine() {
        this.stream.readToEOL();
    }
    processEnd() {
        var line = this.stream.readToEOL();
        this.context.emit(line);
        this.stream.position = this.stream.tokens.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Filter;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IParseOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(1);



class DefaultPass extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    processLine() {
        // Should specify default
        //    Modifiers (depends upon opcode)
        //    Modes ($)
        //    Operands $0
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.processInstruction();
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    processInstruction() {
        var instruction = this.readInstruction();
        if (instruction.aOperand.address === null) {
            // A address is mandatory, discard the rest of this line and leave for syntax check
            this.context.emit([
                instruction.opcode,
                instruction.modifier,
                instruction.aOperand.mode
            ]);
            this.context.emit(this.stream.readToEOL());
            return;
        }
        this.defaultBOperand(instruction);
        this.defaultModifier(instruction);
        this.emitInstruction(instruction);
    }
    readInstruction() {
        var instruction = {};
        instruction.opcode = this.stream.expect(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Opcode);
        instruction.modifier = this.tryRead(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Modifier);
        instruction.aOperand = {
            mode: this.readOrDefaultMode(instruction.opcode),
            address: this.tryRead(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Number)
        };
        instruction.comma = null;
        if (this.options.standard <= __WEBPACK_IMPORTED_MODULE_0__Interface_IParseOptions__["a" /* Standard */].ICWS88) {
            instruction.comma = this.readOrDefaultComma();
        }
        else if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comma) {
            instruction.comma = this.stream.read();
        }
        instruction.bOperand = {
            mode: this.readOrDefaultMode(instruction.opcode),
            address: this.tryRead(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Number)
        };
        return instruction;
    }
    tryRead(category) {
        if (this.stream.peek().category === category) {
            return this.stream.read();
        }
        return null;
    }
    readOrDefaultComma() {
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comma) {
            return this.stream.read();
        }
        else {
            return {
                category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comma,
                lexeme: ",",
                position: _.clone(this.stream.peek().position)
            };
        }
    }
    readOrDefaultMode(opcode) {
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Mode) {
            return this.stream.read();
        }
        else {
            var mode = "$";
            if (this.options.standard < __WEBPACK_IMPORTED_MODULE_0__Interface_IParseOptions__["a" /* Standard */].ICWS94draft &&
                opcode.lexeme === "DAT") {
                mode = "#";
            }
            return {
                category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Mode,
                lexeme: mode,
                position: _.clone(this.stream.peek().position)
            };
        }
    }
    defaultBOperand(instruction) {
        if (instruction.bOperand.address === null) {
            if (instruction.comma === null) {
                instruction.comma = {
                    category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comma,
                    lexeme: ",",
                    position: _.clone(this.stream.peek().position)
                };
            }
            instruction.bOperand.address = {
                category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Number,
                lexeme: "0",
                position: _.clone(this.stream.peek().position)
            };
            if (instruction.opcode.lexeme === "DAT") {
                instruction.bOperand.mode.lexeme = "#";
                var tempOperand = instruction.aOperand;
                instruction.aOperand = instruction.bOperand;
                instruction.bOperand = tempOperand;
                instruction.aOperand.address.position = instruction.bOperand.address.position;
                instruction.aOperand.mode.position = instruction.bOperand.mode.position;
            }
        }
    }
    defaultModifier(instruction) {
        if (instruction.modifier === null) {
            var token = {
                category: __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Modifier,
                position: _.clone(instruction.opcode.position),
                lexeme: ""
            };
            switch (instruction.opcode.lexeme) {
                case "DAT":
                    token.lexeme = ".F";
                    break;
                case "MOV":
                case "CMP":
                case "SEQ":
                case "SNE":
                    if (instruction.aOperand.mode.lexeme === "#") {
                        token.lexeme = ".AB";
                    }
                    else if (instruction.bOperand.mode.lexeme === "#") {
                        token.lexeme = ".B";
                    }
                    else {
                        token.lexeme = ".I";
                    }
                    break;
                case "ADD":
                case "SUB":
                case "MUL":
                case "DIV":
                case "MOD":
                    if (instruction.aOperand.mode.lexeme === "#") {
                        token.lexeme = ".AB";
                    }
                    else if (instruction.bOperand.mode.lexeme === "#") {
                        token.lexeme = ".B";
                    }
                    else if (this.options.standard !== __WEBPACK_IMPORTED_MODULE_0__Interface_IParseOptions__["a" /* Standard */].ICWS86) {
                        token.lexeme = ".F";
                    }
                    else {
                        token.lexeme = ".B";
                    }
                    break;
                case "SLT":
                    if (instruction.aOperand.mode.lexeme === "#") {
                        token.lexeme = ".AB";
                    }
                    else {
                        token.lexeme = ".B";
                    }
                    break;
                case "JMP":
                case "JMZ":
                case "JMN":
                case "DJN":
                case "SPL":
                case "NOP":
                    token.lexeme = ".B";
                    break;
                default:
                    instruction.modifier = null;
                    break;
            }
            instruction.modifier = token;
        }
    }
    emitInstruction(instruction) {
        this.context.emitSingle(instruction.opcode);
        if (instruction.modifier !== null) {
            this.context.emitSingle(instruction.modifier);
        }
        this.context.emit([instruction.aOperand.mode, instruction.aOperand.address]);
        if (instruction.comma !== null) {
            this.context.emitSingle(instruction.comma);
        }
        this.context.emit([instruction.bOperand.mode, instruction.bOperand.address]);
        this.context.emit(this.stream.readToEOL());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultPass;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PassBase__ = __webpack_require__(1);



class OrgPass extends __WEBPACK_IMPORTED_MODULE_2__PassBase__["a" /* PassBase */] {
    process(context, options) {
        // Replace END ### with ORG ###
        // Emit ORG as first instruction
        // Raise warning for duplicate ORGs / END ###
        // Under ICWS'86 - if no END ### found, if start label defined, emit ORG start
        this.firstInstruction = null;
        this.org = null;
        this.orgAddress = null;
        this.orgComment = null;
        var result = super.process(context, options);
        this.emitOrg();
        return result;
    }
    processLine() {
        var next = this.stream.peek();
        if (this.firstInstruction === null &&
            next.category !== __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment) {
            this.firstInstruction = this.stream.position;
        }
        if (next.category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor) {
            if (next.lexeme === "ORG") {
                this.processOrg();
            }
            else if (next.lexeme === "END") {
                this.processEnd();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    processOrg() {
        var org = this.stream.expectOnly("ORG");
        this.org = org;
        if (this.orgAddress !== null) {
            this.stream.warn(org, "Redefinition of ORG encountered, this later definition will take effect");
        }
        var address = this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number);
        this.orgAddress = parseInt(address.lexeme, 10);
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment) {
            this.orgComment = this.stream.read();
        }
        this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL);
    }
    processEnd() {
        var end = this.stream.expectOnly("END");
        var address = null;
        var comment = null;
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number) {
            address = this.stream.read();
        }
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment) {
            comment = this.stream.read();
        }
        this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL);
        if (address !== null) {
            if (this.orgAddress !== null) {
                this.stream.warn(end, "Encountered both ORG and END address, the ORG definition will take effect");
            }
            else {
                this.org = end;
                this.orgAddress = parseInt(address.lexeme, 10);
            }
        }
    }
    emitOrg() {
        if (this.orgAddress === null) {
            if (this.options.standard === __WEBPACK_IMPORTED_MODULE_1__Interface_IParseOptions__["a" /* Standard */].ICWS86 &&
                _(_(this.context.labels).keys()).contains(OrgPass.START_LABEL)) {
                this.orgAddress = this.context.labels[OrgPass.START_LABEL];
            }
            else {
                this.orgAddress = 0;
            }
            this.org = {
                category: __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            };
        }
        var org = {
            category: __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor,
            lexeme: "ORG",
            position: _.clone(this.org.position)
        };
        var address = {
            category: __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number,
            lexeme: this.orgAddress.toString(),
            position: _.clone(this.org.position)
        };
        var instruction = [org, address];
        if (this.orgComment !== null) {
            instruction.push(this.orgComment);
        }
        instruction.push({
            category: __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL,
            lexeme: "\n",
            position: _.clone(this.org.position)
        });
        // HACK this is the only way I could find to insert an array into an array!
        var args = [this.firstInstruction, 0];
        this.context.tokens.splice.apply(this.context.tokens, args.concat(instruction));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrgPass;

OrgPass.START_LABEL = "start";


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PassBase__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__ = __webpack_require__(0);


class SyntaxCheck extends __WEBPACK_IMPORTED_MODULE_0__PassBase__["a" /* PassBase */] {
    processLine() {
        var next = this.stream.peek();
        if (next.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.parseInstruction();
        }
        else if (next.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comment) {
            this.parseComment();
        }
        else if (next.category === __WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Preprocessor &&
            (next.lexeme === "END" || next.lexeme === "ORG")) {
            this.context.emit(this.stream.readToEOL());
        }
        else {
            this.stream.expected("instruction or comment", next);
        }
    }
    mustEmit(category) {
        var token = this.stream.expect(category);
        this.context.emitSingle(token);
    }
    mayEmit(category) {
        if (this.stream.peek().category === category) {
            this.context.emitSingle(this.stream.read());
        }
    }
    parseComment() {
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comment);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].EOL);
    }
    parseInstruction() {
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Opcode);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Modifier);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Mode);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Number);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comma);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Mode);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Number);
        this.mayEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].Comment);
        this.mustEmit(__WEBPACK_IMPORTED_MODULE_1__Interface_IToken__["a" /* TokenCategory */].EOL);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyntaxCheck;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);

class LoadFileSerialiser {
    serialise(tokens) {
        var result = "";
        this.previous = __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL;
        _.forEach(tokens, (token) => {
            result += this.serialiseToken(token);
            this.previous = token.category;
        });
        return result;
    }
    serialiseToken(token) {
        switch (token.category) {
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comma:
                return ",\t";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL:
                return "\n";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Mode:
                return token.lexeme;
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Modifier:
                return token.lexeme + "\t";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number:
                return token.lexeme;
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode:
                return token.lexeme;
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Preprocessor:
                return token.lexeme + "\t";
            case __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comment:
                if (this.previous === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].EOL) {
                    return token.lexeme;
                }
                else {
                    return "\t" + token.lexeme;
                }
            default:
                return "";
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoadFileSerialiser;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PassBase__ = __webpack_require__(1);


class IllegalCommandCheck extends __WEBPACK_IMPORTED_MODULE_1__PassBase__["a" /* PassBase */] {
    processLine() {
        if (this.stream.peek().category === __WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode) {
            this.checkLine();
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    checkLine() {
        var instruction = {
            opcode: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Opcode),
            modifier: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Modifier),
            aOperand: {
                mode: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Mode),
                address: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number)
            },
            comma: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Comma),
            bOperand: {
                mode: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Mode),
                address: this.stream.expect(__WEBPACK_IMPORTED_MODULE_0__Interface_IToken__["a" /* TokenCategory */].Number)
            }
        };
        var hash = instruction.opcode.lexeme +
            instruction.aOperand.mode.lexeme +
            instruction.bOperand.mode.lexeme;
        if (!_(IllegalCommandCheck.LegalCommands).contains(hash)) {
            this.stream.error(instruction.opcode, "Illegal addressing mode under selected Corewar standard");
        }
        this.context.emitInstruction(instruction);
        this.context.emit(this.stream.readToEOL());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IllegalCommandCheck;

IllegalCommandCheck.LegalCommands = [
    "ADD#$", "ADD#@", "ADD#<", "ADD$$", "ADD$@",
    "ADD$<", "ADD@$", "ADD@@", "ADD@<", "ADD<$",
    "ADD<@", "ADD<<", "CMP#$", "CMP#@", "CMP#<",
    "CMP$$", "CMP$@", "CMP$<", "CMP@$", "CMP@@",
    "CMP@<", "CMP<$", "CMP<@", "CMP<<", "DAT##",
    "DAT#<", "DAT<#", "DAT<<", "DJN$#", "DJN$$",
    "DJN$@", "DJN$<", "DJN@#", "DJN@$", "DJN@@",
    "DJN@<", "DJN<#", "DJN<$", "DJN<@", "DJN<<",
    "JMN$#", "JMN$$", "JMN$@", "JMN$<", "JMN@#",
    "JMN@$", "JMN@@", "JMN@<", "JMN<#", "JMN<$",
    "JMN<@", "JMN<<", "JMP$#", "JMP$$", "JMP$@",
    "JMP$<", "JMP@#", "JMP@$", "JMP@@", "JMP@<",
    "JMP<#", "JMP<$", "JMP<@", "JMP<<", "JMZ$#",
    "JMZ$$", "JMZ$@", "JMZ$<", "JMZ@#", "JMZ@$",
    "JMZ@@", "JMZ@<", "JMZ<#", "JMZ<$", "JMZ<@",
    "JMZ<<", "MOV#$", "MOV#@", "MOV#<", "MOV$$",
    "MOV$@", "MOV$<", "MOV@$", "MOV@@", "MOV@<",
    "MOV<$", "MOV<@", "MOV<<", "SLT#$", "SLT#@",
    "SLT#<", "SLT$$", "SLT$@", "SLT$<", "SLT@$",
    "SLT@@", "SLT@<", "SLT<$", "SLT<@", "SLT<<",
    "SPL$#", "SPL$$", "SPL$@", "SPL$<", "SPL@#",
    "SPL@$", "SPL@@", "SPL@<", "SPL<#", "SPL<$",
    "SPL<@", "SPL<<", "SUB#$", "SUB#@", "SUB#<",
    "SUB$$", "SUB$@", "SUB$<", "SUB@$", "SUB@@",
    "SUB@<", "SUB<$", "SUB<@", "SUB<<"
];


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Random {
    get(max) {
        return Math.floor(Math.random() * max);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Random;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Executive {
    constructor() {
        this.commandTable = [
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.mov_a,
            this.mov_b,
            this.mov_ab,
            this.mov_ba,
            this.mov_f,
            this.mov_x,
            this.mov_i,
            this.add_a,
            this.add_b,
            this.add_ab,
            this.add_ba,
            this.add_f,
            this.add_x,
            this.add_f,
            this.sub_a,
            this.sub_b,
            this.sub_ab,
            this.sub_ba,
            this.sub_f,
            this.sub_x,
            this.sub_f,
            this.mul_a,
            this.mul_b,
            this.mul_ab,
            this.mul_ba,
            this.mul_f,
            this.mul_x,
            this.mul_f,
            this.div_a,
            this.div_b,
            this.div_ab,
            this.div_ba,
            this.div_f,
            this.div_x,
            this.div_f,
            this.mod_a,
            this.mod_b,
            this.mod_ab,
            this.mod_ba,
            this.mod_f,
            this.mod_x,
            this.mod_f,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmz_a,
            this.jmz_b,
            this.jmz_b,
            this.jmz_a,
            this.jmz_f,
            this.jmz_f,
            this.jmz_f,
            this.jmn_a,
            this.jmn_b,
            this.jmn_b,
            this.jmn_a,
            this.jmn_f,
            this.jmn_f,
            this.jmn_f,
            this.djn_a,
            this.djn_b,
            this.djn_b,
            this.djn_a,
            this.djn_f,
            this.djn_f,
            this.djn_f,
            this.seq_a,
            this.seq_b,
            this.seq_ab,
            this.seq_ba,
            this.seq_f,
            this.seq_x,
            this.seq_i,
            this.seq_a,
            this.seq_b,
            this.seq_ab,
            this.seq_ba,
            this.seq_f,
            this.seq_x,
            this.seq_i,
            this.sne_a,
            this.sne_b,
            this.sne_ab,
            this.sne_ba,
            this.sne_f,
            this.sne_x,
            this.sne_i,
            this.slt_a,
            this.slt_b,
            this.slt_ab,
            this.slt_ba,
            this.slt_f,
            this.slt_x,
            this.slt_f,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
        ];
    }
    initialise(options) {
        this.instructionLimit = options.instructionLimit;
    }
    dat(context) {
        //Remove current task from the queue
        var ti = context.taskIndex;
        context.warrior.taskIndex = context.taskIndex;
        context.warrior.tasks.splice(ti, 1);
    }
    mov_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.aOperand.address;
    }
    mov_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }
    mov_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }
    mov_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.bOperand.address;
    }
    mov_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.aOperand.address;
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }
    mov_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.bOperand.address;
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }
    mov_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = {
            address: context.bPointer,
            opcode: aInstruction.opcode,
            modifier: aInstruction.modifier,
            aOperand: {
                address: aInstruction.aOperand.address,
                mode: aInstruction.aOperand.mode
            },
            bOperand: {
                address: aInstruction.bOperand.address,
                mode: aInstruction.bOperand.mode
            }
        };
        context.core.setAt(context.task, context.bPointer, bInstruction);
    }
    add_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
    }
    add_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
    }
    add_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
    }
    add_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
    }
    add_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
    }
    add_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
    }
    sub_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
    }
    sub_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
    }
    sub_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
    }
    sub_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
    }
    sub_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
    }
    sub_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
    }
    mul_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
    }
    mul_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
    }
    mul_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
    }
    mul_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
    }
    mul_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
    }
    mul_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
    }
    div_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    mod_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
        //TODO double divide by zero will remove two processes from the warrior task queue!
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    jmp(context) {
        context.task.instructionPointer = context.core.wrap(context.aPointer);
    }
    jmz_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmz_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmz_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address === 0 &&
            bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address !== 0 ||
            bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;
        if (a !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;
        if (b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;
        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;
        if (a !== 0 || b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    seq_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.bOperand.address &&
            aInstruction.bOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.opcode === bInstruction.opcode &&
            aInstruction.modifier === bInstruction.modifier &&
            aInstruction.aOperand.mode === bInstruction.aOperand.mode &&
            aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.mode === bInstruction.bOperand.mode &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.bOperand.address ||
            aInstruction.bOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.opcode !== bInstruction.opcode ||
            aInstruction.modifier !== bInstruction.modifier ||
            aInstruction.aOperand.mode !== bInstruction.aOperand.mode ||
            aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.mode !== bInstruction.bOperand.mode ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.aOperand.address &&
            aInstruction.bOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.bOperand.address &&
            aInstruction.bOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    spl(context) {
        if (context.warrior.tasks.length < this.instructionLimit) {
            context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aPointer),
                warrior: context.warrior
            });
            context.warrior.taskIndex = (context.warrior.taskIndex + 1) % context.warrior.tasks.length;
        }
    }
    nop(context) {
        // DO NOWT
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Executive;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__ = __webpack_require__(4);

class Decoder {
    constructor(executive) {
        this.modeTable = [
            this.immediate,
            this.direct,
            this.aIndirect,
            this.bIndirect,
            this.aPreDecrement,
            this.bPreDecrement,
            this.aPostIncrement,
            this.bPostIncrement // >
        ];
        this.executive = executive;
    }
    decode(context) {
        var aAccessor = this.modeTable[context.instruction.aOperand.mode];
        var bAccessor = this.modeTable[context.instruction.bOperand.mode];
        context.aPointer = aAccessor(context.task, context.instructionPointer, context.instruction.aOperand, context.core);
        context.bPointer = bAccessor(context.task, context.instructionPointer, context.instruction.bOperand, context.core);
        context.command = this.executive.commandTable[context.instruction.opcode * __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].Count + context.instruction.modifier];
        return context;
    }
    immediate(task, ip, operand, core) {
        return ip;
    }
    direct(task, ip, operand, core) {
        return ip + operand.address;
    }
    aIndirect(task, ip, operand, core) {
        var ipa = ip + operand.address;
        return ipa + core.readAt(task, ipa).aOperand.address;
    }
    bIndirect(task, ip, operand, core) {
        var ipa = ip + operand.address;
        return ipa + core.readAt(task, ipa).bOperand.address;
    }
    aPreDecrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.aOperand.address;
        var result = ipa + --value;
        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    bPreDecrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.bOperand.address;
        var result = ipa + --value;
        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    aPostIncrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.aOperand.address;
        var result = ipa + value++;
        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    bPostIncrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.bOperand.address;
        var result = ipa + value++;
        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Decoder;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_LiteEvent__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_ICore__ = __webpack_require__(7);


class Core {
    constructor() {
        this.instructions = null;
        this._coreAccess = new __WEBPACK_IMPORTED_MODULE_0__modules_LiteEvent__["a" /* LiteEvent */]();
    }
    get coreAccess() {
        return this._coreAccess;
    }
    initialise(options) {
        this.options = options;
        this.cs = this.options.coresize;
        this.allocateMemory();
    }
    getSize() {
        return this.cs;
    }
    wrap(address) {
        address = address % this.cs;
        address = address >= 0 ? address : address + this.cs;
        return address;
    }
    triggerEvent(task, address, accessType) {
        this._coreAccess.trigger({
            task: task,
            accessType: accessType,
            address: address
        });
    }
    executeAt(task, address) {
        address = this.wrap(address);
        this.triggerEvent(task, address, __WEBPACK_IMPORTED_MODULE_1__Interface_ICore__["a" /* CoreAccessType */].execute);
        return this.instructions[address];
    }
    readAt(task, address) {
        address = this.wrap(address);
        this.triggerEvent(task, address, __WEBPACK_IMPORTED_MODULE_1__Interface_ICore__["a" /* CoreAccessType */].read);
        return this.instructions[address];
    }
    getAt(address) {
        address = this.wrap(address);
        return this.instructions[address];
    }
    setAt(task, address, instruction) {
        address = this.wrap(address);
        this.triggerEvent(task, address, __WEBPACK_IMPORTED_MODULE_1__Interface_ICore__["a" /* CoreAccessType */].write);
        this.instructions[address] = instruction;
    }
    allocateMemory() {
        this.instructions = [];
        for (var i = 0; i < this.cs; i++) {
            this.instructions.push(this.buildDefaultInstruction(i));
        }
    }
    buildDefaultInstruction(index) {
        var instruction = _.clone(this.options.initialInstruction);
        instruction.aOperand = _.clone(instruction.aOperand);
        instruction.bOperand = _.clone(instruction.bOperand);
        instruction.address = index;
        return instruction;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Core;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
class LiteEvent {
    constructor() {
        this.handlers = [];
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
    unsubscribe(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(data) {
        if (this.handlers) {
            this.handlers.slice(0).forEach(h => h(data));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LiteEvent;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Loader {
    constructor(random, core, warriorLoader) {
        this.random = random;
        this.warriorLoader = warriorLoader;
        this.core = core;
    }
    load(warriors, options) {
        var result = [];
        _(warriors).forEach((w) => {
            var address = this.getValidAddress(result, options);
            result.push(this.warriorLoader.load(address, w));
        });
        return result;
    }
    getValidAddress(warriors, options) {
        while (true) {
            var address = this.random.get(options.coresize);
            if (this.isValidAddress(address, warriors, options)) {
                return address;
            }
        }
    }
    isValidAddress(address, warriors, options) {
        var valid = true;
        var core = this.core;
        var instructionLimitLess1 = options.instructionLimit - 1;
        var minSeparationLess1 = options.minSeparation - 1;
        _(warriors).forEach((w) => {
            var s0 = address;
            var f0 = address + instructionLimitLess1;
            var s1 = w.startAddress - minSeparationLess1;
            var f1 = w.startAddress + minSeparationLess1 + instructionLimitLess1;
            s0 = core.wrap(s0);
            f0 = core.wrap(f0);
            s1 = core.wrap(s1);
            f1 = core.wrap(f1);
            if (s0 <= f0) {
                if (s1 <= f1) {
                    if (s0 <= f1 && s1 <= f0) {
                        valid = false;
                        return;
                    }
                }
                else if (s0 <= f1 || s1 <= f0) {
                    valid = false;
                    return;
                }
            }
            else if (s0 <= f1 || s1 <= f0) {
                valid = false;
                return;
            }
        });
        return valid;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parser_Interface_IToken__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Parser_TokenStream__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Warrior__ = __webpack_require__(35);





class WarriorLoader {
    constructor(core) {
        this.core = core;
    }
    load(address, result) {
        this.stream = new __WEBPACK_IMPORTED_MODULE_3__Parser_TokenStream__["a" /* TokenStream */](result.tokens, result.messages);
        this.address = address;
        this.warrior = new __WEBPACK_IMPORTED_MODULE_4__Warrior__["a" /* Warrior */]();
        this.warrior.startAddress = address;
        this.readInstructions();
        this.loadProcess();
        this.warrior.name = result.metaData.name;
        this.warrior.author = result.metaData.author;
        this.warrior.strategy = result.metaData.strategy;
        return this.warrior;
    }
    readInstructions() {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === __WEBPACK_IMPORTED_MODULE_2__Parser_Interface_IToken__["a" /* TokenCategory */].Opcode) {
                this.core.setAt(this.warrior.tasks[0], this.address++, this.readInstruction());
            }
            else if (next.category === __WEBPACK_IMPORTED_MODULE_2__Parser_Interface_IToken__["a" /* TokenCategory */].Preprocessor) {
                this.startAddress = this.readOrg();
            }
            else {
                this.stream.readToEOL();
            }
        }
    }
    readInstruction() {
        var parseInstruction = this.readParseInstruction();
        var instruction = {
            address: this.address,
            opcode: this.getOpcode(parseInstruction),
            modifier: this.getModifier(parseInstruction),
            aOperand: this.getOperand(parseInstruction.aOperand),
            bOperand: this.getOperand(parseInstruction.bOperand)
        };
        return instruction;
    }
    readOrg() {
        this.stream.read(); // ORG
        var token = this.stream.read();
        this.stream.readToEOL();
        return this.address + parseInt(token.lexeme, 10);
    }
    readParseInstruction() {
        var result = {
            opcode: this.stream.read(),
            modifier: this.stream.read(),
            aOperand: {
                mode: this.stream.read(),
                address: this.stream.read()
            },
            comma: this.stream.read(),
            bOperand: {
                mode: this.stream.read(),
                address: this.stream.read()
            }
        };
        this.stream.readToEOL();
        return result;
    }
    getOpcode(instruction) {
        switch (instruction.opcode.lexeme) {
            case "DAT":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].DAT;
            case "MOV":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].MOV;
            case "ADD":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].ADD;
            case "SUB":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].SUB;
            case "MUL":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].MUL;
            case "DIV":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].DIV;
            case "MOD":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].MOD;
            case "JMP":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].JMP;
            case "JMZ":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].JMZ;
            case "JMN":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].JMN;
            case "DJN":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].DJN;
            case "CMP":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].CMP;
            case "SEQ":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].SEQ;
            case "SNE":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].SNE;
            case "SLT":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].SLT;
            case "SPL":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].SPL;
            default:
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["b" /* OpcodeType */].NOP;
        }
    }
    getModifier(instruction) {
        switch (instruction.modifier.lexeme) {
            case ".A":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].A;
            case ".B":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].B;
            case ".BA":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].BA;
            case ".F":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].F;
            case ".I":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].I;
            case ".X":
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].X;
            default:
                return __WEBPACK_IMPORTED_MODULE_0__Interface_IInstruction__["a" /* ModifierType */].AB;
        }
    }
    getOperand(operand) {
        var result = {
            mode: 0,
            address: parseInt(operand.address.lexeme, 10)
        };
        switch (operand.mode.lexeme) {
            case "#":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].Immediate;
                break;
            case "*":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].AIndirect;
                break;
            case "@":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].BIndirect;
                break;
            case "{":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].APreDecrement;
                break;
            case "<":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].BPreDecrement;
                break;
            case "}":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].APostIncrement;
                break;
            case ">":
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].BPostIncrement;
                break;
            default:
                result.mode = __WEBPACK_IMPORTED_MODULE_1__Interface_IOperand__["a" /* ModeType */].Direct;
                break;
        }
        return result;
    }
    loadProcess() {
        this.warrior.tasks.push({
            instructionPointer: this.startAddress,
            warrior: this.warrior
        });
        this.warrior.taskIndex = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WarriorLoader;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Warrior {
    constructor() {
        this.name = "";
        this.author = "";
        this.strategy = "";
        this.instructions = [];
        this.taskIndex = 0;
        this.tasks = [];
        this.startAddress = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Warrior;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fetcher {
    fetch(state) {
        var wi = state.warriorIndex;
        var warrior = state.warriors[wi];
        var ti = warrior.taskIndex;
        var task = warrior.tasks[ti];
        state.warriorIndex = (wi + 1) % state.warriors.length;
        warrior.taskIndex = (ti + 1) % warrior.tasks.length;
        var ip = task.instructionPointer;
        var instruction = state.core.executeAt(task, ip);
        task.instructionPointer = (ip + 1) % state.options.coresize;
        // TODO should we instantiate an object everytime?
        return {
            core: state.core,
            instructionPointer: ip,
            instruction: instruction,
            taskIndex: ti,
            task: task,
            warriorIndex: wi,
            warrior: warrior
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fetcher;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Defaults__ = __webpack_require__(8);

class Simulator {
    constructor(core, loader, fetcher, decoder, executive, endCondition) {
        this.state = {
            core: core,
            cycle: 0,
            warriors: [],
            warriorIndex: 0,
            options: null //,
            //context: null
        };
        this.loader = loader;
        this.fetcher = fetcher;
        this.decoder = decoder;
        this.executive = executive;
        this.endCondition = endCondition;
    }
    initialise(options, warriors) {
        // TODO throw error if options are invalid e.g. minSeparation must be >=1
        this.state.options = _.defaults(options, __WEBPACK_IMPORTED_MODULE_0__Defaults__["a" /* default */]);
        this.state.core.initialise(options);
        this.state.warriors = this.loader.load(warriors, options);
    }
    run() {
        while (this.step()) {
            // TODO setTimeout?
            window.setTimeout(() => {
                //
            }, 0);
        }
    }
    step() {
        var context = this.fetcher.fetch(this.state);
        context = this.decoder.decode(context);
        context.command.apply(this.executive, [context]);
        this.state.cycle += 1;
        return this.endCondition.check(this.state);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Simulator;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EndCondition {
    check(state) {
        if (state.cycle === state.options.cyclesBeforeTie) {
            return true;
        }
        var liveWarriors = _(state.warriors).filter((warrior) => warrior.tasks.length > 0);
        if (state.warriors.length > 1) {
            return liveWarriors.length === 1;
        }
        else {
            return liveWarriors.length === 0;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EndCondition;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__ = __webpack_require__(5);


class InstructionSerialiser {
    serialise(instruction) {
        return this.serialiseOpcode(instruction) + "." +
            this.serialiseModifier(instruction) + " " +
            this.serialiseOperand(instruction.aOperand) + ", " +
            this.serialiseOperand(instruction.bOperand);
    }
    serialiseOpcode(instruction) {
        switch (instruction.opcode) {
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].ADD:
                return "ADD";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].CMP:
                return "CMP";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].DAT:
                return "DAT";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].DIV:
                return "DIV";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].DJN:
                return "DJN";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].JMN:
                return "JMN";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].JMP:
                return "JMP";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].JMZ:
                return "JMZ";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].MOD:
                return "MOD";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].MOV:
                return "MOV";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].MUL:
                return "MUL";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].NOP:
                return "NOP";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].SEQ:
                return "SEQ";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].SLT:
                return "SLT";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].SNE:
                return "SNE";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].SPL:
                return "SPL";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["b" /* OpcodeType */].SUB:
                return "SUB";
        }
        throw "Unknown Opcode provided to InstructionSerialiser";
    }
    serialiseModifier(instruction) {
        switch (instruction.modifier) {
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].A:
                return "A";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].B:
                return "B";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].AB:
                return "AB";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].BA:
                return "BA";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].F:
                return "F";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].I:
                return "I";
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_IInstruction__["a" /* ModifierType */].X:
                return "X";
        }
        throw "Unknown Modifier provided to InstructionSerialiser";
    }
    serialiseOperand(operand) {
        return this.serialiseMode(operand.mode) +
            this.serialiseAddress(operand.address);
    }
    serialiseMode(mode) {
        switch (mode) {
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].AIndirect:
                return "*";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].APostIncrement:
                return "}";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].APreDecrement:
                return "{";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].BIndirect:
                return "@";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].BPostIncrement:
                return ">";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].BPreDecrement:
                return "<";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].Direct:
                return "$";
            case __WEBPACK_IMPORTED_MODULE_1__Simulator_Interface_IOperand__["a" /* ModeType */].Immediate:
                return "#";
        }
        throw "Unknown Mode provided to InstructionSerialiser";
    }
    serialiseAddress(address) {
        return address.toString();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InstructionSerialiser;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_ICore__ = __webpack_require__(7);

class CoreRenderer {
    constructor(canvas, instructionLabel, core, instructionSerialiser) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.instructionLabel = instructionLabel;
        this.core = core;
        this.instructionSerialiser = instructionSerialiser;
        this.queue = [];
        core.coreAccess.subscribe((e) => {
            this.queue.push(e);
        });
    }
    initialise() {
        this.cellSize = this.calculateCellSize();
        this.cellsWide = Math.floor(this.canvas.width / this.cellSize);
        this.cellsHigh = Math.floor(this.canvas.height / this.cellSize);
        this.previousExecutions = [];
        this.canvas.addEventListener("click", (e) => { this.canvasClick(e); });
        this.renderGrid();
    }
    render() {
        var event;
        while (this.previousExecutions.length !== 0) {
            event = this.previousExecutions.pop();
            this.renderCell(event, "#f00");
        }
        this.previousExecutions = _(this.queue).where((q) => q.accessType === __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_ICore__["a" /* CoreAccessType */].execute);
        while (this.queue.length !== 0) {
            event = this.queue.shift();
            this.renderCell(event, "#fff");
        }
        this.renderGridLines();
    }
    addressToScreenCoordinate(address) {
        var ix = address % this.cellsWide;
        var iy = Math.floor(address / this.cellsWide);
        return {
            x: ix * this.cellSize,
            y: iy * this.cellSize
        };
    }
    screenCoordinateToAddress(point) {
        var x = Math.floor(point.x / this.cellSize);
        var y = Math.floor(point.y / this.cellSize);
        return y * this.cellsWide + x;
    }
    renderCell(event, executionColour) {
        var coordinate = this.addressToScreenCoordinate(event.address);
        //TODO colour for each process
        this.context.fillStyle = "#f00";
        this.context.strokeStyle = "#f00";
        switch (event.accessType) {
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_ICore__["a" /* CoreAccessType */].execute:
                this.renderExecute(coordinate, executionColour);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_ICore__["a" /* CoreAccessType */].read:
                this.renderRead(coordinate);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__Simulator_Interface_ICore__["a" /* CoreAccessType */].write:
                this.renderWrite(coordinate);
                break;
            default:
                throw Error("Cannot render unknown CoreAccessType: " + event.accessType);
        }
    }
    renderExecute(coordinate, executionColour) {
        var colour = this.context.fillStyle;
        this.context.fillStyle = executionColour;
        this.context.fillRect(coordinate.x, coordinate.y, this.cellSize, this.cellSize);
        this.context.fillStyle = colour;
    }
    renderRead(coordinate) {
        var hSize = this.cellSize / 2;
        var radius = this.cellSize / 8;
        var centre = {
            x: coordinate.x + hSize,
            y: coordinate.y + hSize
        };
        this.context.beginPath();
        this.context.arc(centre.x, centre.y, radius, 0, 2 * Math.PI, false);
        this.context.fill();
        //this.context.stroke();
    }
    renderWrite(coordinate) {
        var x0 = coordinate.x;
        var y0 = coordinate.y;
        var x1 = x0 + this.cellSize;
        var y1 = y0 + this.cellSize;
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.moveTo(x0, y1);
        this.context.lineTo(x1, y0);
        this.context.stroke();
    }
    renderGrid() {
        this.clearCanvas();
        this.fillGridArea();
        this.renderGridLines();
        this.greyOutExtraCells();
    }
    clearCanvas() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
    }
    fillGridArea() {
        var width = this.cellsWide * this.cellSize;
        var height = this.cellsHigh * this.cellSize;
        this.context.fillStyle = "#eee";
        this.context.fillRect(0, 0, width, height);
    }
    greyOutExtraCells() {
        var cellsDrawn = this.cellsWide * this.cellsHigh;
        var extraCellsDrawn = cellsDrawn - this.core.getSize();
        if (extraCellsDrawn === 0) {
            return;
        }
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        var maxX = gridWidth - this.cellSize;
        var maxY = gridHeight - this.cellSize;
        var x = maxX;
        var y = maxY;
        this.context.fillStyle = "#aaa";
        while (extraCellsDrawn-- > 0) {
            this.context.fillRect(x, y, this.cellSize, this.cellSize);
            x -= this.cellSize;
            if (x < 0) {
                x = maxX;
                y -= this.cellSize;
            }
        }
    }
    renderGridLines() {
        this.context.beginPath();
        this.renderVerticalLines();
        this.renderHorizontalLines();
        this.context.strokeStyle = "#aaa";
        this.context.stroke();
    }
    renderHorizontalLines() {
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        for (var y = 0; y <= gridHeight; y += this.cellSize) {
            this.context.moveTo(0, y);
            this.context.lineTo(gridWidth, y);
        }
    }
    renderVerticalLines() {
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        for (var x = 0; x <= gridWidth; x += this.cellSize) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, gridHeight);
        }
    }
    calculateCellSize() {
        var area = this.canvas.width * this.canvas.height;
        var n = this.core.getSize();
        var maxCellSize = Math.sqrt(area / n);
        var possibleCellSize = Math.floor(maxCellSize);
        while (!this.isValidCellSize(possibleCellSize)) {
            possibleCellSize--;
        }
        return possibleCellSize;
    }
    isValidCellSize(cellSize) {
        var cellsWide = Math.floor(this.canvas.width / cellSize);
        var cellsHigh = Math.floor(this.canvas.height / cellSize);
        return cellsWide * cellsHigh >= this.core.getSize();
    }
    getRelativeCoordinates(event) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var currentElement = event.target;
        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while (currentElement = currentElement.offsetParent);
        var canvasX = event.pageX - totalOffsetX;
        var canvasY = event.pageY - totalOffsetY;
        return { x: canvasX, y: canvasY };
    }
    canvasClick(e) {
        var point = this.getRelativeCoordinates(e);
        var address = this.screenCoordinateToAddress(point);
        var instruction = this.core.getAt(address);
        this.instructionLabel.innerText = this.instructionSerialiser.serialise(instruction);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CoreRenderer;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parser_Interface_IMessage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Simulator_Defaults__ = __webpack_require__(8);


class Presenter {
    constructor(redcode, loadfile, console, standard, parser, serialiser, simulator, core, executive) {
        this.redcode = redcode;
        this.loadfile = loadfile;
        this.console = console;
        this.standard = standard;
        this.serialiser = serialiser;
        this.parser = parser;
        this.simulator = simulator;
        this.core = core;
        this.executive = executive;
    }
    parse() {
        while (this.console.hasChildNodes()) {
            this.console.removeChild(this.console.lastChild);
        }
        var selectedStandard = parseInt(this.standard.value);
        var redcodeValue = this.redcode.value;
        this.result = this.parser.parse(redcodeValue, { standard: selectedStandard });
        this.loadfile.value = this.serialiser.serialise(this.result.tokens);
        _.forEach(this.result.messages, (item) => {
            var li = document.createElement("li");
            li.innerText =
                "[" + item.position.line.toString() + "," +
                    item.position.char.toString() + "] " +
                    this.messageTypeToString(item.type) +
                    item.text;
            this.console.appendChild(li);
        });
    }
    run() {
        //TODO check successful parse
        var selectedStandard = parseInt(this.standard.value);
        var options = _.defaults({
            coresize: 64,
            standard: selectedStandard
        }, __WEBPACK_IMPORTED_MODULE_1__Simulator_Defaults__["a" /* default */]);
        this.core.initialise(options);
        this.executive.initialise(options);
        this.simulator.initialise(options, [this.result]);
    }
    step() {
        this.simulator.step();
    }
    messageTypeToString(messageType) {
        switch (messageType) {
            case __WEBPACK_IMPORTED_MODULE_0__Parser_Interface_IMessage__["a" /* MessageType */].Error:
                return "ERROR: ";
            case __WEBPACK_IMPORTED_MODULE_0__Parser_Interface_IMessage__["a" /* MessageType */].Warning:
                return "WARNING: ";
            case __WEBPACK_IMPORTED_MODULE_0__Parser_Interface_IMessage__["a" /* MessageType */].Info:
                return "";
        }
        return "";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Presenter;



/***/ })
/******/ ]);