#Modifiers

Modifiers are appended to the end of an [opcode](opcodes) to modify the opcode's behaviour.

This allows for each opcode to have a wide range of behaviours (up to 7) without the need to introduce multiple variants of each opcode. Modifiers were introduced in the [ICWS'94 standard](./#standards). In earlier standards, the modifier was implied by the opcode. To allow backwards compatibility, each opcode has a default modifier which is inserted by the [Parser](parser) if necessary.

The following `modifiers` can be used in Corewar

* [.a](#a)
* [.b](#b)
* [.ab](#ab)
* [.ba](#ba)
* [.f](#f)
* [.x](#x)
* [.i](#i)

When an instruction is executed, the modifier controls which values from the source and destination instruction are used as follows:

|Modifier|Source|Destination|
|---|---|---|
|.a|A operand|A operand|
|.b|B operand|B operand|
|.ab|A operand|B operand|
|.ba|B operand|A operand|
|.f|A and B operands|A and B operands|
|.x|A and B operands|B and A operands|
|.i|Whole instruction|Whole instruction|

For most [opcodes](opcodes) the `.i` modifier has the same effect as the `.f` modifier.

##A

The A [operand](operands) of the source instruction and the A operand of the destination instruction are used by the specified [opcode](opcodes).

##B

The B [operand](operands) of the source instruction and the B operand of the destination instruction are used by the specified [opcode](opcodes).

##AB

The A [operand](operands) of the source instruction and the B operand of the destination instruction are used by the specified [opcode](opcodes).

##BA

The B [operand](operands) of the source instruction and the A operand of the destination instruction are used by the specified [opcode](opcodes).

##F

Both the A and B [operand](operands)s of the source instruction and the A and B operands of the destination instruction are used by the specified [opcode](opcodes) respectively.

##X

Both the A and B [operand](operands)s of the source instruction and the B and A operands of the destination instruction are used by the specified [opcode](opcodes) respectively.

##I

The specified [opcode](opcodes) is applied to the entire source and destination instructions. The `.i` modifier is only applicable to the [mov](opocodes#mov-move), [seq](opcodes#skip-if-equal) and [sne](opcodes#skip-if-not-equal) opcodes.  Other opcodes tend to default to the behaviour of the [.f](modifiers#f) modifier.