define(["require", "exports"], function (require, exports) {
    (function (OpcodeType) {
        OpcodeType[OpcodeType["DAT"] = 0] = "DAT";
        OpcodeType[OpcodeType["MOV"] = 1] = "MOV";
        OpcodeType[OpcodeType["ADD"] = 2] = "ADD";
        OpcodeType[OpcodeType["SUB"] = 3] = "SUB";
        OpcodeType[OpcodeType["MUL"] = 4] = "MUL";
        OpcodeType[OpcodeType["DIV"] = 5] = "DIV";
        OpcodeType[OpcodeType["MOD"] = 6] = "MOD";
        OpcodeType[OpcodeType["JMP"] = 7] = "JMP";
        OpcodeType[OpcodeType["JMZ"] = 8] = "JMZ";
        OpcodeType[OpcodeType["JMN"] = 9] = "JMN";
        OpcodeType[OpcodeType["DJN"] = 10] = "DJN";
        OpcodeType[OpcodeType["CMP"] = 11] = "CMP";
        OpcodeType[OpcodeType["SEQ"] = 12] = "SEQ";
        OpcodeType[OpcodeType["SNE"] = 13] = "SNE";
        OpcodeType[OpcodeType["SLT"] = 14] = "SLT";
        OpcodeType[OpcodeType["SPL"] = 15] = "SPL";
        OpcodeType[OpcodeType["NOP"] = 16] = "NOP";
        OpcodeType[OpcodeType["Count"] = 17] = "Count";
    })(exports.OpcodeType || (exports.OpcodeType = {}));
    var OpcodeType = exports.OpcodeType;
    (function (ModifierType) {
        ModifierType[ModifierType["A"] = 0] = "A";
        ModifierType[ModifierType["B"] = 1] = "B";
        ModifierType[ModifierType["AB"] = 2] = "AB";
        ModifierType[ModifierType["BA"] = 3] = "BA";
        ModifierType[ModifierType["F"] = 4] = "F";
        ModifierType[ModifierType["X"] = 5] = "X";
        ModifierType[ModifierType["I"] = 6] = "I";
        ModifierType[ModifierType["Count"] = 7] = "Count";
    })(exports.ModifierType || (exports.ModifierType = {}));
    var ModifierType = exports.ModifierType;
});
//# sourceMappingURL=IInstruction.js.map