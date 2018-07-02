#Addressing Modes

Each [operand](operands) in a Corewar instruction has an addressing mode. The addressing mode controls how the `Source` and `Destination` instructions are determined.

When an instruction is executed, the addressing modes for the `A` and `B` operands of the instruction are evaluated to determine the source and destination instruction for the current [opcode](opcodes). Additionally, some addressing modes modify the operand number by incrementing or decrementing it during this evaluation.

The following addressing modes can be used in Corewar

* [#](#immediate) - Immediate
* [$](#direct) - Direct
* [*](#a-indirect) - A Indirect
* [@](#b-indirect) - B Indirect
* [{](#a-pre-decrement-indirect) - A Pre-decrement Indirect
* [}](#a-post-increment-indirect) - A Post-increment Indirect
* [<](#b-pre-decrement-indirect) - B Pre-decrement Indirect
* [>](#b-post-increment-indirect) - B Post-increment Indirect

##Immediate

Operands with the immediate `#` addressing mode are always evaluated as an address of 0.

##Direct

##A Indirect

##B Indirect

##A Pre-decrement Indirect

##A Post-increment Indirect

##B Pre-decrement Indirect

##B Post-increment Indirect
