Redcode Reference
=================

Redcode is the languaged used to write [warriors](../corewar/warriors) for the game Corewar.

Redcode resembles assembly language, with each instruction being composed of an [opcode](opcodes) and two [operands](operands).

For example

```redcode
mov 0, 1
```

Here the [opcode](opcodes) is `mov` and the [operands](operands) are `0` and `1`.

In order to load your warrior into the game, the recode must be processed by a [Parser](parser). The Parsed output of the above instruction looks like this:

```redcode
MOV.I $0, $1
```

In addition to the opcode and operands from the input instruction, the parsed output contains the [modifier](modifiers) `.I` and the [addressing mode](addressing_modes) used for each operand (`$`).

You can (but don't have to) specify the modifier and addressing modes in your source redcode. Using different modifiers and addressing modes allow you to change the behaviour of opcodes in interesting ways.

## Standards

Redcode is specified according to a number of standards. The most recent (current) standard is [ICWS'94](http://www.koth.org/info/icws94.html). This document provides a very detailed description of redcode and the game of corewar.

Older, legacy standards were created in 1986 and 1988. ICWS'94 is a superset of the functionality from the older standards and was designed to be backwards compatible. A warrior written to the 1988 spec should parse and execute correctly under the ICWS'94 standard.