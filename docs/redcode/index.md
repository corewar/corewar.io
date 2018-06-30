Redcode Reference
=================

Redcode is the languaged used to write warriors for the game Corewar.

Redcode resembles assembly language, with each instruction being composed of an opcode and two operands.

For example

```
mov 0, 1
```

Here the [opcode](opcodes) is `mov` and the [operands](operands) are `0` and `1`.

In order to load your warrior into the game, the recode must be processed by a [Parser](parser). The Parsed output of the above instruction looks like this:

```
MOV.I $0, $1
```

In addition to the opcode and operands from the input instruction, the parsed output contains the [modifier](modifiers) `.I` and the [addressing mode](addressing_modes) used for each operand (`$`).

## 