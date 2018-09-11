# Parser API

The Parser API provides the following functions which allow redcode to be parsed to an in memory load format.

## Functions

### parse(redcode: string): IParseResult

Parse a redcode document and return an `IParseResult` which consists of the tokenised program and any associated messages.

The `IParseResult` has the following structure:

```
{
    metaData: {
        name: string,
        author: string,
        strategy: string
    },
    tokens: [{
        position: {
            line: number,
            char: number
        },
        lexeme: string,
        category: number
    }],
    messages: [{
        type: number;
        position: {
            line: number,
            char: number
        },
        text: string
    }],
    data?: any
}
```

[Token Category](./enumerations#token-category) and [Message Type](./enumerations#message-type) are [enumerations](./enumerations).

### serialise(tokens: IToken[]): string

Serialises the array of tokens to a single, human readable string.

The `serialise` function takes a single parameter which is an array of tokens with the following structure:

```
[{
    position: {
        line: number,
        char: number
    },
    lexeme: string,
    category: number
}]
```

The lexeme contains the original text which produced the token.

A list of valid values for category can be found [here](./enumerations#token-categories).
