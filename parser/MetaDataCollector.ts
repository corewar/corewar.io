import { IPass } from "./Interface/IPass";
import { ITokenStream } from "./Interface/ITokenStream";
import { IContext } from "./Interface/IContext";
import { IParseOptions } from "./Interface/IParseOptions";
import { IToken, TokenCategory } from "./Interface/IToken";

import { TokenStream } from "./TokenStream";

export class MetaDataCollector implements IPass {

    private context: IContext;
    private stream: ITokenStream;

    public process(context: IContext, options: IParseOptions): IContext {

        // Read meta data from comments
        // ;name                   name of warrior follows
        // ;author                 name of author follows 
        // ;strategy               strategy for warrior e.g. stone/imp

        this.context = context;
        this.stream = new TokenStream(context.tokens, context.messages);
        
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

    private processLines() {

        while (!this.stream.eof()) {

            var token = this.stream.read();
            if (token.category === TokenCategory.Comment) {

                this.processComment(token);
            }
        }
    }

    private processComment(comment: IToken) {

        if (comment.lexeme.length > 5 &&
            comment.lexeme.substr(0, 5).toUpperCase() === ";NAME") {

            var name = comment.lexeme.substr(5).trim();

            if (this.context.metaData.name !== "") {
                this.stream.warn(comment, "Redefinition of name, latest definition will be used ('" + name + "')");
            }

            this.context.metaData.name = name;

        } else if (comment.lexeme.length > 7 &&
            comment.lexeme.substr(0, 7).toUpperCase() === ";AUTHOR") {

            var author = comment.lexeme.substr(7).trim();

            if (this.context.metaData.author !== "") {
                this.stream.warn(comment, "Redefinition of author, latest definition will be used ('" + author + "')");
            }

            this.context.metaData.author = author;

        } else if (comment.lexeme.length > 10 &&
            comment.lexeme.substr(0, 9).toUpperCase() === ";STRATEGY") {

            this.context.metaData.strategy += comment.lexeme.substr(10) + "\n";
        }
    }
}