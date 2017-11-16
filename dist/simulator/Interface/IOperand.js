"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModeType;
(function (ModeType) {
    ModeType[ModeType["Immediate"] = 0] = "Immediate";
    ModeType[ModeType["Direct"] = 1] = "Direct";
    ModeType[ModeType["AIndirect"] = 2] = "AIndirect";
    ModeType[ModeType["BIndirect"] = 3] = "BIndirect";
    ModeType[ModeType["APreDecrement"] = 4] = "APreDecrement";
    ModeType[ModeType["BPreDecrement"] = 5] = "BPreDecrement";
    ModeType[ModeType["APostIncrement"] = 6] = "APostIncrement";
    ModeType[ModeType["BPostIncrement"] = 7] = "BPostIncrement"; // >
})(ModeType = exports.ModeType || (exports.ModeType = {}));
