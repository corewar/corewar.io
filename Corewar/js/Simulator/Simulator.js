define(["require", "exports", "./Defaults"], function (require, exports, Defaults_1) {
    var Simulator = (function () {
        function Simulator(core, loader, fetcher, decoder, executive, endCondition) {
            this.state = {
                core: core,
                cycle: 0,
                warriors: [],
                warriorIndex: 0,
                options: null
            };
            this.loader = loader;
            this.fetcher = fetcher;
            this.decoder = decoder;
            this.executive = executive;
            this.endCondition = endCondition;
        }
        Simulator.prototype.initialise = function (options, warriors) {
            this.state.options = _.defaults(options, Defaults_1.Defaults);
            this.state.core.initialise(options);
            this.state.warriors = this.loader.load(warriors, options);
        };
        Simulator.prototype.run = function () {
            while (this.step()) {
                window.setTimeout(function () {
                }, 0);
            }
        };
        Simulator.prototype.step = function () {
            var context = this.fetcher.fetch(this.state);
            context = this.decoder.decode(context);
            context.command.apply(this.executive, [context]);
            this.state.cycle += 1;
            return this.endCondition.check(this.state);
        };
        return Simulator;
    })();
    exports.Simulator = Simulator;
});
//# sourceMappingURL=Simulator.js.map