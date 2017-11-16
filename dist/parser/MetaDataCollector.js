"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const TokenStream_1 = require("./TokenStream");
class MetaDataCollector {
    process(context, options) {
        // Read meta data from comments
        // ;name                   name of warrior follows
        // ;author                 name of author follows
        // ;strategy               strategy for warrior e.g. stone/imp
        this.context = context;
        this.stream = new TokenStream_1.TokenStream(context.tokens, context.messages);
        this.context.metaData = {
            name: "",
            author: "",
            strategy: ""
        };
        this.processLines();
        if (this.context.metaData.name === "") {
            this.context.metaData.name = "Nameless";
        }
        if (this.context.metaData.author === "") {
            this.context.metaData.author = "Blameless";
        }
        return this.context;
    }
    processLines() {
        while (!this.stream.eof()) {
            var token = this.stream.read();
            if (token.category === IToken_1.TokenCategory.Comment) {
                this.processComment(token);
            }
        }
    }
    processComment(comment) {
        if (comment.lexeme.length > 5 &&
            comment.lexeme.substr(0, 5).toUpperCase() === ";NAME") {
            var name = comment.lexeme.substr(5).trim();
            if (this.context.metaData.name !== "") {
                this.stream.warn(comment, "Redefinition of name, latest definition will be used ('" + name + "')");
            }
            this.context.metaData.name = name;
        }
        else if (comment.lexeme.length > 7 &&
            comment.lexeme.substr(0, 7).toUpperCase() === ";AUTHOR") {
            var author = comment.lexeme.substr(7).trim();
            if (this.context.metaData.author !== "") {
                this.stream.warn(comment, "Redefinition of author, latest definition will be used ('" + author + "')");
            }
            this.context.metaData.author = author;
        }
        else if (comment.lexeme.length > 10 &&
            comment.lexeme.substr(0, 9).toUpperCase() === ";STRATEGY") {
            this.context.metaData.strategy += comment.lexeme.substr(10) + "\n";
        }
    }
}
exports.MetaDataCollector = MetaDataCollector;
