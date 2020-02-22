#Parser

Redcode is converted to a load format by a parser before being loaded into the Corewar simulator.

The parser performs the following functions:

* Checks for syntax errors
* Inserts [default](#defaults) modifiers and addressing modes
* Replaces [labels](labels) with addresses
* Executes [preprocessor commands](preprocessor)
* Removes white space and [comments](comments)

## Defaults

All instructions require a [modifier](modifiers) and two [operands](operands) in order to be loaded into the `Simulator`.  Each operand must have an [addressing mode](addressing_modes) and a number.

However, it is not necessary to specify modifiers or addressing modes in order for an instruction to be successfully parsed. If you omit the modifier or addressing modes from an instruction, the parser will insert the default value in the load file output.

For example when parsed `mov 0, 1` will become `MOV.I $0, $1`.

### Addressing Modes

The default addressing mode is [direct](addressing_modes#direct) (`$`) for all [opcodes](opcodes) except [dat](opcodes#dat-data). Instructions with the `dat` opcode default to the [immediate](addressing_modes#immediate) (`#`) addressing mode.

### Operands

If an instruction has only a single operand, the `B` operand is defaulted to zero. Only the `dat`, `jmp`, `spl` and `nop` opcodes can have a single operand specified. Failure to specify a `B` operand for other opcodes will result in a syntax error.

### Modifiers

Which modifier is inserted as a default is dependant upon the instruction's opcode and `A` and `B` addressing modes as follows:

|Opcode|A-mode|B-mode|Default Modifier|
|---|---|---|---|
|`dat`|any|any|`.f`|
|`mov` `cmp`|#|any|`.ab`|
||$@<>{}|#|`.b`|
||$@<>{}|$@<>{}|`.i`|
|`add` `sub` `mul` `div` `mod`|#|any|`.ab`|
||$@<>{}|#|`.b`|
||$@<>{}|$@<>{}|`.f`|
|`slt`|#|any|`.ab`|
||$@<>{}|any|`.b`|
|`jmp` `jmz` `jmn` `djn` `spl` `nop`|any|any|`.b`|
