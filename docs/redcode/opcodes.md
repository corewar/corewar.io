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

As with all operations in Corewar, the subtract operation uses mod maths, therefore the result of subtraction will be `(A - B) % CORESIZE`.

Which data is subtracted is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `sub` opcode is [.ab](modifiers#ab).

##Mul - Multiply

The `mul` instruction multiplies the number(s) from the [address](core#addresses) referenced by the A [operand](operands) by the number(s) at the address referenced by the B operand.

As with all operations in Corewar, the multiply operation uses mod maths, therefore the result of multiplication will be `(A * B) % CORESIZE`.

Which data is multiplied is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `mul` opcode is [.ab](modifiers#ab).

##Div - Divide

The `div` instruction divides the number(s) from the [address](core#addresses) referenced by the B [operand](operands) by the number(s) at the address referenced by the A operand. The quotient of this division is always rounded down.

As with all operations in Corewar, the divide operation uses mod maths, therefore the result of division will be `floor(A / B) % CORESIZE`.

Which data is divided is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `div` opcode is [.ab](modifiers#ab).

Dividing by zero is considered an illegal instruction in Corewar. The executing warrior's [process](warriors#processes) is removed from the process queue (terminated).

Note that termination of the warrior's process happens after the [operand](operands) [addressing modes](addressing_modes) are evaluated.

##Mod - Modulo

The `mod` instruction divides the number(s) from the [address](core#addresses) referenced by the B [operand](operands) by the number(s) at the address referenced by the A operand. The remainder from this division is stored at the destination.

As with all operations in Corewar, the modulo operation uses mod maths, therefore the result of modulo will be `(A % B) % CORESIZE`.

Which data is divided is determined by the instruction's [modifier](modifiers).

The [.i](modifiers#i) modifier has the same effect as the [.f](modifiers#f) modifier.

The default modifier for the `mod` opcode is [.ab](modifiers#ab).

Dividing by zero is considered an illegal instruction in Corewar. The executing warrior's [process](warriors#processes) is removed from the process queue (terminated).

Note that termination of the warrior's process happens after the [operand](operands) [addressing modes](addressing_modes) are evaluated.

##Jmp - Jump

The `jmp` instruction changes the address of the next instruction which will be executed by the currently executing [process](warriors#processes). The most common usages of this opcode are to create a loop or to skip over a section of code.

The `jmp` instruction will jump execution to the address given by the instruction's A [operand](operands). The B operand has no purpose within the `jmp` instruction. However the B operand will still be evaluated, see [addressing_modes](addressing_modes).

[Modifiers](modifiers) have no effect on the `jmp` instruction, the A operand is always used as the jump address.

The default modifier for the `jmp` opcode is [.b](modifiers#b). Only one operand needs to be specified for the `jmp` instruction to be successfully parsed. If this is the case, the B operand is defaulted to 0.

For example `jmp 5` will be parsed as `JMP.B $5, $0`.

##Jmz - Jump if Zero

The `jmz` instruction works in the same way as the [jmp](opcodes#jmp-jump) instruction detailed above with the exception that the jump is only performed if the number(s) at the address referenced by the B [operand](operands) is zero. This allows the `jmz` instruction to function like an `if` statement in a higher level language.

The instruction's [modifier](modifiers) controls which operands are compared with zero at the destination address according to the following table:

|Modifier|Destination|
|---|---|
|.a|A operand|
|.b|B operand|
|.ab|B operand|
|.ba|A operand|
|.f|A and B operands|
|.x|A and B operands|
|.i|A and B operands|

We can see from this that [.a](modifiers#a) and [.ba](modifiers#ba) are equivalent, as are [.b](modifiers#b) and [.ab](modifiers#ab).
We can also see that [.f](modifiers#f), [.x](modifiers#x) and [.i](modifiers#i) are equivalent.

Note that when comparing both A and B operands with zero, the jump will **not** be taken if **either** operand is non-zero.

```
dat 0, 1 ; <- won't jump if compared with jmz.f
dat 1, 0 ; <- won't jump if compared with jmz.f
dat 1, 1 ; <- won't jump if compared with jmz.f
dat 0, 0 ; <- will jump if compared with jmz.f
```

The default modifier for the `jmz` opcode is [.b](modifiers#b).

##Jmn - Jump if not Zero

The `jmn` instruction works in the same way as the [jmz](opcodes#jmz-jump-if-zero) instruction detailed above with the exception that the jump is performed if the referenced number(s) are **not** zero.

Note that when comparing both A and B operands with zero, the jump will **not** be taken if **either** operand is zero.

```
dat 0, 1 ; <- won't jump if compared with jmn.f
dat 1, 0 ; <- won't jump if compared with jmn.f
dat 1, 1 ; <- will jump if compared with jmn.f
dat 0, 0 ; <- won't jump if compared with jmn.f
```

The default modifier for the `jmn` opcode is [.b](modifiers#b).

##Djn - Decrement and Jump if not Zero

The `djn` instruction works in a similar way to the [jmn](opcodes#jmn-jump-if-not-zero) instruction detailed above with one addition. Before comparing the destination instruction against zero, the number(s) at the destination instruction are decremented. One common use of this opcode is to create the equivalent of a simple `for` loop in higher level languages.

Unlike the `jmn` intruction, the `djn` instruction **will** perform the jump if **either** operand is zero when using the [.f](modifiers#f), [.x](modifiers#x) and [.i](modifiers#i) modifiers.

```
dat 0, 1 ; <- will jump if compared with djn.f
dat 1, 0 ; <- will jump if compared with djn.f
dat 1, 1 ; <- will jump if compared with djn.f
dat 0, 0 ; <- won't jump if compared with jmn.f
```

Decrement happens after the [addressing modes](addressing_modes) are evaluated and before the comparison against zero is made.

The default modifier for the `djn` opcode is [.b](modifiers#b).

##Seq - Skip if Equal

The `cmp` opcode is an alias for `seq` used to support legacy [corewar standards](./#standards). `cmp` and `seq` work in exactly the same way within Corewar.

The `seq` instruction compares the number(s) at the addresses specified by its source and destination [operands](operands) and if they are equal, increments the next address to be executed by the current [process](warriors#processes) by one - in effect skipping the next instruction. Skip instructions are commonly used to develop scanners which scan the [core](core) looking for other [warriors](warriors).

The instruction's [modifier](modifiers) determines what at the two addresses is compared for equality. Importantly, using a modifier of [.i](modifiers#i) will compare the entire source and destination instructions. This means even if the instructions differ only by opcode, modifier or [addressing mode](addressing_modes), the next instruction will be skipped.

The default modifier for the 'seq' opcode is [.i](modifiers#i).

##Sne - Skip if not Equal

The `sne` instruction works in the same way as the [seq](opcodes#seq-skip-if-equal) instruction detailed above with the exception that the next instruction is skipped if the source and destination instructions are **not** equal.

The default modifier for the 'sne' opcode is [.i](modifiers#i).

##Slt - Skip if Less Than

The `slt` instruction compares the number(s) at the addresses specified by its source and destination [operands](operands). If the source number(s) are less than than the destination number(s), the next address to be executed by the current [process](warriors#processes) is incremented by one - in effect skipping the next instruction.

The instruction's [modifier](modifiers) controls which operands are compared at the source and destination addresses according to the following table:

|Modifier|Source|Destination|
|---|---|---|
|.a|A operand|A operand|
|.b|B operand|B operand|
|.ab|A operand|B operand|
|.ba|B operand|A operand|
|.f|A and B operands|A and B operands|
|.x|A and B operands|B and A operands|
|.i|A and B operands|A and B operands|

We can see from this that the [.f](modifiers#f) and [.i](modifiers#i) modifiers are equivalent.

If comparing both A and B operands (using .f, .x or .i), the instruction will not be skipped if **either** source number is greater than its corresponding destination number.

The default modifier for the 'slt' opcode is [.b](modifiers#b).

##Spl - Split

The `spl` instruction spawns a new [process](warriors#processes) for the current [warrior](warriors) at the address specified by the A [operand](operands).

The newly created process is added to the process queue **after** the currently executing process.

Consider the following example:

```
a: spl c
b: jmp 0
c: jmp 0
```

The first instruction is executed, creating a second process at `c`. The next instruction to execute will be `b` (executed by the original process). Finally the new process will execute at `c`.

[Modifiers](modifiers) have no effect on the `spl` instruction, the A operand is always used as the split address.

The default [modifier](modifiers) for the `spl` opcode is `.b`. Only one operand needs to be specified for the `spl` instruction to be successfully parsed. If this is the case, the B operand is defaulted to 0.

For example `spl 3` will be parsed as `SPL.B $3, $0`.

##Nop - No Operation

The `nop` instruction does not perform any operation. The instruction takes a single cycle to execute as normal, and [addressing modes](addressing_modes) are evaluated as normal. One potential use of the `nop` instruction is to introduce a delay in execution when working on a [multi-process](warriors#processes) warrior.

[Modifiers](modifiers) have no effect on the `nop` instruction.

The default [modifier](modifiers) for the `nop` opcode is `.f`. Only one operand needs to be specified for the `nop` instruction to be successfully parsed. If this is the case, the B operand is defaulted to 0.

For example `nop 8` will be parsed as `NOP.F $8, $0`.
