import { ISimulator } from "./interface/ISimulator";
import { IState } from "./interface/IState";
import { ILoader } from "./interface/ILoader";
import { IFetcher } from "./interface/IFetcher";
import { IDecoder } from "./interface/IDecoder";
import { IExecutive } from "./interface/IExecutive";
import { IEndCondition } from "./interface/IEndCondition";
import { ICore } from "./interface/ICore";
import { IOptions } from "./interface/IOptions";
import { IParseResult } from "../parser/interface/IParseResult";
import Defaults from "./Defaults";
import * as _ from "underscore";

export class Simulator implements ISimulator {

    private state: IState;

    private loader: ILoader;
    private fetcher: IFetcher;
    private decoder: IDecoder;
    private executive: IExecutive;
    private endCondition: IEndCondition;

    constructor(
        core: ICore,
        loader: ILoader,
        fetcher: IFetcher,
        decoder: IDecoder,
        executive: IExecutive,
        endCondition: IEndCondition) {

        this.state = {
            core: core,
            cycle: 0,
            warriors: [],
            warriorIndex: 0,
            options: null//,
            //context: null
        };

        this.loader = loader;
        this.fetcher = fetcher;
        this.decoder = decoder;
        this.executive = executive;
        this.endCondition = endCondition;
    }

    public initialise(options: IOptions, warriors: IParseResult[]) {
        // TODO throw error if options are invalid e.g. minSeparation must be >=1
        this.state.options = _.defaults(options, Defaults);
        this.state.core.initialise(options);

        this.state.warriors = this.loader.load(warriors, options);
    }

    public run() {

        while (this.step()) {
            // TODO setTimeout?
            window.setTimeout(() => {
                //
            }, 0);
        }
    }

    public step(): boolean {

        var context = this.fetcher.fetch(this.state);

        context = this.decoder.decode(context);

        context.command.apply(this.executive, [context]);

        this.state.cycle += 1;

        return this.endCondition.check(this.state);
    }

    public getState() : IState {
        return this.state;
    }
}