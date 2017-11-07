define(["require", "exports", "Parser/Parser", "Parser/Scanner", "Parser/ForPass", "Parser/PreprocessCollector", "Parser/PreprocessAnalyser", "Parser/PreprocessEmitter", "Parser/LabelCollector", "Parser/LabelEmitter", "Parser/MathsProcessor", "Parser/Expression", "Parser/Filter", "Parser/DefaultPass", "Parser/OrgPass", "Parser/SyntaxCheck", "Parser/LoadFileSerialiser", "Parser/IllegalCommandCheck", "Simulator/Random", "Simulator/Executive", "Simulator/Decoder", "Simulator/Core", "Simulator/Loader", "Simulator/WarriorLoader", "Simulator/Fetcher", "Simulator/Simulator", "Simulator/EndCondition", "Presentation/InstructionSerialiser", "Presentation/CoreRenderer", "Presentation/Presenter"], function (require, exports, Parser_1, Scanner_1, ForPass_1, PreprocessCollector_1, PreprocessAnalyser_1, PreprocessEmitter_1, LabelCollector_1, LabelEmitter_1, MathsProcessor_1, Expression_1, Filter_1, DefaultPass_1, OrgPass_1, SyntaxCheck_1, LoadFileSerialiser_1, IllegalCommandCheck_1, Random_1, Executive_1, Decoder_1, Core_1, Loader_1, WarriorLoader_1, Fetcher_1, Simulator_1, EndCondition_1, InstructionSerialiser_1, CoreRenderer_1, Presenter_1) {
    var redcode = document.getElementById("redcode");
    var loadfile = document.getElementById("loadfile");
    var console = document.getElementById("console");
    var standard = document.getElementById("standard");
    var parseButton = document.getElementById("parseButton");
    var runButton = document.getElementById("runButton");
    var stepButton = document.getElementById("stepButton");
    var canvas = document.getElementById("canvas");
    var instructionLabel = document.getElementById("instructionLabel");
    var expression = new Expression_1.Expression();
    var parser = new Parser_1.Parser(new Scanner_1.Scanner(), new Filter_1.Filter(), new ForPass_1.ForPass(expression), new PreprocessCollector_1.PreprocessCollector(), new PreprocessAnalyser_1.PreprocessAnalyser(), new PreprocessEmitter_1.PreprocessEmitter(), new LabelCollector_1.LabelCollector(), new LabelEmitter_1.LabelEmitter(), new MathsProcessor_1.MathsProcessor(expression), new DefaultPass_1.DefaultPass(), new OrgPass_1.OrgPass(), new SyntaxCheck_1.SyntaxCheck(), new IllegalCommandCheck_1.IllegalCommandCheck());
    var core = new Core_1.Core();
    var loader = new Loader_1.Loader(new Random_1.Random(), core, new WarriorLoader_1.WarriorLoader(core));
    var fetcher = new Fetcher_1.Fetcher();
    var executive = new Executive_1.Executive();
    var decoder = new Decoder_1.Decoder(executive);
    var simulator = new Simulator_1.Simulator(core, loader, fetcher, decoder, executive, new EndCondition_1.EndCondition());
    var prez = new Presenter_1.Presenter(redcode, loadfile, console, standard, parser, new LoadFileSerialiser_1.LoadFileSerialiser(), simulator, core, executive);
    var coreRenderer;
    parseButton.addEventListener("click", function () {
        prez.parse();
    });
    runButton.addEventListener("click", function () {
        coreRenderer = new CoreRenderer_1.CoreRenderer(canvas, instructionLabel, core, new InstructionSerialiser_1.InstructionSerialiser());
        prez.run();
        coreRenderer.initialise();
    });
    stepButton.addEventListener("click", function () {
        prez.step();
        coreRenderer.render();
    });
});
//# sourceMappingURL=app.js.map