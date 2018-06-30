Redcode Reference
=================

Redcode is the languaged used to write warriors for the game Corewar.

Redcode resembles assembly language, with each instruction being composed of an opcode and two operands.

For example

```
mov 0, 1
```

Here the opcode is `mov` and the operands are `0` and `1`.

See [here](opcodes) for a complete list of opcodes that are supported.

In order to load your warrior into the game, the recode must be processed by a Parser. The Parsed output of the above instruction looks like this:

```
MOV.I $0, $1
```

In addition to the opcode and operands from the input instruction, the parsed output contains the modifier `.I` and the addressing mode used for each operand (`$`).

A full list of available modifiers can be seen [here](modifiers).
A full list of available addressing modes can be seen [here](addressing_modes).

## 