import { ISimulator } from "./interface/ISimulator";
import { IState } from "./interface/IState";
import { ILoader } from "./interface/ILoader";
import { IFetcher } from "./interface/IFetcher";
import { IDecoder } from "./interface/IDecoder";
import { IExecutive } from "./interface/IExecutive";
import { IEndCondition } from "./interface/IEndCondition";
import { IOptionValidator } from "./interface/IOptionValidator";
import { ICore } from "./interface/ICore";
import { IOptions } from "./interface/IOptions";
import { IParseResult } from "../parser/interface/IParseResult";
import { MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import Defaults from "./Defaults";
import * as clone from "clone";

export class Simulator implements ISimulator {

    private state: IState;

    private core: ICore;
    private loader: ILoader;
    private fetcher: IFetcher;
    private decoder: IDecoder;
    private executive: IExecutive;
    private endCondition: IEndCondition;
    private optionValidator: IOptionValidator;
    private publisher: IPublisher;

    constructor(
        core: ICore,
        loader: ILoader,
        fetcher: IFetcher,
        decoder: IDecoder,
        executive: IExecutive,
        endCondition: IEndCondition,
        optionValidator: IOptionValidator,
        publisher: IPublisher) {

        this.core = core;
        this.loader = loader;
        this.fetcher = fetcher;
        this.decoder = decoder;
        this.executive = executive;
        this.endCondition = endCondition;
        this.optionValidator = optionValidator;
        this.publisher = publisher;

        this.initState();
    }

    private initState(): void {
        this.state = {
            cycle: 0,
            warriors: [],
            warriorIndex: 0,
            options: null
        };
    }

    private publishInitialise(state: IState) {

        this.publisher.publish({
            type: MessageType.CoreInitialise,
            payload: {
                state: clone(state)
            }
        });
    }

    public initialise(options: IOptions, warriors: IParseResult[]) {

        this.initState();

        const defaultedOptions = Object.assign({}, Defaults, options);

        this.optionValidator.validate(defaultedOptions, warriors.length);

        this.state.options = defaultedOptions;

        this.core.initialise(options);

        this.state.warriors = this.loader.load(warriors, options);

        this.publishInitialise(this.state);
    }

    public run(): void {

        try {
            this.publisher.setAllMessagesEnabled(false);
            this.publisher.setMessageTypeEnabled(MessageType.RoundEnd, true);

            while (this.stepInternal() === false) {
            }
        }
        finally {
            this.publisher.setAllMessagesEnabled(true);
        }
    }

    public step(): boolean {

        if (this.endCondition.check(this.state)) {
            return true;
        }

        return this.stepInternal();
    }

    private stepInternal(): boolean {

        if (this.state.cycle === 0) {
            this.publisher.publish({
                type: MessageType.RoundStart,
                payload: {}
            });
        }

        var context = this.fetcher.fetch(this.state, this.core);

        context = this.decoder.decode(context);

        context.command.apply(this.executive, [context]);

        this.state.cycle += 1;

        return this.endCondition.check(this.state);
    }

    public getState(): IState {
        return clone(this.state);
    }
}