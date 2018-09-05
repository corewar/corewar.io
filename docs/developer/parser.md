# Parser API

The Parser API provides the following functions which allow redcode to be parsed to an in memory load format.

## Functions

### parse(redcode: string): IParseResult

Parse a redcode document and return an IParseResult which consists of the tokenised program and any associated messages.

### serialise(tokens: IToken[]): string

Serialises the array of tokens to a single, human readable string.
