#Parser

Redcode is converted to a load format by a parser before being loaded into the Corewar simulator.

The parser performs the following functions:

* Checks for syntax errors
* Inserts [default](#defaults) modifiers and addressing modes
* Replaces [labels](labels) with addresses
* Executes [preprocessor commands](preprocessor)
* Removes white space and [comments](comments)

## Org and End Directives

By default, warriors are loaded into core with the first instruction as the starting instruction.

The `org` directive allows a different starting address to be specified. The `org` directive should be written on its own line and followed by an address indicating the start address relative to the first address in the warrior.

By convention, the `org` directive is usually placed at the top of the warrior's code.

```
org 1
dat #4, #0
add.ab -1, -1
```

The above example uses the `org` directive to set the first instruction to the `add` instruction rather than the `dat` instruction.

The `org` directive was introduced in the [ICWS'94](./#standards) standard. Previous standards used the `end` directive instead, which worked in the same way but was placed at the end of the warrior.

```
dat #4, #0
add.ab -1, -1
end 1
```

Note the `end` and `org` directives are semantically equivalent and either can be used.

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
|`mov``cmp`|#|any|`.ab`|
||$@<>{}|#|`.b`|
||$@<>{}|$@<>{}|`.i`|
|`add``sub``mul``div``mod`|#|any|`.ab`|
||$@<>{}|#|`.b`|
||$@<>{}|$@<>{}|`.f`|
|`slt`|#|any|`.ab`|
||$@<>{}|any|`.b`|
|`jmp``jmz``jmn``djn``spl``nop`|any|any|`.b`|

### ORG (Starting address)

If no `ORG` or `END` directive is specified, the `ORG` directive will be used to determine the start address.

If multiple `ORG` or `END` directives are detected, the last one will be used (with `ORG` taking precedence over `END`).

Both these situations will generate a parser warning.
