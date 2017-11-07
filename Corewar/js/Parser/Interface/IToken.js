define(["require", "exports"], function (require, exports) {
    (function (TokenCategory) {
        TokenCategory[TokenCategory["Label"] = 0] = "Label";
        TokenCategory[TokenCategory["Opcode"] = 1] = "Opcode";
        TokenCategory[TokenCategory["Preprocessor"] = 2] = "Preprocessor";
        TokenCategory[TokenCategory["Modifier"] = 3] = "Modifier";
        TokenCategory[TokenCategory["Mode"] = 4] = "Mode";
        TokenCategory[TokenCategory["Number"] = 5] = "Number";
        TokenCategory[TokenCategory["Comma"] = 6] = "Comma";
        TokenCategory[TokenCategory["Maths"] = 7] = "Maths";
        TokenCategory[TokenCategory["EOL"] = 8] = "EOL";
        TokenCategory[TokenCategory["Comment"] = 9] = "Comment";
        TokenCategory[TokenCategory["Unknown"] = 10] = "Unknown";
    })(exports.TokenCategory || (exports.TokenCategory = {}));
    var TokenCategory = exports.TokenCategory;
});
//# sourceMappingURL=IToken.js.map