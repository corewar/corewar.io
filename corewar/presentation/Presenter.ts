import { IParser } from "../../parser/interface/IParser";
import { ISerialiser } from "../../parser/interface/ISerialiser";
import { IParseResult } from "../../parser/interface/IParseResult";
import { IMessage, MessageType } from "../../parser/interface/IMessage";
import { ISimulator } from "../../simulator/interface/ISimulator";
import { ICore } from "../../simulator/interface/ICore";
import { IExecutive } from "../../simulator/interface/IExecutive";
import Defaults1 from "../../simulator/Defaults";
import * as _ from "underscore";

export class Presenter {
    private redcode: HTMLTextAreaElement;
    private loadfile: HTMLTextAreaElement;
    private console: HTMLUListElement;
    private standard: HTMLSelectElement;

    private parser: IParser;
    private serialiser: ISerialiser;

    private result: IParseResult;

    private simulator: ISimulator;
    private core: ICore;
    private executive: IExecutive;

    constructor(
        redcode: HTMLTextAreaElement,
        loadfile: HTMLTextAreaElement,
        console: HTMLUListElement,
        standard: HTMLSelectElement,
        parser: IParser,
        serialiser: ISerialiser,
        simulator: ISimulator,
        core: ICore,
        executive: IExecutive) {

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

    public parse() {
        while (this.console.hasChildNodes()) {
            this.console.removeChild(this.console.lastChild);
        }

        var selectedStandard = parseInt(this.standard.value);

        var redcodeValue = this.redcode.value;
        this.result = this.parser.parse(redcodeValue, { standard: selectedStandard });

        this.loadfile.value = this.serialiser.serialise(this.result.tokens);

        _.forEach(this.result.messages, (item: IMessage) => {
            var li = document.createElement("li");
            li.innerText =
            "[" + item.position.line.toString() + "," +
            item.position.char.toString() + "] " +
            this.messageTypeToString(item.type) +
            item.text;
            this.console.appendChild(li);
        });
    }

    public run() {

        var selectedStandard = parseInt(this.standard.value);

        var options = _.defaults({
            coresize: 64,
            standard: selectedStandard
        }, Defaults1);

        this.core.initialise(options);
        this.executive.initialise(options);

        this.simulator.initialise(options, [this.result]);
    }

    public step() {

        this.simulator.step();
    }

    private messageTypeToString(messageType: MessageType) {
        switch (messageType) {
            case MessageType.Error:
                return "ERROR: ";
            case MessageType.Warning:
                return "WARNING: ";
            case MessageType.Info:
                return "";
        }

        return "";
    }
}