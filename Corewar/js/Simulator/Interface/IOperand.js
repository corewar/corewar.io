define(["require", "exports"], function (require, exports) {
    (function (ModeType) {
        ModeType[ModeType["Immediate"] = 0] = "Immediate";
        ModeType[ModeType["Direct"] = 1] = "Direct";
        ModeType[ModeType["AIndirect"] = 2] = "AIndirect";
        ModeType[ModeType["BIndirect"] = 3] = "BIndirect";
        ModeType[ModeType["APreDecrement"] = 4] = "APreDecrement";
        ModeType[ModeType["BPreDecrement"] = 5] = "BPreDecrement";
        ModeType[ModeType["APostIncrement"] = 6] = "APostIncrement";
        ModeType[ModeType["BPostIncrement"] = 7] = "BPostIncrement";
    })(exports.ModeType || (exports.ModeType = {}));
    var ModeType = exports.ModeType;
});
//# sourceMappingURL=IOperand.js.map