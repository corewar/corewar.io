#Opcodes

Opcodes are used to specify what operation should be performed when the instruction is executed.

Different opcodes have different default [modifiers](modifiers) and some opcodes require only a single [operand](operands). See [Parser](parser) for details on how defaults are introduced into parsed instructions.

The following `opcodes` can be used in Corewar

* [dat](#dat-data)
* [mov](#mov-move)
* [add](#add-add)
* [sub](#sub-subtract)
* [mul](#mul-multiply)
* [div](#div-divide)
* [mod](#mod-modulo)
* [jmp](#jmp-jump)
* [jmz](#jmz-jump-if-zero)
* [jmn](#jmn-jump-if-not-zero)
* [djn](#djn-decrement-and-jump-if-not-zero)
* [cmp](#seq-skip-if-equal)
* [seq](#seq-skip-if-equal)
* [sne](#sne-skip-if-not-equal)
* [slt](#slt-skip-if-less-than)
* [spl](#spl-split)
* [nop](#nop-no-operation)

##Dat - Data

If one of a warrior's [processes](warriors#processes) executes a `dat` instruction it is removed from the process queue i.e. terminated. This is the main way that [warriors](warriors) are killed within the game of Corewar.

Note that termination of the warrior's process happens after the [operand](operands) [addressing modes](addressing_modes) are evaluated.

For example if a warrior were to execute the first instruction of the following code block

```
DAT.F 1, <1 ; <--this instruction is executed
DAT.F 1, 1
```

The second instructions B operand would still be decremented giving:

```
DAT.F 1, <1 
DAT.F 1, 0 ; <--this instruction was modified
```

The default [modifier](modifiers) for the `dat` opcode is `.f`. Only one operand needs to be specified for the `dat` instruction to be successfully parsed. If this is the case, the A operand is defaulted to 0.

For example `dat 7` will be parsed as `DAT.F $0, $7`

##Mov - Move

The move instruction copies data from the [address](core#addresses) referenced by the A [operand](operands) to the address referenced by the B operand.

Which data is copied is determined by the instruction's [modifier](modifiers) as follows:

|Modifier|Source|Destination|
|---|---|---|
|.a|A operand|A operand|
|.b|B operand|B operand|
|.ab|A operand|B operand|
|.ba|B operand|A operand|
|.f|A and B operands|A and B operands|
|.x|A and B operands|B and A operands|
|.i|Whole instruction|Whole instruction|

The default modifier for the `mov` opcode is [.i](modifiers#i).

##Add - Add

##Sub - Subtract

##Mul - Multiply

##Div - Divide

##Mod - Modulo

##Jmp - Jump

##Jmz - Jump if Zero

##Jmn - Jump if not Zero

##Djn - Decrement and Jump if not Zero

##Seq - Skip if Equal

##Sne - Skip if not Equal

##Slt - Skip if Less Than

##Spl - Split

##Nop - No Operation

