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

The token category number is an enumerated type with the following possible values:

|Value|Meaning|
|---|---|
|0|Label|
|1|Opcode|
|2|Preprocessor|
|3|Modifier|
|4|Mode|
|5|Number|
|6|Comma|
|7|Maths|
|8|EOL|
|9|Comment|
|10|Unknown|

The message type number is an enumerated type with the following possible values:

|Value|Meaning|
|---|---|
|0|Error|
|1|Warning|
|2|Info|

### serialise(tokens: IToken[]): string

Serialises the array of tokens to a single, human readable string.
