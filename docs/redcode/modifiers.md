#Modifiers

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

##B

##AB

##BA

##F

##X

##I

