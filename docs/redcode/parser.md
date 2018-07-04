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

Under the [ICWS'94 standard](./#standards), the [direct](addressing_modes#direct) (`$`) addressing mode is always the default addressing mode, and the parser will always insert this if the addressing mode is ommitted.

Older standards inserted the [immediate](addressing_modes#immediate) (`#`) addressing mode if the opcode of the instruction was [dat](opcodes#dat-data).

Which modifier is inserted as a default is dependant upon the instruction's [opcode](opcodes) and `A` and `B` addressing modes as follows:

|Opcode|A-mode|B-mode|Default Modifier|
|---|---|---|---|
|`dat`|||`.f`|
|`mov`|#||`.ab`|