/**
    Module P: Generic Promises for TypeScript

    Project, documentation, and license: https://github.com/pragmatrix/Promise
*/
var P;
(function (P) {
    /**
        Returns a new "Deferred" value that may be resolved or rejected.
    */
    function defer() {
        return new DeferredI();
    }
    P.defer = defer;
    /**
        Converts a value to a resolved promise.
    */
    function resolve(v) {
        return defer().resolve(v).promise();
    }
    P.resolve = resolve;
    /**
        Returns a rejected promise.
    */
    function reject(err) {
        return defer().reject(err).promise();
    }
    P.reject = reject;
    /**
        http://en.wikipedia.org/wiki/Anamorphism

        Given a seed value, unfold calls the unspool function, waits for the returned promise to be resolved, and then
        calls it again if a next seed value was returned.

        All the values of all promise results are collected into the resulting promise which is resolved as soon
        the last generated element value is resolved.
    */
    function unfold(unspool, seed) {
        var d = defer();
        var elements = new Array();
        unfoldCore(elements, d, unspool, seed);
        return d.promise();
    }
    P.unfold = unfold;
    function unfoldCore(elements, deferred, unspool, seed) {
        var result = unspool(seed);
        if (!result) {
            deferred.resolve(elements);
            return;
        }
        while (result.next && result.promise.status == 2 /* Resolved */) {
            elements.push(result.promise.result);
            result = unspool(result.next);
            if (!result) {
                deferred.resolve(elements);
                return;
            }
        }
        result.promise.done(function (v) {
            elements.push(v);
            if (!result.next)
                deferred.resolve(elements);
            else
                unfoldCore(elements, deferred, unspool, result.next);
        }).fail(function (e) {
            deferred.reject(e);
        });
    }
    /**
        The status of a Promise. Initially a Promise is Unfulfilled and may
        change to Rejected or Resolved.
     
        Once a promise is either Rejected or Resolved, it can not change its
        status anymore.
    */
    (function (Status) {
        Status[Status["Unfulfilled"] = 0] = "Unfulfilled";
        Status[Status["Rejected"] = 1] = "Rejected";
        Status[Status["Resolved"] = 2] = "Resolved";
    })(P.Status || (P.Status = {}));
    var Status = P.Status;
    /**
        Creates a promise that gets resolved when all the promises in the argument list get resolved.
        As soon one of the arguments gets rejected, the resulting promise gets rejected.
        If no promises were provided, the resulting promise is immediately resolved.
    */
    function when() {
        var promises = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            promises[_i - 0] = arguments[_i];
        }
        var allDone = defer();
        if (!promises.length) {
            allDone.resolve([]);
            return allDone.promise();
        }
        var resolved = 0;
        var results = [];
        promises.forEach(function (p, i) {
            p.done(function (v) {
                results[i] = v;
                ++resolved;
                if (resolved === promises.length && allDone.status !== 1 /* Rejected */)
                    allDone.resolve(results);
            }).fail(function (e) {
                if (allDone.status !== 1 /* Rejected */)
                    allDone.reject(new Error("when: one or more promises were rejected"));
            });
        });
        return allDone.promise();
    }
    P.when = when;
    /**
        Implementation of a promise.

        The Promise<Value> instance is a proxy to the Deferred<Value> instance.
    */
    var PromiseI = (function () {
        function PromiseI(deferred) {
            this.deferred = deferred;
        }
        Object.defineProperty(PromiseI.prototype, "status", {
            get: function () {
                return this.deferred.status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PromiseI.prototype, "result", {
            get: function () {
                return this.deferred.result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PromiseI.prototype, "error", {
            get: function () {
                return this.deferred.error;
            },
            enumerable: true,
            configurable: true
        });
        PromiseI.prototype.done = function (f) {
            this.deferred.done(f);
            return this;
        };
        PromiseI.prototype.fail = function (f) {
            this.deferred.fail(f);
            return this;
        };
        PromiseI.prototype.always = function (f) {
            this.deferred.always(f);
            return this;
        };
        PromiseI.prototype.then = function (f) {
            return this.deferred.then(f);
        };
        return PromiseI;
    })();
    /**
        Implementation of a deferred.
    */
    var DeferredI = (function () {
        function DeferredI() {
            this._resolved = function (_) {
            };
            this._rejected = function (_) {
            };
            this._status = 0 /* Unfulfilled */;
            this._error = { message: "" };
            this._promise = new PromiseI(this);
        }
        DeferredI.prototype.promise = function () {
            return this._promise;
        };
        Object.defineProperty(DeferredI.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeferredI.prototype, "result", {
            get: function () {
                if (this._status != 2 /* Resolved */)
                    throw new Error("Promise: result not available");
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeferredI.prototype, "error", {
            get: function () {
                if (this._status != 1 /* Rejected */)
                    throw new Error("Promise: rejection reason not available");
                return this._error;
            },
            enumerable: true,
            configurable: true
        });
        DeferredI.prototype.then = function (f) {
            var d = defer();
            this.done(function (v) {
                var promiseOrValue = f(v);
                // todo: need to find another way to check if r is really of interface
                // type Promise<any>, otherwise we would not support other 
                // implementations here.
                if (promiseOrValue instanceof PromiseI) {
                    var p = promiseOrValue;
                    p.done(function (v2) { return d.resolve(v2); }).fail(function (err) { return d.reject(err); });
                    return p;
                }
                d.resolve(promiseOrValue);
            }).fail(function (err) { return d.reject(err); });
            return d.promise();
        };
        DeferredI.prototype.done = function (f) {
            if (this.status === 2 /* Resolved */) {
                f(this._result);
                return this;
            }
            if (this.status !== 0 /* Unfulfilled */)
                return this;
            var prev = this._resolved;
            this._resolved = function (v) {
                prev(v);
                f(v);
            };
            return this;
        };
        DeferredI.prototype.fail = function (f) {
            if (this.status === 1 /* Rejected */) {
                f(this._error);
                return this;
            }
            if (this.status !== 0 /* Unfulfilled */)
                return this;
            var prev = this._rejected;
            this._rejected = function (e) {
                prev(e);
                f(e);
            };
            return this;
        };
        DeferredI.prototype.always = function (f) {
            this.done(function (v) { return f(v); }).fail(function (err) { return f(null, err); });
            return this;
        };
        DeferredI.prototype.resolve = function (result) {
            if (this._status !== 0 /* Unfulfilled */)
                throw new Error("tried to resolve a fulfilled promise");
            this._result = result;
            this._status = 2 /* Resolved */;
            this._resolved(result);
            this.detach();
            return this;
        };
        DeferredI.prototype.reject = function (err) {
            if (this._status !== 0 /* Unfulfilled */)
                throw new Error("tried to reject a fulfilled promise");
            this._error = err;
            this._status = 1 /* Rejected */;
            this._rejected(err);
            this.detach();
            return this;
        };
        DeferredI.prototype.detach = function () {
            this._resolved = function (_) {
            };
            this._rejected = function (_) {
            };
        };
        return DeferredI;
    })();
    function generator(g) {
        return function () { return iterator(g()); };
    }
    P.generator = generator;
    ;
    function iterator(f) {
        return new IteratorI(f);
    }
    P.iterator = iterator;
    var IteratorI = (function () {
        function IteratorI(f) {
            this.f = f;
            this.current = undefined;
        }
        IteratorI.prototype.advance = function () {
            var _this = this;
            var res = this.f();
            return res.then(function (value) {
                if (isUndefined(value))
                    return false;
                _this.current = value;
                return true;
            });
        };
        return IteratorI;
    })();
    /**
        Iterator functions.
    */
    function each(gen, f) {
        var d = defer();
        eachCore(d, gen(), f);
        return d.promise();
    }
    P.each = each;
    function eachCore(fin, it, f) {
        it.advance().done(function (hasValue) {
            if (!hasValue) {
                fin.resolve({});
                return;
            }
            f(it.current);
            eachCore(fin, it, f);
        }).fail(function (err) { return fin.reject(err); });
    }
    /**
        std
    */
    function isUndefined(v) {
        return typeof v === 'undefined';
    }
    P.isUndefined = isUndefined;
})(P || (P = {}));
/// <reference path="../../references.ts" />
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Error"] = 0] = "Error";
    MessageType[MessageType["Warning"] = 1] = "Warning";
    MessageType[MessageType["Info"] = 2] = "Info";
})(MessageType || (MessageType = {}));
/// <reference path="../../references.ts" />
var Standard;
(function (Standard) {
    Standard[Standard["ICWS86"] = 0] = "ICWS86";
    Standard[Standard["ICWS88"] = 1] = "ICWS88";
    Standard[Standard["ICWS94draft"] = 2] = "ICWS94draft";
    Standard[Standard["ICWS94extended"] = 3] = "ICWS94extended";
})(Standard || (Standard = {}));
/// <reference path="../../references.ts" />
/// <reference path="../../references.ts" />
/// <reference path="../../references.ts" />
/// <reference path="../../references.ts" />
/// <reference path="../../references.ts" />
/// <reference path="../../references.ts" />
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
/// <reference path="../../references.ts" />
/// <reference path="../references.ts" />
var Context = (function () {
    function Context() {
        this.equs = {};
        this.tokens = [];
        this.labels = {};
        this.messages = [];
    }
    Context.prototype.emitSingle = function (token) {
        this.tokens.push(token);
    };
    Context.prototype.emit = function (tokens) {
        this.tokens = this.tokens.concat(tokens);
    };
    return Context;
})();
/// <reference path="../references.ts" />
var DefaultPass = (function () {
    function DefaultPass() {
    }
    DefaultPass.prototype.process = function (context, options) {
        // Should specify default
        //    Modifiers (depends upon opcode)
        //    Modes ($)
        //    Operands $0
        //TODO CONSTANTS - need to define core settings at compile time
        //TODO 94 extended draft
        //TODO meta data e.g. ;author
        //TODO ;redcode tags
        //TODO ROF and multi-line EQU
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.options = options;
        this.processLines();
        return this.context;
    };
    DefaultPass.prototype.processLines = function () {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === 1 /* Opcode */) {
                this.processInstruction();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        }
    };
    DefaultPass.prototype.processInstruction = function () {
        //TODO refactor into smaller methods using a data class which represents an instruction
        var opcode = this.stream.read();
        var modifier = this.tryRead(3 /* Modifier */);
        var aMode = this.readOrDefaultMode();
        var aAddress = this.tryRead(5 /* Number */);
        if (aAddress === null) {
            // A address is mandatory, discard the rest of this line and leave for syntax check
            this.context.emit([opcode, modifier, aMode]);
            this.context.emit(this.stream.readToEOL());
            return;
        }
        var comma = null;
        if (this.options.standard === 1 /* ICWS88 */) {
            comma = this.readOrDefaultComma();
        }
        else if (this.stream.peek().category === 6 /* Comma */) {
            comma = this.stream.read();
        }
        var bMode = this.readOrDefaultMode();
        var bAddress = this.tryRead(5 /* Number */);
        if (bAddress === null) {
            if (comma === null) {
                comma = {
                    category: 6 /* Comma */,
                    lexeme: ",",
                    position: _.clone(this.stream.peek().position)
                };
            }
            bAddress = {
                category: 5 /* Number */,
                lexeme: "0",
                position: _.clone(this.stream.peek().position)
            };
            bMode.lexeme = "#";
            if (opcode.lexeme === "DAT") {
                var tempAddress = aAddress;
                var tempMode = aMode;
                aAddress = bAddress;
                aMode = bMode;
                bAddress = tempAddress;
                bMode = tempMode;
                aAddress.position = bAddress.position;
                aMode.position = bMode.position;
            }
        }
        if (modifier === null) {
            modifier = this.defaultModifier(opcode, aMode, bMode);
        }
        this.context.emitSingle(opcode);
        if (modifier !== null) {
            this.context.emitSingle(modifier);
        }
        this.context.emit([aMode, aAddress]);
        if (comma !== null) {
            this.context.emitSingle(comma);
        }
        this.context.emit([bMode, bAddress]);
        this.context.emit(this.stream.readToEOL());
    };
    DefaultPass.prototype.tryRead = function (category) {
        if (this.stream.peek().category === category) {
            return this.stream.read();
        }
        return null;
    };
    DefaultPass.prototype.readOrDefaultComma = function () {
        if (this.stream.peek().category === 6 /* Comma */) {
            return this.stream.read();
        }
        else {
            return {
                category: 6 /* Comma */,
                lexeme: ",",
                position: _.clone(this.stream.peek().position)
            };
        }
    };
    DefaultPass.prototype.readOrDefaultMode = function () {
        if (this.stream.peek().category === 4 /* Mode */) {
            return this.stream.read();
        }
        else {
            return {
                category: 4 /* Mode */,
                lexeme: "$",
                position: _.clone(this.stream.peek().position)
            };
        }
    };
    DefaultPass.prototype.defaultModifier = function (opcode, aMode, bMode) {
        var token = {
            category: 3 /* Modifier */,
            position: _.clone(opcode.position),
            lexeme: ""
        };
        switch (opcode.lexeme) {
            case "DAT":
                token.lexeme = ".F";
                break;
            case "MOV":
            case "CMP":
                if (aMode.lexeme === "#") {
                    token.lexeme = ".AB";
                }
                else if (bMode.lexeme === "#") {
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
                if (aMode.lexeme === "#") {
                    token.lexeme = ".AB";
                }
                else if (bMode.lexeme === "#") {
                    token.lexeme = ".B";
                }
                else if (this.options.standard !== 0 /* ICWS86 */) {
                    token.lexeme = ".F";
                }
                else {
                    token.lexeme = ".B";
                }
                break;
            case "SLT":
                if (aMode.lexeme === "#") {
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
                token.lexeme = ".B";
                break;
            default:
                return null;
        }
        return token;
    };
    return DefaultPass;
})();
/// <reference path="../references.ts" />
var Filter = (function () {
    function Filter() {
    }
    /// <summary>
    /// Filters superfluous tokens from the token stream.
    /// Removes any empty lines and anything after the END preprocessor command
    /// </summary>
    Filter.prototype.process = function (context, options) {
        // Remove empty lines from stream
        // Remove anything after END from stream
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.processLines();
        return this.context;
    };
    Filter.prototype.processLines = function () {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            switch (next.category) {
                case 8 /* EOL */:
                    this.processEmptyLine();
                    break;
                case 2 /* Preprocessor */:
                    if (next.lexeme === "END") {
                        this.processEnd();
                    }
                    else {
                        var line = this.stream.readToEOL();
                        this.context.emit(line);
                    }
                    break;
                default:
                    var line = this.stream.readToEOL();
                    this.context.emit(line);
                    break;
            }
        }
    };
    Filter.prototype.processEmptyLine = function () {
        this.stream.read();
    };
    Filter.prototype.processEnd = function () {
        var line = this.stream.readToEOL();
        this.context.emit(line);
        this.stream.position = this.stream.tokens.length;
    };
    return Filter;
})();
/// <reference path="../references.ts" />
var IllegalCommandCheck = (function () {
    function IllegalCommandCheck() {
    }
    IllegalCommandCheck.prototype.process = function (context, options) {
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.checkLineList();
        return this.context;
    };
    IllegalCommandCheck.prototype.checkLineList = function () {
        while (!this.stream.eof()) {
            if (this.stream.peek().category === 1 /* Opcode */) {
                this.checkLine();
            }
            else {
                this.stream.readToEOL();
            }
        }
    };
    IllegalCommandCheck.prototype.raiseError = function (opcode) {
        this.context.messages.push({
            text: "Illegal addressing mode under selected Corewar standard",
            position: opcode.position,
            type: 0 /* Error */
        });
    };
    IllegalCommandCheck.prototype.checkLine = function () {
        var opcode = this.stream.read();
        var modifier = this.stream.read();
        var aMode = this.stream.read();
        var aAddress = this.stream.read();
        var comma = this.stream.read();
        var bMode = this.stream.read();
        var bAddress = this.stream.read();
        this.stream.readToEOL();
        var hash = opcode.lexeme + aMode.lexeme + bMode.lexeme;
        if (!_(IllegalCommandCheck.LegalCommands).contains(hash)) {
            this.raiseError(opcode);
        }
    };
    IllegalCommandCheck.LegalCommands = [
        "ADD#$",
        "ADD#@",
        "ADD#<",
        "ADD$$",
        "ADD$@",
        "ADD$<",
        "ADD@$",
        "ADD@@",
        "ADD@<",
        "ADD<$",
        "ADD<@",
        "ADD<<",
        "CMP#$",
        "CMP#@",
        "CMP#<",
        "CMP$$",
        "CMP$@",
        "CMP$<",
        "CMP@$",
        "CMP@@",
        "CMP@<",
        "CMP<$",
        "CMP<@",
        "CMP<<",
        "DAT##",
        "DAT#<",
        "DAT<#",
        "DAT<<",
        "DJN$#",
        "DJN$$",
        "DJN$@",
        "DJN$<",
        "DJN@#",
        "DJN@$",
        "DJN@@",
        "DJN@<",
        "DJN<#",
        "DJN<$",
        "DJN<@",
        "DJN<<",
        "JMN$#",
        "JMN$$",
        "JMN$@",
        "JMN$<",
        "JMN@#",
        "JMN@$",
        "JMN@@",
        "JMN@<",
        "JMN<#",
        "JMN<$",
        "JMN<@",
        "JMN<<",
        "JMP$#",
        "JMP$$",
        "JMP$@",
        "JMP$<",
        "JMP@#",
        "JMP@$",
        "JMP@@",
        "JMP@<",
        "JMP<#",
        "JMP<$",
        "JMP<@",
        "JMP<<",
        "JMZ$#",
        "JMZ$$",
        "JMZ$@",
        "JMZ$<",
        "JMZ@#",
        "JMZ@$",
        "JMZ@@",
        "JMZ@<",
        "JMZ<#",
        "JMZ<$",
        "JMZ<@",
        "JMZ<<",
        "MOV#$",
        "MOV#@",
        "MOV#<",
        "MOV$$",
        "MOV$@",
        "MOV$<",
        "MOV@$",
        "MOV@@",
        "MOV@<",
        "MOV<$",
        "MOV<@",
        "MOV<<",
        "SLT#$",
        "SLT#@",
        "SLT#<",
        "SLT$$",
        "SLT$@",
        "SLT$<",
        "SLT@$",
        "SLT@@",
        "SLT@<",
        "SLT<$",
        "SLT<@",
        "SLT<<",
        "SPL$#",
        "SPL$$",
        "SPL$@",
        "SPL$<",
        "SPL@#",
        "SPL@$",
        "SPL@@",
        "SPL@<",
        "SPL<#",
        "SPL<$",
        "SPL<@",
        "SPL<<",
        "SUB#$",
        "SUB#@",
        "SUB#<",
        "SUB$$",
        "SUB$@",
        "SUB$<",
        "SUB@$",
        "SUB@@",
        "SUB@<",
        "SUB<$",
        "SUB<@",
        "SUB<<"
    ];
    return IllegalCommandCheck;
})();
/// <reference path="../references.ts" />
var JsonSerialiser = (function () {
    function JsonSerialiser() {
    }
    JsonSerialiser.prototype.serialise = function (tokens) {
        return JSON.stringify(tokens);
    };
    return JsonSerialiser;
})();
/// <reference path="../references.ts" />
var LabelCollector = (function () {
    function LabelCollector() {
    }
    LabelCollector.prototype.process = function (data, options) {
        //Pass 2
        // Record label positions
        // Remove label declarations from the token stream
        // Duplicate label check
        // Syntax error if label declaration not followed by an opcode
        this.context = data;
        this.stream = new TokenStream(data.tokens);
        this.context.tokens = [];
        this.options = options;
        this.processLines();
        return this.context;
    };
    LabelCollector.prototype.labelName = function (token) {
        switch (this.options.standard) {
            case 0 /* ICWS86 */:
            case 1 /* ICWS88 */:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    };
    LabelCollector.prototype.processLines = function () {
        this.line = -1;
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === 0 /* Label */ || next.category === 1 /* Opcode */) {
                this.line++;
            }
            if (this.stream.peek().category === 0 /* Label */) {
                this.processLabel();
            }
            var tokens = this.stream.readToEOL();
            this.context.emit(tokens);
        }
    };
    LabelCollector.prototype.warnDuplicate = function (label) {
        this.context.messages.push({
            type: 1 /* Warning */,
            position: label.position,
            text: "Redefinition of label '" + this.labelName(label) + "', original definition will be used"
        });
    };
    LabelCollector.prototype.raiseError = function (nonOpcode) {
        this.context.messages.push({
            type: 0 /* Error */,
            position: nonOpcode.position,
            text: "Expected opcode, got '" + nonOpcode.lexeme + "'"
        });
    };
    LabelCollector.prototype.processLabel = function () {
        while (!this.stream.eof() && this.stream.peek().category === 0 /* Label */) {
            var label = this.stream.read();
            var name = this.labelName(label);
            if (name in this.context.labels || name in this.context.equs) {
                this.warnDuplicate(label);
            }
            else {
                this.context.labels[name] = this.line;
            }
        }
        var next = this.stream.peek();
        if (next.category !== 1 /* Opcode */) {
            this.raiseError(next);
        }
    };
    return LabelCollector;
})();
/// <reference path="../references.ts" />
var LabelEmitter = (function () {
    function LabelEmitter() {
    }
    LabelEmitter.prototype.process = function (context, options) {
        //Pass 3
        // Replace labels with numbers
        // Raise syntax error for undeclared labels
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.options = options;
        this.processLines();
        return this.context;
    };
    LabelEmitter.prototype.labelName = function (token) {
        switch (this.options.standard) {
            case 0 /* ICWS86 */:
            case 1 /* ICWS88 */:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    };
    LabelEmitter.prototype.processLines = function () {
        this.line = 0;
        while (!this.stream.eof()) {
            if (this.stream.peek().category === 1 /* Opcode */) {
                this.processLine(true);
                this.line++;
            }
            else if (this.stream.peek().category === 2 /* Preprocessor */) {
                this.processLine(false);
            }
            else {
                var tokens = this.stream.readToEOL();
                this.context.emit(tokens);
            }
        }
    };
    LabelEmitter.prototype.processLine = function (isOpcode) {
        var _this = this;
        var tokens = this.stream.readToEOL();
        _.forEach(tokens, function (token) {
            if (token.category === 0 /* Label */) {
                _this.processLabel(token, isOpcode);
            }
            else {
                _this.context.emitSingle(token);
            }
        });
    };
    LabelEmitter.prototype.raiseUndeclaredLabel = function (label) {
        this.context.messages.push({
            type: 0 /* Error */,
            position: label.position,
            text: "Unrecognised label '" + this.labelName(label) + "'"
        });
    };
    LabelEmitter.prototype.processLabel = function (label, isOpcode) {
        var name = this.labelName(label);
        if (name in this.context.labels) {
            var labelLine = this.context.labels[name];
            var diff = labelLine;
            if (isOpcode) {
                diff -= this.line;
            }
            var token = {
                category: 5 /* Number */,
                lexeme: diff.toString(),
                position: _.clone(label.position)
            };
            this.context.emitSingle(token);
        }
        else {
            this.raiseUndeclaredLabel(label);
        }
    };
    return LabelEmitter;
})();
/// <reference path="../references.ts" />
var LoadFileSerialiser = (function () {
    function LoadFileSerialiser() {
    }
    LoadFileSerialiser.prototype.serialise = function (tokens) {
        var _this = this;
        var result = "";
        this.previous = 8 /* EOL */;
        _.forEach(tokens, function (token) {
            result += _this.serialiseToken(token);
            _this.previous = token.category;
        });
        return result;
    };
    LoadFileSerialiser.prototype.serialiseToken = function (token) {
        switch (token.category) {
            case 6 /* Comma */:
                return ",\t";
            case 8 /* EOL */:
                return "\n";
            case 4 /* Mode */:
                return token.lexeme;
            case 3 /* Modifier */:
                return token.lexeme + "\t";
            case 5 /* Number */:
                return token.lexeme;
            case 1 /* Opcode */:
                return token.lexeme;
            case 2 /* Preprocessor */:
                return token.lexeme + "\t";
            case 9 /* Comment */:
                if (this.previous === 8 /* EOL */) {
                    return token.lexeme;
                }
                else {
                    return "\t" + token.lexeme;
                }
            default:
                return "";
        }
    };
    return LoadFileSerialiser;
})();
/// <reference path="../references.ts" />
var MathsProcessor = (function () {
    function MathsProcessor() {
    }
    MathsProcessor.prototype.process = function (data, options) {
        // Maths Processor
        // Locate and resolve mathematical expressions to resulting address
        this.context = data;
        this.stream = new TokenStream(data.tokens);
        this.context.tokens = [];
        this.processLines();
        return this.context;
    };
    MathsProcessor.prototype.processLines = function () {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === 5 /* Number */ || next.category === 7 /* Maths */) {
                try {
                    var address = this.expression();
                    this.context.emitSingle({
                        category: 5 /* Number */,
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
    };
    MathsProcessor.prototype.expect = function (lexeme) {
        var token = this.stream.read();
        if (token.lexeme !== lexeme) {
            this.raiseExpected("'" + lexeme + "'", token);
        }
    };
    MathsProcessor.prototype.expectCategory = function (category) {
        var token = this.stream.read();
        if (token.category !== category) {
            this.raiseExpected(TokenHelper.categoryToString(category), token);
        }
    };
    //TODO duplicate of syntaxcheck
    MathsProcessor.prototype.raiseExpected = function (expected, got) {
        this.context.messages.push({
            type: 0 /* Error */,
            position: got.position,
            text: "Expected " + expected + ", got " + TokenHelper.tokenToString(got)
        });
        throw "";
    };
    MathsProcessor.prototype.expression = function () {
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
    };
    MathsProcessor.prototype.term = function () {
        var result = this.factor();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "*") {
                this.stream.read();
                result *= this.factor();
            }
            else if (next.lexeme === "/") {
                this.stream.read();
                result /= this.factor();
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
    };
    MathsProcessor.prototype.factor = function () {
        var next = this.stream.peek();
        if (next.lexeme === "+" || next.lexeme === "-") {
            // Place a zero in front of a - or + to allow e.g. -7 to be entered
            return 0;
        }
        else if (next.lexeme === "(") {
            this.expect("(");
            var result = this.expression();
            this.expect(")");
            return result;
        }
        else {
            this.expectCategory(5 /* Number */);
            return parseInt(next.lexeme);
        }
    };
    return MathsProcessor;
})();
/// <reference path="../references.ts" />
var OrgPass = (function () {
    function OrgPass() {
    }
    OrgPass.prototype.process = function (context, options) {
        // Replace END ### with ORG ### / END
        // Emit ORG is not ORG or END ### found
        // Raise warning for duplicate ORGs / END ###
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.firstInstruction = null;
        this.org = null;
        this.orgAddress = null;
        this.orgComment = null;
        this.endFound = false;
        this.processLines();
        this.emitOrg();
        this.emitEnd();
        return this.context;
    };
    OrgPass.prototype.processLines = function () {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (this.firstInstruction === null && next.category !== 9 /* Comment */) {
                this.firstInstruction = this.stream.position;
            }
            if (next.category === 2 /* Preprocessor */) {
                if (next.lexeme === "ORG") {
                    this.processOrg();
                }
                else if (next.lexeme === "END") {
                    this.processEnd();
                }
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        }
    };
    OrgPass.prototype.raiseWarning = function (token, message) {
        this.context.messages.push({
            position: token.position,
            text: message,
            type: 1 /* Warning */
        });
    };
    OrgPass.prototype.raiseError = function (token, message) {
        this.context.messages.push({
            position: token.position,
            text: message,
            type: 0 /* Error */
        });
    };
    OrgPass.prototype.processOrg = function () {
        var org = this.stream.read();
        this.org = org;
        if (this.orgAddress !== null) {
            this.raiseWarning(org, "Redefinition of ORG encountered, this later definition will take effect");
        }
        var next = this.stream.peek();
        if (next.category !== 5 /* Number */) {
            this.raiseError(next, "Expected address, got " + TokenHelper.tokenToString(next));
            this.stream.readToEOL();
            return;
        }
        var address = this.stream.read();
        this.orgAddress = parseInt(address.lexeme);
        if (this.stream.peek().category === 9 /* Comment */) {
            this.orgComment = this.stream.read();
        }
        next = this.stream.peek();
        if (next.category !== 8 /* EOL */) {
            this.raiseError(next, "Expected end of line, got " + TokenHelper.tokenToString(next));
            this.stream.readToEOL();
            return;
        }
        this.stream.readToEOL();
    };
    OrgPass.prototype.processEnd = function () {
        var end = this.stream.read();
        var address = null;
        var comment = null;
        var eol = null;
        if (this.stream.peek().category === 5 /* Number */) {
            address = this.stream.read();
        }
        if (this.stream.peek().category === 9 /* Comment */) {
            comment = this.stream.read();
        }
        if (this.stream.peek().category !== 8 /* EOL */) {
            var got = this.stream.read();
            this.raiseError(got, "Expected end of line, got " + TokenHelper.tokenToString(got));
            this.stream.readToEOL();
            return;
        }
        this.stream.read();
        if (address !== null) {
            if (this.orgAddress !== null) {
                this.raiseWarning(end, "Encountered both ORG and END address, the ORG definition will take effect");
            }
            else {
                this.org = end;
                this.orgAddress = parseInt(address.lexeme);
            }
        }
    };
    OrgPass.prototype.emitOrg = function () {
        if (this.orgAddress === null) {
            this.orgAddress = 0;
            this.org = {
                category: 2 /* Preprocessor */,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            };
        }
        var org = {
            category: 2 /* Preprocessor */,
            lexeme: "ORG",
            position: _.clone(this.org.position)
        };
        var address = {
            category: 5 /* Number */,
            lexeme: this.orgAddress.toString(),
            position: _.clone(this.org.position)
        };
        var instruction = [org, address];
        if (this.orgComment !== null) {
            instruction.push(this.orgComment);
        }
        instruction.push({
            category: 8 /* EOL */,
            lexeme: "\n",
            position: _.clone(this.org.position)
        });
        //HACK this is the only way I could find to insert an array into an array!
        var args = [this.firstInstruction, 0];
        this.context.tokens.splice.apply(this.context.tokens, args.concat(instruction));
    };
    OrgPass.prototype.emitEnd = function () {
        if (this.endFound === false) {
            var pos = _.last(this.context.tokens).position;
            this.context.emit([
                {
                    category: 2 /* Preprocessor */,
                    lexeme: "END",
                    position: _.clone(pos)
                },
                {
                    category: 8 /* EOL */,
                    lexeme: "\n",
                    position: _.clone(pos)
                }
            ]);
        }
    };
    return OrgPass;
})();
/// <reference path="../references.ts" />
var Parser = (function () {
    function Parser(scanner, filter, preprocessCollector, preprocessAnalyser, preprocessEmitter, labelCollector, labelEmitter, mathsProcessor, defaultPass, orgPass, syntaxCheck, illegalCommandCheck) {
        this.scanner = scanner;
        this.filter = filter;
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
    Parser.prototype.parse = function (document, options) {
        options = _.defaults(options, Parser.DefaultOptions);
        var context = this.scanner.scan(document, options);
        if (context.messages.length === 0) {
            context = this.filter.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.preprocessCollector.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.preprocessAnalyser.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.preprocessEmitter.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.labelCollector.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.labelEmitter.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.mathsProcessor.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.orgPass.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.defaultPass.process(context, options);
        }
        if (context.messages.length === 0) {
            context = this.syntaxCheck.process(context, options);
        }
        if (options.standard < 2 /* ICWS94draft */) {
            if (context.messages.length === 0) {
                context = this.illegalCommandCheck.process(context, options);
            }
        }
        return {
            tokens: context.tokens,
            messages: context.messages
        };
    };
    Parser.DefaultOptions = {
        standard: 2 /* ICWS94draft */ //TODO extended
    };
    return Parser;
})();
/// <reference path="../references.ts" />
var PreprocessAnalyser = (function () {
    function PreprocessAnalyser() {
    }
    PreprocessAnalyser.prototype.process = function (context, options) {
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
    };
    PreprocessAnalyser.prototype.collectReferences = function () {
        var _this = this;
        var keys = _(this.context.equs).keys();
        _(keys).forEach(function (key) {
            var expression = _this.context.equs[key];
            var references = _(expression).filter(function (token) {
                return token.category === 0 /* Label */ && _(keys).contains(token.lexeme);
            });
            _this.references[key] = _(references).map(function (token) {
                return token.lexeme;
            });
        });
    };
    PreprocessAnalyser.prototype.raiseCircularReference = function (key, reference) {
        this.context.messages.push({
            text: "Circular reference detected in '" + key + "' EQU statement",
            type: 0 /* Error */,
            //TODO proper position
            position: { line: 1, char: 1 }
        });
    };
    PreprocessAnalyser.prototype.noCircularReferences = function () {
        var _this = this;
        var keys = _(this.context.equs).keys();
        var result = true;
        _(keys).forEach(function (key) {
            try {
                var seen = [];
                _this.detectCircularReferencesRecursive(key, seen);
            }
            catch (reference) {
                _this.raiseCircularReference(key, reference);
                result = false;
            }
        });
        return result;
    };
    PreprocessAnalyser.prototype.detectCircularReferencesRecursive = function (token, seen) {
        var _this = this;
        if (_(seen).contains(token)) {
            throw token;
        }
        seen.push(token);
        _(this.references[token]).forEach(function (reference) {
            _this.detectCircularReferencesRecursive(reference, seen);
        });
    };
    PreprocessAnalyser.prototype.replaceAllReferences = function () {
        var _this = this;
        var keys = _(this.context.equs).keys();
        _(keys).forEach(function (key) {
            _this.replaceReferences(key);
        });
    };
    PreprocessAnalyser.prototype.replaceReferences = function (key) {
        var expression = this.context.equs[key];
        var keys = _(this.context.equs).keys();
        while (_(expression).any(function (token) {
            return token.category === 0 /* Label */ && _(keys).contains(token.lexeme);
        })) {
            for (var i = 0; i < expression.length; i++) {
                if (expression[i].category === 0 /* Label */) {
                    var label = expression[i].lexeme;
                    if (_(keys).contains(label)) {
                        //HACK this is the only way I could find to insert an array into an array!
                        var args = [i, 1];
                        expression.splice.apply(expression, args.concat(this.context.equs[label]));
                    }
                }
            }
        }
    };
    return PreprocessAnalyser;
})();
/// <reference path="../references.ts" />
var PreprocessCollector = (function () {
    function PreprocessCollector() {
    }
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    PreprocessCollector.prototype.process = function (context, options) {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.processLines();
        return this.context;
    };
    PreprocessCollector.prototype.processLines = function () {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            switch (next.category) {
                case 0 /* Label */:
                    this.processLabels();
                    break;
                default:
                    var line = this.stream.readToEOL();
                    this.context.emit(line);
                    break;
            }
        }
    };
    PreprocessCollector.prototype.processLabels = function () {
        var labels = [];
        while (this.stream.peek().category === 0 /* Label */) {
            labels.push(this.stream.read());
        }
        var equ = this.stream.read();
        if (equ.category === 2 /* Preprocessor */ && equ.lexeme === "EQU") {
            this.processEqu(labels);
        }
        else {
            this.context.emit(labels);
            this.context.emit([equ]);
        }
    };
    PreprocessCollector.prototype.warnDuplicateLabel = function (label) {
        this.context.messages.push({
            type: 1 /* Warning */,
            position: label.position,
            text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
        });
    };
    PreprocessCollector.prototype.processEqu = function (labels) {
        var _this = this;
        var expression = this.stream.readToEOL();
        // Do not include terminating EOL in replacement expression
        expression.pop();
        // Remove comments
        expression = _.filter(expression, function (token) {
            return token.category !== 9 /* Comment */;
        });
        _.forEach(labels, function (label) {
            if (label.lexeme in _this.context.equs) {
                _this.warnDuplicateLabel(label);
            }
            else {
                _this.context.equs[label.lexeme] = expression;
            }
        });
    };
    return PreprocessCollector;
})();
/// <reference path="../references.ts" />
var PreprocessEmitter = (function () {
    function PreprocessEmitter() {
    }
    /// <summary>
    /// Perform preprocessor substitutions.
    /// Replace EQU defined labels with corresponding expression
    /// </summary>
    PreprocessEmitter.prototype.process = function (context, options) {
        // Perform preprocessor substitution
        // Insert EQU expressions
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.processLines();
        return this.context;
    };
    PreprocessEmitter.prototype.processLines = function () {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === 0 /* Label */ && next.lexeme in this.context.equs) {
                this.replaceLabel();
            }
            else {
                this.context.emit([this.stream.read()]);
            }
        }
    };
    PreprocessEmitter.prototype.replaceLabel = function () {
        var label = this.stream.read();
        var originalExpression = this.context.equs[label.lexeme];
        var expression = _.map(originalExpression, function (token) {
            var clone = _.clone(token);
            clone.position = label.position;
            return clone;
        });
        this.context.emit(expression);
    };
    return PreprocessEmitter;
})();
/// <reference path="../references.ts" />
var Scanner = (function () {
    function Scanner() {
    }
    Scanner.prototype.scan = function (document, options) {
        var _this = this;
        this.context = new Context();
        this.position = {
            line: 1,
            char: 1
        };
        var lines = document.split('\n');
        this.options = options;
        this.regex = this.selectRegexes(options.standard);
        lines.forEach(function (line) {
            _this.readLine(line);
            _this.position.line++;
        });
        return this.context;
    };
    Scanner.prototype.selectRegexes = function (standard) {
        switch (standard) {
            case 2 /* ICWS94draft */:
                return Scanner.ICWS94draftRegex;
            case 1 /* ICWS88 */:
                return Scanner.ICWS88Regex;
            case 0 /* ICWS86 */:
                return Scanner.ICWS86Regex;
            default:
                throw "Unsupported Corewar Standard";
        }
    };
    Scanner.prototype.readLine = function (line) {
        var accumulator = "";
        this.position.char = 1;
        for (var charNumber = 0; charNumber < line.length; charNumber++) {
            var c = line[charNumber];
            if (c === "\n") {
                break;
            }
            else if (c === ";") {
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
    };
    Scanner.prototype.processAccumulator = function (accumulator) {
        var _this = this;
        var matchToken = function (category, re) {
            result = re.exec(accumulator);
            if (result !== null && result.index === 0) {
                accumulator = _this.processToken(category, accumulator, result[0], found !== 0);
                _this.position.char += result[0].length;
                found++;
                return true;
            }
            return false;
        };
        var result;
        var found = 0;
        while (accumulator !== "") {
            if (accumulator[0] === ";") {
                return;
            }
            if (matchToken(6 /* Comma */, this.regex.CommaRE)) {
                continue;
            }
            if (matchToken(3 /* Modifier */, this.regex.ModifierRE)) {
                continue;
            }
            if (matchToken(4 /* Mode */, this.regex.ModeRE)) {
                continue;
            }
            if (matchToken(5 /* Number */, this.regex.NumberRE)) {
                continue;
            }
            if (matchToken(7 /* Maths */, this.regex.MathsRE)) {
                continue;
            }
            if (matchToken(1 /* Opcode */, this.regex.OpcodeRE)) {
                continue;
            }
            if (matchToken(2 /* Preprocessor */, this.regex.PreprocessorRE)) {
                continue;
            }
            if (matchToken(0 /* Label */, this.regex.LabelRE)) {
                continue;
            }
            if (matchToken(9 /* Comment */, this.regex.CommentRE)) {
                continue;
            }
            accumulator = this.processToken(10 /* Unknown */, accumulator, accumulator, found !== 0);
        }
    };
    Scanner.prototype.processComment = function (lexeme) {
        this.emit(9 /* Comment */, lexeme);
    };
    Scanner.prototype.isCaseInsensitive = function (category) {
        return category === 1 /* Opcode */ || category === 3 /* Modifier */ || category === 2 /* Preprocessor */;
    };
    Scanner.prototype.processToken = function (category, accumulator, lexeme, found) {
        //HACK ICWS'88 has optional commas and delimits operands using whitespace but this parser does not tokenise whitespace.
        // This workaround will allow a plus/minus to begin an operand and disallows whitespace after a maths operator.
        // This means that the following operands are not interpretted as a single expression: MOV 0 -1
        if (this.options.standard === 1 /* ICWS88 */) {
            if (!found && category === 7 /* Maths */ && (lexeme === "-" || lexeme === "+")) {
                this.emit(5 /* Number */, "0");
            }
            else if (category === 7 /* Maths */ && accumulator.length === 1) {
                category = 10 /* Unknown */;
            }
        }
        if (this.isCaseInsensitive(category)) {
            lexeme = lexeme.toUpperCase();
        }
        this.emit(category, lexeme);
        return accumulator.substr(lexeme.length);
    };
    Scanner.prototype.emitEndOfLine = function () {
        this.emit(8 /* EOL */, "\n");
    };
    Scanner.prototype.emit = function (category, lexeme) {
        this.context.tokens.push({
            position: {
                line: this.position.line,
                char: this.position.char
            },
            lexeme: lexeme,
            category: category
        });
    };
    Scanner.ICWS94draftRegex = {
        LabelRE: /^[A-Z_][A-Z_0-9]*/i,
        OpcodeRE: /^(DAT|MOV|ADD|SUB|MUL|DIV|MOD|JMP|JMZ|JMN|DJN|CMP|SLT|SPL)(?!\w)/i,
        PreprocessorRE: /^(EQU|END|ORG)(?!\w)/i,
        ModifierRE: /^\.(AB|BA|A|B|F|X|I)/i,
        ModeRE: /^(#|\$|@|<|>)/,
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
        LabelRE: /^[A-Z][A-Z0-9]{0,7}$/i,
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
    return Scanner;
})();
/// <reference path="../references.ts" />
var SyntaxCheck = (function () {
    function SyntaxCheck() {
    }
    SyntaxCheck.prototype.process = function (context, options) {
        this.context = context;
        this.stream = new TokenStream(context.tokens);
        this.context.tokens = [];
        this.parseLineList();
        return this.context;
    };
    SyntaxCheck.prototype.expect = function (category) {
        var token = this.stream.peek();
        if (token.category !== category) {
            this.raiseExpected(TokenHelper.categoryToString(category));
        }
    };
    SyntaxCheck.prototype.raiseExpected = function (expected) {
        var token = this.stream.peek();
        this.context.messages.push({
            type: 0 /* Error */,
            position: token.position,
            text: "Expected " + expected + ", got " + TokenHelper.tokenToString(token)
        });
        throw "";
    };
    SyntaxCheck.prototype.mustEmit = function (category) {
        this.expect(category);
        this.context.emitSingle(this.stream.read());
    };
    SyntaxCheck.prototype.mayEmit = function (category) {
        if (this.stream.peek().category === category) {
            this.context.emitSingle(this.stream.read());
        }
    };
    SyntaxCheck.prototype.parseLineList = function () {
        while (!this.stream.eof()) {
            try {
                this.parseLine();
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
    };
    SyntaxCheck.prototype.parseLine = function () {
        var next = this.stream.peek();
        if (next.category === 1 /* Opcode */) {
            this.parseInstruction();
        }
        else if (next.category === 9 /* Comment */) {
            this.parseComment();
        }
        else if (next.category === 2 /* Preprocessor */ && (next.lexeme === "END" || next.lexeme === "ORG")) {
            this.context.emit(this.stream.readToEOL());
        }
        else {
            this.raiseExpected("instruction or comment");
        }
    };
    SyntaxCheck.prototype.parseComment = function () {
        this.mustEmit(9 /* Comment */);
        this.mustEmit(8 /* EOL */);
    };
    SyntaxCheck.prototype.parseInstruction = function () {
        this.mustEmit(1 /* Opcode */);
        this.mustEmit(3 /* Modifier */);
        this.mustEmit(4 /* Mode */);
        this.mustEmit(5 /* Number */);
        this.mustEmit(6 /* Comma */);
        this.mustEmit(4 /* Mode */);
        this.mustEmit(5 /* Number */);
        this.mayEmit(9 /* Comment */);
        this.mustEmit(8 /* EOL */);
    };
    return SyntaxCheck;
})();
/// <reference path="../references.ts" />
var TokenHelper = (function () {
    function TokenHelper() {
    }
    TokenHelper.categoryToString = function (category) {
        switch (category) {
            case 6 /* Comma */:
                return "','";
            case 9 /* Comment */:
                return "';'";
            case 8 /* EOL */:
                return "end of line";
            case 0 /* Label */:
                return "label";
            case 4 /* Mode */:
                return "mode";
            case 3 /* Modifier */:
                return "modifier";
            case 5 /* Number */:
                return "number";
            case 1 /* Opcode */:
                return "opcode";
        }
        return "";
    };
    TokenHelper.tokenToString = function (token) {
        switch (token.category) {
            case 9 /* Comment */:
                return "';'";
            case 8 /* EOL */:
                return "end of line";
            default:
                return "'" + token.lexeme + "'";
        }
    };
    return TokenHelper;
})();
/// <reference path="../references.ts" />
var TokenStream = (function () {
    function TokenStream(tokens) {
        this.position = 0;
        this.tokens = tokens;
    }
    TokenStream.prototype.eof = function () {
        return this.position >= this.tokens.length;
    };
    TokenStream.prototype.peek = function () {
        return this.tokens[this.position];
    };
    TokenStream.prototype.read = function () {
        return this.tokens[this.position++];
    };
    TokenStream.prototype.readToEOL = function () {
        var result = [];
        while (!this.eof()) {
            var token = this.read();
            result.push(token);
            if (token.category === 8 /* EOL */) {
                break;
            }
        }
        return result;
    };
    return TokenStream;
})();
/// <reference path="modules/underscore.d.ts" />
/// <reference path="modules/ajax.d.ts" />
/// <reference path="modules/promise.ts" />
/// <reference path="parser/interface/icontext.ts" />
/// <reference path="parser/interface/imessage.ts" />
/// <reference path="parser/interface/ioptions.ts" />
/// <reference path="parser/interface/iparser.ts" />
/// <reference path="parser/interface/iparseresult.ts" />
/// <reference path="parser/interface/ipass.ts" />
/// <reference path="parser/interface/iscanner.ts" />
/// <reference path="parser/interface/iserialiser.ts" />
/// <reference path="parser/interface/itoken.ts" />
/// <reference path="parser/interface/itokenstream.ts" />
/// <reference path="parser/context.ts" />
/// <reference path="parser/defaultpass.ts" />
/// <reference path="parser/filter.ts" />
/// <reference path="parser/illegalcommandcheck.ts" />
/// <reference path="parser/jsonserialiser.ts" />
/// <reference path="parser/labelcollector.ts" />
/// <reference path="parser/labelemitter.ts" />
/// <reference path="parser/loadfileserialiser.ts" />
/// <reference path="parser/mathsprocessor.ts" />
/// <reference path="parser/orgpass.ts" />
/// <reference path="parser/parser.ts" />
/// <reference path="parser/preprocessanalyser.ts" />
/// <reference path="parser/preprocesscollector.ts" />
/// <reference path="parser/preprocessemitter.ts" />
/// <reference path="parser/scanner.ts" />
/// <reference path="parser/syntaxcheck.ts" />
/// <reference path="parser/tokenhelper.ts" />
/// <reference path="parser/tokenstream.ts" />
/// <reference path="../../references.ts" />
/// <reference path="../references.ts" />
var Loader = (function () {
    function Loader() {
    }
    Loader.prototype.getWarriors = function (path, names) {
        var _this = this;
        var result = P.defer();
        var files = {};
        var filenames = _(names).map(function (name) {
            return path + name + ".red";
        }).concat(_(names).map(function (name) {
            return path + name + ".ld";
        }));
        var fileCount = filenames.length;
        _(filenames).forEach(function (filename) {
            ajax.get(filename, undefined, function (file) {
                files[filename] = file;
                if (--fileCount === 0) {
                    _this.return(result, path, names, files);
                }
            });
        });
        return result.promise();
    };
    Loader.prototype.return = function (result, path, names, files) {
        var warriors = [];
        _(names).forEach(function (name) {
            warriors.push({
                redcode: files[path + name + ".red"],
                loadfile: files[path + name + ".ld"]
            });
        });
        result.resolve(warriors);
    };
    return Loader;
})();
/// <reference path="../corewar/references.ts" />
/// <reference path="modules/jasmine.d.ts" />
/// <reference path="tests/iwarrior.ts" />
/// <reference path="tests/loader.ts" />
/// <reference path="../references.ts" />
/// <reference path="../references.ts" />
describe("ICWS'86", function () {
    it("adsf", function () {
        var loader = new Loader();
        loader.getWarriors("Warriors/ICWS-86", ["imp"]).done(function (warriors) {
            debugger;
        });
    });
});
//# sourceMappingURL=test.js.map