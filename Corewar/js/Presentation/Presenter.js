define(["require", "exports", "../Parser/Interface/IMessage", "../Simulator/Defaults"], function (require, exports, IMessage_1, Defaults1) {
    var Presenter = (function () {
        function Presenter(redcode, loadfile, console, standard, parser, serialiser, simulator, core, executive) {
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
        Presenter.prototype.parse = function () {
            var _this = this;
            while (this.console.hasChildNodes()) {
                this.console.removeChild(this.console.lastChild);
            }
            var selectedStandard = parseInt(this.standard.value);
            var redcodeValue = this.redcode.value;
            this.result = this.parser.parse(redcodeValue, { standard: selectedStandard });
            this.loadfile.value = this.serialiser.serialise(this.result.tokens);
            _.forEach(this.result.messages, function (item) {
                var li = document.createElement("li");
                li.innerText =
                    "[" + item.position.line.toString() + "," +
                        item.position.char.toString() + "] " +
                        _this.messageTypeToString(item.type) +
                        item.text;
                _this.console.appendChild(li);
            });
        };
        Presenter.prototype.run = function () {
            var selectedStandard = parseInt(this.standard.value);
            var options = _.defaults({
                coresize: 64,
                standard: selectedStandard
            }, Defaults1.Defaults);
            this.core.initialise(options);
            this.executive.initialise(options);
            this.simulator.initialise(options, [this.result]);
        };
        Presenter.prototype.step = function () {
            this.simulator.step();
        };
        Presenter.prototype.messageTypeToString = function (messageType) {
            switch (messageType) {
                case IMessage_1.MessageType.Error:
                    return "ERROR: ";
                case IMessage_1.MessageType.Warning:
                    return "WARNING: ";
                case IMessage_1.MessageType.Info:
                    return "";
            }
            return "";
        };
        return Presenter;
    })();
    exports.Presenter = Presenter;
});
//# sourceMappingURL=Presenter.js.map