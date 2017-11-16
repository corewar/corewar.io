"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMessage_1 = require("../../parser/interface/IMessage");
const Defaults_1 = require("../../simulator/Defaults");
const _ = require("underscore");
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
        }, Defaults_1.default);
        this.core.initialise(options);
        this.executive.initialise(options);
        this.simulator.initialise(options, [this.result]);
    }
    step() {
        this.simulator.step();
    }
    messageTypeToString(messageType) {
        switch (messageType) {
            case IMessage_1.MessageType.Error:
                return "ERROR: ";
            case IMessage_1.MessageType.Warning:
                return "WARNING: ";
            case IMessage_1.MessageType.Info:
                return "";
        }
        return "";
    }
}
exports.Presenter = Presenter;
