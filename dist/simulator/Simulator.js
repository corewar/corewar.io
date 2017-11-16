"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Defaults_1 = require("./Defaults");
const _ = require("underscore");
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
        this.state.options = _.defaults(options, Defaults_1.default);
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
exports.Simulator = Simulator;
