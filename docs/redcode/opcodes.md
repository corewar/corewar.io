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

The second instruction's B operand would still be decremented, giving:

```
DAT.F 1, <1 
DAT.F 1, 0 ; <--this instruction was modified
```

The default [modifier](modifiers) for the `dat` opcode is `.f`. Only one operand needs to be specified for the `dat` instruction to be successfully parsed. If this is the case, the A operand is defaulted to 0.

For example `dat 7` will be parsed as `DAT.F $0, $7`

##Mov - Move

The `mov` instruction copies data from the [address](core#addresses) referenced by the A [operand](operands) to the address referenced by the B operand.

Which data is copied is determined by the instruction's [modifier](modifiers).

The default modifier for the `mov` opcode is [.i](modifiers#i).

##Add - Add

The `add` instruction adds the number(s) from the [address](core#addresses) referenced by the A [operand](operands) to the number(s) at the address referenced by the B operand.

As with all operations in Corewar, the add operation uses mod maths, therefore the result of addition will be `(A + B) % CORESIZE`.

Which data is added is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `add` opcode is [.ab](modifiers#ab).

##Sub - Subtract

The `sub` instruction subtracts the number(s) from the [address](core#addresses) referenced by the A [operand](operands) from the number(s) at the address referenced by the B operand.

As with all operations in Corewar, the subtract operation uses mod maths, therefore the result of addition will be `(A - B) % CORESIZE`.

Which data is subtracted is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `sub` opcode is [.ab](modifiers#ab).

##Mul - Multiply

The `mul` instruction multiplies the number(s) from the [address](core#addresses) referenced by the A [operand](operands) by the number(s) at the address referenced by the B operand.

As with all operations in Corewar, the multiply operation uses mod maths, therefore the result of addition will be `(A * B) % CORESIZE`.

Which data is multiplied is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `mul` opcode is [.ab](modifiers#ab).

##Div - Divide

The `div` instruction divides the number(s) from the [address](core#addresses) referenced by the B [operand](operands) by the number(s) at the address referenced by the A operand. The quotient of this division is always rounded down.

As with all operations in Corewar, the divide operation uses mod maths, therefore the result of addition will be `floor(A / B) % CORESIZE`.

Which data is divided is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `div` opcode is [.ab](modifiers#ab).

Dividing by zero is considered an illegal instruction in Corewar. The executing warrior's [process](warriors#processes) is removed from the process queue (terminated).

Note that termination of the warrior's process happens after the [operand](operands) [addressing modes](addressing_modes) are evaluated.

##Mod - Modulo

The `mod` instruction divides the number(s) from the [address](core#addresses) referenced by the B [operand](operands) by the number(s) at the address referenced by the A operand. The remainder from this division is stored at the destination.

As with all operations in Corewar, the modulo operation uses mod maths, therefore the result of addition will be `(A % B) % CORESIZE`.

Which data is divided is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `mod` opcode is [.ab](modifiers#ab).

Dividing by zero is considered an illegal instruction in Corewar. The executing warrior's [process](warriors#processes) is removed from the process queue (terminated).

Note that termination of the warrior's process happens after the [operand](operands) [addressing modes](addressing_modes) are evaluated.

##Jmp - Jump



##Jmz - Jump if Zero

##Jmn - Jump if not Zero

##Djn - Decrement and Jump if not Zero

##Seq - Skip if Equal

##Sne - Skip if not Equal

##Slt - Skip if Less Than

##Spl - Split

##Nop - No Operation

